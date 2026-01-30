const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the ban')
        .setRequired(false))
    .addIntegerOption(option =>
      option.setName('delete-days')
        .setDescription('Number of days of messages to delete (0-7)')
        .setMinValue(0)
        .setMaxValue(7)
        .setRequired(false)),
  requiredTier: UserTiers.SENIOR_ADVISOR,
  
  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const deleteDays = interaction.options.getInteger('delete-days') || 0;
    const member = await interaction.guild.members.fetch(target.id).catch(() => null);

    // Permission checks
    if (member) {
      if (!member.bannable) {
        return interaction.reply({
          embeds: [errorEmbed('Error', 'I cannot ban this user. They may have higher permissions than me.')],
          ephemeral: true
        });
      }

      if (member.roles.highest.position >= interaction.member.roles.highest.position) {
        return interaction.reply({
          embeds: [errorEmbed('Error', 'You cannot ban this user as they have equal or higher role hierarchy.')],
          ephemeral: true
        });
      }

      // Send DM before banning
      try {
        const dmEmbed = new EmbedBuilder()
          .setTitle('🔨 Banned')
          .setDescription(`You have been banned from **${interaction.guild.name}**`)
          .addFields(
            { name: 'Reason', value: reason },
            { name: 'Moderator', value: interaction.user.tag }
          )
          .setColor(0xE74C3C)
          .setTimestamp();

        await target.send({ embeds: [dmEmbed] });
      } catch (error) {
        console.log(`Could not send DM to ${target.tag}`);
      }
    }

    // Ban the user
    await interaction.guild.members.ban(target.id, {
      deleteMessageSeconds: deleteDays * 86400,
      reason: reason
    });

    // Log to database
    client.db.addModLog(interaction.guildId, target.id, interaction.user.id, 'ban', reason);

    // Log to mod channel
    const guildConfig = client.db.getGuildConfig(interaction.guildId);
    if (guildConfig.mod_log_channel) {
      const logChannel = interaction.guild.channels.cache.get(guildConfig.mod_log_channel);
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setTitle('🔨 User Banned')
          .addFields(
            { name: 'User', value: `${target.tag} (${target.id})`, inline: true },
            { name: 'Moderator', value: interaction.user.tag, inline: true },
            { name: 'Reason', value: reason }
          )
          .setColor(0xE74C3C)
          .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });
      }
    }

    // Reply
    interaction.reply({
      embeds: [successEmbed('User Banned', `${target.tag} has been banned.\n**Reason:** ${reason}`)],
      ephemeral: true
    });
  }
};
