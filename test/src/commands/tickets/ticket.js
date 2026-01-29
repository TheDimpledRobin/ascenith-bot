const { SlashCommandBuilder, ChannelType, EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { successEmbed, errorEmbed } = require('../../utils/helpers');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Manage support tickets')
    .addSubcommand(subcommand =>
      subcommand
        .setName('create')
        .setDescription('Create a support ticket')
        .addStringOption(option =>
          option.setName('subject')
            .setDescription('Subject of your ticket')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('close')
        .setDescription('Close the current ticket'))
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('Add a user to the current ticket')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('User to add')
            .setRequired(true)))
    .addSubcommand(subcommand =>
      subcommand
        .setName('remove')
        .setDescription('Remove a user from the current ticket')
        .addUserOption(option =>
          option.setName('user')
            .setDescription('User to remove')
            .setRequired(true))),
  
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === 'create') {
      await handleCreate(interaction, client);
    } else if (subcommand === 'close') {
      await handleClose(interaction, client);
    } else if (subcommand === 'add') {
      await handleAdd(interaction, client);
    } else if (subcommand === 'remove') {
      await handleRemove(interaction, client);
    }
  }
};

async function handleCreate(interaction, client) {
  const subject = interaction.options.getString('subject');
  const guildConfig = client.db.getGuildConfig(interaction.guildId);

  if (!guildConfig.ticket_category) {
    return interaction.reply({
      embeds: [errorEmbed('Error', 'Ticket system is not configured.')],
      ephemeral: true
    });
  }

  // Check if user already has an open ticket
  const existingTickets = client.db.getUserTickets(interaction.guildId, interaction.user.id);
  if (existingTickets.length >= 3) {
    return interaction.reply({
      embeds: [errorEmbed('Error', 'You already have 3 open tickets. Please close one before opening another.')],
      ephemeral: true
    });
  }

  await interaction.deferReply({ ephemeral: true });

  try {
    // Get ticket number
    const allTickets = client.db.db.prepare('SELECT COUNT(*) as count FROM tickets WHERE guild_id = ?').get(interaction.guildId);
    const ticketNumber = (allTickets.count || 0) + 1;

    // Create ticket channel
    const ticketChannel = await interaction.guild.channels.create({
      name: `ticket-${ticketNumber}`,
      type: ChannelType.GuildText,
      parent: guildConfig.ticket_category,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionFlagsBits.ViewChannel],
        },
        {
          id: interaction.user.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
        },
        {
          id: interaction.client.user.id,
          allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageChannels],
        }
      ],
      reason: `Ticket created by ${interaction.user.tag}`
    });

    // Add advisor role permissions
    if (guildConfig.advisor_role) {
      await ticketChannel.permissionOverwrites.create(guildConfig.advisor_role, {
        ViewChannel: true,
        SendMessages: true,
        ReadMessageHistory: true
      });
    }

    // Save ticket to database
    client.db.createTicket(interaction.guildId, ticketChannel.id, interaction.user.id, subject);

    // Create embed for ticket channel
    const ticketEmbed = new EmbedBuilder()
      .setTitle(`🎫 Support Ticket #${ticketNumber}`)
      .setDescription(`**Subject:** ${subject}\n\nThank you for contacting Ascenith Advisory. An advisor will be with you shortly.`)
      .addFields(
        { name: 'Ticket Creator', value: `${interaction.user}`, inline: true },
        { name: 'Status', value: 'Open', inline: true }
      )
      .setColor(0x3498DB)
      .setTimestamp();

    const closeButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('close_ticket')
          .setLabel('Close Ticket')
          .setStyle(ButtonStyle.Danger)
          .setEmoji('🔒')
      );

    await ticketChannel.send({
      content: `${interaction.user} | Our advisors will be notified.`,
      embeds: [ticketEmbed],
      components: [closeButton]
    });

    // Reply to user
    await interaction.editReply({
      embeds: [successEmbed('Ticket Created', `Your ticket has been created: ${ticketChannel}`)]
    });

    // Log to ticket log channel
    if (guildConfig.ticket_log_channel) {
      const logChannel = interaction.guild.channels.cache.get(guildConfig.ticket_log_channel);
      if (logChannel) {
        const logEmbed = new EmbedBuilder()
          .setTitle('🎫 New Ticket Created')
          .addFields(
            { name: 'Ticket', value: `${ticketChannel}`, inline: true },
            { name: 'User', value: interaction.user.tag, inline: true },
            { name: 'Subject', value: subject }
          )
          .setColor(0x2ECC71)
          .setTimestamp();

        logChannel.send({ embeds: [logEmbed] });
      }
    }

  } catch (error) {
    console.error('Ticket creation error:', error);
    await interaction.editReply({
      embeds: [errorEmbed('Error', 'Failed to create ticket.')]
    });
  }
}

async function handleClose(interaction, client) {
  const ticket = client.db.getTicket(interaction.channelId);

  if (!ticket) {
    return interaction.reply({
      embeds: [errorEmbed('Error', 'This is not a ticket channel.')],
      ephemeral: true
    });
  }

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

async function handleAdd(interaction, client) {
  const ticket = client.db.getTicket(interaction.channelId);
  const user = interaction.options.getUser('user');

  if (!ticket) {
    return interaction.reply({
      embeds: [errorEmbed('Error', 'This is not a ticket channel.')],
      ephemeral: true
    });
  }

  try {
    await interaction.channel.permissionOverwrites.create(user.id, {
      ViewChannel: true,
      SendMessages: true,
      ReadMessageHistory: true
    });

    interaction.reply({
      embeds: [successEmbed('User Added', `${user} has been added to this ticket.`)]
    });

  } catch (error) {
    console.error('Add user error:', error);
    interaction.reply({
      embeds: [errorEmbed('Error', 'Failed to add user to ticket.')],
      ephemeral: true
    });
  }
}

async function handleRemove(interaction, client) {
  const ticket = client.db.getTicket(interaction.channelId);
  const user = interaction.options.getUser('user');

  if (!ticket) {
    return interaction.reply({
      embeds: [errorEmbed('Error', 'This is not a ticket channel.')],
      ephemeral: true
    });
  }

  if (user.id === ticket.user_id) {
    return interaction.reply({
      embeds: [errorEmbed('Error', 'You cannot remove the ticket creator.')],
      ephemeral: true
    });
  }

  try {
    await interaction.channel.permissionOverwrites.delete(user.id);

    interaction.reply({
      embeds: [successEmbed('User Removed', `${user} has been removed from this ticket.`)]
    });

  } catch (error) {
    console.error('Remove user error:', error);
    interaction.reply({
      embeds: [errorEmbed('Error', 'Failed to remove user from ticket.')],
      ephemeral: true
    });
  }
}
