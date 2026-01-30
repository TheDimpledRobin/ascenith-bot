const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { infoEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('modlogs')
    .setDescription('View moderation logs for a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to check')
        .setRequired(true)),
  requiredTier: UserTiers.ADVISOR,
  
  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    
    // Get mod logs
    const modLogs = client.db.getModLogs(interaction.guildId, target.id);
    const warnings = client.db.getWarnings(interaction.guildId, target.id);

    const embed = new EmbedBuilder()
      .setTitle(`📋 Moderation Logs - ${target.tag}`)
      .setThumbnail(target.displayAvatarURL())
      .setColor(0x3498DB)
      .addFields(
        { name: 'Active Warnings', value: `${warnings.length}`, inline: true },
        { name: 'Total Actions', value: `${modLogs.length}`, inline: true }
      )
      .setTimestamp();

    if (modLogs.length > 0) {
      const recentLogs = modLogs.slice(0, 5).map(log => {
        const date = new Date(log.created_at).toLocaleDateString();
        return `**${log.action.toUpperCase()}** - ${log.reason || 'No reason'} (${date})`;
      }).join('\n');

      embed.addFields({
        name: 'Recent Actions',
        value: recentLogs || 'None'
      });
    } else {
      embed.setDescription('This user has a clean record.');
    }

    interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
