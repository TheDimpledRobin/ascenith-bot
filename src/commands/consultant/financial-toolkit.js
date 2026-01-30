const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('financial-toolkit')
    .setDescription('Financial advisory tools and resources (UK focused)')
    .addSubcommand(subcommand =>
      subcommand
        .setName('menu')
        .setDescription('View financial advisory toolkit menu'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('cashflow-analysis')
        .setDescription('Generate cashflow analysis template'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('financial-ratios')
        .setDescription('Calculate key financial ratios')
        .addNumberOption(option =>
          option.setName('current-assets')
            .setDescription('Current Assets (£)')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('current-liabilities')
            .setDescription('Current Liabilities (£)')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('total-debt')
            .setDescription('Total Debt (£)')
            .setRequired(false))
        .addNumberOption(option =>
          option.setName('total-equity')
            .setDescription('Total Equity (£)')
            .setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('uk-tax-rates')
        .setDescription('View current UK tax rates and thresholds'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('break-even')
        .setDescription('Calculate break-even point')
        .addNumberOption(option =>
          option.setName('fixed-costs')
            .setDescription('Fixed Costs (£)')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('price-per-unit')
            .setDescription('Price per Unit (£)')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('variable-cost-per-unit')
            .setDescription('Variable Cost per Unit (£)')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('roi-calculator')
        .setDescription('Calculate Return on Investment')
        .addNumberOption(option =>
          option.setName('initial-investment')
            .setDescription('Initial Investment (£)')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('final-value')
            .setDescription('Final Value (£)')
            .setRequired(true))
        .addNumberOption(option =>
          option.setName('time-period')
            .setDescription('Time Period (years)')
            .setRequired(false)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('budget-template')
        .setDescription('Generate business budget template'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('funding-options')
        .setDescription('View UK business funding options'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('vat-guide')
        .setDescription('UK VAT registration and compliance guide')),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'menu':
        await this.showMenu(interaction);
        break;
      case 'cashflow-analysis':
        await this.cashflowAnalysis(interaction);
        break;
      case 'financial-ratios':
        await this.calculateRatios(interaction);
        break;
      case 'uk-tax-rates':
        await this.showTaxRates(interaction);
        break;
      case 'break-even':
        await this.calculateBreakEven(interaction);
        break;
      case 'roi-calculator':
        await this.calculateROI(interaction);
        break;
      case 'budget-template':
        await this.budgetTemplate(interaction);
        break;
      case 'funding-options':
        await this.fundingOptions(interaction);
        break;
      case 'vat-guide':
        await this.vatGuide(interaction);
        break;
    }
  },

  async showMenu(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('💰 Financial Advisory Toolkit')
      .setDescription('Comprehensive financial tools and resources for UK businesses')
      .setColor(0x2ECC71)
      .addFields(
        { name: '📊 Cashflow Analysis', value: 'Generate detailed cashflow analysis templates', inline: true },
        { name: '📈 Financial Ratios', value: 'Calculate liquidity, leverage, and efficiency ratios', inline: true },
        { name: '💷 UK Tax Rates', value: 'Current UK tax rates and thresholds', inline: true },
        { name: '⚖️ Break-Even Analysis', value: 'Calculate break-even point for your business', inline: true },
        { name: '💹 ROI Calculator', value: 'Calculate return on investment', inline: true },
        { name: '📋 Budget Template', value: 'Generate comprehensive budget templates', inline: true },
        { name: '🏦 Funding Options', value: 'Explore UK business funding sources', inline: true },
        { name: '🧾 VAT Guide', value: 'VAT registration and compliance guidance', inline: true }
      )
      .setFooter({ text: 'Use /financial-toolkit [tool-name] to access specific tools' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async cashflowAnalysis(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📊 Cashflow Analysis Template')
      .setDescription('Use this template to analyze your business cashflow')
      .setColor(0x3498DB)
      .addFields(
        { name: '💵 Operating Activities', value: '• Cash from customers\n• Cash paid to suppliers\n• Operating expenses\n• Employee salaries', inline: false },
        { name: '💼 Investing Activities', value: '• Purchase of assets\n• Sale of assets\n• Investments\n• Asset disposal', inline: false },
        { name: '🏦 Financing Activities', value: '• Loans received\n• Loan repayments\n• Equity investment\n• Dividend payments', inline: false },
        { name: '📈 Key Metrics to Track', value: '• Opening balance\n• Total cash inflows\n• Total cash outflows\n• Closing balance\n• Net cashflow', inline: false },
        { name: '⚠️ Red Flags', value: '• Negative operating cashflow\n• Increasing accounts receivable\n• Declining cash reserves\n• Heavy reliance on financing', inline: false },
        { name: '📝 Best Practices', value: '• Update weekly\n• Forecast 3-6 months ahead\n• Monitor payment terms\n• Maintain cash reserve', inline: false }
      )
      .setFooter({ text: 'Consult with an advisor for detailed analysis' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async calculateRatios(interaction) {
    const currentAssets = interaction.options.getNumber('current-assets');
    const currentLiabilities = interaction.options.getNumber('current-liabilities');
    const totalDebt = interaction.options.getNumber('total-debt');
    const totalEquity = interaction.options.getNumber('total-equity');

    // Calculate ratios
    const currentRatio = (currentAssets / currentLiabilities).toFixed(2);
    const workingCapital = (currentAssets - currentLiabilities).toFixed(2);
    
    let debtToEquity = 'N/A';
    if (totalDebt && totalEquity) {
      debtToEquity = (totalDebt / totalEquity).toFixed(2);
    }

    const embed = new EmbedBuilder()
      .setTitle('📊 Financial Ratios Analysis')
      .setDescription('Calculated financial ratios for your business')
      .setColor(0x9B59B6)
      .addFields(
        { name: '💧 Current Ratio', value: `**${currentRatio}**\n${this.interpretCurrentRatio(parseFloat(currentRatio))}`, inline: false },
        { name: '💷 Working Capital', value: `**£${parseFloat(workingCapital).toLocaleString()}**\n${workingCapital >= 0 ? '✅ Positive working capital' : '⚠️ Negative working capital'}`, inline: false },
        { name: '📊 Debt-to-Equity Ratio', value: `**${debtToEquity}**\n${debtToEquity !== 'N/A' ? this.interpretDebtToEquity(parseFloat(debtToEquity)) : 'Provide debt and equity values to calculate'}`, inline: false }
      )
      .setFooter({ text: 'These are general indicators - consult with an advisor for detailed analysis' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  interpretCurrentRatio(ratio) {
    if (ratio >= 2) return '✅ Excellent liquidity position';
    if (ratio >= 1.5) return '✅ Good liquidity';
    if (ratio >= 1) return '⚠️ Adequate but monitor closely';
    return '❌ Liquidity concerns - immediate attention needed';
  },

  interpretDebtToEquity(ratio) {
    if (ratio <= 0.5) return '✅ Conservative leverage';
    if (ratio <= 1) return '✅ Moderate leverage';
    if (ratio <= 2) return '⚠️ High leverage - monitor carefully';
    return '❌ Very high leverage - risk concerns';
  },

  async showTaxRates(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('💷 UK Tax Rates 2025/26')
      .setDescription('Current UK tax rates and thresholds')
      .setColor(0xE74C3C)
      .addFields(
        { name: '👤 Income Tax Rates', value: '• Personal Allowance: £12,570\n• Basic Rate (20%): £12,571 - £50,270\n• Higher Rate (40%): £50,271 - £125,140\n• Additional Rate (45%): Over £125,140', inline: false },
        { name: '🏢 Corporation Tax', value: '• Small Profits Rate (19%): Up to £50,000\n• Marginal Relief: £50,001 - £250,000\n• Main Rate (25%): Over £250,000', inline: false },
        { name: '📊 National Insurance', value: '• Class 1 (Employee): 12% (£12,570-£50,270), 2% above\n• Class 1 (Employer): 13.8% above £9,100\n• Class 2 (Self-employed): £3.45/week\n• Class 4 (Self-employed): 9% (£12,570-£50,270), 2% above', inline: false },
        { name: '🧾 VAT', value: '• Standard Rate: 20%\n• Reduced Rate: 5%\n• Zero Rate: 0%\n• Registration Threshold: £90,000', inline: false },
        { name: '💰 Capital Gains Tax', value: '• Basic Rate: 10% (18% property)\n• Higher Rate: 20% (28% property)\n• Annual Exemption: £3,000', inline: false },
        { name: '🎁 Dividend Tax', value: '• Dividend Allowance: £500\n• Basic Rate: 8.75%\n• Higher Rate: 33.75%\n• Additional Rate: 39.35%', inline: false }
      )
      .setFooter({ text: 'Tax year 2025/26 - Always consult HMRC or a tax advisor for current rates' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async calculateBreakEven(interaction) {
    const fixedCosts = interaction.options.getNumber('fixed-costs');
    const pricePerUnit = interaction.options.getNumber('price-per-unit');
    const variableCostPerUnit = interaction.options.getNumber('variable-cost-per-unit');

    const contributionMargin = pricePerUnit - variableCostPerUnit;
    const breakEvenUnits = Math.ceil(fixedCosts / contributionMargin);
    const breakEvenRevenue = (breakEvenUnits * pricePerUnit).toFixed(2);

    const embed = new EmbedBuilder()
      .setTitle('⚖️ Break-Even Analysis')
      .setDescription('Calculate the point where your business becomes profitable')
      .setColor(0xF39C12)
      .addFields(
        { name: '📊 Contribution Margin', value: `£${contributionMargin.toFixed(2)} per unit`, inline: true },
        { name: '📈 Break-Even Point', value: `${breakEvenUnits.toLocaleString()} units`, inline: true },
        { name: '💷 Break-Even Revenue', value: `£${parseFloat(breakEvenRevenue).toLocaleString()}`, inline: true },
        { name: '📋 What This Means', value: `You need to sell **${breakEvenUnits.toLocaleString()} units** to cover your fixed costs of £${fixedCosts.toLocaleString()}. After this point, each unit sold contributes £${contributionMargin.toFixed(2)} to profit.`, inline: false },
        { name: '💡 Strategies to Improve', value: '• Reduce fixed costs\n• Increase selling price\n• Reduce variable costs\n• Improve sales volume\n• Enhance product mix', inline: false }
      )
      .setFooter({ text: 'Use this for planning and decision-making' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async calculateROI(interaction) {
    const initialInvestment = interaction.options.getNumber('initial-investment');
    const finalValue = interaction.options.getNumber('final-value');
    const timePeriod = interaction.options.getNumber('time-period') || 1;

    const gain = finalValue - initialInvestment;
    const roi = ((gain / initialInvestment) * 100).toFixed(2);
    const annualizedROI = (((Math.pow((finalValue / initialInvestment), (1 / timePeriod))) - 1) * 100).toFixed(2);

    const embed = new EmbedBuilder()
      .setTitle('💹 Return on Investment (ROI) Analysis')
      .setDescription('Investment performance metrics')
      .setColor(gain >= 0 ? 0x2ECC71 : 0xE74C3C)
      .addFields(
        { name: '💰 Initial Investment', value: `£${initialInvestment.toLocaleString()}`, inline: true },
        { name: '📈 Final Value', value: `£${finalValue.toLocaleString()}`, inline: true },
        { name: '⏱️ Time Period', value: `${timePeriod} year(s)`, inline: true },
        { name: '💵 Net Gain/Loss', value: `${gain >= 0 ? '+' : ''}£${gain.toLocaleString()}`, inline: true },
        { name: '📊 Total ROI', value: `${roi}%`, inline: true },
        { name: '📈 Annualized ROI', value: `${annualizedROI}%`, inline: true },
        { name: '🎯 Performance', value: this.interpretROI(parseFloat(roi)), inline: false }
      )
      .setFooter({ text: 'Past performance does not guarantee future results' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  interpretROI(roi) {
    if (roi >= 20) return '🌟 Excellent return - significantly above market average';
    if (roi >= 10) return '✅ Good return - above market average';
    if (roi >= 5) return '👍 Decent return - around market average';
    if (roi >= 0) return '⚠️ Modest return - below expectations';
    return '❌ Negative return - loss on investment';
  },

  async budgetTemplate(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📋 Business Budget Template')
      .setDescription('Comprehensive budget categories for UK businesses')
      .setColor(0x16A085)
      .addFields(
        { name: '💵 Revenue Streams', value: '• Product sales\n• Service income\n• Recurring revenue\n• Other income', inline: true },
        { name: '🏢 Fixed Costs', value: '• Rent/Mortgage\n• Salaries\n• Insurance\n• Utilities\n• Software subscriptions', inline: true },
        { name: '📦 Variable Costs', value: '• Raw materials\n• Production costs\n• Shipping\n• Commission\n• Marketing spend', inline: true },
        { name: '👥 Personnel', value: '• Salaries & wages\n• NI contributions\n• Pension contributions\n• Training & development\n• Recruitment', inline: false },
        { name: '📣 Marketing & Sales', value: '• Digital advertising\n• Content creation\n• Events & trade shows\n• Sales tools\n• Brand development', inline: false },
        { name: '🔧 Operations', value: '• Technology & software\n• Equipment maintenance\n• Professional services\n• Office supplies\n• Travel expenses', inline: false },
        { name: '💼 Administrative', value: '• Accounting & bookkeeping\n• Legal fees\n• Banking charges\n• Licenses & permits\n• Insurance', inline: false },
        { name: '📊 Budget Best Practices', value: '• Review monthly\n• Compare actual vs. budgeted\n• Build in contingency (10-15%)\n• Plan for seasonal variations\n• Update forecasts quarterly', inline: false }
      )
      .setFooter({ text: 'Download full Excel template via consultation' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async fundingOptions(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🏦 UK Business Funding Options')
      .setDescription('Comprehensive guide to funding sources for UK businesses')
      .setColor(0x3498DB)
      .addFields(
        { name: '🏦 Traditional Bank Lending', value: '• **Business Loans**: £10k-£5M+, 5-25 year terms\n• **Overdrafts**: Short-term cashflow\n• **Asset Finance**: Equipment & vehicles\n• **Invoice Finance**: 80-90% of invoices', inline: false },
        { name: '🏛️ Government Schemes', value: '• **Start Up Loans**: £500-£25k at 6% interest\n• **Innovate UK Grants**: R&D funding\n• **British Business Bank**: Various schemes\n• **Regional Growth Funds**: Location-specific', inline: false },
        { name: '👥 Equity Funding', value: '• **Angel Investors**: £10k-£500k for equity\n• **Venture Capital**: £500k-£10M+ growth capital\n• **Crowdfunding**: Seedrs, Crowdcube\n• **EIS/SEIS**: Tax-efficient investment', inline: false },
        { name: '🚀 Alternative Finance', value: '• **Peer-to-Peer Lending**: Funding Circle, LendInvest\n• **Revenue-Based Finance**: % of future revenue\n• **Trade Credit**: Extended payment terms\n• **Grant Funding**: Innovate UK, local councils', inline: false },
        { name: '💡 Bootstrap Options', value: '• Personal savings\n• Friends & family\n• Pre-sales & deposits\n• Partnership arrangements\n• Asset liquidation', inline: false },
        { name: '📋 Application Requirements', value: '• Business plan\n• Financial projections (3 years)\n• Management accounts\n• Cash flow forecast\n• Personal guarantee (often required)', inline: false }
      )
      .setFooter({ text: 'Book a consultation for personalized funding advice' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async vatGuide(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🧾 UK VAT Guide')
      .setDescription('Complete guide to VAT registration and compliance')
      .setColor(0xE67E22)
      .addFields(
        { name: '📊 Registration Requirements', value: '• **Mandatory**: Turnover exceeds £90,000\n• **Voluntary**: Below threshold but want to register\n• **Timeline**: Apply 30 days before threshold\n• **Effective**: Within 30 days of application', inline: false },
        { name: '🔢 VAT Rates', value: '• **Standard Rate**: 20% (most goods/services)\n• **Reduced Rate**: 5% (domestic fuel, children\'s car seats)\n• **Zero Rate**: 0% (most food, children\'s clothes, books)\n• **Exempt**: No VAT (insurance, education, health)', inline: false },
        { name: '📅 VAT Schemes', value: '• **Standard**: Quarterly returns, report all transactions\n• **Cash Accounting**: Pay when customer pays (£1.35M limit)\n• **Flat Rate**: Simplified % on turnover (£150k limit)\n• **Annual Accounting**: One annual return (£1.35M limit)', inline: false },
        { name: '📝 Record Keeping', value: '• Keep VAT invoices (6 years)\n• Digital records for Making Tax Digital\n• Track input and output VAT\n• Quarterly VAT returns (online)\n• Maintain VAT account', inline: false },
        { name: '💰 VAT Recovery', value: '• **Input VAT**: Claim on business purchases\n• **Capital Goods**: Special recovery rules\n• **Partial Exemption**: Mixed VAT/exempt sales\n• **Pre-registration**: Claim on goods (4 years)', inline: false },
        { name: '🎯 Making Tax Digital', value: '• Mandatory for VAT-registered businesses\n• Use MTD-compatible software\n• Submit returns digitally\n• Keep digital records\n• API submission to HMRC', inline: false },
        { name: '⚠️ Common Pitfalls', value: '• Late registration penalties\n• Incorrect rate application\n• Missing filing deadlines\n• Poor record keeping\n• Not using MTD software', inline: false }
      )
      .setFooter({ text: 'Always consult with a qualified accountant for VAT matters' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
