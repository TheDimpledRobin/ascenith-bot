const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed, parseDuration, formatDuration } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to timeout')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('Duration (e.g., 10m, 1h, 1d)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the timeout')
        .setRequired(false)),
  requiredTier: UserTiers.ADVISOR,
  
  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const durationStr = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(target.id);

    if (!member) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'Could not find that user.')],
        ephemeral: true
      });
    }

    // Parse duration
    const duration = parseDuration(durationStr);
    if (!duration || duration > 2419200000) { // Max 28 days
      return interaction.reply({
        embeds: [errorEmbed('Error', 'Invalid duration. Use format like 10m, 1h, 1d (max 28 days).')],
        ephemeral: true
      });
    }

    // Permission checks
    if (!member.moderatable) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'I cannot timeout this user. They may have higher permissions than me.')],
        ephemeral: true
      });
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'You cannot timeout this user as they have equal or higher role hierarchy.')],
        ephemeral: true
      });
    }

    // Timeout the member
    await member.timeout(duration, reason);

    // Log to database
    client.db.addModLog(interaction.guildId, target.id, interaction.user.id, 'timeout', reason, formatDuration(duration));

    // Send DM to user
    try {
      const dmEmbed = new EmbedBuilder()
        .setTitle('⏱️ Timeout')
        .setDescription(`You have been timed out in **${interaction.guild.name}**`)
        .addFields(
          { name: 'Duration', value: formatDuration(duration) },
          { name: 'Reason', value: reason },
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
          .setTitle('⏱️ User Timed Out')
          .addFields(
            { name: 'User', value: `${target.tag} (${target.id})`, inline: true },
            { name: 'Moderator', value: interaction.user.tag, inline: true },
            { name: 'Duration', value: formatDuration(duration), inline: true },
            { name: 'Reason', value: reason }
          )
          .setColor(0xF39C12)
          .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });
      }
    }

    // Reply
    interaction.reply({
      embeds: [successEmbed('User Timed Out', `${target.tag} has been timed out for ${formatDuration(duration)}.\n**Reason:** ${reason}`)],
      ephemeral: true
    });
  }
};
