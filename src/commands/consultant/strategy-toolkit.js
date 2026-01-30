const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('strategy-toolkit')
    .setDescription('Strategic planning and business development tools')
    .addSubcommand(subcommand =>
      subcommand
        .setName('menu')
        .setDescription('View strategy toolkit menu'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('swot-analysis')
        .setDescription('SWOT analysis framework'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('porters-five-forces')
        .setDescription('Industry analysis framework'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('business-model-canvas')
        .setDescription('Business model design tool'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('market-research')
        .setDescription('Market research and analysis'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('competitive-analysis')
        .setDescription('Competitive landscape analysis'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('growth-strategies')
        .setDescription('Business growth frameworks'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('balanced-scorecard')
        .setDescription('Strategic performance measurement'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('pricing-strategies')
        .setDescription('Pricing models and strategies')),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'menu':
        await this.showMenu(interaction);
        break;
      case 'swot-analysis':
        await this.swotAnalysis(interaction);
        break;
      case 'porters-five-forces':
        await this.portersFiveForces(interaction);
        break;
      case 'business-model-canvas':
        await this.businessModelCanvas(interaction);
        break;
      case 'market-research':
        await this.marketResearch(interaction);
        break;
      case 'competitive-analysis':
        await this.competitiveAnalysis(interaction);
        break;
      case 'growth-strategies':
        await this.growthStrategies(interaction);
        break;
      case 'balanced-scorecard':
        await this.balancedScorecard(interaction);
        break;
      case 'pricing-strategies':
        await this.pricingStrategies(interaction);
        break;
    }
  },

  async showMenu(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎯 Strategic Planning Toolkit')
      .setDescription('Strategic planning and business development tools')
      .setColor(0x2ECC71)
      .addFields(
        { name: '🎯 SWOT Analysis', value: 'Strengths, Weaknesses, Opportunities, Threats', inline: true },
        { name: '⚔️ Porter\'s Five Forces', value: 'Industry competitiveness analysis', inline: true },
        { name: '📊 Business Model Canvas', value: 'Design your business model', inline: true },
        { name: '🔍 Market Research', value: 'Market analysis techniques', inline: true },
        { name: '🏆 Competitive Analysis', value: 'Analyze your competition', inline: true },
        { name: '🚀 Growth Strategies', value: 'Scale your business', inline: true },
        { name: '📈 Balanced Scorecard', value: 'Strategic performance framework', inline: true },
        { name: '💰 Pricing Strategies', value: 'Optimize your pricing', inline: true }
      )
      .setFooter({ text: 'Use /strategy-toolkit [tool-name] to access specific tools' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async swotAnalysis(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎯 SWOT Analysis Framework')
      .setDescription('Strategic planning tool to identify internal and external factors')
      .setColor(0x3498DB)
      .addFields(
        { name: '💪 Strengths (Internal, Positive)', value: '**Questions to Ask:**\n• What do we do well?\n• What unique resources do we have?\n• What advantages do we have over competitors?\n• What do customers see as our strengths?\n• What is our USP (Unique Selling Proposition)?\n\n**Examples:**\n• Strong brand reputation\n• Loyal customer base\n• Proprietary technology\n• Skilled workforce\n• Strong financial position\n• Efficient processes', inline: false },
        { name: '⚠️ Weaknesses (Internal, Negative)', value: '**Questions to Ask:**\n• What could we improve?\n• Where do we have fewer resources than others?\n• What do competitors do better?\n• What factors lose us sales?\n• What are customer complaints about?\n\n**Examples:**\n• Limited financial resources\n• Weak brand awareness\n• Gaps in capabilities\n• Poor location\n• Outdated technology\n• High staff turnover\n• Limited product range', inline: false },
        { name: '🌟 Opportunities (External, Positive)', value: '**Questions to Ask:**\n• What good opportunities are available?\n• What trends could we take advantage of?\n• How can we turn strengths into opportunities?\n• What changes in regulations could benefit us?\n• What market gaps exist?\n\n**Examples:**\n• Growing market demand\n• New markets or segments\n• Technological innovations\n• Changes in regulations\n• Competitor weaknesses\n• Strategic partnerships\n• Economic growth', inline: false },
        { name: '⚡ Threats (External, Negative)', value: '**Questions to Ask:**\n• What obstacles do we face?\n• What is our competition doing?\n• Are quality standards or specifications changing?\n• Is changing technology threatening our position?\n• Do we have bad debt or cash-flow problems?\n\n**Examples:**\n• New competitors\n• Price wars\n• Economic downturn\n• Changing customer preferences\n• New regulations\n• Supply chain issues\n• Technological disruption', inline: false },
        { name: '📊 SWOT Matrix Strategies', value: '**SO Strategies (Strength-Opportunity)**:\n• Use strengths to take advantage of opportunities\n\n**WO Strategies (Weakness-Opportunity)**:\n• Overcome weaknesses by taking advantage of opportunities\n\n**ST Strategies (Strength-Threat)**:\n• Use strengths to avoid threats\n\n**WT Strategies (Weakness-Threat)**:\n• Minimize weaknesses and avoid threats', inline: false },
        { name: '💡 How to Conduct SWOT', value: '**1. Gather Team**: Cross-functional representation\n**2. Brainstorm**: Generate ideas for each quadrant\n**3. Categorize**: Sort into the four categories\n**4. Prioritize**: Identify most important items\n**5. Develop Strategies**: Create action plans\n**6. Action Plan**: Assign owners and timelines\n**7. Review**: Regularly revisit and update', inline: false },
        { name: '⚠️ Common Pitfalls', value: '• **Too Vague**: Be specific and actionable\n• **Too Many Items**: Focus on most important\n• **Confusing Internal/External**: Keep clear distinction\n• **No Follow-Up**: Must lead to action\n• **One-Time Exercise**: Should be ongoing\n• **Ignoring Reality**: Be honest and objective', inline: false },
        { name: '🎯 TOWS Analysis', value: 'Reverse approach - start with external factors:\n**1. Identify Threats & Opportunities** (external)\n**2. Identify Strengths & Weaknesses** (internal)\n**3. Match strategies**: How internal factors can address external factors\n\nUseful for crisis planning and scenario analysis', inline: false }
      )
      .setFooter({ text: 'SWOT should inform strategic planning, not replace it' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async portersFiveForces(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('⚔️ Porter\'s Five Forces Analysis')
      .setDescription('Framework for analyzing industry competitiveness and profitability')
      .setColor(0xE74C3C)
      .addFields(
        { name: '🤝 Threat of New Entrants', value: '**Factors:**\n• Economies of scale\n• Capital requirements\n• Access to distribution channels\n• Brand loyalty\n• Government regulations\n• Patents and proprietary technology\n\n**High Threat = Low Profitability**\n**Low Threat = High Profitability**\n\n**Questions:**\n• How easy is it to enter your industry?\n• What barriers to entry exist?\n• How much would it cost for a new competitor?', inline: false },
        { name: '💪 Bargaining Power of Suppliers', value: '**Factors:**\n• Number of suppliers\n• Uniqueness of service/product\n• Switching costs\n• Forward integration potential\n• Importance to supplier\n\n**High Power = Suppliers can raise prices**\n**Low Power = You control pricing**\n\n**Questions:**\n• How many suppliers do you have?\n• Could they easily forward integrate?\n• How easy to switch suppliers?\n• How unique is their offering?', inline: false },
        { name: '🛒 Bargaining Power of Buyers', value: '**Factors:**\n• Number of buyers\n• Buyer volume\n• Switching costs for buyers\n• Buyer information availability\n• Backward integration potential\n• Price sensitivity\n\n**High Power = Buyers demand lower prices**\n**Low Power = You control pricing**\n\n**Questions:**\n• How many customers do you have?\n• How important is each customer?\n• Can they backward integrate?\n• How price-sensitive are they?', inline: false },
        { name: '🔄 Threat of Substitutes', value: '**Factors:**\n• Availability of substitutes\n• Price of substitutes\n• Performance of substitutes\n• Switching costs\n• Buyer propensity to substitute\n\n**High Threat = Limits pricing power**\n**Low Threat = More pricing freedom**\n\n**Questions:**\n• What alternatives exist?\n• How do substitutes compare on price/performance?\n• How likely are customers to switch?\n• What\'s your switching cost?', inline: false },
        { name: '🏆 Competitive Rivalry', value: '**Factors:**\n• Number of competitors\n• Industry growth rate\n• Fixed costs\n• Product differentiation\n• Brand loyalty\n• Exit barriers\n• Diversity of competitors\n\n**High Rivalry = Price competition, lower margins**\n**Low Rivalry = Higher profitability**\n\n**Questions:**\n• How many direct competitors?\n• How differentiated are offerings?\n• Is the industry growing or declining?\n• How easy to exit the industry?', inline: false },
        { name: '📊 Analysis Framework', value: '**For Each Force:**\n1. **Identify factors** relevant to your industry\n2. **Rate strength**: Strong, Moderate, Weak\n3. **Provide evidence**: Support your rating\n4. **Overall assessment**: Combined impact\n5. **Strategic implications**: What does it mean?\n\n**Industry Attractiveness:**\n• **High**: Most forces are weak\n• **Medium**: Mixed forces\n• **Low**: Most forces are strong', inline: false },
        { name: '🎯 Strategic Responses', value: '**High Threat of New Entrants:**\n• Build barriers (patents, brand, scale)\n• Lock in customers\n• Innovate continuously\n\n**High Supplier Power:**\n• Diversify suppliers\n• Vertical integration\n• Long-term contracts\n\n**High Buyer Power:**\n• Differentiate offering\n• Reduce buyer concentration\n• Increase switching costs\n\n**High Threat of Substitutes:**\n• Innovate and differentiate\n• Compete on non-price factors\n• Monitor emerging substitutes\n\n**High Rivalry:**\n• Differentiate\n• Focus on niches\n• Build brand loyalty', inline: false },
        { name: '💡 Using the Framework', value: '**1. Industry Selection**: Choose your industry carefully\n**2. Understand Dynamics**: How forces shape competition\n**3. Identify Position**: Where you stand\n**4. Develop Strategy**: How to improve position\n**5. Monitor Changes**: Forces evolve over time\n**6. Regular Review**: Annual or when major changes', inline: false }
      )
      .setFooter({ text: 'Developed by Michael Porter (Harvard Business School)' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async businessModelCanvas(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📊 Business Model Canvas')
      .setDescription('Strategic management template for developing new or documenting existing business models')
      .setColor(0x9B59B6)
      .addFields(
        { name: '👥 Customer Segments', value: '**Who are your customers?**\n• Mass market\n• Niche market\n• Segmented\n• Diversified\n• Multi-sided platforms\n\n**Questions:**\n• For whom are we creating value?\n• Who are our most important customers?\n• What are their needs?', inline: false },
        { name: '💎 Value Propositions', value: '**What value do you deliver?**\n• Newness\n• Performance\n• Customization\n• "Getting the job done"\n• Design\n• Brand/status\n• Price\n• Cost reduction\n• Risk reduction\n• Accessibility\n• Convenience/usability\n\n**Questions:**\n• What problems are we solving?\n• What customer needs are we satisfying?\n• What bundles are we offering?', inline: false },
        { name: '📢 Channels', value: '**How do you reach customers?**\n\n**Phases:**\n1. Awareness\n2. Evaluation\n3. Purchase\n4. Delivery\n5. After-sales\n\n**Channel Types:**\n• Direct (sales force, web sales)\n• Indirect (retail, wholesale, partners)\n• Own stores\n• Partner stores\n\n**Questions:**\n• Through which channels do customers want to be reached?\n• How are we reaching them now?\n• How cost-efficient are our channels?', inline: false },
        { name: '🤝 Customer Relationships', value: '**What relationship with each segment?**\n• Personal assistance\n• Dedicated personal assistance\n• Self-service\n• Automated services\n• Communities\n• Co-creation\n\n**Questions:**\n• What relationship does each segment expect?\n• Which have we established?\n• How costly are they?\n• How are they integrated?', inline: false },
        { name: '💰 Revenue Streams', value: '**How do you make money?**\n\n**Types:**\n• Asset sale\n• Usage fee\n• Subscription fees\n• Lending/renting/leasing\n• Licensing\n• Brokerage fees\n• Advertising\n\n**Pricing Mechanisms:**\n• Fixed pricing\n• Dynamic pricing\n\n**Questions:**\n• For what value are customers willing to pay?\n• For what do they currently pay?\n• How would they prefer to pay?', inline: false },
        { name: '🔑 Key Resources', value: '**What assets are required?**\n\n**Categories:**\n• **Physical**: Buildings, vehicles, equipment\n• **Intellectual**: Brands, patents, copyrights\n• **Human**: Skilled employees\n• **Financial**: Cash, credit lines\n\n**Questions:**\n• What resources do our value propositions require?\n• Distribution channels?\n• Customer relationships?\n• Revenue streams?', inline: false },
        { name: '⚙️ Key Activities', value: '**What do you do?**\n\n**Categories:**\n• **Production**: Making products\n• **Problem Solving**: Consulting, services\n• **Platform/Network**: Marketplace, social networks\n\n**Questions:**\n• What activities do our value propositions require?\n• Distribution channels?\n• Customer relationships?\n• Revenue streams?', inline: false },
        { name: '🤝 Key Partnerships', value: '**Who are your partners?**\n\n**Types:**\n• Strategic alliances\n• Coopetition\n• Joint ventures\n• Buyer-supplier relationships\n\n**Motivations:**\n• Optimization and economy of scale\n• Reduction of risk\n• Acquisition of resources\n\n**Questions:**\n• Who are our key partners/suppliers?\n• What resources do we acquire from them?\n• What activities do they perform?', inline: false },
        { name: '💸 Cost Structure', value: '**What are the costs?**\n\n**Characteristics:**\n• Fixed costs\n• Variable costs\n• Economies of scale\n• Economies of scope\n\n**Types:**\n• **Cost-Driven**: Minimize costs\n• **Value-Driven**: Premium value\n\n**Questions:**\n• What are the most important costs?\n• Which resources are most expensive?\n• Which activities are most expensive?', inline: false },
        { name: '💡 How to Use', value: '**1. Print/Draw**: Large poster or whiteboard\n**2. Use Post-its**: Easy to move and adjust\n**3. Brainstorm**: Fill in each section\n**4. Iterate**: Refine and improve\n**5. Validate**: Test with customers\n**6. Pivot**: Change elements based on learning\n**7. Update**: Living document, not static\n\n**Benefits:**\n• Visual and intuitive\n• Holistic view\n• Facilitates discussion\n• Quick to complete\n• Identifies dependencies', inline: false }
      )
      .setFooter({ text: 'Developed by Alexander Osterwalder | strategyzer.com' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async marketResearch(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🔍 Market Research & Analysis')
      .setDescription('Techniques for understanding your market')
      .setColor(0x16A085)
      .addFields(
        { name: '📊 Types of Market Research', value: '**Primary Research** (You collect):\n• Surveys and questionnaires\n• Interviews (phone, in-person, video)\n• Focus groups\n• Observations\n• Field trials\n\n**Secondary Research** (Already exists):\n• Industry reports\n• Government statistics (ONS, etc.)\n• Academic research\n• Trade publications\n• Competitor analysis\n• Market research reports', inline: false },
        { name: '🎯 Market Sizing', value: '**Top-Down Approach:**\nStart with total market → narrow down\nExample: UK population × % in target age × % likely to buy\n\n**Bottom-Up Approach:**\nStart with unit economics → scale up\nExample: Units sold per customer × number of customers\n\n**TAM, SAM, SOM:**\n• **TAM**: Total Addressable Market (entire market)\n• **SAM**: Serviceable Available Market (segment you can reach)\n• **SOM**: Serviceable Obtainable Market (realistically can capture)', inline: false },
        { name: '👥 Customer Research', value: '**Demographics:**\n• Age, gender, income, education, occupation, location\n\n**Psychographics:**\n• Lifestyle, values, attitudes, interests, personality\n\n**Behavioral:**\n• Usage rate, loyalty, benefits sought, buyer readiness\n\n**Jobs to Be Done:**\n• What problem are they trying to solve?\n• What outcome do they want?\n• What constraints do they have?', inline: false },
        { name: '📝 Survey Best Practices', value: '• **Clear Questions**: Avoid ambiguity\n• **Unbiased**: Don\'t lead respondents\n• **Appropriate Length**: 5-10 minutes max\n• **Mix Question Types**: Multiple choice, scales, open-ended\n• **Incentivize**: Offer incentive for completion\n• **Test**: Pilot with small group first\n• **Representative Sample**: Ensure sample matches target\n• **Sample Size**: Aim for statistical significance', inline: false },
        { name: '🎤 Interview Techniques', value: '**Preparation:**\n• Research interviewee\n• Prepare discussion guide\n• Set clear objectives\n\n**During Interview:**\n• Start broad, then narrow\n• Ask open-ended questions\n• Listen more than talk\n• Probe deeper ("Tell me more...")\n• Avoid leading questions\n• Record (with permission)\n\n**Questions:**\n• "Walk me through..."\n• "Tell me about a time..."\n• "What frustrates you about..."\n• "How do you currently..."', inline: false },
        { name: '📊 UK Data Sources', value: '• **ONS**: Office for National Statistics (ons.gov.uk)\n• **Companies House**: Company data\n• **GOV.UK**: Government data and statistics\n• **Statista**: Industry statistics\n• **Mintel**: Market research reports\n• **Euromonitor**: Global market intelligence\n• **IBISWorld**: Industry research\n• **Passport**: Market data (Euromonitor)\n• **Trade Associations**: Industry-specific data', inline: false },
        { name: '🔍 Competitor Research', value: '**What to Research:**\n• Products and services\n• Pricing strategies\n• Marketing and positioning\n• Sales channels\n• Customer reviews\n• Financial performance (if public)\n• Job postings (growth indicators)\n• Social media presence\n• Press releases and news\n\n**Tools:**\n• Website analysis (SimilarWeb, Alexa)\n• SEO tools (SEMrush, Ahrefs)\n• Social listening (Mention, Brand24)\n• Review sites (Trustpilot, Google Reviews)', inline: false },
        { name: '📈 Market Trends Analysis', value: '**What to Monitor:**\n• Industry growth rate\n• Technology changes\n• Regulatory changes\n• Economic indicators\n• Consumer behavior shifts\n• Demographic changes\n• Competitive landscape\n\n**Tools:**\n• Google Trends: Search trend data\n• Industry reports: Market forecasts\n• Trade publications: Industry news\n• Social media: Emerging trends\n• Financial news: Economic indicators', inline: false },
        { name: '💡 Analysis Frameworks', value: '• **PEST Analysis**: Political, Economic, Social, Technological\n• **PESTLE**: + Legal, Environmental\n• **Market Segmentation**: Divide market into segments\n• **Perceptual Mapping**: Visualize positioning\n• **Gap Analysis**: Identify unmet needs\n• **Trend Analysis**: Forecast future\n• **Scenario Planning**: Plan for different futures', inline: false },
        { name: '📋 Research Report Structure', value: '**1. Executive Summary**: Key findings\n**2. Objectives**: Research goals\n**3. Methodology**: How research conducted\n**4. Findings**: Detailed results\n**5. Analysis**: Interpretation\n**6. Recommendations**: Actions to take\n**7. Appendices**: Raw data, questionnaires\n\n**Tips:**\n• Visual data (charts, graphs)\n• Highlight key insights\n• Clear, concise language\n• Actionable recommendations', inline: false }
      )
      .setFooter({ text: 'Always validate assumptions with real customer data' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async competitiveAnalysis(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🏆 Competitive Analysis Framework')
      .setDescription('Analyze your competitive landscape and positioning')
      .setColor(0xF39C12)
      .addFields(
        { name: '🎯 Identifying Competitors', value: '**Direct Competitors:**\n• Same products/services\n• Same target market\n• Same price point\n\n**Indirect Competitors:**\n• Different products, same need\n• Substitute products\n• Alternative solutions\n\n**Potential Competitors:**\n• Could easily enter market\n• Adjacent markets\n• Emerging threats\n\n**Where to Find:**\n• Google searches\n• Industry directories\n• Trade shows\n• LinkedIn\n• Customer feedback', inline: false },
        { name: '📊 Competitive Matrix', value: '**Create comparison table with:**\n\n**Columns:** Your business + key competitors\n\n**Rows:**\n• Products/Services offered\n• Target customers\n• Pricing\n• Distribution channels\n• Marketing approach\n• Unique selling points\n• Strengths\n• Weaknesses\n• Market share\n• Financial position\n• Customer reviews/ratings', inline: false },
        { name: '💰 Pricing Analysis', value: '**Analyze:**\n• **Pricing Model**: Subscription, one-time, usage-based\n• **Price Points**: Actual prices\n• **Value for Money**: Price vs. features\n• **Discounts**: Promotional strategies\n• **Payment Terms**: Flexibility\n\n**Positioning:**\n• **Premium**: Highest price, highest quality\n• **Competitive**: Match market price\n• **Penetration**: Lower price, gain market share\n• **Value**: Best value for money', inline: false },
        { name: '🎯 Positioning Map', value: '**Create 2x2 matrix:**\n\n**Example 1:**\n• X-axis: Low Price ← → High Price\n• Y-axis: Low Quality ← → High Quality\n\n**Example 2:**\n• X-axis: Traditional ← → Innovative\n• Y-axis: Basic ← → Premium\n\n**Plot:**\n• Your business\n• All competitors\n\n**Identify:**\n• Crowded areas (high competition)\n• Gaps (opportunities)\n• Your unique position', inline: false },
        { name: '🌐 Digital Presence Analysis', value: '**Website Analysis:**\n• Design and UX\n• Content quality\n• SEO optimization\n• Conversion optimization\n• Loading speed\n\n**Social Media:**\n• Platforms used\n• Follower count\n• Engagement rate\n• Content strategy\n• Posting frequency\n\n**Online Advertising:**\n• Google Ads presence\n• Social media ads\n• Retargeting\n• Keywords targeted\n\n**Tools:**\n• SimilarWeb, Ahrefs, SEMrush', inline: false },
        { name: '⭐ Customer Perception', value: '**Analyze Reviews:**\n• Trustpilot, Google Reviews, Yelp\n• What customers love\n• What customers complain about\n• Common themes\n• Response to feedback\n\n**Net Promoter Score (NPS):**\n• If publicly available\n• Compare to yours\n\n**Win/Loss Analysis:**\n• Why do you win vs. each competitor?\n• Why do you lose?\n• What do sales teams hear?', inline: false },
        { name: '💪 Strengths & Weaknesses', value: '**For Each Competitor:**\n\n**Strengths:**\n• What do they do well?\n• What resources do they have?\n• What advantages?\n• Why do customers choose them?\n\n**Weaknesses:**\n• What could they improve?\n• What do customers complain about?\n• Where are they vulnerable?\n• What gaps in their offering?\n\n**Use to identify:**\n• Your competitive advantages\n• Opportunities to differentiate', inline: false },
        { name: '🚀 Competitive Strategy', value: '**1. Differentiation:**\n• Unique features\n• Better service\n• Superior quality\n• Brand positioning\n\n**2. Cost Leadership:**\n• Lower costs\n• Economies of scale\n• Efficient operations\n\n**3. Focus/Niche:**\n• Specific segment\n• Specialized expertise\n• Tailored solution\n\n**4. Innovation:**\n• First to market\n• Disruptive technology\n• New business model', inline: false },
        { name: '📈 Market Share Analysis', value: '**Estimate Market Share:**\n• Revenue (if available)\n• Customer count\n• Website traffic\n• Social media followers\n• App downloads\n\n**Trends:**\n• Growing or declining?\n• Gaining or losing customers?\n• New product launches?\n• Expansion plans?\n\n**Financial Health:**\n• Funding rounds\n• Profitability\n• Growth rate\n• Valuation', inline: false },
        { name: '⚠️ Competitive Threats', value: '**Monitor:**\n• New product launches\n• Pricing changes\n• Marketing campaigns\n• Partnerships announced\n• Funding raised\n• Key hires\n• Expansion into new markets\n• Technology developments\n\n**Set up alerts:**\n• Google Alerts\n• Social media monitoring\n• Industry newsletters\n• LinkedIn company pages', inline: false },
        { name: '💡 Action Plan', value: '**Based on Analysis:**\n\n**1. Leverage Your Strengths**\n• Double down on advantages\n• Highlight differentiation\n\n**2. Address Weaknesses**\n• Fix vulnerabilities\n• Learn from competitors\n\n**3. Exploit Gaps**\n• Serve underserved segments\n• Offer missing features\n\n**4. Monitor Threats**\n• Stay ahead of competitors\n• Respond quickly to changes\n\n**5. Continuous Analysis**\n• Quarterly reviews\n• Update positioning', inline: false }
      )
      .setFooter({ text: 'Know your competition, but focus on serving customers better' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async growthStrategies(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🚀 Business Growth Strategies')
      .setDescription('Frameworks and strategies for scaling your business')
      .setColor(0x2ECC71)
      .addFields(
        { name: '📊 Ansoff Matrix', value: '**Market Penetration** (Existing Market, Existing Product):\n• Increase market share\n• Increase usage frequency\n• Find new uses\n• Lower price: competitive\n• Risk: Low\n\n**Market Development** (New Market, Existing Product):\n• Geographic expansion\n• New segments\n• New channels\n• Risk: Medium\n\n**Product Development** (Existing Market, New Product):\n• New features\n• New products\n• New versions\n• Risk: Medium\n\n**Diversification** (New Market, New Product):\n• Related diversification\n• Unrelated diversification\n• Risk: High', inline: false },
        { name: '🎯 Growth Channels', value: '**Organic Growth:**\n• SEO and content marketing\n• Social media marketing\n• Email marketing\n• Referral programs\n• Partnerships\n• PR and media\n• Community building\n\n**Paid Growth:**\n• Google Ads\n• Social media ads\n• Display advertising\n• Influencer marketing\n• Affiliate marketing\n\n**Sales-Led:**\n• Direct sales\n• Inside sales\n• Channel partners\n• Strategic partnerships', inline: false },
        { name: '💰 Pricing Strategies for Growth', value: '**Penetration Pricing:**\n• Low initial price\n• Gain market share quickly\n• Then increase price\n\n**Freemium:**\n• Free basic version\n• Premium paid features\n• Convert free to paid\n\n**Value-Based:**\n• Price based on value delivered\n• Align with customer ROI\n\n**Tiered Pricing:**\n• Multiple price points\n• Appeal to different segments\n• Encourage upgrades', inline: false },
        { name: '📈 Scalability Factors', value: '**Business Model:**\n• Low marginal cost\n• High gross margins\n• Recurring revenue\n• Network effects\n\n**Operations:**\n• Standardized processes\n• Automation\n• Technology leverage\n• Outsourcing capability\n\n**Organization:**\n• Scalable structure\n• Strong culture\n• Systems and processes\n• Leadership depth', inline: false },
        { name: '🔄 Growth Loops', value: '**Viral Loop:**\nUser → Invites Friend → Friend Signs Up → Friend Invites → ...\n\n**Content Loop:**\nCreate Content → Get Traffic → Capture Leads → Convert → ...\n\n**Product-Led:**\nFree Trial → See Value → Upgrade → Invite Team → ...\n\n**Network Effect:**\nUser Joins → More Valuable → More Users → Even More Valuable → ...', inline: false },
        { name: '🎯 North Star Metric', value: '**What is it?**\nSingle metric that best captures core value delivered\n\n**Examples:**\n• **Airbnb**: Nights booked\n• **Facebook**: Daily active users\n• **Slack**: Messages sent\n• **Spotify**: Time listening\n\n**Characteristics:**\n• Measures value to customer\n• Predicts long-term success\n• Actionable by team\n• Understandable\n• Measurable\n\n**Supporting Metrics:**\n• Acquisition\n• Activation\n• Retention\n• Revenue\n• Referral', inline: false },
        { name: '🚀 Growth Hacking Tactics', value: '• **Referral Programs**: Incentivize referrals\n• **Content Marketing**: SEO-optimized content\n• **Email Sequences**: Automated nurture\n• **Product Virality**: Built-in sharing\n• **Partnerships**: Strategic alliances\n• **Community**: Build engaged community\n• **Press**: Media coverage\n• **Events**: Conferences, webinars\n• **Influencers**: Leverage influencers\n• **Retargeting**: Bring back visitors', inline: false },
        { name: '📊 Unit Economics', value: '**Key Metrics:**\n\n**CAC (Customer Acquisition Cost):**\nTotal marketing + sales costs ÷ New customers\n\n**LTV (Lifetime Value):**\nAverage revenue per customer × Lifespan\n\n**LTV:CAC Ratio:**\n• **<1**: Losing money on each customer\n• **1-3**: Break-even to okay\n• **3+**: Good economics\n• **>5**: Excellent\n\n**Payback Period:**\nHow long to recover CAC\n• Target: <12 months', inline: false },
        { name: '🎯 Market Expansion', value: '**Geographic Expansion:**\n• New cities/regions\n• International markets\n• Research local needs\n• Adapt for local markets\n• Compliance requirements\n\n**Vertical Expansion:**\n• Move up/down value chain\n• Offer complementary services\n• Control more of customer journey\n\n**Horizontal Expansion:**\n• New customer segments\n• Adjacent markets\n• New use cases', inline: false },
        { name: '🤝 Strategic Partnerships', value: '**Types:**\n• **Distribution**: Access to customers\n• **Technology**: Integrate platforms\n• **Co-Marketing**: Joint campaigns\n• **Reseller**: Sell your product\n• **OEM**: Embed in their product\n\n**Benefits:**\n• Faster growth\n• Lower CAC\n• Access to expertise\n• Credibility\n• Shared resources\n\n**Keys to Success:**\n• Aligned incentives\n• Clear agreements\n• Regular communication\n• Win-win outcomes', inline: false },
        { name: '💡 Growth Experimentation', value: '**Process:**\n**1. Hypothesis**: What we believe will work\n**2. Experiment Design**: How to test\n**3. Success Metrics**: How to measure\n**4. Run Experiment**: Execute test\n**5. Analyze Results**: What did we learn?\n**6. Iterate**: Refine and repeat\n\n**Best Practices:**\n• Small, fast experiments\n• Data-driven decisions\n• Document learnings\n• Build on successes\n• Kill failures fast\n• Test multiple channels', inline: false }
      )
      .setFooter({ text: 'Focus on sustainable, profitable growth, not growth at all costs' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async balancedScorecard(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📈 Balanced Scorecard Framework')
      .setDescription('Strategic performance management system beyond financial metrics')
      .setColor(0x3498DB)
      .addFields(
        { name: '🎯 Four Perspectives', value: '**1. Financial Perspective**\n• Revenue growth\n• Profitability\n• Cost reduction\n• Asset utilization\n• ROI\n\n**2. Customer Perspective**\n• Customer satisfaction\n• Customer retention\n• Market share\n• Customer acquisition\n\n**3. Internal Process Perspective**\n• Quality\n• Efficiency\n• Innovation\n• Process improvement\n\n**4. Learning & Growth Perspective**\n• Employee satisfaction\n• Training\n• Innovation culture\n• Technology/systems', inline: false },
        { name: '💰 Financial Perspective', value: '**Strategic Objectives:**\n• Increase revenue\n• Improve profitability\n• Enhance shareholder value\n• Optimize costs\n\n**Sample Metrics:**\n• Revenue growth %\n• Net profit margin\n• ROI/ROCE\n• Operating cash flow\n• Cost per unit\n• EBITDA margin\n\n**Questions:**\n• How do we look to shareholders?\n• What financial objectives must we achieve?', inline: false },
        { name: '😊 Customer Perspective', value: '**Strategic Objectives:**\n• Increase customer satisfaction\n• Improve customer retention\n• Grow market share\n• Enhance brand value\n\n**Sample Metrics:**\n• Net Promoter Score (NPS)\n• Customer Satisfaction Score (CSAT)\n• Customer retention rate\n• Market share %\n• Customer lifetime value\n• Brand awareness\n• Customer complaints\n\n**Questions:**\n• How do customers see us?\n• What must we excel at to satisfy customers?', inline: false },
        { name: '⚙️ Internal Process Perspective', value: '**Strategic Objectives:**\n• Improve operational efficiency\n• Enhance quality\n• Accelerate innovation\n• Reduce cycle time\n\n**Sample Metrics:**\n• Process cycle time\n• Defect rate/PPM\n• On-time delivery %\n• Productivity metrics\n• Innovation rate (new products)\n• Process costs\n• Capacity utilization\n\n**Questions:**\n• What processes must we excel at?\n• Where must we improve to satisfy customers?', inline: false },
        { name: '🎓 Learning & Growth Perspective', value: '**Strategic Objectives:**\n• Develop employee capabilities\n• Enhance information systems\n• Foster innovation culture\n• Improve employee engagement\n\n**Sample Metrics:**\n• Employee satisfaction\n• Employee turnover rate\n• Training hours per employee\n• Skills coverage %\n• Employee productivity\n• Innovation suggestions\n• System availability %\n\n**Questions:**\n• Can we continue to improve and create value?\n• How do we develop capabilities?', inline: false },
        { name: '🔗 Strategy Map', value: '**Visual representation showing:**\n• Strategic objectives in each perspective\n• Cause-and-effect relationships\n• How objectives link together\n\n**Example Flow:**\nLearning & Growth → Internal Process → Customer → Financial\n\n"Train employees" → "Improve quality" → "Increase satisfaction" → "Higher retention" → "Revenue growth"', inline: false },
        { name: '📊 Setting Objectives & Targets', value: '**For Each Objective:**\n**1. Objective**: What to achieve\n**2. Measure**: How to measure\n**3. Target**: Specific goal\n**4. Initiatives**: Actions to take\n**5. Owner**: Who\'s responsible\n\n**Example:**\n• **Objective**: Improve customer satisfaction\n• **Measure**: NPS score\n• **Target**: NPS ≥50 by year-end\n• **Initiatives**: Customer feedback program, service training\n• **Owner**: Customer Success Director', inline: false },
        { name: '🎯 Implementation Steps', value: '**1. Strategy Clarification:**\n• Define vision and strategy\n• Identify strategic themes\n\n**2. Strategy Translation:**\n• Develop strategy map\n• Select objectives and measures\n• Set targets\n\n**3. Alignment:**\n• Cascade to departments/teams\n• Link to individual goals\n• Align budgets and resources\n\n**4. Execution:**\n• Launch initiatives\n• Monitor progress\n• Regular reviews\n\n**5. Learning:**\n• Analyze results\n• Test hypotheses\n• Adapt strategy', inline: false },
        { name: '📈 Monitoring & Review', value: '**Review Frequency:**\n• **Daily/Weekly**: Operational metrics\n• **Monthly**: Management review\n• **Quarterly**: Strategic review\n• **Annual**: Strategy update\n\n**Review Meetings:**\n• Present scorecard\n• Discuss variances\n• Identify issues\n• Review initiatives\n• Make decisions\n• Document actions\n\n**Dashboard:**\n• Visual representation\n• Traffic lights (red/amber/green)\n• Trend arrows\n• Executive summary', inline: false },
        { name: '💡 Best Practices', value: '• **Executive Sponsorship**: Leadership commitment\n• **Clear Strategy**: Link to strategy\n• **Balanced**: All four perspectives\n• **Limited Measures**: 15-20 total measures\n• **Cause-Effect**: Link objectives\n• **Actionable**: Drive action\n• **Integrated**: Part of management routine\n• **Evolve**: Update as strategy evolves\n• **Communicate**: Share widely\n• **Incentives**: Link to performance management', inline: false },
        { name: '⚠️ Common Pitfalls', value: '• Too many measures\n• Focus only on financial\n• No clear strategy\n• Poor communication\n• No ownership\n• Static (not updated)\n• No linkage between perspectives\n• Just a reporting exercise\n• Not integrated into management\n• Overcomplicated', inline: false }
      )
      .setFooter({ text: 'Developed by Kaplan & Norton | balancedscorecard.org' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async pricingStrategies(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('💰 Pricing Strategies & Models')
      .setDescription('Optimize your pricing for profitability and growth')
      .setColor(0xE67E22)
      .addFields(
        { name: '📊 Pricing Strategies', value: '**Cost-Plus Pricing:**\nCost + Markup = Price\n• Simple and straightforward\n• Ensures profitability\n• Ignores customer value\n\n**Value-Based Pricing:**\nPrice based on perceived value\n• Maximize profitability\n• Requires understanding value\n• Higher margins possible\n\n**Competition-Based:**\nPrice relative to competitors\n• Match, beat, or premium\n• Easy to implement\n• May leave money on table\n\n**Dynamic Pricing:**\nAdjust based on demand\n• Maximize revenue\n• Requires sophistication\n• Airlines, hotels, Uber', inline: false },
        { name: '🎯 Pricing Models', value: '**One-Time Purchase:**\n• Single payment\n• Perpetual access\n• Higher upfront\n\n**Subscription:**\n• Recurring payments\n• Predictable revenue\n• Monthly/annual plans\n\n**Freemium:**\n• Free basic version\n• Paid premium features\n• Convert free to paid\n\n**Usage-Based:**\n• Pay per use\n• Scales with usage\n• Lower barrier to entry\n\n**Tiered Pricing:**\n• Multiple packages\n• Good, better, best\n• Appeal to different segments', inline: false },
        { name: '💎 Premium Pricing', value: '**When to Use:**\n• High quality/luxury product\n• Strong brand\n• Limited competition\n• Status symbol\n• Unique value proposition\n\n**Requirements:**\n• Deliver exceptional value\n• Strong brand positioning\n• Excellent customer service\n• Quality guarantee\n• Premium experience\n\n**Benefits:**\n• Higher margins\n• Quality perception\n• Attract target customers\n• Fund superior service\n\n**Risks:**\n• Limited market size\n• Vulnerable to competition\n• Must maintain quality', inline: false },
        { name: '🚀 Penetration Pricing', value: '**When to Use:**\n• Entering new market\n• Gaining market share quickly\n• Building user base\n• Network effects\n\n**Strategy:**\n• Low initial price\n• Gain customers fast\n• Increase price later\n• Or upsell premium features\n\n**Benefits:**\n• Rapid adoption\n• Market share gains\n• Deter competitors\n• Build brand awareness\n\n**Risks:**\n• Low margins initially\n• Price increase resistance\n• Race to bottom\n• Difficulty raising prices', inline: false },
        { name: '📈 Price Optimization', value: '**Factors to Consider:**\n• Cost structure (fixed + variable)\n• Target margins\n• Customer willingness to pay\n• Competitor pricing\n• Market positioning\n• Volume vs. margin trade-off\n\n**Price Sensitivity:**\n• How does demand change with price?\n• Price elasticity\n• Conduct price testing\n• Survey willingness to pay\n• A/B test different prices\n\n**Optimization:**\n• Find price that maximizes profit\n• Not necessarily highest price\n• Balance volume and margin', inline: false },
        { name: '🎁 Discounting Strategies', value: '**Types:**\n• Volume discounts\n• Early payment discounts\n• Seasonal discounts\n• Promotional discounts\n• Bundle discounts\n• Loyalty discounts\n\n**Best Practices:**\n• Have clear rationale\n• Time-limited\n• Strategic, not desperate\n• Track discount impact\n• Don\'t over-discount\n• Maintain perceived value\n\n**Avoid:**\n• Constant discounting\n• Training customers to wait\n• Eroding brand value\n• Unprofitable deals', inline: false },
        { name: '📦 Packaging & Bundling', value: '**Product Bundling:**\n• Combine multiple products\n• Increase transaction value\n• Move slow-moving inventory\n• Create unique offering\n\n**Good-Better-Best:**\n• Three-tier structure\n• Basic, standard, premium\n• Psychological advantage\n• Most choose middle\n\n**Anchoring:**\n• High-priced option\n• Makes others seem reasonable\n• Improves conversion\n\n**Add-Ons:**\n• Base product + optional extras\n• Increases revenue per customer\n• Customization', inline: false },
        { name: '🧪 Price Testing', value: '**Methods:**\n\n**A/B Testing:**\n• Show different prices to different users\n• Measure conversion rates\n• Statistical significance\n\n**Van Westendorp:**\n• Four questions:\n  - Too expensive\n  - Expensive\n  - Cheap\n  - Too cheap\n• Identify acceptable price range\n\n**Conjoint Analysis:**\n• Trade-off analysis\n• Features vs. price\n• Willingness to pay\n\n**Price Laddering:**\n• Incrementally ask about prices\n• Find price sensitivity\n• Maximum willingness to pay', inline: false },
        { name: '💡 Pricing Psychology', value: '**Charm Pricing:**\n• £9.99 instead of £10\n• Perceived as significantly less\n• Left-digit effect\n\n**Prestige Pricing:**\n• Round numbers for luxury\n• £100, not £99\n• Signals quality\n\n**Anchoring:**\n• Show higher price first\n• Makes actual price seem better\n• "Was £200, now £150"\n\n**Decoy Pricing:**\n• Middle option becomes attractive\n• When third option added\n• Influences choice\n\n**Price Framing:**\n• £1/day vs. £365/year\n• Changes perception', inline: false },
        { name: '🌍 International Pricing', value: '**Considerations:**\n• **Currency**: Local currency vs. USD/GBP\n• **Purchasing Power**: Adjust for local economy\n• **Competition**: Local competitors\n• **Costs**: Import duties, taxes, shipping\n• **VAT/GST**: Tax implications\n• **Payment Methods**: Local preferences\n\n**Strategies:**\n• Standard global pricing\n• Region-specific pricing\n• Purchasing power parity\n• Cost-plus with local costs', inline: false },
        { name: '📊 Pricing Metrics', value: '**To Monitor:**\n• **Average Transaction Value**: Average sale amount\n• **Price Realization**: Actual vs. list price\n• **Discount Rate**: % of sales discounted\n• **Price Variance**: Price consistency\n• **Win Rate by Price**: Conversion at different prices\n• **Revenue per Customer**: Average customer value\n• **Margin by Product**: Profitability by SKU\n• **Price Elasticity**: Demand change vs. price change\n\n**Regular Reviews:**\n• Quarterly pricing reviews\n• Competitive price monitoring\n• Margin analysis\n• Discount effectiveness', inline: false }
      )
      .setFooter({ text: 'Price is a key lever for profitability - test and optimize continuously' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
