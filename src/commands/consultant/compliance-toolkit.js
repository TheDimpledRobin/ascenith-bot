const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('compliance-toolkit')
    .setDescription('Compliance, regulatory, and legal advisory tools (UK)')
    .addSubcommand(subcommand =>
      subcommand
        .setName('menu')
        .setDescription('View compliance toolkit menu'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('gdpr-checklist')
        .setDescription('GDPR compliance checklist'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('companies-house')
        .setDescription('Companies House filing requirements'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('employment-law')
        .setDescription('UK employment law essentials'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('health-safety')
        .setDescription('Health & Safety requirements'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('contracts')
        .setDescription('Essential business contracts guide'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('insurance')
        .setDescription('Required business insurance overview'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('cyber-security')
        .setDescription('Cyber Essentials and security compliance'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('anti-money-laundering')
        .setDescription('AML regulations and compliance')),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'menu':
        await this.showMenu(interaction);
        break;
      case 'gdpr-checklist':
        await this.gdprChecklist(interaction);
        break;
      case 'companies-house':
        await this.companiesHouse(interaction);
        break;
      case 'employment-law':
        await this.employmentLaw(interaction);
        break;
      case 'health-safety':
        await this.healthSafety(interaction);
        break;
      case 'contracts':
        await this.contracts(interaction);
        break;
      case 'insurance':
        await this.insurance(interaction);
        break;
      case 'cyber-security':
        await this.cyberSecurity(interaction);
        break;
      case 'anti-money-laundering':
        await this.aml(interaction);
        break;
    }
  },

  async showMenu(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('⚖️ Compliance & Regulatory Toolkit')
      .setDescription('Essential compliance tools and guidance for UK businesses')
      .setColor(0xE74C3C)
      .addFields(
        { name: '🔒 GDPR Compliance', value: 'Data protection checklist and requirements', inline: true },
        { name: '🏢 Companies House', value: 'Filing obligations and deadlines', inline: true },
        { name: '👥 Employment Law', value: 'UK employment rights and obligations', inline: true },
        { name: '🦺 Health & Safety', value: 'Workplace safety requirements', inline: true },
        { name: '📝 Contracts', value: 'Essential business contract templates', inline: true },
        { name: '🛡️ Insurance', value: 'Required business insurance coverage', inline: true },
        { name: '💻 Cyber Security', value: 'Cyber Essentials and data security', inline: true },
        { name: '💰 AML', value: 'Anti-Money Laundering compliance', inline: true }
      )
      .setFooter({ text: 'Use /compliance-toolkit [tool-name] to access specific guidance' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async gdprChecklist(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🔒 GDPR Compliance Checklist')
      .setDescription('General Data Protection Regulation compliance for UK businesses')
      .setColor(0x3498DB)
      .addFields(
        { name: '📋 Core Principles', value: '✅ Lawfulness, fairness, transparency\n✅ Purpose limitation\n✅ Data minimization\n✅ Accuracy\n✅ Storage limitation\n✅ Integrity and confidentiality\n✅ Accountability', inline: false },
        { name: '📝 Required Documentation', value: '• **Privacy Policy**: Clear, accessible\n• **Cookie Policy**: If using cookies\n• **Data Processing Records**: Article 30\n• **Data Protection Impact Assessments**: High-risk processing\n• **Breach Notification Procedures**: 72-hour rule', inline: false },
        { name: '👤 Individual Rights', value: '• Right to be informed\n• Right of access (Subject Access Requests)\n• Right to rectification\n• Right to erasure ("right to be forgotten")\n• Right to restrict processing\n• Right to data portability\n• Right to object\n• Automated decision-making rights', inline: false },
        { name: '🔐 Security Measures', value: '• Encryption (data at rest & in transit)\n• Access controls & authentication\n• Regular security testing\n• Staff training\n• Incident response plan\n• Third-party vendor assessment', inline: false },
        { name: '⚠️ Data Breaches', value: '• **Detection**: Monitor for breaches\n• **Assessment**: Risk to individuals\n• **Notification**: ICO within 72 hours\n• **Communication**: Inform affected individuals\n• **Documentation**: Keep breach records', inline: false },
        { name: '💼 DPO Requirements', value: '• Public authority processing\n• Core activities involve regular monitoring\n• Core activities are large-scale processing of special categories\n• Otherwise, recommended but not mandatory', inline: false },
        { name: '💰 Penalties', value: '• **Tier 1**: Up to €10M or 2% of global turnover\n• **Tier 2**: Up to €20M or 4% of global turnover\n• ICO can also issue enforcement notices', inline: false }
      )
      .setFooter({ text: 'ICO: ico.org.uk | Always consult a data protection specialist' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async companiesHouse(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🏢 Companies House Filing Requirements')
      .setDescription('Mandatory filings and deadlines for UK companies')
      .setColor(0x9B59B6)
      .addFields(
        { name: '📅 Annual Requirements', value: '• **Confirmation Statement**: At least annually\n• **Annual Accounts**: 9 months after year-end (private)\n• **Corporation Tax Return**: 12 months after year-end\n• **VAT Returns**: Quarterly (if VAT registered)', inline: false },
        { name: '📊 Accounts Filing', value: '• **Micro-entities**: Simplified accounts\n• **Small Companies**: Abridged accounts option\n• **Medium/Large**: Full accounts required\n• **Dormant Companies**: Dormant accounts\n• **Late Filing Penalties**: £150-£1,500+', inline: false },
        { name: '📝 Changes to Report', value: '• Director appointments/resignations (14 days)\n• Change of registered office (14 days)\n• Share allotments/transfers (1 month)\n• Change of company name (special resolution)\n• Change of accounting reference date\n• PSC (People with Significant Control) updates', inline: false },
        { name: '👥 Directors Duties', value: '• Act within powers\n• Promote success of company\n• Exercise independent judgment\n• Exercise reasonable care, skill and diligence\n• Avoid conflicts of interest\n• Not accept benefits from third parties\n• Declare interests in proposed transactions', inline: false },
        { name: '🔍 Public Information', value: '• Company accounts\n• Director details\n• Registered office address\n• SIC codes\n• Share capital\n• PSC register\n• Charges/mortgages', inline: false },
        { name: '⚠️ Penalties & Consequences', value: '• **Late accounts**: £150-£1,500 per filing\n• **Late confirmation statement**: £150+\n• **Failure to notify changes**: Criminal offence\n• **Strike off**: For non-compliance\n• **Director disqualification**: Serious breaches', inline: false }
      )
      .setFooter({ text: 'Companies House: gov.uk/companieshouse' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async employmentLaw(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('👥 UK Employment Law Essentials')
      .setDescription('Key employment rights and employer obligations')
      .setColor(0x2ECC71)
      .addFields(
        { name: '📋 Employment Contracts', value: '• **Written Statement**: Within 2 months (now day 1 from 2024)\n• **Must Include**: Pay, hours, holidays, notice period, pension\n• **Contract Types**: Permanent, fixed-term, zero-hours\n• **Probation**: Typically 3-6 months', inline: false },
        { name: '💰 Pay & Benefits', value: '• **National Minimum Wage**:\n  - 21+: £11.44/hour\n  - 18-20: £8.60/hour\n  - Under 18: £6.40/hour\n  - Apprentice: £6.40/hour\n• **Statutory Sick Pay**: £109.40/week\n• **Equal Pay**: Same pay for equal work', inline: false },
        { name: '🏖️ Leave Entitlements', value: '• **Annual Leave**: 5.6 weeks (28 days for full-time)\n• **Maternity Leave**: Up to 52 weeks\n• **Paternity Leave**: 2 weeks\n• **Shared Parental Leave**: Up to 50 weeks\n• **Adoption Leave**: Up to 52 weeks\n• **Parental Leave**: 18 weeks (unpaid)', inline: false },
        { name: '🔔 Notice Periods', value: '• **Employee**: Contractual or 1 week minimum\n• **Employer**: 1 week per year of service (max 12 weeks)\n• **During Probation**: Often shorter notice\n• **Garden Leave**: Can be required to stay away\n• **PILON**: Payment in lieu of notice', inline: false },
        { name: '⚖️ Discrimination Protection', value: '• Age\n• Disability\n• Gender reassignment\n• Marriage & civil partnership\n• Pregnancy & maternity\n• Race\n• Religion or belief\n• Sex\n• Sexual orientation', inline: false },
        { name: '🚫 Disciplinary & Dismissal', value: '• **Fair Reasons**: Capability, conduct, redundancy, statutory, SOSR\n• **Process**: Investigation, hearing, appeal\n• **Notice**: Statutory minimum required\n• **Unfair Dismissal**: 2 years qualifying period\n• **Gross Misconduct**: Summary dismissal possible', inline: false },
        { name: '🔒 Employee Rights', value: '• Protection from unfair dismissal\n• Protection from discrimination\n• Right to request flexible working\n• Right to be accompanied\n• Whistleblowing protection\n• Time off for dependants\n• TUPE protection', inline: false },
        { name: '💼 Employer Obligations', value: '• Provide safe workplace\n• Employers Liability Insurance (minimum £5M)\n• Auto-enrol in pension\n• Pay PAYE & NI\n• Right to work checks\n• Prevent discrimination & harassment', inline: false }
      )
      .setFooter({ text: 'ACAS: acas.org.uk | Always consult an employment law specialist' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async healthSafety(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🦺 Health & Safety Requirements')
      .setDescription('Workplace health and safety obligations for UK employers')
      .setColor(0xF39C12)
      .addFields(
        { name: '⚖️ Legal Framework', value: '• **Health and Safety at Work Act 1974**: Primary legislation\n• **Management Regulations 1999**: Risk assessment\n• **RIDDOR**: Reporting injuries/diseases\n• **First Aid Regulations**: First aid provision\n• **Display Screen Equipment**: DSE assessments', inline: false },
        { name: '📋 Risk Assessment', value: '• **Identify Hazards**: What could cause harm\n• **Identify Who**: Who might be harmed\n• **Evaluate Risks**: Likelihood and severity\n• **Control Measures**: Eliminate or reduce risks\n• **Record Findings**: Written (5+ employees)\n• **Review Regularly**: At least annually', inline: false },
        { name: '📝 Health & Safety Policy', value: '• **Required**: 5+ employees\n• **Must Include**: Statement of intent, organization, arrangements\n• **Review**: Annually or after significant changes\n• **Communication**: All staff must be aware\n• **Display**: Where employees can access', inline: false },
        { name: '💼 Employer Duties', value: '• Provide safe workplace\n• Safe equipment & machinery\n• Safe systems of work\n• Competent staff & supervision\n• Information, instruction & training\n• Personal protective equipment (PPE)\n• Welfare facilities\n• Accident reporting', inline: false },
        { name: '👷 Employee Duties', value: '• Take reasonable care of own safety\n• Take care not to endanger others\n• Cooperate with employer\n• Use equipment/PPE properly\n• Report hazards/defects\n• Not interfere with safety equipment', inline: false },
        { name: '📊 RIDDOR Reporting', value: '• **Deaths**: All work-related deaths\n• **Specified Injuries**: Fractures, amputations, etc.\n• **Over 7-Day Injuries**: Unable to work >7 consecutive days\n• **Occupational Diseases**: Specified diseases\n• **Dangerous Occurrences**: Near misses\n• **Timeframe**: Deaths immediately, others 15 days', inline: false },
        { name: '🚨 Accident Reporting', value: '• **Accident Book**: Record all incidents\n• **Investigation**: Root cause analysis\n• **Corrective Actions**: Prevent recurrence\n• **Records**: Keep for 3+ years\n• **RIDDOR**: Report serious incidents to HSE', inline: false },
        { name: '💰 Penalties', value: '• **Minor Breaches**: Improvement notices\n• **Serious Breaches**: Prohibition notices\n• **Criminal Prosecution**: Unlimited fines\n• **Corporate Manslaughter**: Organizational level\n• **Individual Liability**: Directors can be prosecuted', inline: false }
      )
      .setFooter({ text: 'HSE: hse.gov.uk | Consult a health & safety professional' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async contracts(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📝 Essential Business Contracts')
      .setDescription('Key contracts every UK business should have')
      .setColor(0x16A085)
      .addFields(
        { name: '🤝 Service Agreements', value: '• **Scope of Work**: Clear deliverables\n• **Payment Terms**: Rates, schedule, late fees\n• **Timeline**: Start date, milestones, completion\n• **IP Rights**: Ownership of work product\n• **Termination**: Notice period, exit clauses\n• **Liability**: Limitations and indemnities', inline: false },
        { name: '🛒 Terms & Conditions', value: '• **B2B**: Business-to-business T&Cs\n• **B2C**: Consumer-facing (Consumer Rights Act)\n• **Price & Payment**: Clear pricing structure\n• **Delivery**: Terms and timeframes\n• **Returns**: Policy and process\n• **Liability**: Limitation clauses\n• **Disputes**: Resolution mechanism', inline: false },
        { name: '🤐 Confidentiality Agreements', value: '• **NDA**: Non-disclosure agreements\n• **Mutual vs Unilateral**: Depends on situation\n• **Definition**: What\'s confidential\n• **Exclusions**: Public domain, prior knowledge\n• **Duration**: Survival period\n• **Return of Information**: Upon termination', inline: false },
        { name: '👤 Employment Contracts', value: '• **Job Title & Duties**: Clear role definition\n• **Pay & Benefits**: Salary, pension, benefits\n• **Working Hours**: Hours, breaks, overtime\n• **Holiday**: Entitlement and booking\n• **Notice Period**: Both parties\n• **Restrictive Covenants**: Non-compete, non-solicit', inline: false },
        { name: '🏢 Shareholder Agreements', value: '• **Share Structure**: Ownership percentages\n• **Decision Making**: Voting rights, reserved matters\n• **Transfer Restrictions**: Pre-emption rights\n• **Drag-Along/Tag-Along**: Exit provisions\n• **Deadlock**: Dispute resolution\n• **Leaver Provisions**: Good/bad leavers', inline: false },
        { name: '📄 Supplier Contracts', value: '• **Specification**: Product/service details\n• **Pricing**: Unit costs, volume discounts\n• **Quality Standards**: Acceptance criteria\n• **Delivery**: Lead times, logistics\n• **Warranties**: Product guarantees\n• **Termination**: Notice, breach clauses', inline: false },
        { name: '🏠 Property Leases', value: '• **Term**: Duration of lease\n• **Rent**: Amount, review, payment\n• **Repairing Obligations**: Landlord vs tenant\n• **Use**: Permitted use of premises\n• **Break Clauses**: Early termination\n• **Dilapidations**: End of lease obligations', inline: false },
        { name: '⚖️ Key Clauses', value: '• **Force Majeure**: Unforeseeable circumstances\n• **Indemnity**: Protection from losses\n• **Limitation of Liability**: Cap on damages\n• **Jurisdiction**: Governing law (England & Wales)\n• **Entire Agreement**: Supersedes prior agreements\n• **Variation**: How to amend contract', inline: false }
      )
      .setFooter({ text: 'Always have contracts reviewed by a solicitor' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async insurance(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🛡️ Business Insurance Requirements')
      .setDescription('Essential insurance coverage for UK businesses')
      .setColor(0xE67E22)
      .addFields(
        { name: '✅ Mandatory Insurance', value: '• **Employers Liability Insurance**\n  - Required if you have employees\n  - Minimum £5 million coverage\n  - Display certificate in workplace\n  - Fine up to £2,500/day for non-compliance\n• **Motor Insurance**\n  - Business use for company vehicles\n  - Commercial vehicle insurance\n  - Goods in transit coverage', inline: false },
        { name: '🏢 Professional Indemnity', value: '• **Who Needs It**: Professional services, consultants, advisors\n• **Coverage**: Professional negligence, errors, omissions\n• **Typical Limit**: £1M-£10M+\n• **Often Required**: By contracts or industry regulation\n• **Claims-Made Basis**: Claim during policy period', inline: false },
        { name: '📦 Public Liability', value: '• **Coverage**: Injury to public, property damage\n• **Recommended**: All businesses with public contact\n• **Typical Limit**: £1M-£5M\n• **Premises**: Coverage for your business location\n• **Events**: Coverage for off-site activities', inline: false },
        { name: '🏠 Buildings & Contents', value: '• **Buildings**: If you own premises\n• **Contents**: Equipment, stock, fixtures\n• **Business Interruption**: Loss of income\n• **All Risks**: Accidental damage\n• **Glass**: Plate glass coverage', inline: false },
        { name: '💻 Cyber Insurance', value: '• **Data Breach**: GDPR breach costs\n• **Business Interruption**: Downtime costs\n• **Cyber Extortion**: Ransomware attacks\n• **Legal Costs**: Defense and liability\n• **PR Costs**: Reputation management\n• **Increasingly Important**: Rising cyber threats', inline: false },
        { name: '👥 Key Person Insurance', value: '• **Purpose**: Protect against loss of key individual\n• **Coverage**: Death or critical illness\n• **Benefit**: Business receives payout\n• **Use**: Cover recruitment, lost revenue\n• **Tax**: Generally not tax-deductible', inline: false },
        { name: '🚚 Goods in Transit', value: '• **Coverage**: Goods being transported\n• **Own Vehicles**: Or third-party carriers\n• **Limits**: Based on typical load value\n• **Territory**: UK or international\n• **Exclusions**: Check policy carefully', inline: false },
        { name: '💼 Directors & Officers', value: '• **Protection**: Personal liability of directors\n• **Claims**: Wrongful acts in management\n• **Defense Costs**: Legal fees\n• **Investigations**: Regulatory inquiries\n• **Recommended**: All limited companies', inline: false },
        { name: '💰 Typical Costs (Annual)', value: '• Employers Liability: £100-£500\n• Public Liability: £100-£1,000\n• Professional Indemnity: £300-£3,000+\n• Cyber Insurance: £500-£5,000+\n• Buildings/Contents: £200-£2,000+', inline: false }
      )
      .setFooter({ text: 'Speak to an insurance broker for tailored advice' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async cyberSecurity(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('💻 Cyber Security & Cyber Essentials')
      .setDescription('Cyber security compliance and best practices')
      .setColor(0x3498DB)
      .addFields(
        { name: '🔒 Cyber Essentials Scheme', value: '• **Purpose**: Government-backed cyber security certification\n• **Two Levels**: Basic and Cyber Essentials Plus\n• **Cost**: £300 (Basic), £1,000+ (Plus)\n• **Benefits**: Tender requirement, insurance discounts\n• **Validity**: 12 months\n• **Mandatory**: For government contracts over £5M', inline: false },
        { name: '🛡️ Five Controls', value: '**1. Firewalls**: Protect network boundaries\n**2. Secure Configuration**: Remove/disable unnecessary functionality\n**3. Access Control**: User accounts and privileges\n**4. Malware Protection**: Anti-virus/anti-malware\n**5. Security Update Management**: Patch management', inline: false },
        { name: '👤 Access Control', value: '• **User Accounts**: Unique for each person\n• **Admin Rights**: Limit who has admin access\n• **Password Policy**: Strong, unique passwords\n• **MFA**: Multi-factor authentication\n• **Access Reviews**: Regular audits\n• **Offboarding**: Revoke access immediately', inline: false },
        { name: '📊 Data Protection', value: '• **Encryption**: Data at rest and in transit\n• **Backups**: Regular, tested, offline copies\n• **Classification**: Identify sensitive data\n• **Access Logs**: Monitor who accesses what\n• **Data Minimization**: Only keep what you need\n• **Secure Deletion**: Properly dispose of data', inline: false },
        { name: '📧 Email Security', value: '• **Spam Filters**: Block malicious emails\n• **SPF/DKIM/DMARC**: Email authentication\n• **Phishing Training**: Staff awareness\n• **Link Checking**: Verify before clicking\n• **Attachment Scanning**: Malware detection\n• **Reporting**: Easy reporting of suspicious emails', inline: false },
        { name: '🌐 Network Security', value: '• **Firewall**: Configure properly\n• **WiFi Security**: WPA2/WPA3 encryption\n• **Guest Network**: Separate from business\n• **VPN**: For remote access\n• **Network Segmentation**: Isolate sensitive systems\n• **Monitoring**: Detect unusual activity', inline: false },
        { name: '📱 Device Management', value: '• **MDM**: Mobile device management\n• **BYOD Policy**: Bring your own device rules\n• **Encryption**: Full disk encryption\n• **Remote Wipe**: Capability for lost devices\n• **Updates**: Keep all devices patched\n• **Lost/Stolen**: Immediate reporting process', inline: false },
        { name: '👥 Security Awareness', value: '• **Training**: Annual mandatory training\n• **Phishing Tests**: Regular simulations\n• **Reporting**: Easy incident reporting\n• **Policies**: Clear, accessible policies\n• **Updates**: Keep staff informed of threats\n• **Culture**: Make security everyone\'s responsibility', inline: false },
        { name: '🚨 Incident Response', value: '• **Plan**: Document incident response process\n• **Team**: Assign roles and responsibilities\n• **Detection**: Monitor for security events\n• **Containment**: Isolate affected systems\n• **Eradication**: Remove threat\n• **Recovery**: Restore normal operations\n• **Lessons Learned**: Post-incident review', inline: false }
      )
      .setFooter({ text: 'NCSC: ncsc.gov.uk/cyberessentials | Cyber Aware: cyberaware.gov.uk' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async aml(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('💰 Anti-Money Laundering (AML) Compliance')
      .setDescription('AML regulations and requirements for UK businesses')
      .setColor(0xE74C3C)
      .addFields(
        { name: '⚖️ Who Needs AML?', value: '• **Regulated Sectors**: Financial services, accountants, legal, estate agents, casinos, dealers in high-value goods\n• **Money Service Businesses**: Payment services, currency exchange\n• **Trust & Company Service Providers**\n• **Crypto Asset Businesses**: Crypto exchanges, wallet providers', inline: false },
        { name: '📋 Key Obligations', value: '• **Customer Due Diligence (CDD)**: Verify customer identity\n• **Enhanced Due Diligence (EDD)**: High-risk customers/transactions\n• **Simplified Due Diligence (SDD)**: Low-risk situations\n• **Ongoing Monitoring**: Monitor customer activity\n• **Record Keeping**: Keep records for 5 years\n• **Suspicious Activity Reports (SARs)**: Report to NCA', inline: false },
        { name: '👤 Customer Due Diligence', value: '• **Identity Verification**: Photo ID (passport, driving licence)\n• **Address Verification**: Utility bill, bank statement\n• **Business Verification**: Company registration documents\n• **Beneficial Ownership**: Identify ultimate owners (25%+ shares)\n• **Purpose**: Understand reason for business relationship\n• **Source of Funds**: Origin of money being used', inline: false },
        { name: '🔍 Risk Assessment', value: '• **Business-Wide**: Assess overall AML risk\n• **Customer Risk**: High, medium, low risk categorization\n• **Product/Service Risk**: Risk of different offerings\n• **Geographic Risk**: Countries with weak AML controls\n• **Delivery Channel Risk**: Face-to-face vs remote\n• **Documentation**: Written risk assessment required', inline: false },
        { name: '🚩 Red Flags', value: '• Unusual transaction patterns\n• Transactions with high-risk countries\n• Reluctance to provide information\n• Use of third parties without explanation\n• Transactions not aligned with business profile\n• Complex corporate structures\n• Cash-intensive businesses\n• Politically exposed persons (PEPs)', inline: false },
        { name: '📊 Suspicious Activity Reports', value: '• **When to Report**: Knowledge or suspicion of money laundering\n• **To Whom**: National Crime Agency (NCA)\n• **Timeframe**: As soon as possible\n• **Consent**: May need consent to proceed\n• **Tipping Off**: Don\'t tell the customer\n• **Protection**: SAR reporter protected from liability', inline: false },
        { name: '👨‍💼 Nominated Officer', value: '• **Appointment**: Must appoint MLRO (Money Laundering Reporting Officer)\n• **Responsibilities**: Receive internal reports, make SARs\n• **Training**: Must be appropriately trained\n• **Authority**: Senior management level\n• **Backup**: Deputy MLRO recommended', inline: false },
        { name: '📚 Policies & Procedures', value: '• **Written Policies**: Document AML procedures\n• **Risk Assessment**: Annual business risk assessment\n• **CDD Procedures**: How to verify customers\n• **Monitoring**: Transaction monitoring procedures\n• **Record Keeping**: What records to keep, for how long\n• **Training**: Staff training program', inline: false },
        { name: '👥 Staff Training', value: '• **Frequency**: Regular training (at least annually)\n• **Content**: AML regulations, red flags, reporting\n• **New Joiners**: Training on induction\n• **Records**: Keep training records\n• **Awareness**: Keep staff updated on changes', inline: false },
        { name: '🔍 Supervision & Registration', value: '• **FCA**: Financial services firms\n• **HMRC**: MSBs, trust/company service providers\n• **Professional Bodies**: Accountants, solicitors\n• **Gambling Commission**: Casinos\n• **Registration**: Must be registered/supervised\n• **Fees**: Registration and annual fees apply', inline: false },
        { name: '💰 Penalties', value: '• **Criminal Offences**: Up to 14 years imprisonment\n• **Fines**: Unlimited for businesses\n• **FCA**: Regulatory fines and bans\n• **Reputation**: Severe reputational damage\n• **Directors**: Personal liability possible', inline: false }
      )
      .setFooter({ text: 'NCA: nationalcrimeagency.gov.uk | Always consult an AML compliance specialist' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
