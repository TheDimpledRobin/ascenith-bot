const { EmbedBuilder } = require('discord.js');

// Create a standard embed
function createEmbed(title, description, color = 0x3498DB) {
  return new EmbedBuilder()
    .setTitle(title)
    .setDescription(description)
    .setColor(color)
    .setTimestamp();
}

// Create a success embed
function successEmbed(title, description) {
  return createEmbed(title, description, 0x2ECC71);
}

// Create an error embed
function errorEmbed(title, description) {
  return createEmbed(title, description, 0xE74C3C);
}

// Create a warning embed
function warningEmbed(title, description) {
  return createEmbed(title, description, 0xF39C12);
}

// Create an info embed
function infoEmbed(title, description) {
  return createEmbed(title, description, 0x3498DB);
}

// Format date
function formatDate(date) {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Truncate text
function truncate(text, length = 100) {
  if (text.length <= length) return text;
  return text.substring(0, length - 3) + '...';
}

// Parse duration string (e.g., "1h", "30m", "1d")
function parseDuration(durationStr) {
  const ms = require('ms');
  try {
    return ms(durationStr);
  } catch (error) {
    return null;
  }
}

// Format duration for display
function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  return `${seconds} second${seconds > 1 ? 's' : ''}`;
}

// Get member by mention or ID
async function getMember(guild, identifier) {
  if (!identifier) return null;
  
  // Remove mention formatting
  const id = identifier.replace(/[<@!>]/g, '');
  
  try {
    return await guild.members.fetch(id);
  } catch (error) {
    return null;
  }
}

// Get channel by mention or ID
function getChannel(guild, identifier) {
  if (!identifier) return null;
  
  // Remove mention formatting
  const id = identifier.replace(/[<#>]/g, '');
  
  return guild.channels.cache.get(id);
}

// Get role by mention or ID
function getRole(guild, identifier) {
  if (!identifier) return null;
  
  // Remove mention formatting
  const id = identifier.replace(/[<@&>]/g, '');
  
  return guild.roles.cache.get(id);
}

module.exports = {
  createEmbed,
  successEmbed,
  errorEmbed,
  warningEmbed,
  infoEmbed,
  formatDate,
  truncate,
  parseDuration,
  formatDuration,
  getMember,
  getChannel,
  getRole
};
