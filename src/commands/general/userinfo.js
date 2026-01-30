const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Get information about a user')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to get info about')
        .setRequired(false)),
  
  async execute(interaction, client) {
    const target = interaction.options.getUser('user') || interaction.user;
    const member = await interaction.guild.members.fetch(target.id);

    const roles = member.roles.cache
      .filter(role => role.id !== interaction.guild.id)
      .sort((a, b) => b.position - a.position)
      .map(role => role.toString())
      .slice(0, 10);

    const embed = new EmbedBuilder()
      .setTitle(`👤 ${target.tag}`)
      .setThumbnail(target.displayAvatarURL({ dynamic: true, size: 256 }))
      .setColor(member.displayHexColor || 0x3498DB)
      .addFields(
        { name: '🆔 User ID', value: target.id, inline: true },
        { name: '📅 Account Created', value: `<t:${Math.floor(target.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '📥 Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: '🎭 Roles', value: roles.join(', ') || 'None', inline: false }
      )
      .setTimestamp();

    if (member.premiumSince) {
      embed.addFields({
        name: '💎 Boosting Since',
        value: `<t:${Math.floor(member.premiumSinceTimestamp / 1000)}:R>`,
        inline: true
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
};
