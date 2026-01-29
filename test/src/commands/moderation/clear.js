const { SlashCommandBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear messages from a channel')
    .addIntegerOption(option =>
      option.setName('amount')
        .setDescription('Number of messages to delete (1-100)')
        .setMinValue(1)
        .setMaxValue(100)
        .setRequired(true))
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Only delete messages from this user')
        .setRequired(false)),
  requiredTier: UserTiers.ADVISOR,
  cooldown: 5,
  
  async execute(interaction, client) {
    const amount = interaction.options.getInteger('amount');
    const targetUser = interaction.options.getUser('user');

    await interaction.deferReply({ ephemeral: true });

    try {
      let messages = await interaction.channel.messages.fetch({ limit: amount });

      // Filter by user if specified
      if (targetUser) {
        messages = messages.filter(msg => msg.author.id === targetUser.id);
      }

      // Discord doesn't allow deleting messages older than 14 days
      messages = messages.filter(msg => Date.now() - msg.createdTimestamp < 1209600000);

      if (messages.size === 0) {
        return interaction.editReply({
          embeds: [errorEmbed('Error', 'No messages found to delete (messages must be less than 14 days old).')]
        });
      }

      // Bulk delete messages
      const deleted = await interaction.channel.bulkDelete(messages, true);

      // Log to mod channel
      const guildConfig = client.db.getGuildConfig(interaction.guildId);
      if (guildConfig.mod_log_channel) {
        const logChannel = interaction.guild.channels.cache.get(guildConfig.mod_log_channel);
        if (logChannel) {
          const logEmbed = {
            title: '🗑️ Messages Cleared',
            fields: [
              { name: 'Channel', value: `${interaction.channel}`, inline: true },
              { name: 'Moderator', value: interaction.user.tag, inline: true },
              { name: 'Amount', value: `${deleted.size}`, inline: true }
            ],
            color: 0x95A5A6,
            timestamp: new Date().toISOString()
          };

          if (targetUser) {
            logEmbed.fields.push({ name: 'Target User', value: targetUser.tag, inline: true });
          }

          logChannel.send({ embeds: [logEmbed] });
        }
      }

      // Reply
      interaction.editReply({
        embeds: [successEmbed('Messages Cleared', `Successfully deleted ${deleted.size} message(s).`)]
      });

    } catch (error) {
      console.error('Clear command error:', error);
      interaction.editReply({
        embeds: [errorEmbed('Error', 'Failed to delete messages.')]
      });
    }
  }
};
