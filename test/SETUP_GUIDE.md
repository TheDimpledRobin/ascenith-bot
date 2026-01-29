# Ascenith Business Advisory Bot - Setup Guide

## Prerequisites

- Node.js v16.9.0 or higher
- Discord Bot Token
- Discord Application Client ID
- Administrator access to your Discord server

## Step-by-Step Setup

### 1. Discord Application Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and give it a name
3. Go to the "Bot" section:
   - Click "Add Bot"
   - Enable these Privileged Gateway Intents:
     - ✅ SERVER MEMBERS INTENT
     - ✅ MESSAGE CONTENT INTENT
   - Copy the bot token (you'll need this later)
4. Go to "OAuth2" → "General":
   - Copy the Client ID

### 2. Bot Installation

1. Clone/download this repository
2. Open a terminal in the project directory
3. Install dependencies:
   ```powershell
   npm install
   ```

### 3. Configuration

1. Copy the `.env.example` file to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```

2. Edit the `.env` file and fill in your values:
   ```
   BOT_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_server_id_here  # Optional for faster testing
   OWNER_ID=your_discord_user_id
   ```

   **How to get your Server/Guild ID:**
   - Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
   - Right-click your server icon → Copy ID

   **How to get your User ID:**
   - Right-click your username → Copy ID

### 4. Invite Bot to Server

1. Generate an invite link:
   - Go to Discord Developer Portal → Your App → OAuth2 → URL Generator
   - Select scopes: `bot` and `applications.commands`
   - Select bot permissions: `Administrator` (recommended for full functionality)
   - Copy the generated URL and open it in your browser
   - Select your server and authorize

### 5. Deploy Commands

Before starting the bot, register the slash commands:

```powershell
node src/deploy-commands.js
```

You should see output confirming all commands were registered.

### 6. Start the Bot

```powershell
npm start
```

Or for development with auto-reload:

```powershell
npm run dev
```

### 7. Run Setup Wizard

1. In your Discord server, run the `/setup` command (you must be the server owner)
2. The bot will automatically create:
   - 4 role tiers (Client, Advisor, Senior Advisor, Advisory Admin)
   - Organized channel categories
   - Moderation log channels
   - Ticket system channels
   - Welcome and info channels

### 8. Configure Permissions

After setup, assign roles to your team members:
- **Client** - Regular members/clients
- **Advisor** - Can manage tickets, view client info, use moderation tools
- **Senior Advisor** - Advanced moderation (kick, ban)
- **Advisory Admin** - Full bot control

## Bot Features

### For Clients
- `/advisory-info` - Learn about services
- `/resources` - Access business resources
- `/consultation` - Request a consultation
- `/ticket create` - Create support ticket

### For Advisors
- All client commands, plus:
- `/client-status` - View client information
- `/notes add/view` - Manage client notes
- `/consultations list/assign` - Manage consultations
- `/warn`, `/timeout`, `/clear` - Moderation tools

### For Senior Advisors
- All advisor commands, plus:
- `/kick`, `/ban` - Advanced moderation

### For Admins
- Full access to all commands
- Bot configuration and management

## Troubleshooting

### Bot doesn't respond to commands
- Check that slash commands are deployed: run `node src/deploy-commands.js`
- Verify bot has proper permissions in the server
- Check bot is online (green status)

### Setup command fails
- Ensure you are the server owner
- Bot needs Administrator permission to create roles/channels
- Check bot role is higher than roles it's trying to create

### Database errors
- Ensure the `data` folder exists
- Check file permissions
- Delete `data/ascenith.db` to start fresh (will lose all data)

### Commands not showing up
- Wait a few minutes (global commands can take up to 1 hour)
- Use GUILD_ID in .env for instant testing
- Redeploy commands with `node src/deploy-commands.js`

## Support

For issues or questions about the bot:
1. Check this documentation
2. Review error messages in the console
3. Contact the development team

## Digital Ocean Droplet Deployment

### Droplet Prerequisites

**Recommended Droplet Specifications:**
- **OS:** Ubuntu 22.04 LTS (x64)
- **Plan:** Basic ($6/month minimum)
  - 1 GB RAM / 1 vCPU
  - 25 GB SSD
- **Pre-installed Software:** None required (we'll install manually)
- **Datacenter:** Choose closest to your target audience
- **Additional Options:**
  - ✅ Enable IPv6
  - ✅ Enable Monitoring (recommended)
  - ❌ Docker pre-installed (not needed - we'll use Node.js directly)

**Why not Docker?**
For this Discord bot, Docker adds unnecessary complexity. A direct Node.js installation is simpler, uses fewer resources, and is easier to manage for this use case.

### Step-by-Step Droplet Setup

#### 1. Create Your Droplet

1. Log in to [Digital Ocean](https://cloud.digitalocean.com/)
2. Click "Create" → "Droplets"
3. Choose Ubuntu 22.04 LTS
4. Select Basic plan ($6/month or higher)
5. Choose a datacenter region
6. Authentication: Use SSH keys (recommended) or password
7. Click "Create Droplet"

#### 2. Initial Server Setup

Connect to your droplet via SSH:

```bash
ssh root@your_droplet_ip
```

**Update system packages:**

```bash
apt update && apt upgrade -y
```

**Create a non-root user (recommended for security):**

```bash
adduser ascenith
usermod -aG sudo ascenith
```

**Set up firewall:**

```bash
ufw allow OpenSSH
ufw enable
```

#### 3. Install Node.js

**Install Node.js 18.x (LTS):**

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs
```

**Verify installation:**

```bash
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

**Install build tools (required for some npm packages):**

```bash
apt install -y build-essential
```

#### 4. Install PM2 Process Manager

PM2 keeps your bot running and restarts it automatically if it crashes:

```bash
npm install -g pm2
```

#### 5. Deploy Bot Files

**Option A: Using Git (Recommended)**

```bash
# Install git if not already installed
apt install -y git

# Switch to your user account
su - ascenith

# Clone your repository
git clone https://github.com/yourusername/ascenith-bot.git
cd ascenith-bot

# Install dependencies
npm install
```

**Option B: Using SCP/SFTP**

From your local machine:

```bash
# Zip your project
tar -czf ascenith-bot.tar.gz /path/to/your/project

# Upload to droplet
scp ascenith-bot.tar.gz ascenith@your_droplet_ip:~/

# On the droplet, extract
ssh ascenith@your_droplet_ip
tar -xzf ascenith-bot.tar.gz
cd ascenith-bot
npm install
```

#### 6. Configure Environment

Create your `.env` file on the droplet:

```bash
nano .env
```

Add your configuration:

```env
BOT_TOKEN=your_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
OWNER_ID=your_discord_user_id
DB_PATH=./data/ascenith.db
```

Save with `CTRL+X`, then `Y`, then `Enter`.

#### 7. Deploy Slash Commands

```bash
node src/deploy-commands.js
```

#### 8. Start Bot with PM2

**Start the bot:**

```bash
pm2 start src/index.js --name ascenith-bot
```

**Configure PM2 to start on system reboot:**

```bash
pm2 startup
# Copy and run the command it outputs
pm2 save
```

**Useful PM2 Commands:**

```bash
pm2 status                # Check bot status
pm2 logs ascenith-bot     # View logs
pm2 restart ascenith-bot  # Restart bot
pm2 stop ascenith-bot     # Stop bot
pm2 monit                 # Monitor resources
```

#### 9. Set Up Automatic Updates (Optional)

**Create update script:**

```bash
nano ~/update-bot.sh
```

**Add this content:**

```bash
#!/bin/bash
cd ~/ascenith-bot
git pull
npm install
pm2 restart ascenith-bot
echo "Bot updated successfully!"
```

**Make executable:**

```bash
chmod +x ~/update-bot.sh
```

**To update the bot, simply run:**

```bash
./update-bot.sh
```

### Security Best Practices

1. **Never commit `.env` file to Git**
   - Add to `.gitignore` (already configured)

2. **Use SSH keys instead of passwords**

3. **Keep system updated:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **Set up fail2ban to prevent brute force attacks:**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

5. **Limit SSH access:**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   # Set: PasswordAuthentication no (if using SSH keys)
   sudo systemctl restart sshd
   ```

### Monitoring and Maintenance

**Check bot status:**
```bash
pm2 status
```

**View real-time logs:**
```bash
pm2 logs ascenith-bot --lines 50
```

**Check resource usage:**
```bash
pm2 monit
htop  # Install with: sudo apt install htop
```

**Database backup (recommended weekly):**
```bash
# Create backup
cp ~/ascenith-bot/data/ascenith.db ~/backups/ascenith-$(date +%Y%m%d).db

# Or set up automatic backups with cron
crontab -e
# Add: 0 2 * * 0 cp ~/ascenith-bot/data/ascenith.db ~/backups/ascenith-$(date +\%Y\%m\%d).db
```

### Troubleshooting Droplet Issues

**Bot won't start:**
```bash
pm2 logs ascenith-bot  # Check error logs
node src/index.js      # Run directly to see errors
```

**Out of memory:**
- Upgrade to larger droplet
- Check for memory leaks: `pm2 monit`

**Connection issues:**
- Verify firewall allows outbound HTTPS: `ufw status`
- Check bot token is correct in `.env`

**Database locked errors:**
- Ensure only one instance is running: `pm2 status`
- Check file permissions: `ls -la data/`

### Scaling Considerations

**For multiple guilds or high traffic:**
- Upgrade to 2GB+ RAM droplet
- Consider implementing Redis for caching
- Use PostgreSQL instead of SQLite for better concurrency
- Set up load monitoring alerts

---
© 2026 Ascenith Business Advisory
