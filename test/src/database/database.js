const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

class DatabaseManager {
  constructor() {
    const dataDir = path.join(__dirname, '../../data');
    
    // Create data directory if it doesn't exist
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = process.env.DB_PATH || path.join(dataDir, 'ascenith.db');
    this.db = new Database(dbPath);
    this.db.pragma('journal_mode = WAL');
    
    this.initializeTables();
  }

  initializeTables() {
    // Guild configuration table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS guild_config (
        guild_id TEXT PRIMARY KEY,
        setup_completed INTEGER DEFAULT 0,
        mod_log_channel TEXT,
        ticket_category TEXT,
        ticket_log_channel TEXT,
        welcome_channel TEXT,
        advisor_role TEXT,
        senior_advisor_role TEXT,
        admin_role TEXT,
        client_role TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tickets table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tickets (
        ticket_id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        channel_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        subject TEXT,
        status TEXT DEFAULT 'open',
        assigned_to TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        closed_at DATETIME,
        FOREIGN KEY (guild_id) REFERENCES guild_config(guild_id)
      )
    `);

    // Moderation logs table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS mod_logs (
        log_id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        moderator_id TEXT NOT NULL,
        action TEXT NOT NULL,
        reason TEXT,
        duration TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES guild_config(guild_id)
      )
    `);

    // Warnings table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS warnings (
        warning_id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        moderator_id TEXT NOT NULL,
        reason TEXT NOT NULL,
        active INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES guild_config(guild_id)
      )
    `);

    // Client notes table (for consultants)
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS client_notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        client_id TEXT NOT NULL,
        consultant_id TEXT NOT NULL,
        note TEXT NOT NULL,
        private INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES guild_config(guild_id)
      )
    `);

    // Consultation requests table
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS consultations (
        consultation_id INTEGER PRIMARY KEY AUTOINCREMENT,
        guild_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        topic TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        assigned_to TEXT,
        scheduled_time TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guild_id) REFERENCES guild_config(guild_id)
      )
    `);
  }

  // Guild Configuration Methods
  getGuildConfig(guildId) {
    const stmt = this.db.prepare('SELECT * FROM guild_config WHERE guild_id = ?');
    return stmt.get(guildId);
  }

  setGuildConfig(guildId, config) {
    const existing = this.getGuildConfig(guildId);
    
    if (existing) {
      const updates = [];
      const values = [];
      
      for (const [key, value] of Object.entries(config)) {
        updates.push(`${key} = ?`);
        values.push(value);
      }
      
      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(guildId);
      
      const stmt = this.db.prepare(`UPDATE guild_config SET ${updates.join(', ')} WHERE guild_id = ?`);
      return stmt.run(...values);
    } else {
      const keys = ['guild_id', ...Object.keys(config)];
      const placeholders = keys.map(() => '?').join(', ');
      const values = [guildId, ...Object.values(config)];
      
      const stmt = this.db.prepare(`INSERT INTO guild_config (${keys.join(', ')}) VALUES (${placeholders})`);
      return stmt.run(...values);
    }
  }

  // Ticket Methods
  createTicket(guildId, channelId, userId, subject) {
    const stmt = this.db.prepare('INSERT INTO tickets (guild_id, channel_id, user_id, subject) VALUES (?, ?, ?, ?)');
    return stmt.run(guildId, channelId, userId, subject);
  }

  getTicket(channelId) {
    const stmt = this.db.prepare('SELECT * FROM tickets WHERE channel_id = ? AND status = "open"');
    return stmt.get(channelId);
  }

  getUserTickets(guildId, userId) {
    const stmt = this.db.prepare('SELECT * FROM tickets WHERE guild_id = ? AND user_id = ? AND status = "open"');
    return stmt.all(guildId, userId);
  }

  closeTicket(channelId, status = 'closed') {
    const stmt = this.db.prepare('UPDATE tickets SET status = ?, closed_at = CURRENT_TIMESTAMP WHERE channel_id = ?');
    return stmt.run(status, channelId);
  }

  assignTicket(channelId, assignedTo) {
    const stmt = this.db.prepare('UPDATE tickets SET assigned_to = ? WHERE channel_id = ?');
    return stmt.run(assignedTo, channelId);
  }

  // Moderation Log Methods
  addModLog(guildId, userId, moderatorId, action, reason, duration = null) {
    const stmt = this.db.prepare('INSERT INTO mod_logs (guild_id, user_id, moderator_id, action, reason, duration) VALUES (?, ?, ?, ?, ?, ?)');
    return stmt.run(guildId, userId, moderatorId, action, reason, duration);
  }

  getModLogs(guildId, userId) {
    const stmt = this.db.prepare('SELECT * FROM mod_logs WHERE guild_id = ? AND user_id = ? ORDER BY created_at DESC');
    return stmt.all(guildId, userId);
  }

  // Warning Methods
  addWarning(guildId, userId, moderatorId, reason) {
    const stmt = this.db.prepare('INSERT INTO warnings (guild_id, user_id, moderator_id, reason) VALUES (?, ?, ?, ?)');
    return stmt.run(guildId, userId, moderatorId, reason);
  }

  getWarnings(guildId, userId) {
    const stmt = this.db.prepare('SELECT * FROM warnings WHERE guild_id = ? AND user_id = ? AND active = 1 ORDER BY created_at DESC');
    return stmt.all(guildId, userId);
  }

  removeWarning(warningId) {
    const stmt = this.db.prepare('UPDATE warnings SET active = 0 WHERE warning_id = ?');
    return stmt.run(warningId);
  }

  // Client Notes Methods
  addClientNote(guildId, clientId, consultantId, note, isPrivate = true) {
    const stmt = this.db.prepare('INSERT INTO client_notes (guild_id, client_id, consultant_id, note, private) VALUES (?, ?, ?, ?, ?)');
    return stmt.run(guildId, clientId, consultantId, note, isPrivate ? 1 : 0);
  }

  getClientNotes(guildId, clientId) {
    const stmt = this.db.prepare('SELECT * FROM client_notes WHERE guild_id = ? AND client_id = ? ORDER BY created_at DESC');
    return stmt.all(guildId, clientId);
  }

  // Consultation Methods
  createConsultation(guildId, userId, topic, description) {
    const stmt = this.db.prepare('INSERT INTO consultations (guild_id, user_id, topic, description) VALUES (?, ?, ?, ?)');
    return stmt.run(guildId, userId, topic, description);
  }

  getConsultations(guildId, status = null) {
    if (status) {
      const stmt = this.db.prepare('SELECT * FROM consultations WHERE guild_id = ? AND status = ? ORDER BY created_at DESC');
      return stmt.all(guildId, status);
    } else {
      const stmt = this.db.prepare('SELECT * FROM consultations WHERE guild_id = ? ORDER BY created_at DESC');
      return stmt.all(guildId);
    }
  }

  updateConsultationStatus(consultationId, status, assignedTo = null, scheduledTime = null) {
    const updates = ['status = ?'];
    const values = [status];
    
    if (assignedTo) {
      updates.push('assigned_to = ?');
      values.push(assignedTo);
    }
    
    if (scheduledTime) {
      updates.push('scheduled_time = ?');
      values.push(scheduledTime);
    }
    
    values.push(consultationId);
    
    const stmt = this.db.prepare(`UPDATE consultations SET ${updates.join(', ')} WHERE consultation_id = ?`);
    return stmt.run(...values);
  }

  close() {
    this.db.close();
  }
}

module.exports = DatabaseManager;
