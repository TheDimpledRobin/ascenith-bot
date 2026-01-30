# Digital Ocean Deployment Checklist

## Pre-Deployment (On Local Machine)

### 1. Discord Bot Setup
- [ ] Created Discord Application at https://discord.com/developers/applications
- [ ] Enabled SERVER MEMBERS INTENT
- [ ] Enabled MESSAGE CONTENT INTENT
- [ ] Copied Bot Token
- [ ] Copied Client ID
- [ ] Bot invited to Discord server with Administrator permissions

### 2. Code Preparation
- [ ] All files tested locally
- [ ] `.env` file configured (DO NOT commit this)
- [ ] `.gitignore` includes `node_modules/`, `.env`, `data/*.db`
- [ ] No sensitive data in code files

### 3. GitHub Setup (If Using GitHub)
- [ ] Created GitHub repository
- [ ] Generated Personal Access Token with `repo` scope
- [ ] Code pushed to GitHub: `git push -u origin main`

---

## Droplet Setup (On Digital Ocean)

### 1. Create Droplet
- [ ] Logged into Digital Ocean
- [ ] Created Ubuntu 22.04 LTS droplet ($6/month minimum)
- [ ] Noted droplet IP address: `___________________`
- [ ] SSH key added or root password set

### 2. Initial Server Configuration
- [ ] Connected via SSH: `ssh root@your_droplet_ip`
- [ ] Updated packages: `apt update && apt upgrade -y`
- [ ] Created non-root user: `adduser ascenith`
- [ ] Added user to sudo: `usermod -aG sudo ascenith`
- [ ] Configured firewall: `ufw allow OpenSSH && ufw enable`

### 3. Install Software
- [ ] Installed Node.js 18.x: `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -`
- [ ] Installed Node.js: `apt install -y nodejs`
- [ ] Verified Node: `node --version` (should show v18.x.x)
- [ ] Installed build tools: `apt install -y build-essential`
- [ ] Installed PM2: `npm install -g pm2`
- [ ] Installed Git (if using GitHub): `apt install -y git`

---

## File Upload

### Option A: GitHub (Recommended)
- [ ] Generated GitHub Personal Access Token
- [ ] Switched to user: `su - ascenith`
- [ ] Cloned repository: `git clone https://github.com/TheDimpledRobin/ascenith-bot.git`
- [ ] Entered credentials (username + token as password)
- [ ] Navigated to folder: `cd ascenith-bot`

### Option B: FileZilla
- [ ] Installed FileZilla Client
- [ ] Connected to droplet (SFTP, port 22)
- [ ] Created `ascenith-bot` folder on server
- [ ] Uploaded all files EXCEPT `node_modules/` and `.env`

---

## Bot Configuration

### 1. Install Dependencies
- [ ] Switched to user: `su - ascenith`
- [ ] Navigated to bot folder: `cd ~/ascenith-bot`
- [ ] Installed packages: `npm install`
- [ ] Verified installation (no errors)

### 2. Configure Environment
- [ ] Created `.env` file: `nano .env`
- [ ] Added `BOT_TOKEN=your_actual_token`
- [ ] Added `CLIENT_ID=your_actual_client_id`
- [ ] Added `GUILD_ID=your_guild_id` (optional)
- [ ] Added `OWNER_ID=your_discord_user_id`
- [ ] Saved file (CTRL+X, Y, Enter)

### 3. Deploy Commands
- [ ] Ran: `node src/deploy-commands.js`
- [ ] Confirmed "Successfully registered application commands"

---

## Start Bot with Auto-Restart

### 1. PM2 Configuration
- [ ] Started bot: `pm2 start src/index.js --name ascenith-bot`
- [ ] Verified status: `pm2 status` (should show "online")
- [ ] Set up startup: `pm2 startup` (copy and run the command it outputs)
- [ ] Saved PM2 state: `pm2 save`

### 2. Test Auto-Start
- [ ] Rebooted server: `sudo reboot`
- [ ] Reconnected after reboot: `ssh ascenith@your_droplet_ip`
- [ ] Checked bot status: `pm2 status` (should show "online")
- [ ] Verified bot is online in Discord

---

## Post-Deployment

### 1. Bot Verification
- [ ] Bot shows online (green) in Discord
- [ ] Tested `/ping` command
- [ ] Ran `/setup` in Discord server (as server owner)
- [ ] Verified roles and channels created
- [ ] Tested a few commands

### 2. Security Hardening
- [ ] Installed fail2ban: `sudo apt install -y fail2ban`
- [ ] Configured SSH: `sudo nano /etc/ssh/sshd_config`
  - [ ] Set `PermitRootLogin no`
  - [ ] Set `PasswordAuthentication no` (if using SSH keys)
- [ ] Restarted SSH: `sudo systemctl restart sshd`

### 3. Monitoring Setup
- [ ] Checked logs: `pm2 logs ascenith-bot --lines 50`
- [ ] Tested restart: `pm2 restart ascenith-bot`
- [ ] Set up log rotation (optional): `pm2 install pm2-logrotate`

---

## Maintenance Schedule

### Daily
- [ ] Check bot status: `pm2 status`
- [ ] Monitor Discord for issues

### Weekly
- [ ] Review logs: `pm2 logs ascenith-bot --lines 100`
- [ ] Backup database: `cp ~/ascenith-bot/data/ascenith.db ~/backups/ascenith-$(date +%Y%m%d).db`

### Monthly
- [ ] Update system: `sudo apt update && sudo apt upgrade -y`
- [ ] Update npm packages: `cd ~/ascenith-bot && npm update`
- [ ] Restart bot: `pm2 restart ascenith-bot`
- [ ] Review disk space: `df -h`

---

## Common Issues & Solutions

### Bot Not Starting
```bash
# Check logs for errors
pm2 logs ascenith-bot

# Try running directly
cd ~/ascenith-bot
node src/index.js
# If error appears, fix and then restart PM2
pm2 restart ascenith-bot
```

### GitHub Authentication Failed
```bash
# Ensure using Personal Access Token, not password
# Re-enter credentials:
git config --global --unset credential.helper
git pull
# Enter username and token when prompted
```

### Bot Online But Not Responding
- [ ] Check `.env` file has correct token
- [ ] Verify bot has Administrator permission in Discord
- [ ] Redeploy commands: `node src/deploy-commands.js`
- [ ] Restart bot: `pm2 restart ascenith-bot`

---

## Update Procedure

### Updating Bot Code

**If using GitHub:**
```bash
cd ~/ascenith-bot
git pull
npm install
pm2 restart ascenith-bot
```

**If using FileZilla:**
1. Upload changed files via FileZilla
2. SSH: `pm2 restart ascenith-bot`

---

## Contact Information

- **Droplet IP:** `___________________`
- **SSH User:** `ascenith`
- **Bot Directory:** `/home/ascenith/ascenith-bot`
- **GitHub Repo:** https://github.com/TheDimpledRobin/ascenith-bot
- **Discord Bot ID:** `___________________`

---

## Emergency Commands

**Stop bot:**
```bash
pm2 stop ascenith-bot
```

**Remove from PM2:**
```bash
pm2 delete ascenith-bot
```

**Reinstall dependencies:**
```bash
cd ~/ascenith-bot
rm -rf node_modules package-lock.json
npm install
pm2 restart ascenith-bot
```

**Reset database (WARNING: Deletes all data):**
```bash
cd ~/ascenith-bot
rm data/ascenith.db
pm2 restart ascenith-bot
```

---

✅ **Deployment Complete!**

Your Discord bot is now running 24/7 on Digital Ocean and will automatically restart if the server reboots or if it crashes.
