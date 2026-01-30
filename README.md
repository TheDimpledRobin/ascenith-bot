# Ascenith Business Advisory Discord Bot

Exclusive Discord bot for Ascenith Business Advisory & Consulting with comprehensive moderation, advisory tools, ticketing, and consultant utilities.

## 🚀 Quick Deploy to Digital Ocean

**Ready to deploy?** Follow the comprehensive guide:

1. **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Full deployment instructions for Digital Ocean
2. **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step checklist

**Deployment Methods:**
- ✅ **GitHub → Droplet** (Recommended for updates)
- ✅ **FileZilla SFTP** (Easy GUI upload)
- ✅ **Local Development** (Test first)

**Auto-Start:** Bot automatically starts when server reboots using PM2.

---

## Features

- 🛡️ **Moderation System** - Complete moderation suite with warnings, kicks, bans, and timeouts
- 📊 **Logging System** - Comprehensive server activity logging
- 🎯 **Advisory Commands** - Quick commands for business advisory and consulting
- 🎫 **Support Ticketing** - Advanced ticket system for client support
- 👥 **Tiered User Levels** - Role-based access control (Client, Advisor, Senior Advisor, Admin)
- 🔧 **Consultant Tools** - Specialized tools for advisors and consultants
- ⚙️ **Setup Wizard** - Easy initial configuration for server owners

## Installation

### Local Development

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your bot credentials:
   ```bash
   cp .env.example .env
   ```

4. Start the bot:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Digital Ocean Deployment

See **[SETUP_GUIDE.md](SETUP_GUIDE.md)** for complete deployment instructions including:
- Droplet setup and configuration
- Node.js and PM2 installation
- File upload via GitHub or FileZilla
- Auto-start on server reboot
- Security best practices
- Maintenance and monitoring

## Initial Setup

1. Invite the bot to your server with Administrator permissions
2. Run `/setup` command as server owner to start the setup wizard
3. Follow the prompts to configure roles, channels, and settings

## User Tiers

- **Client** - Basic access to advisory commands
- **Advisor** - Can manage tickets, use consultant tools
- **Senior Advisor** - Advanced tools and moderation capabilities
- **Admin** - Full bot control and configuration

## Command Categories

### Moderation
- `/warn` - Warn a user
- `/kick` - Kick a user
- `/ban` - Ban a user
- `/timeout` - Timeout a user
- `/clear` - Clear messages

### Tickets
- `/ticket create` - Create a support ticket
- `/ticket close` - Close a ticket
- `/ticket add` - Add user to ticket
- `/ticket remove` - Remove user from ticket

### Advisory
- `/advisory-info` - Quick business advisory information
- `/consultation` - Request a consultation
- `/resources` - Access business resources

### Consultant Tools
- `/client-status` - Check client status
- `/schedule` - Schedule management
- `/notes` - Client notes management

## 📚 Documentation

- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Complete setup and deployment guide for Digital Ocean
- **[DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment verification
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick command reference for daily operations
- **[update-bot.sh](update-bot.sh)** - Automated update script for the droplet

## 🔧 Tech Stack

- **Runtime:** Node.js 18.x LTS
- **Framework:** Discord.js v14
- **Database:** SQLite3 (better-sqlite3)
- **Process Manager:** PM2 (for production)
- **Environment:** dotenv

## Support

For support or questions, contact the Ascenith development team.

---
© 2026 Ascenith Business Advisory. All rights reserved.
