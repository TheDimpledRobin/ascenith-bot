# Ascenith Business Advisory Bot - Setup Guide

## 🚀 Quick Start - Digital Ocean Deployment

**For deploying directly to Digital Ocean Droplet, skip to [Digital Ocean Droplet Deployment](#digital-ocean-droplet-deployment) section.**

**Deployment Options:**
1. **GitHub → Droplet** (Recommended) - Push to GitHub, then clone on server
2. **FileZilla → Droplet** - Direct upload via SFTP with GUI
3. **Local Development** - Test on your computer first

---

## Prerequisites

### For Local Development:
- Node.js v16.9.0 or higher (v18.x LTS recommended)
- Discord Bot Token
- Discord Application Client ID
- Administrator access to your Discord server

### For Digital Ocean Deployment:
- Digital Ocean account
- Discord Bot Token and Client ID
- SSH client (PuTTY, Windows Terminal, or built-in terminal)
- *Optional:* FileZilla for GUI file uploads
- *Optional:* GitHub account for version control

---

## 📋 Table of Contents

1. [Discord Application Setup](#1-discord-application-setup)
2. [Local Bot Installation (Optional)](#2-bot-installation)
3. [Digital Ocean Droplet Deployment](#digital-ocean-droplet-deployment)
   - [Droplet Prerequisites](#droplet-prerequisites)
   - [Initial Server Setup](#2-initial-server-setup)
   - [File Upload Methods](#5-deploy-bot-files)
     - [GitHub (Recommended)](#option-a-using-git-with-personal-access-token-recommended)
     - [FileZilla GUI](#option-c-using-filezilla-sftp---manual-upload)
   - [Auto-Start Configuration](#8-start-bot-with-pm2)
4. [Bot Configuration](#3-configuration)
5. [Troubleshooting](#troubleshooting)
6. [Maintenance and Updates](#monitoring-and-maintenance)

---

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

### Ticket command errors ("no such column" error)
This happens when the database exists with an old schema. **Solutions:**

**Option 1: Delete and recreate database (loses all data)**
```bash
# On droplet
rm ~/ascenith-bot/data/ascenith.db
pm2 restart ascenith-bot

# On local machine (PowerShell)
Remove-Item data\ascenith.db
npm start
```

**Option 2: Manual migration (preserves data)**
```bash
# On droplet
cd ~/ascenith-bot
sqlite3 data/ascenith.db "ALTER TABLE tickets ADD COLUMN status TEXT DEFAULT 'open';"
pm2 restart ascenith-bot

# On local machine (PowerShell) - requires sqlite3
# Install sqlite3 first or use Option 1
```

After fixing, run `/setup` command in Discord again.

## Support

For issues or questions about the bot:
1. Check this documentation
2. Review error messages in the console
3. Contact the development team

## Pushing Code to GitHub Repository

### Initial Repository Setup (First Time Only)

**If the repository doesn't exist yet on GitHub:**

1. Go to [GitHub.com](https://github.com) and log in
2. Click the "+" icon → "New repository"
3. Repository name: `ascenith-bot`
4. Choose Private or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

**Push your local code to the repository:**

```powershell
# Navigate to your project directory
cd "c:\Users\beaus\Desktop\test"

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit - Ascenith Advisory Bot"

# Add the remote repository
git remote add origin https://github.com/TheDimpledRobin/ascenith-bot.git

# Push to GitHub
git push -u origin main
```

**When prompted for credentials:**
- **Username:** TheDimpledRobin
- **Password:** [Your Personal Access Token - NOT your GitHub password]

### Creating a Personal Access Token

If you get a 403 error, you need a token with proper permissions:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Token name: `Ascenith Bot Push Access`
4. Expiration: 90 days (or longer)
5. **Required scopes:**
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (if using GitHub Actions later)
6. Click "Generate token"
7. **Copy the token immediately** - you won't see it again!

### Common Push Errors and Solutions

**Error 403: Forbidden**
```
remote: Permission to TheDimpledRobin/ascenith-bot.git denied
fatal: unable to access 'https://github.com/...': The requested URL returned error: 403
```

**Solutions:**
1. **Token doesn't have `repo` permission** - Create a new token with `repo` scope
2. **Using GitHub password instead of token** - Use your Personal Access Token as password
3. **Repository is private and you're not the owner** - Ask the owner to add you as a collaborator
4. **Token expired** - Generate a new token

**Fix credential issues:**
```powershell
# Clear stored credentials
git credential-manager delete https://github.com

# Try push again (will prompt for credentials)
git push -u origin main
```

**Error: Repository not found**
```
fatal: repository 'https://github.com/TheDimpledRobin/ascenith-bot.git/' not found
```

**Solutions:**
1. Verify the repository exists on GitHub
2. Check the repository name spelling
3. Ensure you have access to the repository
4. If repository is private, verify you're using correct credentials

**Error: Failed to push some refs**
```
error: failed to push some refs to 'https://github.com/...'
```

**Solutions:**
```powershell
# Pull latest changes first
git pull origin main --rebase

# Then push
git push -u origin main
```

**Branch naming (main vs master):**
```powershell
# Check your current branch name
git branch

# If on 'master' but GitHub expects 'main':
git branch -M main

# Then push
git push -u origin main
```

### Updating Code After Changes

After making changes to your code:

```powershell
# Check what files changed
git status

# Add changed files
git add .

# Commit with a message
git commit -m "Description of changes"

# Push to GitHub
git push
```

### Using Git Credential Manager (Windows)

Windows Git comes with Credential Manager that can store your token securely:

```powershell
# Configure to use Windows Credential Manager
git config --global credential.helper manager

# Next git operation will prompt once, then remember credentials
```

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

**Important: GitHub Authentication**

GitHub no longer accepts passwords for Git operations. You must use either a Personal Access Token (PAT) or SSH keys.

**Option A: Using Git with Personal Access Token (Recommended)**

**First, create a Personal Access Token on GitHub:**
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name (e.g., "Ascenith Bot Deployment")
4. Set expiration (recommend 90 days or longer)
5. Select scopes: ✅ `repo` (full control of private repositories)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

**Then deploy on your droplet:**

```bash
# Install git if not already installed
apt install -y git

# Switch to your user account
su - ascenith

# Clone your repository (it will ask for credentials)
git clone https://github.com/TheDimpledRobin/ascenith-bot.git
# Username: your_github_username
# Password: paste_your_personal_access_token (NOT your GitHub password!)

cd ascenith-bot

# Install dependencies
npm install
```

**To avoid entering credentials repeatedly, configure Git credential storage:**

```bash
# Store credentials in memory for 1 hour
git config --global credential.helper 'cache --timeout=3600'

# OR store permanently (less secure but convenient)
git config --global credential.helper store
```

**Option B: Using SSH Keys (Most Secure)**

```bash
# Generate SSH key on droplet
ssh-keygen -t ed25519 -C "your_email@example.com"
# Press Enter for default location
# Press Enter twice for no passphrase (or set one for extra security)

# Display your public key
cat ~/.ssh/id_ed25519.pub
# Copy the entire output

# Add to GitHub:
# Go to GitHub.com → Settings → SSH and GPG keys → New SSH key
# Paste your public key and save

# Test connection
ssh -T git@github.com
# Should see: "Hi username! You've successfully authenticated..."

# Clone using SSH URL
git clone git@github.com:TheDimpledRobin/ascenith-bot.git
cd ascenith-bot
npm install
```

**Option C: Using FileZilla (SFTP) - Manual Upload**

FileZilla is a user-friendly FTP/SFTP client with a graphical interface, perfect for those who prefer not to use command-line tools.

**Install FileZilla:**
- Download from [FileZilla-project.org](https://filezilla-project.org/)
- Install the **FileZilla Client** (not Server)

**Connect to Your Droplet:**

1. Open FileZilla
2. Go to File → Site Manager → New Site
3. **Connection Settings:**
   - **Protocol:** SFTP - SSH File Transfer Protocol
   - **Host:** your_droplet_ip (e.g., 192.168.1.100)
   - **Port:** 22
   - **Logon Type:** Key file (if using SSH key) or Normal (if using password)
   - **User:** ascenith (or root)
   - **Key file:** Browse to your private SSH key (e.g., `C:\Users\YourName\.ssh\id_rsa`) if using key authentication
   - **Password:** Your password (if using password authentication)

4. Click "Connect"

**Upload Bot Files:**

1. **Left Panel:** Navigate to your local project folder
   - Example: `C:\Users\beaus\Desktop\test`

2. **Right Panel:** Navigate to the home directory on the droplet
   - Should show `/home/ascenith/` or `/root/`

3. **Important - Create folder on server:**
   - Right-click in the right panel → Create directory → Name it `ascenith-bot`
   - Navigate into this folder

4. **Upload files:**
   - Select ALL files/folders in left panel (EXCEPT `node_modules` folder)
   - Right-click → Upload
   - Wait for transfer to complete

5. **Files to upload:**
   - ✅ `src/` folder
   - ✅ `package.json`
   - ✅ `package-lock.json`
   - ✅ `README.md`
   - ✅ `SETUP_GUIDE.md`
   - ❌ `node_modules/` (DO NOT upload - too large and unnecessary)
   - ❌ `.env` (DO NOT upload - contains secrets)
   - ❌ `data/` (optional - only if you want to transfer existing database)

**After Upload via FileZilla:**

Connect via SSH to complete setup:

```bash
ssh ascenith@your_droplet_ip
cd ascenith-bot

# Install dependencies
npm install

# Create .env file
nano .env
# Paste your environment variables, save with CTRL+X, Y, Enter

# Deploy commands
node src/deploy-commands.js

# Start with PM2
pm2 start src/index.js --name ascenith-bot
pm2 save
```

**Updating Bot via FileZilla:**

1. Make changes to your local files
2. Connect to droplet in FileZilla
3. Navigate to `ascenith-bot` folder on server
4. Select changed files from left panel
5. Right-click → Upload (choose "Overwrite" when prompted)
6. SSH into server and restart bot:
   ```bash
   ssh ascenith@your_droplet_ip
   pm2 restart ascenith-bot
   ```

**FileZilla Tips:**

- **Transfer Queue:** Bottom panel shows upload progress
- **Failed Transfers:** Red items in queue - check permissions
- **Edit Remote Files:** Right-click file on server → View/Edit (opens in local editor)
- **Synchronize:** Tools → Directory Comparison (shows differences between local/remote)
- **Bookmarks:** Add frequently accessed folders to Quick Connect bar

**Option D: Using SCP (Command Line Alternative)**

From your local Windows machine (PowerShell):

```powershell
# Zip your project (exclude node_modules)
Compress-Archive -Path "C:\Users\beaus\Desktop\test\src", "C:\Users\beaus\Desktop\test\package.json", "C:\Users\beaus\Desktop\test\README.md" -DestinationPath "ascenith-bot.zip"

# Upload to droplet using SCP (requires SSH client)
scp ascenith-bot.zip ascenith@your_droplet_ip:~/
```

On the droplet:

```bash
# Install unzip if needed
sudo apt install unzip

# Extract
unzip ascenith-bot.zip -d ascenith-bot
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

**Git authentication failed:**
```bash
# If using HTTPS, ensure you're using a Personal Access Token, NOT your GitHub password
# If using SSH, verify your key is added to GitHub:
ssh -T git@github.com

# To update stored credentials:
git config --global --unset credential.helper
git config --global credential.helper store
# Next git operation will prompt for credentials again
```

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

## 🔄 Summary: Bot Auto-Start Setup

Your bot will automatically start when the server boots thanks to PM2 configuration:

**What Makes It Work:**

1. **PM2 Process Manager** - Keeps bot running continuously
   ```bash
   pm2 start src/index.js --name ascenith-bot
   ```

2. **Startup Script** - PM2 registers with system init
   ```bash
   pm2 startup
   pm2 save
   ```

3. **Process Persistence** - Saved configuration at `~/.pm2/`

**Verify Auto-Start:**

```bash
# Reboot server
sudo reboot

# After reboot, reconnect and check
ssh ascenith@your_droplet_ip
pm2 status
# Bot should show 'online' status
```

**What Happens When:**
- ✅ **Server Reboots** → PM2 automatically starts → Bot comes online
- ✅ **Bot Crashes** → PM2 automatically restarts it
- ✅ **Network Issues** → Bot reconnects to Discord automatically
- ✅ **Updates Applied** → `pm2 restart ascenith-bot` to apply changes

**Manual Control:**
```bash
pm2 start ascenith-bot    # Start bot
pm2 stop ascenith-bot     # Stop bot
pm2 restart ascenith-bot  # Restart bot
pm2 delete ascenith-bot   # Remove from PM2 (doesn't delete files)
```

---

## 📊 Deployment Comparison

| Method | Difficulty | Speed | Best For |
|--------|-----------|-------|----------|
| **GitHub → Droplet** | Medium | Fast | Version control, team projects, easy updates |
| **FileZilla SFTP** | Easy | Medium | Beginners, visual interface, one-time deployment |
| **Local Development** | Easy | N/A | Testing before deployment |

**Recommendation:** Use GitHub for initial deployment and updates. Use FileZilla for quick config file edits or manual patches.

---

## 🔐 Critical Security Reminders

1. **Never commit `.env` to Git** - Contains sensitive tokens
2. **Use SSH keys over passwords** - More secure authentication
3. **Keep packages updated** - Run `npm audit fix` regularly
4. **Backup database weekly** - Prevent data loss
5. **Monitor PM2 logs** - Catch issues early
6. **Restrict root SSH** - Use non-root user for operations

---

## 📞 Quick Command Reference

**On Local Machine (Windows):**
```powershell
# Push to GitHub
git add .
git commit -m "Update bot"
git push

# Upload via FileZilla (use GUI)
# Host: your_droplet_ip, Port: 22, Protocol: SFTP
```

**On Digital Ocean Droplet (Ubuntu):**
```bash
# Update bot from GitHub
cd ~/ascenith-bot
git pull
npm install
pm2 restart ascenith-bot

# Check status
pm2 status
pm2 logs ascenith-bot --lines 50

# System maintenance
sudo apt update && sudo apt upgrade -y
```

---

## Support

For issues or questions about the bot:
1. Check this documentation
2. Review error messages: `pm2 logs ascenith-bot`
3. Verify environment variables: `cat ~/ascenith-bot/.env` (on droplet)
4. Test locally before deploying: `npm start` (on local machine)
5. Contact the development team

---
© 2026 Ascenith Business Advisory
