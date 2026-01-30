const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    // Handle toolkit button interactions
    if (interaction.customId.startsWith('toolkit_')) {
      const toolkitType = interaction.customId.replace('toolkit_', '');
      await this.handleToolkitButton(interaction, toolkitType);
      return;
    }

    if (interaction.customId === 'close_ticket') {
      const ticket = client.db.getTicket(interaction.channelId);

      if (!ticket) return;

      // Import the close handler from ticket command
      const { errorEmbed } = require('../utils/helpers');

      await interaction.deferReply();

      try {
        // Close ticket in database
        client.db.closeTicket(interaction.channelId);

        // Send closing message
        const closeEmbed = new EmbedBuilder()
          .setTitle('🔒 Ticket Closed')
          .setDescription(`This ticket has been closed by ${interaction.user}.\nThe channel will be deleted in 10 seconds.`)
          .setColor(0xE74C3C)
          .setTimestamp();

        await interaction.editReply({ embeds: [closeEmbed] });

        // Log to ticket log channel
        const guildConfig = client.db.getGuildConfig(interaction.guildId);
        if (guildConfig.ticket_log_channel) {
          const logChannel = interaction.guild.channels.cache.get(guildConfig.ticket_log_channel);
          if (logChannel) {
            const logEmbed = new EmbedBuilder()
              .setTitle('🔒 Ticket Closed')
              .addFields(
                { name: 'Ticket', value: `#${interaction.channel.name}`, inline: true },
                { name: 'Closed By', value: interaction.user.tag, inline: true },
                { name: 'Creator', value: `<@${ticket.user_id}>`, inline: true }
              )
              .setColor(0xE74C3C)
              .setTimestamp();

            logChannel.send({ embeds: [logEmbed] });
          }
        }

        // Delete channel after delay
        setTimeout(() => {
          interaction.channel.delete('Ticket closed').catch(console.error);
        }, 10000);

      } catch (error) {
        console.error('Ticket close error:', error);
        await interaction.editReply({
          embeds: [errorEmbed('Error', 'Failed to close ticket.')]
        });
      }
    }
  },

  async handleToolkitButton(interaction, toolkitType) {
    const toolkitInfo = {
      financial: {
        title: '💰 Financial Advisory Toolkit',
        description: 'UK-focused financial tools and resources',
        color: 0x2ECC71,
        command: '/financial-toolkit',
        tools: [
          '📊 Cashflow Analysis',
          '📈 Financial Ratios Calculator',
          '💷 UK Tax Rates',
          '⚖️ Break-Even Calculator',
          '💹 ROI Calculator',
          '📋 Budget Templates',
          '🏦 UK Funding Options',
          '🧾 VAT Compliance Guide'
        ]
      },
      compliance: {
        title: '⚖️ Compliance & Regulatory Toolkit',
        description: 'Legal and compliance guidance for UK businesses',
        color: 0xE74C3C,
        command: '/compliance-toolkit',
        tools: [
          '🔒 GDPR Compliance',
          '🏢 Companies House Requirements',
          '👥 Employment Law',
          '🦺 Health & Safety',
          '📝 Business Contracts',
          '🛡️ Insurance Requirements',
          '💻 Cyber Security',
          '💰 Anti-Money Laundering'
        ]
      },
      hr: {
        title: '👥 Human Resources Toolkit',
        description: 'Complete HR management tools and guidance',
        color: 0x9B59B6,
        command: '/hr-toolkit',
        tools: [
          '🎯 Recruitment Best Practices',
          '📝 Onboarding Checklists',
          '📊 Performance Management',
          '⚖️ Disciplinary Procedures',
          '🏥 Absence Management',
          '📉 Redundancy Process',
          '💚 Employee Wellbeing',
          '🌍 Diversity & Inclusion'
        ]
      },
      operations: {
        title: '⚙️ Operations Excellence Toolkit',
        description: 'Optimize processes and operational performance',
        color: 0xF39C12,
        command: '/operations-toolkit',
        tools: [
          '🗺️ Process Mapping',
          '📊 Lean Six Sigma',
          '🚚 Supply Chain Optimization',
          '📦 Inventory Management',
          '✅ Quality Management',
          '📋 Project Management',
          '📈 KPI Dashboard',
          '⚠️ Risk Management'
        ]
      },
      strategy: {
        title: '🎯 Strategic Planning Toolkit',
        description: 'Strategic frameworks and business development',
        color: 0x3498DB,
        command: '/strategy-toolkit',
        tools: [
          '🎯 SWOT Analysis',
          '⚔️ Porter\'s Five Forces',
          '📊 Business Model Canvas',
          '🔍 Market Research',
          '🏆 Competitive Analysis',
          '🚀 Growth Strategies',
          '📈 Balanced Scorecard',
          '💰 Pricing Strategies'
        ]
      }
    };

    const toolkit = toolkitInfo[toolkitType];
    
    if (!toolkit) {
      await interaction.reply({ 
        content: 'Toolkit not found.',
        ephemeral: true 
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(toolkit.title)
      .setDescription(toolkit.description)
      .setColor(toolkit.color)
      .addFields({
        name: '🛠️ Available Tools',
        value: toolkit.tools.join('\n'),
        inline: false
      })
      .addFields({
        name: '📖 How to Use',
        value: `Use **${toolkit.command} menu** to see all available tools.\n\nThen use **${toolkit.command} [tool-name]** to access specific tools and guidance.`,
        inline: false
      })
      .setFooter({ text: 'Ascenith Business Advisory © 2026' })
      .setTimestamp();

    await interaction.reply({ 
      embeds: [embed],
      ephemeral: true 
    });
  }
};
