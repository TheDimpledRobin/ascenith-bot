const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to warn')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the warning')
        .setRequired(true)),
  requiredTier: UserTiers.ADVISOR,
  
  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason');
    const member = await interaction.guild.members.fetch(target.id);

    if (!member) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'Could not find that user.')],
        ephemeral: true
      });
    }

    // Can't warn bots
    if (target.bot) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'You cannot warn bots.')],
        ephemeral: true
      });
    }

    // Add warning to database
    client.db.addWarning(interaction.guildId, target.id, interaction.user.id, reason);
    client.db.addModLog(interaction.guildId, target.id, interaction.user.id, 'warn', reason);

    // Get total warnings
    const warnings = client.db.getWarnings(interaction.guildId, target.id);
    const warningCount = warnings.length;

    // Send DM to user
    try {
      const dmEmbed = new EmbedBuilder()
        .setTitle('⚠️ Warning')
        .setDescription(`You have been warned in **${interaction.guild.name}**`)
        .addFields(
          { name: 'Reason', value: reason },
          { name: 'Total Warnings', value: `${warningCount}` },
          { name: 'Moderator', value: interaction.user.tag }
        )
        .setColor(0xF39C12)
        .setTimestamp();

      await target.send({ embeds: [dmEmbed] });
    } catch (error) {
      console.log(`Could not send DM to ${target.tag}`);
    }

    // Log to mod channel
    const guildConfig = client.db.getGuildConfig(interaction.guildId);
    if (guildConfig.mod_log_channel) {
      const logChannel = interaction.guild.channels.cache.get(guildConfig.mod_log_channel);
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setTitle('⚠️ User Warned')
          .addFields(
            { name: 'User', value: `${target.tag} (${target.id})`, inline: true },
            { name: 'Moderator', value: interaction.user.tag, inline: true },
            { name: 'Total Warnings', value: `${warningCount}`, inline: true },
            { name: 'Reason', value: reason }
          )
          .setColor(0xF39C12)
          .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });
      }
    }

    // Reply to interaction
    interaction.reply({
      embeds: [successEmbed('Warning Issued', `${target.tag} has been warned.\n**Reason:** ${reason}\n**Total Warnings:** ${warningCount}`)],
      ephemeral: true
    });
  }
};
