const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('client-status')
    .setDescription('Check client information and status')
    .addUserOption(option =>
      option.setName('client')
        .setDescription('The client to check')
        .setRequired(true)),
  requiredTier: UserTiers.ADVISOR,
  
  async execute(interaction, client) {
    const targetUser = interaction.options.getUser('client');
    const member = await interaction.guild.members.fetch(targetUser.id).catch(() => null);

    if (!member) {
      return interaction.reply({
        embeds: [errorEmbed('Error', 'Could not find that user.')],
        ephemeral: true
      });
    }

    // Get client data
    const consultations = client.db.db.prepare(
      'SELECT * FROM consultations WHERE guild_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 5'
    ).all(interaction.guildId, targetUser.id);

    const tickets = client.db.db.prepare(
      'SELECT * FROM tickets WHERE guild_id = ? AND user_id = ? ORDER BY created_at DESC LIMIT 5'
    ).all(interaction.guildId, targetUser.id);

    const notes = client.db.getClientNotes(interaction.guildId, targetUser.id);

    const embed = new EmbedBuilder()
      .setTitle(`📊 Client Status - ${targetUser.tag}`)
      .setThumbnail(targetUser.displayAvatarURL())
      .setColor(0x3498DB)
      .addFields(
        { name: '👤 User ID', value: targetUser.id, inline: true },
        { name: '📅 Joined', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: '🎫 Total Tickets', value: `${tickets.length}`, inline: true },
        { name: '📞 Consultations', value: `${consultations.length}`, inline: true },
        { name: '📝 Notes', value: `${notes.length}`, inline: true },
        { name: '✅ Status', value: member.presence?.status || 'offline', inline: true }
      )
      .setTimestamp();

    // Add recent consultations
    if (consultations.length > 0) {
      const recentConsultations = consultations.slice(0, 3).map(c => {
        const date = new Date(c.created_at).toLocaleDateString();
        return `• ${c.topic} - ${c.status} (${date})`;
      }).join('\n');

      embed.addFields({
        name: '📞 Recent Consultations',
        value: recentConsultations
      });
    }

    // Add recent notes preview
    if (notes.length > 0) {
      const recentNote = notes[0];
      const noteDate = new Date(recentNote.created_at).toLocaleDateString();
      embed.addFields({
        name: '📝 Latest Note',
        value: `${recentNote.note.substring(0, 100)}... (${noteDate})\nUse \`/notes view\` to see all notes.`
      });
    }

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
