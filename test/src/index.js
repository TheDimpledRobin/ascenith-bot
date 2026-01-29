require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Database = require('./database/database');

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
});

// Initialize collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Initialize database
client.db = new Database();

// Load command files
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
      console.log(chalk.green(`✓ Loaded command: ${command.data.name}`));
    } else {
      console.log(chalk.yellow(`⚠ Command at ${filePath} is missing required "data" or "execute" property.`));
    }
  }
}

// Load event files
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
  
  console.log(chalk.blue(`✓ Loaded event: ${event.name}`));
}

// Error handling
process.on('unhandledRejection', error => {
  console.error(chalk.red('Unhandled promise rejection:'), error);
});

process.on('uncaughtException', error => {
  console.error(chalk.red('Uncaught exception:'), error);
  process.exit(1);
});

// Login to Discord
client.login(process.env.BOT_TOKEN).catch(error => {
  console.error(chalk.red('Failed to login:'), error);
  process.exit(1);
});
