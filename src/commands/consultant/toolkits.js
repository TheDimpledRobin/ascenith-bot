const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('toolkits')
    .setDescription('Access comprehensive business advisory toolkits'),
  
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('🛠️ Business Advisory Toolkits')
      .setDescription('Comprehensive tools and resources across all business functions\n\nSelect a toolkit below to access specialized tools and guidance:')
      .setColor(0x3498DB)
      .addFields(
        {
          name: '💰 Financial Toolkit',
          value: 'UK-focused financial tools including cashflow analysis, tax rates, ROI calculators, VAT guidance, and funding options.',
          inline: false
        },
        {
          name: '⚖️ Compliance Toolkit',
          value: 'Regulatory compliance including GDPR, Companies House, employment law, health & safety, contracts, and AML.',
          inline: false
        },
        {
          name: '👥 HR Toolkit',
          value: 'Human resources tools covering recruitment, onboarding, performance management, disciplinary procedures, and wellbeing.',
          inline: false
        },
        {
          name: '⚙️ Operations Toolkit',
          value: 'Operational excellence tools including process mapping, Lean Six Sigma, supply chain, inventory, quality, and KPIs.',
          inline: false
        },
        {
          name: '🎯 Strategy Toolkit',
          value: 'Strategic planning frameworks including SWOT, Porter\'s Five Forces, Business Model Canvas, market research, and growth strategies.',
          inline: false
        }
      )
      .setFooter({ text: 'Ascenith Business Advisory © 2026' })
      .setTimestamp();

    // Create button rows
    const row1 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('toolkit_financial')
          .setLabel('💰 Financial')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('toolkit_compliance')
          .setLabel('⚖️ Compliance')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('toolkit_hr')
          .setLabel('👥 HR')
          .setStyle(ButtonStyle.Primary)
      );

    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('toolkit_operations')
          .setLabel('⚙️ Operations')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId('toolkit_strategy')
          .setLabel('🎯 Strategy')
          .setStyle(ButtonStyle.Primary)
      );

    await interaction.reply({ 
      embeds: [embed],
      components: [row1, row2]
    });
  }
};
