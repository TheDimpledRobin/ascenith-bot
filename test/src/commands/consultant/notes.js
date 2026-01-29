const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('notes')
    .setDescription('Manage client notes')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a note about a client')
        .addUserOption(option =>
          option.setName('client')
            .setDescription('The client')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('note')
            .setDescription('The note to add')
            .setRequired(true))
        .addBooleanOption(option =>
          option.setName('private')
            .setDescription('Make this note private (only you can see it)')
            .setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('view')
        .setDescription('View notes about a client')
        .addUserOption(option =>
          option.setName('client')
            .setDescription('The client')
            .setRequired(true))),
  requiredTier: UserTiers.ADVISOR,
  
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'add') {
      await handleAdd(interaction, client);
    } else if (subcommand === 'view') {
      await handleView(interaction, client);
    }
  }
};

async function handleAdd(interaction, client) {
  const targetUser = interaction.options.getUser('client');
  const note = interaction.options.getString('note');
  const isPrivate = interaction.options.getBoolean('private') ?? true;

  // Add note to database
  client.db.addClientNote(
    interaction.guildId,
    targetUser.id,
    interaction.user.id,
    note,
    isPrivate
  );

  await interaction.reply({
    embeds: [successEmbed('Note Added', `Note added for ${targetUser.tag}.\n**Private:** ${isPrivate ? 'Yes' : 'No'}`)],
    ephemeral: true
  });
}

async function handleView(interaction, client) {
  const targetUser = interaction.options.getUser('client');
  const notes = client.db.getClientNotes(interaction.guildId, targetUser.id);

  if (notes.length === 0) {
    return interaction.reply({
      embeds: [errorEmbed('No Notes', `No notes found for ${targetUser.tag}.`)],
      ephemeral: true
    });
  }

  // Filter notes based on privacy and user
  const visibleNotes = notes.filter(note => {
    return !note.private || note.consultant_id === interaction.user.id;
  });

  if (visibleNotes.length === 0) {
    return interaction.reply({
      embeds: [errorEmbed('No Notes', 'No notes available for you to view.')],
      ephemeral: true
    });
  }

  const embed = new EmbedBuilder()
    .setTitle(`📝 Client Notes - ${targetUser.tag}`)
    .setColor(0x9B59B6)
    .setTimestamp();

  // Add notes as fields
  visibleNotes.slice(0, 10).forEach((note, index) => {
    const date = new Date(note.created_at).toLocaleDateString();
    const consultant = interaction.guild.members.cache.get(note.consultant_id)?.user.tag || 'Unknown';
    
    embed.addFields({
      name: `Note ${index + 1} - ${date} ${note.private ? '🔒' : ''}`,
      value: `**By:** ${consultant}\n${note.note}`,
      inline: false
    });
  });

  if (visibleNotes.length > 10) {
    embed.setFooter({ text: `Showing 10 of ${visibleNotes.length} notes` });
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}
