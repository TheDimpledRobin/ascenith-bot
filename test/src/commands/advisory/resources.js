const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resources')
    .setDescription('Access business resources and guides'),
  
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('📚 Business Resources')
      .setDescription('Helpful resources and guides for your business journey.')
      .setColor(0x9B59B6)
      .addFields(
        {
          name: '📖 Strategy Guides',
          value: '• Business Planning 101\n• Market Entry Strategies\n• Competitive Analysis Framework\n• SWOT Analysis Template',
          inline: true
        },
        {
          name: '💼 Financial Resources',
          value: '• Financial Modeling Guide\n• Cash Flow Management\n• Investment Analysis\n• Budgeting Best Practices',
          inline: true
        },
        {
          name: '📊 Market Research',
          value: '• Industry Analysis Tools\n• Customer Segmentation\n• Trend Analysis Methods\n• Market Sizing Techniques',
          inline: true
        },
        {
          name: '🚀 Growth Resources',
          value: '• Scaling Strategies\n• Operations Optimization\n• Team Building Guides\n• Performance Metrics',
          inline: true
        },
        {
          name: '📝 Templates & Tools',
          value: '• Business Plan Template\n• Financial Projections Sheet\n• KPI Dashboard\n• Risk Assessment Matrix',
          inline: true
        },
        {
          name: '🎓 Learning Center',
          value: '• Webinar Schedule\n• Case Studies\n• Industry Reports\n• Expert Articles',
          inline: true
        }
      )
      .setFooter({ text: 'Need specific guidance? Use /consultation to speak with an advisor' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
