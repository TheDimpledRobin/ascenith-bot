const { PermissionFlagsBits } = require('discord.js');

// User tier levels
const UserTiers = {
  CLIENT: 'client',
  ADVISOR: 'advisor',
  SENIOR_ADVISOR: 'senior_advisor',
  ADMIN: 'admin',
  OWNER: 'owner'
};

// Get user tier based on roles
function getUserTier(member, guildConfig) {
  if (!member || !guildConfig) return UserTiers.CLIENT;
  
  // Owner check
  if (member.guild.ownerId === member.id) return UserTiers.OWNER;
  
  // Admin check
  if (member.permissions.has(PermissionFlagsBits.Administrator)) return UserTiers.ADMIN;
  
  // Role-based tiers
  if (guildConfig.admin_role && member.roles.cache.has(guildConfig.admin_role)) {
    return UserTiers.ADMIN;
  }
  
  if (guildConfig.senior_advisor_role && member.roles.cache.has(guildConfig.senior_advisor_role)) {
    return UserTiers.SENIOR_ADVISOR;
  }
  
  if (guildConfig.advisor_role && member.roles.cache.has(guildConfig.advisor_role)) {
    return UserTiers.ADVISOR;
  }
  
  if (guildConfig.client_role && member.roles.cache.has(guildConfig.client_role)) {
    return UserTiers.CLIENT;
  }
  
  return UserTiers.CLIENT;
}

// Check if user has required tier
function hasRequiredTier(userTier, requiredTier) {
  const tierHierarchy = [
    UserTiers.CLIENT,
    UserTiers.ADVISOR,
    UserTiers.SENIOR_ADVISOR,
    UserTiers.ADMIN,
    UserTiers.OWNER
  ];
  
  const userIndex = tierHierarchy.indexOf(userTier);
  const requiredIndex = tierHierarchy.indexOf(requiredTier);
  
  return userIndex >= requiredIndex;
}

// Get tier name for display
function getTierName(tier) {
  const tierNames = {
    [UserTiers.CLIENT]: 'Client',
    [UserTiers.ADVISOR]: 'Advisor',
    [UserTiers.SENIOR_ADVISOR]: 'Senior Advisor',
    [UserTiers.ADMIN]: 'Administrator',
    [UserTiers.OWNER]: 'Owner'
  };
  
  return tierNames[tier] || 'Unknown';
}

// Get tier color
function getTierColor(tier) {
  const tierColors = {
    [UserTiers.CLIENT]: 0x95A5A6,      // Gray
    [UserTiers.ADVISOR]: 0x3498DB,     // Blue
    [UserTiers.SENIOR_ADVISOR]: 0x9B59B6, // Purple
    [UserTiers.ADMIN]: 0xE74C3C,       // Red
    [UserTiers.OWNER]: 0xF1C40F        // Gold
  };
  
  return tierColors[tier] || 0x95A5A6;
}

module.exports = {
  UserTiers,
  getUserTier,
  hasRequiredTier,
  getTierName,
  getTierColor
};
