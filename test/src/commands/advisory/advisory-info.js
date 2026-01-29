const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('advisory-info')
    .setDescription('Get information about Ascenith advisory services'),
  
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('📊 Ascenith Business Advisory Services')
      .setDescription('Expert business consulting and advisory services tailored to your needs.')
      .setColor(0x3498DB)
      .addFields(
        {
          name: '💼 Business Strategy',
          value: 'Strategic planning, market positioning, and competitive analysis to drive growth.',
          inline: false
        },
        {
          name: '💰 Financial Advisory',
          value: 'Financial planning, budgeting, investment strategies, and risk management.',
          inline: false
        },
        {
          name: '📈 Market Analysis',
          value: 'In-depth market research, trend analysis, and opportunity identification.',
          inline: false
        },
        {
          name: '🚀 Growth Consulting',
          value: 'Scaling strategies, operational efficiency, and expansion planning.',
          inline: false
        },
        {
          name: '🛡️ Risk Management',
          value: 'Risk assessment, mitigation strategies, and compliance guidance.',
          inline: false
        },
        {
          name: '📞 Get Started',
          value: 'Use `/consultation` to request a consultation or `/ticket create` to open a support ticket.',
          inline: false
        }
      )
      .setFooter({ text: 'Ascenith Business Advisory © 2026' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
