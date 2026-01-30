# 🚀 Quick Reference - Ascenith Bot

## Essential Information

**Droplet IP:** `_________________`  
**SSH User:** `ascenith`  
**Bot Directory:** `/home/ascenith/ascenith-bot`  
**GitHub Repo:** https://github.com/TheDimpledRobin/ascenith-bot

---

## 📥 Connect to Server

```bash
ssh ascenith@your_droplet_ip
```

---

## 🔧 Common Commands

### Check Bot Status
```bash
pm2 status
```

### View Logs (Last 50 lines)
```bash
pm2 logs ascenith-bot --lines 50
```

### Restart Bot
```bash
pm2 restart ascenith-bot
```

### Stop Bot
```bash
pm2 stop ascenith-bot
```

### Start Bot (if stopped)
```bash
pm2 start ascenith-bot
```

### Real-time Monitoring
```bash
pm2 monit
```

---

## 🔄 Update Bot from GitHub

```bash
cd ~/ascenith-bot
git pull
npm install
pm2 restart ascenith-bot
```

**Or use the update script:**
```bash
./update-bot.sh
```

---

## 📁 FileZilla Connection

**Protocol:** SFTP  
**Host:** Your droplet IP  
**Port:** 22  
**User:** ascenith  
**Password/Key:** Your SSH credentials  

**After uploading files:**
```bash
ssh ascenith@your_droplet_ip
pm2 restart ascenith-bot
```

---

## 🔍 Troubleshooting

### Bot Offline in Discord
```bash
pm2 logs ascenith-bot --lines 100
# Look for error messages
pm2 restart ascenith-bot
```

### Check Environment Variables
```bash
cat ~/ascenith-bot/.env
# Verify BOT_TOKEN and CLIENT_ID are correct
```

### Redeploy Commands
```bash
cd ~/ascenith-bot
node src/deploy-commands.js
pm2 restart ascenith-bot
```

### Out of Memory
```bash
pm2 monit  # Check memory usage
# If consistently high, upgrade droplet size
```

### Database Issues
```bash
# Check database exists
ls -lh ~/ascenith-bot/data/

# Reset database (⚠️ DELETES ALL DATA)
rm ~/ascenith-bot/data/ascenith.db
pm2 restart ascenith-bot
```

---

## 🔐 Update Environment Variables

```bash
nano ~/ascenith-bot/.env
# Make changes
# CTRL+X, then Y, then Enter to save

pm2 restart ascenith-bot
```

---

## 💾 Backup Database

```bash
# Create backup folder
mkdir -p ~/backups

# Manual backup
cp ~/ascenith-bot/data/ascenith.db ~/backups/ascenith-$(date +%Y%m%d).db

# Download to local machine (from local terminal)
scp ascenith@your_droplet_ip:~/backups/ascenith-*.db ./backups/
```

---

## 🛠️ System Maintenance

### Update System Packages
```bash
sudo apt update && sudo apt upgrade -y
sudo reboot  # If kernel updated
```

### Check Disk Space
```bash
df -h
```

### Check Memory Usage
```bash
free -h
```

### Check Active Processes
```bash
htop  # Press Q to quit
```

---

## 🔄 Full Reinstall (If Needed)

```bash
# Stop and remove from PM2
pm2 delete ascenith-bot

# Backup database
cp ~/ascenith-bot/data/ascenith.db ~/ascenith.db.backup

# Remove old installation
rm -rf ~/ascenith-bot

# Clone fresh copy
git clone https://github.com/TheDimpledRobin/ascenith-bot.git
cd ascenith-bot

# Restore database
cp ~/ascenith.db.backup data/ascenith.db

# Create .env file
nano .env
# Add all environment variables

# Install and start
npm install
node src/deploy-commands.js
pm2 start src/index.js --name ascenith-bot
pm2 save
```

---

## 📞 Emergency Stop

```bash
# Stop bot immediately
pm2 stop ascenith-bot

# Remove from PM2 completely
pm2 delete ascenith-bot

# Kill all node processes (⚠️ NUCLEAR OPTION)
pkill node
```

---

## 📊 Health Check Routine

**Daily:**
1. `pm2 status` - Verify bot is online
2. Check Discord - Bot has green status

**Weekly:**
1. `pm2 logs ascenith-bot --lines 100` - Check for errors
2. `df -h` - Verify disk space
3. Backup database

**Monthly:**
1. `sudo apt update && sudo apt upgrade -y`
2. `cd ~/ascenith-bot && npm update`
3. `pm2 restart ascenith-bot`

---

## 🌐 Useful URLs

- **Digital Ocean Dashboard:** https://cloud.digitalocean.com/
- **Discord Developer Portal:** https://discord.com/developers/applications
- **GitHub Repository:** https://github.com/TheDimpledRobin/ascenith-bot
- **FileZilla Download:** https://filezilla-project.org/

---

## 📝 Notes

- PM2 auto-starts bot on server reboot
- Logs rotate automatically with PM2
- Always backup before major changes
- Test locally before deploying to production
- Keep `.env` secure and never commit to Git

---

**Need detailed help?** See [SETUP_GUIDE.md](SETUP_GUIDE.md)  
**First time setup?** See [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
