const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('operations-toolkit')
    .setDescription('Operational excellence and process improvement tools')
    .addSubcommand(subcommand =>
      subcommand
        .setName('menu')
        .setDescription('View operations toolkit menu'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('process-mapping')
        .setDescription('Process mapping and optimization guide'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('lean-six-sigma')
        .setDescription('Lean and Six Sigma methodologies'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('supply-chain')
        .setDescription('Supply chain optimization'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('inventory-management')
        .setDescription('Inventory management best practices'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('quality-management')
        .setDescription('Quality management systems'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('project-management')
        .setDescription('Project management frameworks'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('kpi-dashboard')
        .setDescription('Key performance indicators and metrics'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('risk-management')
        .setDescription('Operational risk management')),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'menu':
        await this.showMenu(interaction);
        break;
      case 'process-mapping':
        await this.processMapping(interaction);
        break;
      case 'lean-six-sigma':
        await this.leanSixSigma(interaction);
        break;
      case 'supply-chain':
        await this.supplyChain(interaction);
        break;
      case 'inventory-management':
        await this.inventoryManagement(interaction);
        break;
      case 'quality-management':
        await this.qualityManagement(interaction);
        break;
      case 'project-management':
        await this.projectManagement(interaction);
        break;
      case 'kpi-dashboard':
        await this.kpiDashboard(interaction);
        break;
      case 'risk-management':
        await this.riskManagement(interaction);
        break;
    }
  },

  async showMenu(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('⚙️ Operations Toolkit')
      .setDescription('Operational excellence and process improvement tools')
      .setColor(0xF39C12)
      .addFields(
        { name: '🗺️ Process Mapping', value: 'Map and optimize processes', inline: true },
        { name: '📊 Lean Six Sigma', value: 'Continuous improvement methodologies', inline: true },
        { name: '🚚 Supply Chain', value: 'Supply chain optimization', inline: true },
        { name: '📦 Inventory', value: 'Inventory management systems', inline: true },
        { name: '✅ Quality', value: 'Quality management frameworks', inline: true },
        { name: '📋 Projects', value: 'Project management tools', inline: true },
        { name: '📈 KPIs', value: 'Performance metrics dashboard', inline: true },
        { name: '⚠️ Risk', value: 'Operational risk management', inline: true }
      )
      .setFooter({ text: 'Use /operations-toolkit [tool-name] to access specific tools' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async processMapping(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🗺️ Process Mapping & Optimization')
      .setDescription('Map, analyze, and improve business processes')
      .setColor(0x3498DB)
      .addFields(
        { name: '📊 Types of Process Maps', value: '• **Flowchart**: Basic process flow\n• **Swimlane Diagram**: Cross-functional processes\n• **Value Stream Map**: Lean manufacturing focus\n• **SIPOC**: Suppliers, Inputs, Process, Outputs, Customers\n• **Data Flow Diagram**: Information flow\n• **Workflow Diagram**: Document routing', inline: false },
        { name: '🎯 When to Use Process Mapping', value: '• Onboarding new employees\n• Identifying bottlenecks\n• Process improvement initiatives\n• Compliance documentation\n• System implementations\n• Problem-solving\n• Training materials\n• ISO certification', inline: false },
        { name: '📝 Process Mapping Steps', value: '**1. Define Scope**: What process to map\n**2. Identify Steps**: List all activities\n**3. Sequence**: Order of activities\n**4. Decisions**: Decision points\n**5. Handoffs**: Between people/departments\n**6. Inputs/Outputs**: What goes in/out\n**7. Timeframes**: Duration of each step\n**8. Validate**: Confirm with stakeholders', inline: false },
        { name: '🔍 Process Analysis', value: '• **Value-Add**: Does it add customer value?\n• **Waste**: Identify non-value-add activities\n• **Bottlenecks**: Where does work pile up?\n• **Rework**: Quality issues causing rework?\n• **Wait Times**: Delays between steps?\n• **Handoffs**: Too many handoffs?\n• **Complexity**: Unnecessarily complex?\n• **Duplication**: Repeated activities?', inline: false },
        { name: '🎨 Optimization Techniques', value: '• **Eliminate**: Remove non-value-add steps\n• **Simplify**: Reduce complexity\n• **Automate**: Use technology\n• **Standardize**: Consistent approach\n• **Combine**: Merge similar steps\n• **Resequence**: Better order\n• **Parallel**: Do simultaneously\n• **Empower**: Push decisions down', inline: false },
        { name: '📊 Common Symbols', value: '• **Oval**: Start/End\n• **Rectangle**: Process step\n• **Diamond**: Decision point\n• **Arrow**: Flow direction\n• **Cylinder**: Database/storage\n• **Document**: Document/report\n• **Delay**: Waiting period\n• **Connector**: Connect to another part', inline: false },
        { name: '🛠️ Tools for Process Mapping', value: '• **Free**: Draw.io, Google Drawings, Lucidchart (basic)\n• **Paid**: Visio, Lucidchart Pro, Miro, SmartDraw\n• **Specialized**: Bizagi, Signavio, ProcessMaker\n• **Collaborative**: Miro, Mural, Lucidchart\n• **Simple**: PowerPoint, Whiteboard', inline: false },
        { name: '📈 Measuring Improvement', value: '• **Cycle Time**: Time start to finish\n• **Processing Time**: Actual work time\n• **Wait Time**: Time waiting\n• **Error Rate**: Quality metrics\n• **Cost**: Cost per transaction\n• **Customer Satisfaction**: CSAT scores\n• **Employee Satisfaction**: Team feedback\n• **Capacity**: Throughput increase', inline: false },
        { name: '💡 Best Practices', value: '• **Walk the Process**: Observe firsthand\n• **Include Workers**: Those doing the work know best\n• **Current State First**: Document "as-is" before "to-be"\n• **Keep Simple**: Don\'t over-complicate\n• **Visual**: Use colors, symbols\n• **Document Assumptions**: Note what\'s assumed\n• **Version Control**: Track changes\n• **Review Regularly**: Processes evolve', inline: false }
      )
      .setFooter({ text: 'Start with simple flowcharts before complex diagrams' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async leanSixSigma(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📊 Lean & Six Sigma Methodologies')
      .setDescription('Continuous improvement and waste reduction')
      .setColor(0x2ECC71)
      .addFields(
        { name: '🎯 Lean Principles', value: '**1. Define Value**: What customer values\n**2. Map Value Stream**: All steps to deliver\n**3. Create Flow**: Smooth process flow\n**4. Establish Pull**: Customer-driven production\n**5. Pursue Perfection**: Continuous improvement', inline: false },
        { name: '🗑️ 8 Wastes (DOWNTIME)', value: '• **D**efects: Quality issues\n• **O**verproduction: Making too much\n• **W**aiting: Idle time\n• **N**on-utilized talent: Underused skills\n• **T**ransportation: Unnecessary movement\n• **I**nventory: Excess stock\n• **M**otion: Unnecessary movement of people\n• **E**xcess processing: Doing more than needed', inline: false },
        { name: '📈 Six Sigma DMAIC', value: '**D**efine: Problem and project goals\n**M**easure: Current process performance\n**A**nalyze: Identify root causes\n**I**mprove: Implement solutions\n**C**ontrol: Sustain improvements', inline: false },
        { name: '🎯 Six Sigma Levels', value: '• **1 Sigma**: 691,462 defects per million (69% quality)\n• **2 Sigma**: 308,538 DPMO (31% quality)\n• **3 Sigma**: 66,807 DPMO (93.3% quality)\n• **4 Sigma**: 6,210 DPMO (99.4% quality)\n• **5 Sigma**: 233 DPMO (99.977% quality)\n• **6 Sigma**: 3.4 DPMO (99.9997% quality)', inline: false },
        { name: '🛠️ Lean Tools', value: '• **5S**: Sort, Set in order, Shine, Standardize, Sustain\n• **Kaizen**: Continuous small improvements\n• **Kanban**: Visual workflow management\n• **Poka-Yoke**: Error-proofing\n• **Value Stream Mapping**: Visualize flow\n• **Takt Time**: Production rate to meet demand\n• **One-Piece Flow**: Single item through process', inline: false },
        { name: '📊 Six Sigma Tools', value: '• **Control Charts**: Monitor process stability\n• **Pareto Analysis**: 80/20 rule\n• **Fishbone Diagram**: Root cause analysis\n• **Process Capability**: Cp, Cpk analysis\n• **Hypothesis Testing**: Statistical validation\n• **Regression Analysis**: Relationship analysis\n• **FMEA**: Failure modes & effects analysis', inline: false },
        { name: '5️⃣ 5 Why Analysis', value: '**Problem**: Machine stopped\n**Why 1**: Overload\n**Why 2**: Bearing not lubricated\n**Why 3**: Lubrication pump not working\n**Why 4**: Shaft worn out\n**Why 5**: No strainer, metal particles got in\n**Root Cause**: No strainer installed', inline: false },
        { name: '🎓 Belt System', value: '• **White Belt**: Basic awareness\n• **Yellow Belt**: Team member support\n• **Green Belt**: Lead small projects\n• **Black Belt**: Lead major projects\n• **Master Black Belt**: Coach and mentor\n• **Champion**: Senior leadership support', inline: false },
        { name: '💡 Implementation Steps', value: '**1. Leadership Commitment**: Secure buy-in\n**2. Training**: Train team in methodology\n**3. Select Projects**: High-impact opportunities\n**4. Form Teams**: Cross-functional teams\n**5. Execute DMAIC**: Follow methodology\n**6. Track Results**: Measure improvements\n**7. Celebrate**: Recognize success\n**8. Sustain**: Make it part of culture', inline: false },
        { name: '📈 Expected Benefits', value: '• **Cost Reduction**: 15-30% typical\n• **Defect Reduction**: 50-90% reduction\n• **Cycle Time**: 25-50% improvement\n• **Customer Satisfaction**: Significant increase\n• **Employee Morale**: Improved engagement\n• **Revenue Growth**: Through better quality/speed', inline: false }
      )
      .setFooter({ text: 'Start with Lean basics before advanced Six Sigma' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async supplyChain(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🚚 Supply Chain Optimization')
      .setDescription('End-to-end supply chain management')
      .setColor(0xE67E22)
      .addFields(
        { name: '🔗 Supply Chain Components', value: '• **Planning**: Demand forecasting, S&OP\n• **Sourcing**: Supplier selection, procurement\n• **Making**: Production, manufacturing\n• **Delivering**: Logistics, warehousing, distribution\n• **Returning**: Reverse logistics, returns', inline: false },
        { name: '📊 Key Performance Indicators', value: '• **Perfect Order Rate**: % orders delivered complete, on-time, damage-free\n• **Cash-to-Cash Cycle**: Days from paying supplier to receiving payment\n• **Inventory Turnover**: How often inventory sold/replaced\n• **Supply Chain Costs**: % of revenue\n• **Fill Rate**: % of orders fulfilled from stock\n• **On-Time Delivery**: % delivered on promised date\n• **Lead Time**: Order to delivery time', inline: false },
        { name: '👥 Supplier Management', value: '• **Selection**: Evaluate capabilities, quality, cost\n• **Contracts**: Clear terms and SLAs\n• **Performance**: Regular scorecard reviews\n• **Relationships**: Strategic partnerships\n• **Risk**: Assess supplier risk\n• **Development**: Help suppliers improve\n• **Diversity**: Multiple suppliers for critical items', inline: false },
        { name: '📦 Inventory Strategies', value: '• **Just-in-Time (JIT)**: Minimal inventory\n• **Safety Stock**: Buffer for variability\n• **Economic Order Quantity**: Optimal order size\n• **ABC Analysis**: Classify by value\n• **Consignment**: Supplier owns inventory\n• **Vendor-Managed**: Supplier manages levels\n• **Cross-Docking**: Direct transfer, no storage', inline: false },
        { name: '🚛 Logistics Optimization', value: '• **Route Optimization**: Shortest/cheapest routes\n• **Load Consolidation**: Fill trucks efficiently\n• **Mode Selection**: Air, ocean, road, rail\n• **3PL Partners**: Third-party logistics\n• **Track & Trace**: Real-time visibility\n• **Warehouse Location**: Strategic placement\n• **Last Mile**: Efficient final delivery', inline: false },
        { name: '📈 Demand Planning', value: '• **Forecasting**: Predict future demand\n• **Historical Data**: Analyze past trends\n• **Market Intelligence**: External factors\n• **Seasonality**: Seasonal patterns\n• **Promotions**: Impact of marketing\n• **New Products**: Launch planning\n• **Collaboration**: Work with customers\n• **S&OP**: Sales & Operations Planning', inline: false },
        { name: '⚠️ Risk Management', value: '• **Single Source**: Avoid dependency on one supplier\n• **Geopolitical**: Monitor political stability\n• **Natural Disasters**: Business continuity plans\n• **Quality Issues**: Supplier quality audits\n• **Price Volatility**: Hedging strategies\n• **Capacity**: Ensure supplier capacity\n• **Compliance**: Regulatory compliance\n• **Cybersecurity**: Protect supply chain data', inline: false },
        { name: '💻 Technology Solutions', value: '• **ERP Systems**: SAP, Oracle, Microsoft Dynamics\n• **WMS**: Warehouse management systems\n• **TMS**: Transportation management systems\n• **Forecasting Tools**: Demand planning software\n• **Analytics**: Power BI, Tableau\n• **IoT**: Real-time tracking sensors\n• **Blockchain**: Supply chain transparency\n• **AI/ML**: Predictive analytics', inline: false },
        { name: '🌍 Sustainability', value: '• **Carbon Footprint**: Measure and reduce emissions\n• **Packaging**: Sustainable materials\n• **Local Sourcing**: Reduce transportation\n• **Circular Economy**: Reuse and recycle\n• **Ethical Sourcing**: Fair labor practices\n• **Green Logistics**: Eco-friendly transport\n• **Reporting**: ESG reporting', inline: false },
        { name: '💡 Optimization Strategies', value: '• **Network Design**: Optimal facility locations\n• **Centralize vs Decentralize**: Inventory strategy\n• **Postponement**: Delay customization\n• **Drop-Shipping**: Direct from supplier\n• **Collaboration**: Share information with partners\n• **Continuous Improvement**: Regular reviews\n• **Agility**: Respond quickly to changes\n• **Resilience**: Build robustness', inline: false }
      )
      .setFooter({ text: 'CIPS: cips.org | Supply Chain Digital' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async inventoryManagement(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📦 Inventory Management Best Practices')
      .setDescription('Optimize inventory levels and reduce costs')
      .setColor(0x16A085)
      .addFields(
        { name: '📊 Key Metrics', value: '• **Inventory Turnover**: COGS ÷ Average Inventory\n• **Days Sales of Inventory (DSI)**: 365 ÷ Inventory Turnover\n• **Stock-out Rate**: % of time out of stock\n• **Carrying Cost**: % of inventory value (typically 20-30%)\n• **Order Accuracy**: % orders correct\n• **Shrinkage**: Loss from theft, damage, error', inline: false },
        { name: '🎯 ABC Analysis', value: '• **A Items (20%)**: 80% of value - Tight control, frequent review\n• **B Items (30%)**: 15% of value - Moderate control\n• **C Items (50%)**: 5% of value - Simple controls\n\n**Focus**: Most attention on A items', inline: false },
        { name: '📈 Reorder Point Formula', value: '**ROP = (Average Daily Usage × Lead Time) + Safety Stock**\n\nExample:\n• Average daily usage: 10 units\n• Lead time: 5 days\n• Safety stock: 20 units\n• **ROP = (10 × 5) + 20 = 70 units**\n\nReorder when inventory reaches 70 units', inline: false },
        { name: '📦 Economic Order Quantity (EOQ)', value: '**EOQ = √(2 × D × S ÷ H)**\n\nWhere:\n• D = Annual demand\n• S = Order cost per order\n• H = Holding cost per unit per year\n\nOptimal order quantity that minimizes total inventory costs', inline: false },
        { name: '🛡️ Safety Stock Calculation', value: '**Safety Stock = (Max Daily Usage × Max Lead Time) - (Avg Daily Usage × Avg Lead Time)**\n\nProtects against:\n• Demand variability\n• Supply variability\n• Lead time variability\n• Service level requirements', inline: false },
        { name: '🔄 Inventory Methods', value: '• **FIFO**: First In, First Out - older stock first\n• **LIFO**: Last In, First Out - newer stock first\n• **FEFO**: First Expired, First Out - for perishables\n• **Weighted Average**: Average cost method\n• **Specific Identification**: Track individual items', inline: false },
        { name: '📱 Inventory Systems', value: '• **Perpetual**: Real-time continuous tracking\n• **Periodic**: Count at intervals (weekly, monthly)\n• **Barcode**: Scan items in/out\n• **RFID**: Radio frequency identification\n• **ERP Integration**: Link to enterprise systems\n• **Cloud-Based**: Real-time access anywhere\n• **Mobile Apps**: Handheld scanning', inline: false },
        { name: '✅ Cycle Counting', value: '• **Daily Counts**: Count portion of inventory\n• **ABC Frequency**: A items weekly, B monthly, C quarterly\n• **Benefits**: No shutdown, continuous accuracy\n• **Root Cause**: Investigate discrepancies\n• **Accuracy Target**: 95%+ accuracy\n• **Process**: Plan, count, investigate, correct', inline: false },
        { name: '💰 Cost Components', value: '• **Purchase Cost**: Cost to buy inventory\n• **Ordering Cost**: Cost to place orders\n• **Carrying Cost**: Storage, insurance, obsolescence, capital\n• **Shortage Cost**: Lost sales, expedited shipping\n• **Quality Cost**: Inspection, returns, warranty', inline: false },
        { name: '⚠️ Common Problems', value: '• **Overstocking**: Excess inventory ties up cash\n• **Stockouts**: Lost sales, customer dissatisfaction\n• **Obsolescence**: Products become outdated\n• **Shrinkage**: Theft, damage, errors\n• **Poor Forecasting**: Inaccurate demand prediction\n• **No Visibility**: Don\'t know what you have\n• **Manual Processes**: Errors and inefficiency', inline: false },
        { name: '💡 Best Practices', value: '• **Regular Audits**: Cycle counting program\n• **Accurate Forecasting**: Use data analytics\n• **Supplier Collaboration**: Share forecasts\n• **Technology**: Invest in inventory software\n• **Training**: Train staff on procedures\n• **KPI Monitoring**: Track key metrics\n• **Continuous Improvement**: Regular reviews\n• **Clear Processes**: Document procedures', inline: false }
      )
      .setFooter({ text: 'Proper inventory management can reduce costs by 20-30%' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async qualityManagement(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('✅ Quality Management Systems')
      .setDescription('Implement robust quality management frameworks')
      .setColor(0x9B59B6)
      .addFields(
        { name: '📋 ISO 9001:2015 - QMS Standard', value: '• **Customer Focus**: Meet customer requirements\n• **Leadership**: Top management commitment\n• **Engagement of People**: Competent, empowered people\n• **Process Approach**: Manage activities as processes\n• **Improvement**: Continual improvement\n• **Evidence-based**: Data-driven decisions\n• **Relationship Management**: Manage supplier relationships', inline: false },
        { name: '🎯 Quality Objectives', value: '• **Specific**: Clear and precise\n• **Measurable**: Quantifiable metrics\n• **Achievable**: Realistic targets\n• **Relevant**: Aligned with strategy\n• **Time-bound**: Specific timeframe\n• **Documented**: Written objectives\n• **Communicated**: Known to all\n• **Monitored**: Track progress', inline: false },
        { name: '📊 Quality Tools', value: '• **Pareto Charts**: Identify vital few causes\n• **Fishbone Diagram**: Root cause analysis\n• **Control Charts**: Monitor process stability\n• **Scatter Diagrams**: Correlation analysis\n• **Histograms**: Distribution analysis\n• **Check Sheets**: Data collection\n• **Flow Charts**: Process documentation\n• **Stratification**: Group and analyze data', inline: false },
        { name: '🔍 Inspection & Testing', value: '• **Incoming Inspection**: Verify supplier quality\n• **In-Process Inspection**: Check during production\n• **Final Inspection**: Before delivery to customer\n• **First Article Inspection**: Validate new production\n• **Sampling Plans**: Statistical sampling\n• **Non-Destructive Testing**: NDT methods\n• **Destructive Testing**: When required\n• **Documentation**: Record all results', inline: false },
        { name: '⚠️ Non-Conformance Management', value: '• **Identification**: Detect non-conformances\n• **Segregation**: Isolate defective product\n• **Investigation**: Determine root cause\n• **Disposition**: Scrap, rework, or accept\n• **Corrective Action**: Prevent recurrence\n• **Documentation**: Record all actions\n• **Verification**: Confirm effectiveness\n• **Trend Analysis**: Look for patterns', inline: false },
        { name: '📈 Corrective & Preventive Actions', value: '• **CAPA Process**: Systematic approach\n• **Root Cause**: 5 Whys, Fishbone\n• **Action Plan**: Specific actions and owners\n• **Implementation**: Execute actions\n• **Verification**: Confirm effectiveness\n• **Documentation**: Full traceability\n• **Close-out**: Formal closure\n• **Preventive**: Identify and prevent potential issues', inline: false },
        { name: '📚 Document Control', value: '• **Document Register**: Master list of documents\n• **Version Control**: Track revisions\n• **Approval**: Authorized approval process\n• **Distribution**: Controlled distribution\n• **Review**: Periodic review\n• **Obsolete**: Remove outdated documents\n• **Records**: Retain quality records\n• **Training**: Train on document changes', inline: false },
        { name: '🎓 Training & Competence', value: '• **Identify Needs**: Required competencies\n• **Training Plans**: Structured training programs\n• **On-the-Job**: Practical training\n• **Verification**: Assess competence\n• **Records**: Maintain training records\n• **Refresher**: Periodic retraining\n• **New Employees**: Comprehensive onboarding\n• **Awareness**: Quality awareness training', inline: false },
        { name: '🔄 Continuous Improvement', value: '• **Plan-Do-Check-Act (PDCA)**: Systematic improvement\n• **Kaizen**: Small continuous improvements\n• **Suggestion Schemes**: Employee ideas\n• **Improvement Projects**: Structured projects\n• **Benchmarking**: Learn from best practices\n• **Customer Feedback**: Voice of customer\n• **Metrics**: Track improvement\n• **Culture**: Foster improvement mindset', inline: false },
        { name: '📊 Quality Metrics/KPIs', value: '• **First Pass Yield (FPY)**: % right first time\n• **Cost of Poor Quality (COPQ)**: Total quality costs\n• **Customer Complaints**: Number and trends\n• **Defect Rate**: PPM (parts per million)\n• **On-Time Delivery**: % on-time shipments\n• **Scrap Rate**: % product scrapped\n• **Rework Rate**: % requiring rework\n• **Customer Satisfaction**: CSAT score', inline: false },
        { name: '🏆 Total Quality Management (TQM)', value: '• **Customer-Centric**: Focus on customer satisfaction\n• **Total Involvement**: Everyone\'s responsibility\n• **Process-Centered**: Focus on processes\n• **Strategic**: Integrated into strategy\n• **Fact-Based**: Data-driven decisions\n• **Communications**: Open communication\n• **Continuous**: Never-ending improvement', inline: false }
      )
      .setFooter({ text: 'ISO: iso.org | ASQ: asq.org | BSI: bsigroup.com' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async projectManagement(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📋 Project Management Frameworks')
      .setDescription('Deliver projects on time, on budget, and to quality')
      .setColor(0x3498DB)
      .addFields(
        { name: '📊 Project Management Methodologies', value: '• **Waterfall**: Sequential phases\n• **Agile**: Iterative and incremental\n• **Scrum**: Sprints and ceremonies\n• **Kanban**: Visual workflow\n• **PRINCE2**: Process-based approach\n• **Lean**: Eliminate waste\n• **Hybrid**: Combine methodologies\n• **Critical Chain**: Focus on resources', inline: false },
        { name: '🎯 Project Phases (PMBOK)', value: '**1. Initiating**: Define and authorize\n**2. Planning**: Establish scope, objectives, procedures\n**3. Executing**: Complete work defined in plan\n**4. Monitoring & Controlling**: Track, review, regulate\n**5. Closing**: Finalize, hand over, close', inline: false },
        { name: '📋 Project Charter', value: '• **Business Case**: Why the project?\n• **Objectives**: What will be achieved?\n• **Scope**: What\'s in/out of scope?\n• **Stakeholders**: Who\'s involved?\n• **Budget**: High-level costs\n• **Timeline**: Key milestones\n• **Risks**: High-level risks\n• **Authorization**: Sponsor approval', inline: false },
        { name: '🎯 Scope Management', value: '• **Scope Statement**: Detailed description\n• **WBS (Work Breakdown Structure)**: Decompose deliverables\n• **Scope Baseline**: Approved scope\n• **Scope Verification**: Formal acceptance\n• **Scope Control**: Manage changes\n• **Scope Creep**: Prevent uncontrolled expansion', inline: false },
        { name: '⏱️ Time Management', value: '• **Activity List**: All activities\n• **Activity Sequencing**: Dependencies\n• **Duration Estimation**: How long each activity\n• **Schedule Development**: Create timeline\n• **Gantt Chart**: Visual schedule\n• **Critical Path**: Longest path, no slack\n• **Schedule Control**: Monitor and adjust', inline: false },
        { name: '💰 Cost Management', value: '• **Cost Estimation**: Estimate costs\n• **Cost Budgeting**: Allocate budget\n• **Cost Baseline**: Approved budget\n• **Cost Control**: Monitor spending\n• **EVM (Earned Value Management)**: Performance measurement\n• **Variance Analysis**: Actual vs. planned\n• **Forecasting**: Estimate to complete', inline: false },
        { name: '👥 Stakeholder Management', value: '• **Identify**: Who are stakeholders?\n• **Analyze**: Power and interest matrix\n• **Engagement Plan**: How to engage each\n• **Communication**: Regular updates\n• **Manage Expectations**: Set realistic expectations\n• **Resolve Conflicts**: Address issues\n• **Satisfaction**: Measure satisfaction', inline: false },
        { name: '⚠️ Risk Management', value: '• **Identify Risks**: What could go wrong?\n• **Assess**: Probability and impact\n• **Risk Register**: Document all risks\n• **Response Planning**: Avoid, mitigate, transfer, accept\n• **Contingency**: Plan B\n• **Monitor**: Track risks\n• **Reserve**: Budget for risks', inline: false },
        { name: '🔄 Agile/Scrum Framework', value: '• **Sprint**: 2-4 week iteration\n• **Sprint Planning**: Plan sprint work\n• **Daily Standup**: 15-min sync\n• **Sprint Review**: Demo to stakeholders\n• **Sprint Retrospective**: Continuous improvement\n• **Product Backlog**: Prioritized features\n• **Sprint Backlog**: Sprint work\n• **Scrum Master**: Facilitate process', inline: false },
        { name: '📊 Project Metrics/KPIs', value: '• **Schedule Performance Index (SPI)**: EV ÷ PV\n• **Cost Performance Index (CPI)**: EV ÷ AC\n• **On-Time Delivery**: % delivered on time\n• **Budget Variance**: Actual vs. budget\n• **Resource Utilization**: % capacity used\n• **Defect Rate**: Quality metrics\n• **Customer Satisfaction**: CSAT score\n• **ROI**: Return on investment', inline: false },
        { name: '🛠️ Project Management Tools', value: '• **Microsoft Project**: Enterprise PM software\n• **Asana**: Team collaboration\n• **Trello**: Kanban boards\n• **Jira**: Agile/Scrum projects\n• **Monday.com**: Visual project management\n• **Smartsheet**: Spreadsheet-based\n• **Basecamp**: Simple collaboration\n• **Wrike**: Flexible PM tool', inline: false },
        { name: '💡 Best Practices', value: '• **Clear Objectives**: SMART goals\n• **Stakeholder Buy-in**: Secure commitment\n• **Realistic Planning**: Buffer for unknowns\n• **Regular Communication**: Keep everyone informed\n• **Risk Management**: Proactive risk management\n• **Change Control**: Formal change process\n• **Team Empowerment**: Trust your team\n• **Lessons Learned**: Document for future', inline: false }
      )
      .setFooter({ text: 'PMI: pmi.org | APM: apm.org.uk | PRINCE2: axelos.com' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async kpiDashboard(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📈 Key Performance Indicators Dashboard')
      .setDescription('Essential operational KPIs to monitor')
      .setColor(0xE74C3C)
      .addFields(
        { name: '💰 Financial KPIs', value: '• **Revenue Growth**: % increase period-over-period\n• **Gross Profit Margin**: (Revenue - COGS) ÷ Revenue × 100\n• **Operating Profit Margin**: Operating Income ÷ Revenue × 100\n• **EBITDA**: Earnings before interest, tax, depreciation, amortization\n• **Cash Flow**: Operating cash flow\n• **Working Capital**: Current Assets - Current Liabilities\n• **ROI**: (Gain - Cost) ÷ Cost × 100', inline: false },
        { name: '🏭 Production KPIs', value: '• **OEE (Overall Equipment Effectiveness)**: Availability × Performance × Quality\n• **Throughput**: Units produced per period\n• **Cycle Time**: Time to complete one cycle\n• **Capacity Utilization**: Actual ÷ Maximum × 100\n• **First Pass Yield**: % right first time\n• **Scrap Rate**: % materials wasted\n• **Downtime**: % of time equipment down', inline: false },
        { name: '✅ Quality KPIs', value: '• **Defect Rate**: PPM (parts per million)\n• **Customer Returns**: % products returned\n• **Customer Complaints**: Number per period\n• **COPQ**: Cost of Poor Quality\n• **First Time Fix Rate**: % fixed on first attempt\n• **Warranty Claims**: Number and cost\n• **Customer Satisfaction**: CSAT score (1-10)', inline: false },
        { name: '🚚 Supply Chain KPIs', value: '• **Perfect Order Rate**: Complete, on-time, damage-free\n• **Fill Rate**: % orders fulfilled from stock\n• **Inventory Turnover**: COGS ÷ Average Inventory\n• **Days Sales of Inventory**: 365 ÷ Inventory Turnover\n• **Cash-to-Cash Cycle**: DIO + DSO - DPO\n• **On-Time Delivery**: % delivered on promised date\n• **Supplier Defect Rate**: % defective from suppliers', inline: false },
        { name: '👥 People KPIs', value: '• **Employee Turnover**: % who leave annually\n• **Absenteeism Rate**: % days absent\n• **Training Hours**: Hours per employee\n• **Employee Satisfaction**: eNPS score\n• **Time to Hire**: Days to fill vacancy\n• **Revenue per Employee**: Revenue ÷ Employees\n• **Safety Incidents**: Number of incidents', inline: false },
        { name: '😊 Customer KPIs', value: '• **Net Promoter Score (NPS)**: Promoters - Detractors\n• **Customer Satisfaction (CSAT)**: Average satisfaction score\n• **Customer Retention**: % customers retained\n• **Customer Lifetime Value (CLV)**: Total value over relationship\n• **Customer Acquisition Cost (CAC)**: Cost to acquire customer\n• **Churn Rate**: % customers who leave\n• **Repeat Purchase Rate**: % who buy again', inline: false },
        { name: '📊 Sales & Marketing KPIs', value: '• **Sales Growth**: % increase in sales\n• **Conversion Rate**: % leads converted to sales\n• **Average Deal Size**: Average transaction value\n• **Sales Cycle Length**: Days to close deal\n• **Lead Response Time**: Time to contact lead\n• **Marketing ROI**: Revenue from campaign ÷ Cost\n• **Website Traffic**: Visitors per period', inline: false },
        { name: '⚙️ Process KPIs', value: '• **Process Cycle Time**: End-to-end time\n• **Process Cost**: Cost per transaction\n• **Process Efficiency**: (Actual ÷ Standard) × 100\n• **Rework Rate**: % requiring rework\n• **Automation Rate**: % processes automated\n• **Compliance Rate**: % compliant activities\n• **Error Rate**: Errors per transaction', inline: false },
        { name: '💻 IT/Technology KPIs', value: '• **System Uptime**: % time systems available\n• **Mean Time to Repair (MTTR)**: Average repair time\n• **Mean Time Between Failures (MTBF)**: Reliability metric\n• **Ticket Resolution Time**: Average time to resolve\n• **First Call Resolution**: % resolved on first contact\n• **Cyber Security Incidents**: Number of breaches\n• **IT Costs**: % of revenue', inline: false },
        { name: '📈 Dashboard Best Practices', value: '• **Select Relevant KPIs**: Focus on what matters\n• **Limit Number**: 5-10 key metrics per dashboard\n• **Real-Time**: Update regularly\n• **Visual**: Use charts and graphs\n• **Context**: Show targets and trends\n• **Accessible**: Available to relevant stakeholders\n• **Actionable**: Drive decision-making\n• **Review**: Regularly review relevance', inline: false },
        { name: '🛠️ Dashboard Tools', value: '• **Power BI**: Microsoft\'s BI tool\n• **Tableau**: Leading visualization tool\n• **Qlik Sense**: Associative analytics\n• **Google Data Studio**: Free tool\n• **Klipfolio**: Cloud-based dashboards\n• **Domo**: Business intelligence platform\n• **Sisense**: Embedded analytics\n• **Excel**: Spreadsheet dashboards', inline: false }
      )
      .setFooter({ text: 'Focus on leading indicators, not just lagging indicators' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async riskManagement(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('⚠️ Operational Risk Management')
      .setDescription('Identify, assess, and mitigate operational risks')
      .setColor(0xE67E22)
      .addFields(
        { name: '🎯 Types of Operational Risks', value: '• **Process Risk**: Process failures or inefficiencies\n• **People Risk**: Human error, fraud, turnover\n• **Systems Risk**: IT failures, cyber attacks\n• **External Risk**: Suppliers, natural disasters, regulation\n• **Legal Risk**: Litigation, contracts, compliance\n• **Reputational Risk**: Brand damage\n• **Strategic Risk**: Poor strategic decisions', inline: false },
        { name: '📊 Risk Assessment Matrix', value: '**Likelihood × Impact = Risk Score**\n\n**Likelihood**:\n• Rare (1): <10%\n• Unlikely (2): 10-30%\n• Possible (3): 30-50%\n• Likely (4): 50-70%\n• Almost Certain (5): >70%\n\n**Impact**:\n• Insignificant (1), Minor (2), Moderate (3), Major (4), Catastrophic (5)', inline: false },
        { name: '🔍 Risk Identification Methods', value: '• **Brainstorming**: Team workshops\n• **Interviews**: Subject matter experts\n• **Checklists**: Standard risk categories\n• **Historical Data**: Past incidents\n• **Process Mapping**: Identify failure points\n• **SWOT Analysis**: Strengths, Weaknesses, Opportunities, Threats\n• **Scenario Analysis**: What-if scenarios\n• **Audits**: Internal/external audits', inline: false },
        { name: '📝 Risk Register', value: '**Essential Fields**:\n• Risk ID & Description\n• Category\n• Likelihood & Impact ratings\n• Risk Score (L × I)\n• Risk Owner\n• Response Strategy\n• Action Plan\n• Status\n• Review Date', inline: false },
        { name: '🎯 Risk Response Strategies', value: '• **Avoid**: Eliminate the risk\n• **Reduce/Mitigate**: Decrease likelihood or impact\n• **Transfer**: Insurance, outsourcing, contracts\n• **Accept**: Acknowledge and monitor\n• **Exploit**: Take advantage (opportunities)\n• **Share**: Partnerships, joint ventures', inline: false },
        { name: '🛡️ Risk Controls', value: '• **Preventive**: Stop risk from occurring\n• **Detective**: Identify when risk occurs\n• **Corrective**: Fix after risk occurs\n• **Directive**: Ensure specific outcome\n• **Compensating**: Alternative control\n\nExamples: Segregation of duties, access controls, reconciliations', inline: false },
        { name: '🔄 Risk Management Process', value: '**1. Establish Context**: Define scope and criteria\n**2. Identify Risks**: What could go wrong?\n**3. Analyze Risks**: Likelihood and impact\n**4. Evaluate Risks**: Prioritize based on risk score\n**5. Treat Risks**: Implement responses\n**6. Monitor & Review**: Ongoing monitoring\n**7. Communicate**: Report to stakeholders', inline: false },
        { name: '⚠️ Common Operational Risks', value: '• **Supply Chain Disruption**: Supplier failure\n• **IT System Failure**: System downtime\n• **Data Breach**: Cyber security incident\n• **Key Person Dependency**: Loss of critical staff\n• **Regulatory Non-Compliance**: Fines, penalties\n• **Quality Issues**: Product defects\n• **Fraud**: Employee or external fraud\n• **Business Interruption**: Fire, flood, etc.', inline: false },
        { name: '📊 Risk Indicators', value: '• **KRIs (Key Risk Indicators)**: Early warning signals\n• **Near Misses**: Incidents that almost happened\n• **Audit Findings**: Control weaknesses\n• **Compliance Violations**: Breaches\n• **Customer Complaints**: Increasing complaints\n• **Employee Turnover**: High turnover\n• **Financial Metrics**: Declining performance\n• **Market Changes**: External factors', inline: false },
        { name: '💼 Business Continuity Planning', value: '• **Business Impact Analysis**: Identify critical processes\n• **Recovery Time Objective (RTO)**: How quickly to recover\n• **Recovery Point Objective (RPO)**: Acceptable data loss\n• **Continuity Strategies**: How to continue operations\n• **Backup Sites**: Alternative locations\n• **Communication Plan**: How to communicate\n• **Testing**: Regular BCP testing\n• **Maintenance**: Keep plans up-to-date', inline: false },
        { name: '💡 Best Practices', value: '• **Risk Culture**: Foster risk-aware culture\n• **Ownership**: Clear risk owners\n• **Integration**: Embed in decision-making\n• **Three Lines of Defense**: Operations, Risk/Compliance, Internal Audit\n• **Regular Reviews**: Quarterly risk reviews\n• **Board Reporting**: Report to board\n• **Scenario Planning**: Test severe scenarios\n• **Lessons Learned**: Learn from incidents', inline: false }
      )
      .setFooter({ text: 'ISO 31000: Risk Management Standard | COSO: ERM Framework' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
