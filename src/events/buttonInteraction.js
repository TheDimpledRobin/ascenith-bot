const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'close_ticket') {
      const ticket = client.db.getTicket(interaction.channelId);

      if (!ticket) return;

      // Import the close handler from ticket command
      const { errorEmbed } = require('../utils/helpers');
      const { EmbedBuilder } = require('discord.js');

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
  }
};
