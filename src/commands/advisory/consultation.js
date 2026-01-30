const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { successEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('consultation')
    .setDescription('Request a business consultation')
    .addStringOption(option =>
      option.setName('topic')
        .setDescription('Main topic for consultation')
        .setRequired(true)
        .addChoices(
          { name: 'Business Strategy', value: 'strategy' },
          { name: 'Financial Advisory', value: 'financial' },
          { name: 'Market Analysis', value: 'market' },
          { name: 'Growth Consulting', value: 'growth' },
          { name: 'Risk Management', value: 'risk' },
          { name: 'Other', value: 'other' }
        ))
    .addStringOption(option =>
      option.setName('description')
        .setDescription('Brief description of your needs')
        .setRequired(true)),
  
  async execute(interaction, client) {
    const topic = interaction.options.getString('topic');
    const description = interaction.options.getString('description');

    // Save consultation request to database
    client.db.createConsultation(interaction.guildId, interaction.user.id, topic, description);

    // Get guild config
    const guildConfig = client.db.getGuildConfig(interaction.guildId);

    // Notify advisors
    if (guildConfig.mod_log_channel) {
      const notifyChannel = interaction.guild.channels.cache.get(guildConfig.mod_log_channel);
      if (notifyChannel) {
        const notifyEmbed = new EmbedBuilder()
          .setTitle('📞 New Consultation Request')
          .addFields(
            { name: 'Client', value: `${interaction.user} (${interaction.user.tag})`, inline: true },
            { name: 'Topic', value: topic.charAt(0).toUpperCase() + topic.slice(1), inline: true },
            { name: 'Description', value: description }
          )
          .setColor(0x3498DB)
          .setTimestamp();

        notifyChannel.send({
          content: guildConfig.advisor_role ? `<@&${guildConfig.advisor_role}>` : '@here',
          embeds: [notifyEmbed]
        });
      }
    }

    // Reply to user
    const replyEmbed = new EmbedBuilder()
      .setTitle('✅ Consultation Request Submitted')
      .setDescription('Thank you for requesting a consultation with Ascenith Advisory.')
      .addFields(
        { name: 'Topic', value: topic.charAt(0).toUpperCase() + topic.slice(1), inline: true },
        { name: 'Status', value: 'Pending', inline: true },
        { name: 'Next Steps', value: 'One of our expert advisors will review your request and contact you shortly to schedule your consultation.' }
      )
      .setColor(0x2ECC71)
      .setFooter({ text: 'We typically respond within 24 hours' })
      .setTimestamp();

    await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
  }
};
