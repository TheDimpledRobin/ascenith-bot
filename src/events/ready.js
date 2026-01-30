const chalk = require('chalk');
const { ActivityType } = require('discord.js');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    console.log(chalk.green.bold(`\n✓ ${client.user.tag} is online!`));
    console.log(chalk.blue(`Connected to ${client.guilds.cache.size} guild(s)`));
    console.log(chalk.blue(`Serving ${client.users.cache.size} users`));
    
    // Set bot status
    client.user.setPresence({
      activities: [{
        name: 'Ascenith Business Advisory',
        type: ActivityType.Watching
      }],
      status: 'online'
    });

    console.log(chalk.green('\n✓ Bot is ready to serve!\n'));
  }
};
