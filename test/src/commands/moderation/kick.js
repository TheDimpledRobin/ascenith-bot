const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)),
  requiredTier: UserTiers.SENIOR_ADVISOR,
  
  async execute(interaction, client) {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const member = await interaction.guild.members.fetch(target.id);

    if (!member) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'Could not find that user.')],
        ephemeral: true
      });
    }

    // Permission checks
    if (!member.kickable) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'I cannot kick this user. They may have higher permissions than me.')],
        ephemeral: true
      });
    }

    if (member.roles.highest.position >= interaction.member.roles.highest.position) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'You cannot kick this user as they have equal or higher role hierarchy.')],
        ephemeral: true
      });
    }

    // Send DM before kicking
    try {
      const dmEmbed = new EmbedBuilder()
        .setTitle('👢 Kicked')
        .setDescription(`You have been kicked from **${interaction.guild.name}**`)
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

    // Kick the member
    await member.kick(reason);

    // Log to database
    client.db.addModLog(interaction.guildId, target.id, interaction.user.id, 'kick', reason);

    // Log to mod channel
    const guildConfig = client.db.getGuildConfig(interaction.guildId);
    if (guildConfig.mod_log_channel) {
      const logChannel = interaction.guild.channels.cache.get(guildConfig.mod_log_channel);
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setTitle('👢 User Kicked')
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
      embeds: [successEmbed('User Kicked', `${target.tag} has been kicked.\n**Reason:** ${reason}`)],
      ephemeral: true
    });
  }
};
