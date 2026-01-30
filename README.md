# Ascenith Business Advisory Discord Bot

Exclusive Discord bot for Ascenith Business Advisory & Consulting with comprehensive moderation, advisory tools, ticketing, and consultant utilities.

## Features

- 🛡️ **Moderation System** - Complete moderation suite with warnings, kicks, bans, and timeouts
- 📊 **Logging System** - Comprehensive server activity logging
- 🎯 **Advisory Commands** - Quick commands for business advisory and consulting
- 🎫 **Support Ticketing** - Advanced ticket system for client support
- 👥 **Tiered User Levels** - Role-based access control (Client, Advisor, Senior Advisor, Admin)
- 🔧 **Consultant Tools** - Specialized tools for advisors and consultants
- ⚙️ **Setup Wizard** - Easy initial configuration for server owners

## Installation

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

## Support

For support or questions, contact the Ascenith development team.

---
© 2026 Ascenith Business Advisory. All rights reserved.
