const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getTierName, getTierColor, getUserTier } = require('../../utils/permissions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View all available commands and bot information'),
  
  async execute(interaction, client) {
    const guildConfig = client.db.getGuildConfig(interaction.guildId);
    const userTier = getUserTier(interaction.member, guildConfig);
    const tierName = getTierName(userTier);

    const embed = new EmbedBuilder()
      .setTitle('📚 Ascenith Advisory Bot - Help')
      .setDescription(`Welcome to the Ascenith Business Advisory bot!\n**Your Tier:** ${tierName}`)
      .setColor(getTierColor(userTier))
      .setTimestamp();

    // General Commands
    embed.addFields({
      name: '📋 General Commands',
      value: '`/help` - Show this help message\n`/advisory-info` - Learn about our services\n`/resources` - Access business resources\n`/consultation` - Request a consultation',
      inline: false
    });

    // Ticket Commands
    embed.addFields({
      name: '🎫 Ticket Commands',
      value: '`/ticket create` - Create a support ticket\n`/ticket close` - Close current ticket\n`/ticket add` - Add user to ticket\n`/ticket remove` - Remove user from ticket',
      inline: false
    });

    // Business Toolkits - Available to All
    embed.addFields({
      name: '🛠️ Business Advisory Toolkits',
      value: '`/toolkits` - **Interactive menu** for all toolkits\n`/financial-toolkit` - Financial tools & calculators (UK)\n`/compliance-toolkit` - Legal & regulatory compliance\n`/hr-toolkit` - Human resources management\n`/operations-toolkit` - Operational excellence tools\n`/strategy-toolkit` - Strategic planning frameworks',
      inline: false
    });

    // Advisor Commands
    if (userTier >= 1) {
      embed.addFields({
        name: '🔧 Advisor Tools (Advisor+)',
        value: '`/client-status` - Check client information\n`/notes add` - Add client note\n`/notes view` - View client notes\n`/consultations list` - List consultation requests\n`/consultations assign` - Assign consultation to yourself',
        inline: false
      });

      embed.addFields({
        name: '🛡️ Moderation (Advisor+)',
        value: '`/warn` - Warn a user\n`/timeout` - Timeout a user\n`/clear` - Clear messages\n`/modlogs` - View moderation logs',
        inline: false
      });
    }

    // Senior Advisor Commands
    if (userTier >= 2) {
      embed.addFields({
        name: '⚡ Senior Advisor Tools',
        value: '`/kick` - Kick a user\n`/ban` - Ban a user',
        inline: false
      });
    }

    // Admin Commands
    if (userTier >= 3) {
      embed.addFields({
        name: '⚙️ Admin Commands',
        value: '`/setup` - Run setup wizard (Owner only)',
        inline: false
      });
    }

    embed.addFields({
      name: '🔗 Support',
      value: 'Need help? Open a ticket with `/ticket create` or contact an advisor.',
      inline: false
    });

    embed.setFooter({ text: 'Ascenith Business Advisory © 2026' });

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
