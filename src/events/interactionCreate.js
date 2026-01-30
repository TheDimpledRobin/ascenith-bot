const { Events } = require('discord.js');
const { errorEmbed } = require('../utils/helpers');
const { getUserTier, hasRequiredTier } = require('../utils/permissions');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }

    // Get guild config
    const guildConfig = client.db.getGuildConfig(interaction.guildId);

    // Check if setup is required (except for setup command)
    if (command.data.name !== 'setup' && (!guildConfig || !guildConfig.setup_completed)) {
      return interaction.reply({
        embeds: [errorEmbed('Setup Required', 'This bot needs to be set up first. Please have the server owner run `/setup`.')],
        ephemeral: true
      });
    }

    // Check user tier permissions
    if (command.requiredTier) {
      const member = interaction.member;
      const userTier = getUserTier(member, guildConfig);

      if (!hasRequiredTier(userTier, command.requiredTier)) {
        return interaction.reply({
          embeds: [errorEmbed('Permission Denied', 'You do not have the required permissions to use this command.')],
          ephemeral: true
        });
      }
    }

    // Cooldown handling
    const { cooldowns } = client;

    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Map());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const cooldownAmount = (command.cooldown ?? 3) * 1000;

    if (timestamps.has(interaction.user.id)) {
      const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return interaction.reply({
          embeds: [errorEmbed('Cooldown', `Please wait ${timeLeft.toFixed(1)} more second(s) before using \`${command.data.name}\` again.`)],
          ephemeral: true
        });
      }
    }

    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    // Execute command
    try {
      await command.execute(interaction, client);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}:`, error);
      
      const errorMessage = {
        embeds: [errorEmbed('Error', 'There was an error executing this command.')],
        ephemeral: true
      };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(errorMessage);
      } else {
        await interaction.reply(errorMessage);
      }
    }
  }
};
