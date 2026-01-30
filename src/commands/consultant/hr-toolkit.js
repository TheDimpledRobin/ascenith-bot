const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { UserTiers } = require('../../utils/permissions');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hr-toolkit')
    .setDescription('Human Resources advisory tools and resources (UK)')
    .addSubcommand(subcommand =>
      subcommand
        .setName('menu')
        .setDescription('View HR toolkit menu'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('recruitment')
        .setDescription('Recruitment best practices and templates'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('onboarding')
        .setDescription('Employee onboarding checklist'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('performance')
        .setDescription('Performance management framework'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('disciplinary')
        .setDescription('Disciplinary procedure guidance'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('absence')
        .setDescription('Absence management guidance'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('redundancy')
        .setDescription('Redundancy process and requirements'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('wellbeing')
        .setDescription('Employee wellbeing initiatives'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('diversity')
        .setDescription('Diversity and inclusion guidance')),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
      case 'menu':
        await this.showMenu(interaction);
        break;
      case 'recruitment':
        await this.recruitment(interaction);
        break;
      case 'onboarding':
        await this.onboarding(interaction);
        break;
      case 'performance':
        await this.performance(interaction);
        break;
      case 'disciplinary':
        await this.disciplinary(interaction);
        break;
      case 'absence':
        await this.absence(interaction);
        break;
      case 'redundancy':
        await this.redundancy(interaction);
        break;
      case 'wellbeing':
        await this.wellbeing(interaction);
        break;
      case 'diversity':
        await this.diversity(interaction);
        break;
    }
  },

  async showMenu(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('👥 Human Resources Toolkit')
      .setDescription('Comprehensive HR tools and guidance for UK businesses')
      .setColor(0x9B59B6)
      .addFields(
        { name: '🎯 Recruitment', value: 'Best practices and templates', inline: true },
        { name: '📝 Onboarding', value: 'New employee checklists', inline: true },
        { name: '📊 Performance', value: 'Performance management framework', inline: true },
        { name: '⚖️ Disciplinary', value: 'Disciplinary procedures', inline: true },
        { name: '🏥 Absence', value: 'Absence management', inline: true },
        { name: '📉 Redundancy', value: 'Redundancy process', inline: true },
        { name: '💚 Wellbeing', value: 'Employee wellbeing programs', inline: true },
        { name: '🌍 Diversity', value: 'Diversity & inclusion', inline: true }
      )
      .setFooter({ text: 'Use /hr-toolkit [tool-name] to access specific guidance' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async recruitment(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🎯 Recruitment Best Practices')
      .setDescription('Complete guide to effective recruitment in the UK')
      .setColor(0x3498DB)
      .addFields(
        { name: '📋 Job Description', value: '• **Job Title**: Clear and accurate\n• **Responsibilities**: Key duties and tasks\n• **Requirements**: Essential vs. desirable\n• **Skills**: Technical and soft skills\n• **Salary**: Range or competitive\n• **Benefits**: Perks and benefits\n• **Location**: Office/remote/hybrid', inline: false },
        { name: '📝 Person Specification', value: '• **Qualifications**: Required certifications/degrees\n• **Experience**: Years and type of experience\n• **Skills**: Technical competencies\n• **Attributes**: Personal qualities\n• **Avoid**: Discriminatory requirements', inline: false },
        { name: '🌐 Advertising Channels', value: '• **Job Boards**: Indeed, Reed, Totaljobs\n• **LinkedIn**: Professional network\n• **Specialist Sites**: Industry-specific boards\n• **Recruitment Agencies**: For specialist roles\n• **Social Media**: Facebook, Twitter, Instagram\n• **Employee Referrals**: Internal recommendations\n• **University Partnerships**: Graduate recruitment', inline: false },
        { name: '🔍 Screening Process', value: '• **CV Review**: Match to job requirements\n• **Phone Screen**: Initial conversation (15-30 mins)\n• **Skills Test**: Technical assessment if relevant\n• **First Interview**: Culture fit and basics\n• **Second Interview**: Deep-dive technical/role\n• **Final Interview**: Meet team/senior leadership', inline: false },
        { name: '💼 Interview Best Practices', value: '• **Structure**: Use competency-based questions\n• **Consistency**: Same questions for all candidates\n• **Panel**: Include 2-3 interviewers\n• **Notes**: Document responses and impressions\n• **Time**: Allow 45-60 minutes\n• **Questions**: Leave time for candidate questions\n• **Avoid**: Discriminatory or leading questions', inline: false },
        { name: '✅ Reference Checks', value: '• **Timing**: After conditional offer\n• **Number**: Typically 2 references\n• **Questions**: Performance, reliability, reason for leaving\n• **Verbal**: Phone call preferred\n• **Written**: Backup documentation\n• **Red Flags**: Reluctance, gaps, inconsistencies', inline: false },
        { name: '📄 Right to Work Checks', value: '• **Mandatory**: Before employment starts\n• **Documents**: Passport, visa, birth certificate + NI\n• **Verification**: Original documents only\n• **Copies**: Keep secure copies\n• **Visa Expiry**: Check and monitor\n• **Penalties**: Up to £20,000 per illegal worker', inline: false },
        { name: '💰 Offer Letter', value: '• **Position**: Job title and reporting line\n• **Start Date**: Agreed commencement\n• **Salary**: Annual/hourly rate\n• **Benefits**: Pension, holidays, perks\n• **Conditions**: References, RTW checks\n• **Acceptance**: Deadline for acceptance\n• **Contract**: To follow separately', inline: false },
        { name: '⚖️ Legal Considerations', value: '• **Equal Opportunities**: No discrimination\n• **Data Protection**: GDPR-compliant\n• **Reasonable Adjustments**: For disabled candidates\n• **Working Time**: Ensure compliance\n• **Criminal Records**: DBS checks where appropriate\n• **Immigration**: Right to work checks', inline: false },
        { name: '📊 Recruitment Metrics', value: '• **Time to Hire**: Days from posting to acceptance\n• **Cost per Hire**: Total recruitment costs\n• **Quality of Hire**: Performance after 1 year\n• **Source Effectiveness**: Which channels work\n• **Offer Acceptance Rate**: % who accept\n• **Retention Rate**: % staying after 12 months', inline: false }
      )
      .setFooter({ text: 'CIPD: cipd.co.uk | ACAS: acas.org.uk' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async onboarding(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📝 Employee Onboarding Checklist')
      .setDescription('Complete onboarding process for new hires')
      .setColor(0x2ECC71)
      .addFields(
        { name: '📋 Pre-Day One (1-2 Weeks Before)', value: '✅ Send welcome email\n✅ Complete right to work checks\n✅ Obtain references\n✅ Send starter checklist\n✅ Order equipment (laptop, phone, etc.)\n✅ Set up email account and systems access\n✅ Prepare workstation\n✅ Notify team of new starter\n✅ Plan first week schedule', inline: false },
        { name: '🎉 Day One', value: '✅ Greet and welcome\n✅ Office/premises tour\n✅ Health & safety briefing\n✅ Provide equipment and access\n✅ Complete employment paperwork\n✅ Set up payroll and pension\n✅ Introduce to team\n✅ Explain first week schedule\n✅ Assign buddy/mentor\n✅ First day lunch with team', inline: false },
        { name: '📅 First Week', value: '✅ Overview of company culture and values\n✅ Department introductions\n✅ Systems training\n✅ Review job description and objectives\n✅ Explain policies and procedures\n✅ Set up 1-on-1 meetings\n✅ Provide training schedule\n✅ Check in daily\n✅ End of week catch-up', inline: false },
        { name: '📊 First Month', value: '✅ Role-specific training\n✅ Regular check-ins (weekly)\n✅ Set initial goals\n✅ Performance expectations discussion\n✅ Introduce key stakeholders\n✅ Involve in meetings and projects\n✅ 30-day review meeting\n✅ Gather feedback on onboarding', inline: false },
        { name: '🎯 First Three Months', value: '✅ Increased responsibility\n✅ Bi-weekly 1-on-1s\n✅ Progress reviews\n✅ Additional training as needed\n✅ Integration into team projects\n✅ 90-day probation review\n✅ Confirm permanent employment\n✅ Set performance objectives', inline: false },
        { name: '📄 Documentation to Complete', value: '• **Contract of Employment**: Signed copy\n• **Personal Details**: Emergency contacts\n• **Bank Details**: For payroll\n• **P45**: From previous employer\n• **Pension**: Auto-enrolment forms\n• **Policies**: Receipt of handbook\n• **GDPR**: Data processing consent\n• **Equipment**: Signing out form', inline: false },
        { name: '🔐 System Access Required', value: '• Email account\n• Intranet/SharePoint\n• HR system\n• Time tracking/booking\n• Communication tools (Slack, Teams)\n• Role-specific software\n• VPN (if remote)\n• Security passes/keys', inline: false },
        { name: '👥 Key People to Meet', value: '• Direct line manager\n• Team members\n• HR contact\n• IT support\n• Health & safety officer\n• Other department heads\n• Senior leadership\n• Mentor/buddy', inline: false },
        { name: '💡 Onboarding Best Practices', value: '• **Structured Program**: Don\'t leave to chance\n• **Regular Check-ins**: Daily in week 1, then weekly\n• **Feedback**: Two-way communication\n• **Social Integration**: Team lunches, activities\n• **Resources**: Provide all necessary tools\n• **Clear Expectations**: What success looks like\n• **Patience**: Allow time to learn', inline: false }
      )
      .setFooter({ text: 'Good onboarding increases retention by 82%' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async performance(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📊 Performance Management Framework')
      .setDescription('Effective performance management for UK businesses')
      .setColor(0xF39C12)
      .addFields(
        { name: '🎯 Setting Objectives', value: '• **SMART Goals**: Specific, Measurable, Achievable, Relevant, Time-bound\n• **Alignment**: Link to company objectives\n• **Clarity**: Clear expectations\n• **Agreement**: Collaborative goal-setting\n• **Documentation**: Written objectives\n• **Review**: Regular progress checks', inline: false },
        { name: '📅 Review Cycle', value: '• **Annual Review**: Formal annual appraisal\n• **Mid-Year Review**: 6-month check-in\n• **Quarterly Check-ins**: Progress reviews\n• **Monthly 1-on-1s**: Regular touchpoints\n• **Continuous Feedback**: Ongoing dialogue\n• **Probation Reviews**: 30, 60, 90 days for new starters', inline: false },
        { name: '📝 Performance Appraisal', value: '• **Self-Assessment**: Employee completes first\n• **Manager Assessment**: Manager reviews and rates\n• **Evidence**: Examples of performance\n• **Achievements**: Highlight successes\n• **Development Areas**: Areas to improve\n• **Meeting**: Discussion and agreement\n• **Rating**: Performance rating if used\n• **Action Plan**: Development plan', inline: false },
        { name: '⭐ Rating Scale (Example)', value: '• **Outstanding (5)**: Consistently exceeds expectations\n• **Exceeds (4)**: Regularly exceeds expectations\n• **Meets (3)**: Consistently meets expectations\n• **Needs Improvement (2)**: Sometimes meets expectations\n• **Unsatisfactory (1)**: Does not meet expectations', inline: false },
        { name: '💬 Giving Feedback', value: '• **Timely**: As close to event as possible\n• **Specific**: Concrete examples\n• **Balanced**: Positive and constructive\n• **Actionable**: Clear next steps\n• **Regular**: Not just at appraisal time\n• **Two-Way**: Encourage employee feedback\n• **Private**: 1-on-1 for sensitive feedback', inline: false },
        { name: '📈 Development Plans', value: '• **Skills Gap**: Identify development needs\n• **Training**: Courses, workshops, certifications\n• **Mentoring**: Assign mentor or coach\n• **Stretch Assignments**: New challenges\n• **Job Shadowing**: Learn from others\n• **Reading**: Books, articles, resources\n• **Timelines**: Set completion dates\n• **Support**: Manager support and resources', inline: false },
        { name: '🚀 Career Development', value: '• **Career Conversations**: Discuss aspirations\n• **Career Paths**: Potential progression routes\n• **Succession Planning**: Identify future leaders\n• **Skills Development**: Build capabilities\n• **Opportunities**: Stretch projects\n• **Promotion Criteria**: Clear expectations\n• **Internal Mobility**: Cross-functional moves', inline: false },
        { name: '⚠️ Managing Underperformance', value: '• **Early Identification**: Don\'t wait for appraisal\n• **Clear Feedback**: Specific issues\n• **Support Plan**: Additional training/support\n• **Regular Reviews**: Weekly/fortnightly check-ins\n• **Documentation**: Keep detailed records\n• **Performance Improvement Plan (PIP)**: Formal process\n• **Timeline**: Usually 30-90 days\n• **Outcomes**: Improvement or disciplinary', inline: false },
        { name: '📊 Performance Metrics', value: '• **KPIs**: Key performance indicators\n• **Targets**: Quantifiable goals\n• **Quality Measures**: Quality of work\n• **Timeliness**: Meeting deadlines\n• **Behaviors**: How work is done\n• **Customer Feedback**: Internal/external\n• **360 Feedback**: Multi-source feedback', inline: false },
        { name: '💡 Best Practices', value: '• **Continuous Process**: Not just annual event\n• **Two-Way Dialogue**: Collaborative discussions\n• **Development Focus**: Not just evaluation\n• **Regular 1-on-1s**: Build relationship\n• **Documentation**: Keep good records\n• **Training**: Train managers in performance management\n• **Fair & Consistent**: Apply standards equally', inline: false }
      )
      .setFooter({ text: 'CIPD: Performance Management | ACAS: Managing Performance' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async disciplinary(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('⚖️ Disciplinary Procedure Guidance')
      .setDescription('Fair and legal disciplinary process for UK employers')
      .setColor(0xE74C3C)
      .addFields(
        { name: '📋 ACAS Code of Practice', value: '• **Legal Status**: Tribunals consider adherence to code\n• **Failure to Follow**: Can increase compensation by 25%\n• **Core Principles**: Fair, timely, consistent, transparent\n• **Small Employers**: Simpler process acceptable\n• **Always Follow**: For all disciplinary matters', inline: false },
        { name: '🔍 Investigation', value: '• **Prompt**: Start as soon as issue identified\n• **Impartial**: Independent investigator if possible\n• **Thorough**: Gather all evidence\n• **Witnesses**: Interview relevant people\n• **Documents**: Collect relevant documentation\n• **Suspension**: Consider if necessary (paid)\n• **Report**: Document findings\n• **Decision**: Determine if case to answer', inline: false },
        { name: '📧 Invitation to Hearing', value: '• **In Writing**: Formal letter\n• **Sufficient Notice**: Reasonable time to prepare (3-5 days)\n• **Allegations**: Specific details of alleged misconduct\n• **Evidence**: Provide copies of evidence\n• **Right to Accompany**: Colleague or trade union rep\n• **Date/Time/Location**: Clear details\n• **Consequences**: Potential outcomes', inline: false },
        { name: '👥 Disciplinary Hearing', value: '• **Attendance**: Employer, employee, companion, note-taker\n• **Allegations**: Clearly state the case\n• **Evidence**: Present all evidence\n• **Employee Response**: Give full opportunity to respond\n• **Questions**: Allow questioning of evidence\n• **Mitigating Factors**: Consider any mitigation\n• **Adjournment**: If more time/information needed\n• **Decision**: Make decision after hearing', inline: false },
        { name: '📊 Disciplinary Sanctions', value: '• **Verbal Warning**: First instance minor misconduct\n• **Written Warning**: More serious or repeated misconduct\n• **Final Written Warning**: Serious misconduct\n• **Dismissal**: Gross misconduct or after final warning\n• **Demotion**: Reduction in role/pay (rare)\n• **Suspension**: Usually only during investigation\n• **Training**: Additional training/supervision', inline: false },
        { name: '📄 Outcome Letter', value: '• **In Writing**: Within reasonable time (few days)\n• **Decision**: Clear outcome and sanction\n• **Reasons**: Explanation of decision\n• **Evidence**: What evidence considered\n• **Improvement Required**: What needs to change\n• **Timescale**: Review period for warning\n• **Appeal Rights**: How to appeal\n• **Appeal Deadline**: Usually 5-10 working days', inline: false },
        { name: '🔄 Appeal Process', value: '• **Right to Appeal**: Always offer appeal\n• **Grounds**: New evidence, procedure, severity\n• **In Writing**: Employee submits appeal\n• **Impartial**: Different manager if possible\n• **Hearing**: Full rehearing of case\n• **Decision**: Uphold, overturn, or modify\n• **Final**: Appeal decision is final\n• **Documentation**: Keep full records', inline: false },
        { name: '⚠️ Gross Misconduct Examples', value: '• Theft or fraud\n• Physical violence\n• Serious insubordination\n• Serious breach of safety rules\n• Serious breach of confidence\n• Being under influence of drugs/alcohol\n• Serious negligence\n• Serious breaches of policy', inline: false },
        { name: '💼 Ordinary Misconduct Examples', value: '• Lateness/absence\n• Minor insubordination\n• Poor performance\n• Minor policy breaches\n• Inappropriate behavior\n• Minor negligence\n• Dress code violations\n• Time-keeping issues', inline: false },
        { name: '⚖️ Legal Considerations', value: '• **Fair Reason**: Conduct must be fair reason\n• **Reasonable**: Response proportionate\n• **Consistent**: Apply rules consistently\n• **Investigation**: Proper investigation essential\n• **Process**: Follow fair procedure\n• **Documentation**: Keep detailed records\n• **Discrimination**: Avoid discriminatory treatment\n• **Disability**: Make reasonable adjustments', inline: false },
        { name: '📝 Record Keeping', value: '• Investigation notes and evidence\n• Invitation letters\n• Hearing notes\n• Outcome letters\n• Appeal correspondence\n• All related documents\n• **Retention**: Keep for 6+ years\n• **Confidentiality**: Secure storage', inline: false }
      )
      .setFooter({ text: 'ACAS: acas.org.uk/disciplinary | Get legal advice for serious matters' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async absence(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🏥 Absence Management Guidance')
      .setDescription('Effective absence management for UK employers')
      .setColor(0x16A085)
      .addFields(
        { name: '📊 Types of Absence', value: '• **Sickness**: Genuine illness or injury\n• **Unauthorized**: Absence without permission\n• **Authorized**: Pre-approved absence\n• **Lateness**: Late arrival\n• **Annual Leave**: Holiday entitlement\n• **Parental Leave**: Maternity, paternity, etc.\n• **Compassionate Leave**: Bereavement\n• **Other**: Medical appointments, jury service', inline: false },
        { name: '📞 Reporting Procedures', value: '• **First Day**: Call manager by agreed time (e.g., 9am)\n• **Who to Contact**: Direct manager or HR\n• **Method**: Phone call (not text/email for first day)\n• **Information**: Nature of illness, expected return\n• **Updates**: Regular updates if prolonged\n• **Return**: Notify day before return\n• **Certificate**: Self-cert up to 7 days, fit note after', inline: false },
        { name: '📝 Self-Certification', value: '• **Duration**: Up to 7 days\n• **Form**: Employee completes form on return\n• **Information**: Dates, reason for absence\n• **No Fit Note**: Not required for short absences\n• **Record**: Keep on employee file', inline: false },
        { name: '🏥 Fit Notes (Sick Notes)', value: '• **Required**: After 7 consecutive days absence\n• **Issued By**: GP or hospital doctor\n• **Types**: Not fit for work, or May be fit for work\n• **Adjustments**: Suggestions for modified duties\n• **Cost**: Free from NHS\n• **Submission**: Provide to employer\n• **Copies**: Keep secure copies', inline: false },
        { name: '💰 Statutory Sick Pay (SSP)', value: '• **Rate**: £109.40 per week (2025/26)\n• **Qualifying**: 4+ consecutive days absence\n• **Waiting Days**: First 3 days unpaid\n• **Duration**: Up to 28 weeks\n• **Eligibility**: Earning £123+ per week\n• **Calculation**: Qualifying days only\n• **Company Sick Pay**: May be more generous', inline: false },
        { name: '📊 Monitoring Absence', value: '• **Bradford Factor**: Score = S² × D (S = spells, D = days)\n• **Trigger Points**: Set intervention thresholds\n• **Patterns**: Look for trends (Mondays, Fridays)\n• **Frequency**: Number of absences\n• **Duration**: Length of absences\n• **Return to Work**: Interview after each absence\n• **Records**: Keep accurate records', inline: false },
        { name: '🤝 Return to Work Interviews', value: '• **Timing**: Same day or next working day\n• **Purpose**: Welcome back, check wellbeing\n• **Questions**: Reason, recovery, fitness to return\n• **Support**: Discuss any support needed\n• **Pattern**: Discuss if patterns emerging\n• **Documentation**: Record on file\n• **Confidential**: Sensitive and private', inline: false },
        { name: '🏥 Long-Term Absence', value: '• **Definition**: Usually 4+ weeks\n• **Contact**: Maintain regular contact\n• **Updates**: Request updated fit notes\n• **Occupational Health**: Refer if appropriate\n• **Adjustments**: Consider reasonable adjustments\n• **Return Plan**: Phased return if appropriate\n• **Medical Capability**: Consider if unable to return\n• **Dismissal**: Last resort after fair process', inline: false },
        { name: '♿ Disability-Related Absence', value: '• **Equality Act**: Protected from discrimination\n• **Reasonable Adjustments**: Legal duty to consider\n• **Occupational Health**: Expert advice\n• **Don\'t Count**: Consider not counting disability-related absence\n• **Individual Assessment**: Case-by-case basis\n• **Support**: Additional support and flexibility', inline: false },
        { name: '⚠️ Unauthorized Absence', value: '• **Definition**: Absence without permission/notification\n• **Serious**: Can be gross misconduct\n• **Contact**: Try to contact employee\n• **Investigation**: Investigate circumstances\n• **Disciplinary**: Follow disciplinary procedure\n• **Pay**: Unpaid absence\n• **Dismissal**: Possible for serious cases', inline: false },
        { name: '💡 Reducing Absence', value: '• **Culture**: Promote attendance culture\n• **Support**: Occupational health services\n• **Wellbeing**: Employee wellbeing programs\n• **Flexible Working**: Consider flexibility\n• **Early Intervention**: Address issues early\n• **Risk Assessments**: Prevent work-related ill health\n• **Return to Work**: Effective return procedures\n• **Training**: Train managers in absence management', inline: false }
      )
      .setFooter({ text: 'ACAS: Managing Attendance | HSE: Work-related Stress' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async redundancy(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('📉 Redundancy Process & Requirements')
      .setDescription('Legal redundancy procedures for UK employers')
      .setColor(0xE67E22)
      .addFields(
        { name: '⚖️ What is Redundancy?', value: '• **Genuine Redundancy**: Business closes, workplace closes, or less employees needed for work\n• **Not Redundancy**: Poor performance, misconduct, reorganization without job cuts\n• **Fair Process**: Must follow fair process\n• **Selection**: Fair and objective criteria\n• **Consultation**: Meaningful consultation required', inline: false },
        { name: '📋 Types of Redundancy', value: '• **Compulsory**: Employer selects employees\n• **Voluntary**: Employees volunteer\n• **Collective**: 20+ redundancies in 90 days\n• **Individual**: Fewer than 20 redundancies\n• **Partial**: Reduce hours or change terms', inline: false },
        { name: '🗣️ Consultation Requirements', value: '• **Individual**: Consult with affected employees\n• **Collective**: 20+ redundancies:\n  - 20-99: 30 days consultation\n  - 100+: 45 days consultation\n• **Start**: Before any dismissals\n• **Employee Reps**: Elect or appoint representatives\n• **Information**: Provide detailed information\n• **Meaningful**: Genuine consultation, not just notification', inline: false },
        { name: '📊 Selection Criteria', value: '• **Fair**: Objective and measurable\n• **Non-discriminatory**: No protected characteristics\n• **Examples**: Skills, qualifications, performance, attendance, disciplinary record, length of service\n• **Scoring**: Points-based system\n• **Transparent**: Employees should understand\n• **Applied Fairly**: Consistently applied\n• **Review**: Open to appeal/challenge', inline: false },
        { name: '🔍 Selection Process', value: '• **Pool**: Identify pool for selection\n• **Criteria**: Apply objective criteria\n• **Scoring**: Score all in pool\n• **Provisional Selection**: Identify those at risk\n• **Consultation**: Individual consultations\n• **Alternatives**: Consider alternatives\n• **Final Decision**: Confirm redundancies\n• **Appeals**: Offer appeal process', inline: false },
        { name: '🔄 Alternatives to Redundancy', value: '• **Recruitment Freeze**: Stop new hires\n• **Voluntary Redundancy**: Ask for volunteers\n• **Reduced Hours**: Reduce working hours\n• **Pay Cuts**: Temporary salary reductions\n• **Lay-off**: Temporary cessation of work\n• **Redeployment**: Alternative roles\n• **Early Retirement**: For those close to retirement\n• **Career Breaks**: Sabbaticals', inline: false },
        { name: '💰 Redundancy Pay', value: '• **Statutory**: Based on age and service:\n  - Under 22: 0.5 week per year\n  - 22-40: 1 week per year\n  - 41+: 1.5 weeks per year\n• **Maximum**: 20 years service\n• **Weekly Pay**: Capped at £700 (2025/26)\n• **Maximum Statutory**: £15,000\n• **Enhanced**: Many employers pay more\n• **Tax-Free**: First £30,000 tax-free', inline: false },
        { name: '📝 Notice Period', value: '• **Statutory Minimum**: 1 week per year service (max 12 weeks)\n• **Contractual**: May be longer\n• **Payment in Lieu**: Pay instead of working notice\n• **Garden Leave**: Pay but don\'t work\n• **During Notice**: Still entitled to job hunt time', inline: false },
        { name: '📄 Required Documentation', value: '• **At-Risk Letter**: Notify of potential redundancy\n• **Consultation Invitations**: Meeting invitations\n• **Meeting Notes**: Record of consultations\n• **Selection Scores**: Objective scoring\n• **Redundancy Letter**: Formal notice of redundancy\n• **Notice of Dismissal**: Formal dismissal letter\n• **Settlement Agreement**: If negotiated exit', inline: false },
        { name: '👥 Employee Rights', value: '• **Consultation**: Meaningful consultation\n• **Time Off**: Reasonable time to look for work (notice period)\n• **Redundancy Pay**: Statutory minimum (2+ years service)\n• **Notice Pay**: Statutory or contractual notice\n• **Accrued Holiday**: Pay for unused holiday\n• **Appeal**: Right to appeal selection\n• **Alternative Work**: Consider suitable alternatives', inline: false },
        { name: '⚠️ Unfair Redundancy', value: '• **Automatically Unfair**: Pregnancy, maternity, health & safety, whistleblowing, union activities\n• **Discriminatory**: Based on protected characteristic\n• **Unfair Selection**: Biased or subjective criteria\n• **No Consultation**: Failure to consult properly\n• **No Warning**: Sudden without consultation\n• **Tribunal**: Employee can claim unfair dismissal', inline: false },
        { name: '💼 Protective Award', value: '• **Collective Redundancy**: Failure to consult properly\n• **Award**: Up to 90 days pay per employee\n• **Uncapped**: Not subject to statutory cap\n• **Serious**: Significant financial penalty\n• **Employment Tribunal**: Employees/reps claim', inline: false }
      )
      .setFooter({ text: 'ACAS: Redundancy | GOV.UK: Calculate Redundancy Pay' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async wellbeing(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('💚 Employee Wellbeing Initiatives')
      .setDescription('Comprehensive wellbeing programs for UK businesses')
      .setColor(0x2ECC71)
      .addFields(
        { name: '🧠 Mental Health Support', value: '• **Employee Assistance Program (EAP)**: Confidential counseling\n• **Mental Health First Aiders**: Trained staff\n• **Awareness Training**: Mental health education\n• **Open Culture**: Reduce stigma\n• **Time to Talk**: Mental health days\n• **Resources**: Self-help materials\n• **Flexible Working**: Support mental health needs', inline: false },
        { name: '🏃 Physical Health', value: '• **Gym Membership**: Subsidized or corporate rates\n• **Cycle to Work**: Salary sacrifice scheme\n• **Health Screenings**: Annual health checks\n• **Active Breaks**: Encourage movement\n• **Standing Desks**: Ergonomic furniture\n• **Sports Teams**: Company sports clubs\n• **Step Challenges**: Activity competitions', inline: false },
        { name: '🥗 Nutrition & Healthy Eating', value: '• **Healthy Snacks**: Fruit bowls, healthy options\n• **Subsidized Meals**: Healthy canteen options\n• **Nutrition Workshops**: Education sessions\n• **Hydration**: Water stations\n• **Meal Prep**: Lunch prep areas\n• **Dietary Requirements**: Cater for all needs', inline: false },
        { name: '⚖️ Work-Life Balance', value: '• **Flexible Working**: Flexible hours/location\n• **Reduced Hours**: Part-time options\n• **Time Off**: Generous leave policies\n• **No Overtime Culture**: Encourage boundaries\n• **Email Policies**: No out-of-hours emails\n• **Compressed Hours**: 4-day weeks\n• **Sabbaticals**: Extended breaks', inline: false },
        { name: '💼 Financial Wellbeing', value: '• **Financial Education**: Money management workshops\n• **Pension Advice**: Enhanced pension contributions\n• **Salary Advance**: Emergency salary access\n• **Debt Advice**: Confidential debt support\n• **Benefits Package**: Comprehensive benefits\n• **Living Wage**: Pay above minimum wage\n• **Bonuses**: Performance-related bonuses', inline: false },
        { name: '🎓 Learning & Development', value: '• **Training Budget**: Personal development budget\n• **Career Development**: Clear progression paths\n• **Mentoring**: Mentorship programs\n• **Courses**: Professional qualifications\n• **Conferences**: Industry events\n• **Book Club**: Learning resources\n• **Lunch & Learn**: Knowledge sharing', inline: false },
        { name: '👥 Social Connection', value: '• **Team Activities**: Regular social events\n• **Employee Recognition**: Celebrate achievements\n• **Coffee Roulette**: Random coffee meetups\n• **Interest Groups**: Employee-led clubs\n• **Volunteer Days**: Community involvement\n• **Team Building**: Off-site activities\n• **Celebrations**: Birthdays, milestones', inline: false },
        { name: '🏢 Workplace Environment', value: '• **Comfortable Space**: Quality furniture\n• **Natural Light**: Maximize daylight\n• **Quiet Spaces**: Focus areas\n• **Breakout Areas**: Social spaces\n• **Plants**: Greenery in office\n• **Temperature Control**: Comfortable climate\n• **Cleanliness**: Well-maintained facilities\n• **Safety**: Safe working environment', inline: false },
        { name: '🌈 Diversity & Inclusion', value: '• **Inclusive Culture**: Everyone belongs\n• **Equal Opportunities**: Fair treatment\n• **Support Networks**: Employee resource groups\n• **Awareness Days**: Celebrate diversity\n• **Training**: Unconscious bias training\n• **Policies**: Clear anti-discrimination policies\n• **Accessibility**: Workplace adjustments', inline: false },
        { name: '📊 Measuring Wellbeing', value: '• **Surveys**: Regular wellbeing surveys\n• **Pulse Checks**: Quick check-ins\n• **Absence Rates**: Monitor trends\n• **Exit Interviews**: Understand leavers\n• **Engagement Scores**: Employee engagement\n• **Utilization**: Track program usage\n• **ROI**: Measure impact on business', inline: false },
        { name: '💡 Implementing Programs', value: '• **Leadership Buy-in**: Senior support essential\n• **Employee Input**: Ask what they want\n• **Start Small**: Pilot programs\n• **Communication**: Promote initiatives\n• **Budget**: Allocate appropriate budget\n• **Measure**: Track participation and impact\n• **Evolve**: Adapt based on feedback\n• **Sustain**: Long-term commitment', inline: false }
      )
      .setFooter({ text: 'Mind: mind.org.uk | Acas: Staff Wellbeing' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },

  async diversity(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('🌍 Diversity & Inclusion Guidance')
      .setDescription('Building inclusive workplaces in the UK')
      .setColor(0x9B59B6)
      .addFields(
        { name: '📋 Protected Characteristics (Equality Act 2010)', value: '• Age\n• Disability\n• Gender reassignment\n• Marriage and civil partnership\n• Pregnancy and maternity\n• Race\n• Religion or belief\n• Sex\n• Sexual orientation', inline: false },
        { name: '⚖️ Legal Requirements', value: '• **Equal Pay**: Same pay for equal work\n• **Recruitment**: Fair and non-discriminatory\n• **Reasonable Adjustments**: For disabled employees\n• **Harassment**: Zero tolerance policy\n• **Victimization**: Protection from retaliation\n• **Public Sector**: Public Sector Equality Duty\n• **Gender Pay Gap**: Reporting (250+ employees)', inline: false },
        { name: '🎯 D&I Strategy', value: '• **Vision**: Clear D&I vision and goals\n• **Leadership**: Commitment from top\n• **Accountability**: Assign D&I lead/champion\n• **Policies**: Review all policies\n• **Training**: Mandatory D&I training\n• **Metrics**: Track diversity data\n• **Action Plan**: Concrete actions and timelines\n• **Communication**: Regular updates', inline: false },
        { name: '👥 Inclusive Recruitment', value: '• **Job Adverts**: Inclusive language\n• **Diverse Sources**: Advertise widely\n• **Blind CVs**: Remove identifying information\n• **Diverse Panels**: Mixed interview panels\n• **Structured Interviews**: Consistent questions\n• **Assessment**: Skills-based assessments\n• **Flexible Working**: Advertise from day one\n• **Monitoring**: Track diversity data', inline: false },
        { name: '🏢 Inclusive Culture', value: '• **Values**: D&I in company values\n• **Role Models**: Visible diverse leadership\n• **Voice**: Give everyone a voice\n• **Belonging**: Everyone feels they belong\n• **Celebrate**: Recognize diversity\n• **Zero Tolerance**: No discrimination/harassment\n• **Speak Up**: Easy reporting mechanisms\n• **Continuous**: Ongoing commitment', inline: false },
        { name: '♿ Accessibility', value: '• **Physical**: Wheelchair access, adjustable desks\n• **Digital**: Screen readers, subtitles\n• **Communication**: Multiple formats\n• **Adjustments**: Reasonable adjustments\n• **Equipment**: Specialist equipment\n• **Support**: Mental health support\n• **Flexible**: Flexible working arrangements\n• **Awareness**: Disability awareness training', inline: false },
        { name: '👥 Employee Resource Groups (ERGs)', value: '• **Purpose**: Community and support\n• **Examples**: LGBTQ+, Women, BAME, Disability, Parents, Faith\n• **Support**: Company support and resources\n• **Voice**: Input into policies\n• **Events**: Organize events and activities\n• **Allies**: Welcome allies\n• **Impact**: Influence positive change', inline: false },
        { name: '📚 Training & Education', value: '• **Unconscious Bias**: Recognize biases\n• **Inclusive Leadership**: Lead inclusively\n• **Allyship**: How to be an ally\n• **Microaggressions**: Recognize and address\n• **Bystander**: Intervention training\n• **Specific**: Religion, disability, LGBTQ+, etc.\n• **Regular**: Ongoing training\n• **Mandatory**: All staff and leaders', inline: false },
        { name: '🎉 Awareness & Celebration', value: '• **Pride Month**: LGBTQ+ Pride (June)\n• **International Women\'s Day**: March 8\n• **Black History Month**: October (UK)\n• **Mental Health Awareness Week**: May\n• **Disability History Month**: November-December\n• **Religious Festivals**: Diwali, Eid, etc.\n• **Communication**: Educational content\n• **Activities**: Events and activities', inline: false },
        { name: '📊 Monitoring & Reporting', value: '• **Workforce Data**: Track diversity metrics\n• **Pay Gap**: Gender and ethnicity pay gaps\n• **Recruitment**: Diversity at each stage\n• **Retention**: Retention by demographic\n• **Progression**: Promotions by demographic\n• **Surveys**: Employee experience surveys\n• **Transparency**: Share data openly\n• **Action**: Use data to drive action', inline: false },
        { name: '🛡️ Preventing Discrimination', value: '• **Clear Policies**: Anti-discrimination policy\n• **Training**: Regular training\n• **Reporting**: Easy reporting process\n• **Investigation**: Thorough investigations\n• **Consequences**: Clear consequences\n• **Support**: Support for victims\n• **Zero Tolerance**: Visible commitment\n• **Culture**: Inclusive culture prevents issues', inline: false },
        { name: '💡 Best Practices', value: '• **Leadership**: Visible commitment from leaders\n• **Accountability**: Measure and hold accountable\n• **Employee-Led**: Listen to employees\n• **Intersectionality**: Recognize multiple identities\n• **Continuous**: Ongoing journey, not destination\n• **Authentic**: Genuine commitment\n• **Business Case**: D&I drives business success\n• **External**: Learn from others', inline: false }
      )
      .setFooter({ text: 'CIPD: Diversity & Inclusion | Stonewall | Business Disability Forum' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  }
};
