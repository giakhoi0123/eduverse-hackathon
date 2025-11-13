/**
 * In-memory storage for user profiles
 * In production, this should be replaced with a real database
 */

const profiles = new Map();

/**
 * Get profile by user ID
 */
export function getProfile(userId) {
  return profiles.get(userId) || null;
}

/**
 * Save or update profile
 */
export function saveProfile(profile) {
  profiles.set(profile.user_id, profile);
  return profile;
}

/**
 * Delete profile (GDPR compliance)
 */
export function deleteProfile(userId) {
  const exists = profiles.has(userId);
  profiles.delete(userId);
  return exists;
}

/**
 * Get all profiles (for admin/testing)
 */
export function getAllProfiles() {
  return Array.from(profiles.values());
}

/**
 * Get profiles by character interaction (for collaborative filtering)
 */
export function getProfilesByCharacter(characterId) {
  return Array.from(profiles.values())
    .filter(p => p.unique_characters.includes(characterId));
}

/**
 * Clear all profiles (for testing)
 */
export function clearAllProfiles() {
  profiles.clear();
}
