const { SlashCommandBuilder, PermissionFlagsBits, ChannelType, EmbedBuilder } = require('discord.js');
const { successEmbed, errorEmbed, warningEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup wizard for Ascenith Advisory Bot (Server Owner Only)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  
  async execute(interaction, client) {
    // Check if user is server owner
    if (interaction.user.id !== interaction.guild.ownerId) {
      return interaction.reply({
        embeds: [errorEmbed('Permission Denied', 'Only the server owner can run the setup wizard.')],
        ephemeral: true
      });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      const guild = interaction.guild;
      
      // Create roles
      const clientRole = await guild.roles.create({
        name: 'Client',
        color: 0x95A5A6,
        reason: 'Ascenith Bot Setup - Client Role'
      });

      const advisorRole = await guild.roles.create({
        name: 'Advisor',
        color: 0x3498DB,
        permissions: [PermissionFlagsBits.ManageMessages],
        reason: 'Ascenith Bot Setup - Advisor Role'
      });

      const seniorAdvisorRole = await guild.roles.create({
        name: 'Senior Advisor',
        color: 0x9B59B6,
        permissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ModerateMembers],
        reason: 'Ascenith Bot Setup - Senior Advisor Role'
      });

      const adminRole = await guild.roles.create({
        name: 'Advisory Admin',
        color: 0xE74C3C,
        permissions: [PermissionFlagsBits.ManageMessages, PermissionFlagsBits.ModerateMembers, PermissionFlagsBits.ManageRoles],
        reason: 'Ascenith Bot Setup - Admin Role'
      });

      // Create channels category
      const advisoryCategory = await guild.channels.create({
        name: '📊 ASCENITH ADVISORY',
        type: ChannelType.GuildCategory,
        reason: 'Ascenith Bot Setup'
      });

      // Create welcome channel
      const welcomeChannel = await guild.channels.create({
        name: '👋welcome',
        type: ChannelType.GuildText,
        parent: advisoryCategory.id,
        reason: 'Ascenith Bot Setup'
      });

      // Create info channel
      const infoChannel = await guild.channels.create({
        name: '📋info',
        type: ChannelType.GuildText,
        parent: advisoryCategory.id,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.SendMessages],
          },
        ],
        reason: 'Ascenith Bot Setup'
      });

      // Create mod log channel
      const modLogChannel = await guild.channels.create({
        name: '🛡️mod-logs',
        type: ChannelType.GuildText,
        parent: advisoryCategory.id,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: advisorRole.id,
            allow: [PermissionFlagsBits.ViewChannel],
          },
        ],
        reason: 'Ascenith Bot Setup'
      });

      // Create tickets category
      const ticketsCategory = await guild.channels.create({
        name: '🎫 SUPPORT TICKETS',
        type: ChannelType.GuildCategory,
        reason: 'Ascenith Bot Setup'
      });

      // Create ticket log channel
      const ticketLogChannel = await guild.channels.create({
        name: '📝ticket-logs',
        type: ChannelType.GuildText,
        parent: ticketsCategory.id,
        permissionOverwrites: [
          {
            id: guild.id,
            deny: [PermissionFlagsBits.ViewChannel],
          },
          {
            id: advisorRole.id,
            allow: [PermissionFlagsBits.ViewChannel],
          },
        ],
        reason: 'Ascenith Bot Setup'
      });

      // Save configuration to database
      client.db.setGuildConfig(guild.id, {
        setup_completed: 1,
        mod_log_channel: modLogChannel.id,
        ticket_category: ticketsCategory.id,
        ticket_log_channel: ticketLogChannel.id,
        welcome_channel: welcomeChannel.id,
        advisor_role: advisorRole.id,
        senior_advisor_role: seniorAdvisorRole.id,
        admin_role: adminRole.id,
        client_role: clientRole.id
      });

      // Send setup complete message
      const setupEmbed = new EmbedBuilder()
        .setTitle('✅ Setup Complete!')
        .setDescription('Ascenith Advisory Bot has been successfully configured for your server.')
        .setColor(0x2ECC71)
        .addFields(
          {
            name: '👥 Roles Created',
            value: `${clientRole}\n${advisorRole}\n${seniorAdvisorRole}\n${adminRole}`,
            inline: true
          },
          {
            name: '📁 Channels Created',
            value: `${welcomeChannel}\n${infoChannel}\n${modLogChannel}\n${ticketLogChannel}`,
            inline: true
          },
          {
            name: '🚀 Next Steps',
            value: '• Assign roles to your team members\n• Customize channel permissions as needed\n• Review `/help` for available commands\n• Set up your info channel with business details',
            inline: false
          }
        )
        .setTimestamp();

      await interaction.editReply({ embeds: [setupEmbed] });

      // Send welcome message to info channel
      const infoEmbed = new EmbedBuilder()
        .setTitle('Welcome to Ascenith Business Advisory')
        .setDescription('Your trusted partner for business consulting and advisory services.')
        .setColor(0x3498DB)
        .addFields(
          { name: '📊 Our Services', value: '• Business Strategy\n• Financial Advisory\n• Market Analysis\n• Growth Consulting\n• Risk Management', inline: true },
          { name: '🎯 Getting Started', value: '• Open a ticket: `/ticket create`\n• Request consultation: `/consultation`\n• View resources: `/resources`\n• Check services: `/advisory-info`', inline: true },
          { name: '🤝 Support', value: 'Our team of expert advisors is here to help you succeed. Don\'t hesitate to reach out!', inline: false }
        )
        .setFooter({ text: 'Ascenith Business Advisory © 2026' })
        .setTimestamp();

      await infoChannel.send({ embeds: [infoEmbed] });

    } catch (error) {
      console.error('Setup error:', error);
      await interaction.editReply({
        embeds: [errorEmbed('Setup Failed', `An error occurred during setup: ${error.message}`)]
      });
    }
  }
};
