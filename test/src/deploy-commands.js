const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

// Load all command files
for (const folder of commandFolders) {
  const folderPath = path.join(commandsPath, folder);
  if (!fs.statSync(folderPath).isDirectory()) continue;

  const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));
  
  for (const file of commandFiles) {
    const filePath = path.join(folderPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
      console.log(`✓ Loaded: ${command.data.name}`);
    }
  }
}

// Register commands
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  try {
    console.log(`\nStarted refreshing ${commands.length} application (/) commands.`);

    // Register commands globally or for a specific guild
    if (process.env.GUILD_ID) {
      // Guild-specific (faster for testing)
      const data = await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands },
      );
      console.log(`Successfully registered ${data.length} guild commands.`);
    } else {
      // Global (takes up to 1 hour to propagate)
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
      );
      console.log(`Successfully registered ${data.length} global commands.`);
    }

    console.log('✓ Commands registered successfully!\n');
  } catch (error) {
    console.error('Error registering commands:', error);
  }
})();
