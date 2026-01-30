const { Events, EmbedBuilder, AuditLogEvent } = require('discord.js');

module.exports = {
  name: Events.GuildMemberRemove,
  async execute(member, client) {
    const guildConfig = client.db.getGuildConfig(member.guild.id);
    if (!guildConfig || !guildConfig.mod_log_channel) return;

    const logChannel = member.guild.channels.cache.get(guildConfig.mod_log_channel);
    if (!logChannel) return;

    // Try to get audit log info
    let kickInfo = null;
    try {
      const auditLogs = await member.guild.fetchAuditLogs({
        type: AuditLogEvent.MemberKick,
        limit: 1
      });
      
      const kickLog = auditLogs.entries.first();
      if (kickLog && kickLog.target.id === member.id && Date.now() - kickLog.createdTimestamp < 5000) {
        kickInfo = kickLog;
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
    }

    const embed = new EmbedBuilder()
      .setTitle(kickInfo ? '👢 Member Kicked' : '👋 Member Left')
      .setDescription(`${member.user.tag} (${member.id})`)
      .setColor(kickInfo ? 0xE74C3C : 0x95A5A6)
      .setThumbnail(member.user.displayAvatarURL())
      .setTimestamp();

    if (kickInfo) {
      embed.addFields(
        { name: 'Moderator', value: `${kickInfo.executor.tag}`, inline: true },
        { name: 'Reason', value: kickInfo.reason || 'No reason provided', inline: true }
      );
    }

    logChannel.send({ embeds: [embed] }).catch(console.error);
  }
};
