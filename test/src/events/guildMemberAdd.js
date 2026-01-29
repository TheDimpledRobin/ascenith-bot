const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member, client) {
    const guildConfig = client.db.getGuildConfig(member.guild.id);
    if (!guildConfig || !guildConfig.welcome_channel) return;

    const welcomeChannel = member.guild.channels.cache.get(guildConfig.welcome_channel);
    if (!welcomeChannel) return;

    // Assign client role if configured
    if (guildConfig.client_role) {
      const clientRole = member.guild.roles.cache.get(guildConfig.client_role);
      if (clientRole) {
        await member.roles.add(clientRole).catch(console.error);
      }
    }

    // Send welcome message
    const embed = new EmbedBuilder()
      .setTitle('Welcome to Ascenith Business Advisory')
      .setDescription(`Welcome ${member}! We're glad to have you here.\n\nOur team of professional advisors and consultants are here to help with your business needs. Feel free to explore our resources and open a support ticket if you need assistance.`)
      .setColor(0x3498DB)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: '📋 Get Started', value: 'Use `/advisory-info` to learn about our services', inline: true },
        { name: '🎫 Need Help?', value: 'Open a ticket with `/ticket create`', inline: true }
      )
      .setTimestamp()
      .setFooter({ text: `Member #${member.guild.memberCount}` });

    welcomeChannel.send({ embeds: [embed] }).catch(console.error);
  }
};
