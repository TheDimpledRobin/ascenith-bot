const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information about the server'),
  
  async execute(interaction, client) {
    const { guild } = interaction;
    
    await guild.members.fetch();

    const embed = new EmbedBuilder()
      .setTitle(`📊 ${guild.name} - Server Information`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 256 }))
      .setColor(0x3498DB)
      .addFields(
        { name: '👑 Owner', value: `<@${guild.ownerId}>`, inline: true },
        { name: '📅 Created', value: `<t:${Math.floor(guild.createdTimestamp / 1000)}:R>`, inline: true },
        { name: '🆔 Server ID', value: guild.id, inline: true },
        { name: '👥 Members', value: `${guild.memberCount}`, inline: true },
        { name: '💬 Channels', value: `${guild.channels.cache.size}`, inline: true },
        { name: '🎭 Roles', value: `${guild.roles.cache.size}`, inline: true },
        { name: '😀 Emojis', value: `${guild.emojis.cache.size}`, inline: true },
        { name: '🚀 Boost Level', value: `${guild.premiumTier || 'None'}`, inline: true },
        { name: '💎 Boosts', value: `${guild.premiumSubscriptionCount || 0}`, inline: true }
      )
      .setTimestamp();

    if (guild.description) {
      embed.setDescription(guild.description);
    }

    await interaction.reply({ embeds: [embed] });
  }
};
