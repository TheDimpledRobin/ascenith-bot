const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('consultations')
    .setDescription('Manage consultation requests')
    .addSubcommand(subcommand =>
      subcommand
        .setName('list')
        .setDescription('List consultation requests')
        .addStringOption(option =>
          option.setName('status')
            .setDescription('Filter by status')
            .setRequired(false)
            .addChoices(
              { name: 'Pending', value: 'pending' },
              { name: 'Scheduled', value: 'scheduled' },
              { name: 'Completed', value: 'completed' },
              { name: 'Cancelled', value: 'cancelled' }
            )))
    .addSubcommand(subcommand =>
      subcommand
        .setName('assign')
        .setDescription('Assign a consultation to yourself')
        .addIntegerOption(option =>
          option.setName('id')
            .setDescription('Consultation ID')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('complete')
        .setDescription('Mark a consultation as completed')
        .addIntegerOption(option =>
          option.setName('id')
            .setDescription('Consultation ID')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('schedule')
        .setDescription('Schedule a consultation')
        .addIntegerOption(option =>
          option.setName('id')
            .setDescription('Consultation ID')
            .setRequired(true))
        .addStringOption(option =>
          option.setName('time')
            .setDescription('Scheduled time (e.g., "Tomorrow at 2pm")')
            .setRequired(true))),
  requiredTier: UserTiers.ADVISOR,
  
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'list') {
      await handleList(interaction, client);
    } else if (subcommand === 'assign') {
      await handleAssign(interaction, client);
    } else if (subcommand === 'complete') {
      await handleComplete(interaction, client);
    } else if (subcommand === 'schedule') {
      await handleSchedule(interaction, client);
    }
  }
};

async function handleList(interaction, client) {
  const status = interaction.options.getString('status') || null;
  const consultations = client.db.getConsultations(interaction.guildId, status);

  if (consultations.length === 0) {
    return interaction.reply({
      embeds: [errorEmbed('No Consultations', 'No consultation requests found.')],
      ephemeral: true
    });
  }

  const embed = new EmbedBuilder()
    .setTitle('📞 Consultation Requests')
    .setColor(0x3498DB)
    .setTimestamp();

  consultations.slice(0, 10).forEach(consultation => {
    const date = new Date(consultation.created_at).toLocaleDateString();
    const client_user = `<@${consultation.user_id}>`;
    const assigned = consultation.assigned_to ? `<@${consultation.assigned_to}>` : 'Unassigned';
    
    embed.addFields({
      name: `ID: ${consultation.consultation_id} - ${consultation.status.toUpperCase()}`,
      value: `**Client:** ${client_user}\n**Topic:** ${consultation.topic}\n**Description:** ${consultation.description}\n**Assigned:** ${assigned}\n**Date:** ${date}`,
      inline: false
    });
  });

  if (consultations.length > 10) {
    embed.setFooter({ text: `Showing 10 of ${consultations.length} consultations` });
  }

  await interaction.reply({ embeds: [embed], ephemeral: true });
}

async function handleAssign(interaction, client) {
  const consultationId = interaction.options.getInteger('id');
  
  client.db.updateConsultationStatus(consultationId, 'scheduled', interaction.user.id);

  await interaction.reply({
    embeds: [successEmbed('Consultation Assigned', `Consultation #${consultationId} has been assigned to you.`)],
    ephemeral: true
  });
}

async function handleComplete(interaction, client) {
  const consultationId = interaction.options.getInteger('id');
  
  client.db.updateConsultationStatus(consultationId, 'completed');

  await interaction.reply({
    embeds: [successEmbed('Consultation Completed', `Consultation #${consultationId} has been marked as completed.`)],
    ephemeral: true
  });
}

async function handleSchedule(interaction, client) {
  const consultationId = interaction.options.getInteger('id');
  const time = interaction.options.getString('time');
  
  client.db.updateConsultationStatus(consultationId, 'scheduled', null, time);

  await interaction.reply({
    embeds: [successEmbed('Consultation Scheduled', `Consultation #${consultationId} has been scheduled for: ${time}`)],
    ephemeral: true
  });
}
