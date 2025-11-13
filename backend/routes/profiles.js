/**
 * Profile API Routes
 * Handles user profile creation, activity tracking, recommendations, and privacy controls
 */

import express from 'express';
import {
  calculateXP,
  getLevel,
  checkBadges,
  updateStreak,
  generateRecommendations,
  calculateTopicEngagement,
  getAchievementProgress,
  createInitialProfile
} from '../utils/profile-manager.js';
import {
  getProfile,
  saveProfile,
  deleteProfile,
  getAllProfiles,
  getProfilesByCharacter
} from '../data/profiles-store.js';

const router = express.Router();

/**
 * GET /api/profiles/:userId
 * Get user profile summary with XP, badges, level, recommendations
 */
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    let profile = getProfile(userId);
    
    // Create new profile if doesn't exist
    if (!profile) {
      profile = createInitialProfile(userId);
      saveProfile(profile);
    }
    
    // Calculate current level
    const level = getLevel(profile.xp);
    
    // Generate recommendations
    const recommendations = generateRecommendations(profile);
    
    // Get achievement progress
    const achievements = getAchievementProgress(profile);
    
    res.json({
      success: true,
      profile: {
        user_id: profile.user_id,
        xp: profile.xp,
        level,
        badges: profile.badges,
        total_chats: profile.total_chats,
        total_quizzes: profile.total_quizzes,
        unique_characters: profile.unique_characters,
        unique_eras: profile.unique_eras,
        streak_days: profile.streak_days,
        last_active: profile.last_active,
        recommendations,
        achievements,
        preferences: profile.preferences,
        privacy_settings: profile.privacy_settings
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch profile'
    });
  }
});

/**
 * POST /api/profiles/:userId/activities
 * Log a new activity (chat, quiz, login)
 */
router.post('/:userId/activities', (req, res) => {
  try {
    const { userId } = req.params;
    const activity = req.body;
    
    let profile = getProfile(userId) || createInitialProfile(userId);
    
    // Calculate XP earned
    const xpEarned = calculateXP(activity, profile);
    profile.xp += xpEarned;
    
    // Update activity counters
    if (activity.type === 'chat') {
      profile.total_chats += 1;
      
      // Track unique characters
      if (activity.character_id && !profile.unique_characters.includes(activity.character_id)) {
        profile.unique_characters.push(activity.character_id);
      }
      
      // Track eras
      if (activity.era && !profile.unique_eras.includes(activity.era)) {
        profile.unique_eras.push(activity.era);
      }
      
      // Track topics
      if (activity.tags) {
        for (const tag of activity.tags) {
          profile.topics_explored[tag] = (profile.topics_explored[tag] || 0) + 1;
        }
      }
    }
    
    if (activity.type === 'quiz') {
      profile.total_quizzes += 1;
      
      // Store quiz history
      profile.quiz_history.push({
        score: activity.score,
        correct_answers: activity.correct_answers,
        total_questions: activity.total_questions,
        topic: activity.topic || 'general',
        timestamp: new Date().toISOString()
      });
      
      // Update topic performance
      const topic = activity.topic || 'general';
      if (!profile.quiz_performance_by_topic[topic]) {
        profile.quiz_performance_by_topic[topic] = {
          attempts: 0,
          total_score: 0,
          avg_score: 0
        };
      }
      const topicPerf = profile.quiz_performance_by_topic[topic];
      topicPerf.attempts += 1;
      topicPerf.total_score += activity.score;
      topicPerf.avg_score = topicPerf.total_score / topicPerf.attempts;
    }
    
    // Update streak
    profile.streak_days = updateStreak(profile, profile.last_active);
    profile.last_active = new Date().toISOString();
    
    // Check for new badges
    const newBadges = checkBadges(profile);
    for (const badge of newBadges) {
      profile.badges.push(badge);
      profile.xp += badge.xp_reward;
    }
    
    // Save updated profile
    saveProfile(profile);
    
    // Return response with earned rewards
    const level = getLevel(profile.xp);
    
    res.json({
      success: true,
      activity_logged: true,
      rewards: {
        xp_earned: xpEarned,
        new_badges: newBadges,
        total_xp: profile.xp,
        level
      },
      profile: {
        xp: profile.xp,
        level,
        badges: profile.badges,
        streak_days: profile.streak_days
      }
    });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to log activity'
    });
  }
});

/**
 * PUT /api/profiles/:userId/preferences
 * Update user preferences
 */
router.put('/:userId/preferences', (req, res) => {
  try {
    const { userId } = req.params;
    const { preferences, privacy_settings } = req.body;
    
    let profile = getProfile(userId);
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Update preferences
    if (preferences) {
      profile.preferences = { ...profile.preferences, ...preferences };
    }
    
    // Update privacy settings
    if (privacy_settings) {
      profile.privacy_settings = { ...profile.privacy_settings, ...privacy_settings };
    }
    
    saveProfile(profile);
    
    res.json({
      success: true,
      profile: {
        preferences: profile.preferences,
        privacy_settings: profile.privacy_settings
      }
    });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update preferences'
    });
  }
});

/**
 * GET /api/profiles/:userId/export
 * Export all user data (GDPR compliance)
 */
router.get('/:userId/export', (req, res) => {
  try {
    const { userId } = req.params;
    const profile = getProfile(userId);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Return complete profile data
    res.json({
      success: true,
      export_date: new Date().toISOString(),
      data: profile
    });
  } catch (error) {
    console.error('Error exporting profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export profile'
    });
  }
});

/**
 * DELETE /api/profiles/:userId
 * Delete user profile (GDPR compliance)
 */
router.delete('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = deleteProfile(userId);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Profile deleted successfully',
      deleted_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete profile'
    });
  }
});

/**
 * GET /api/profiles/:userId/recommendations
 * Get personalized recommendations with collaborative filtering
 */
router.get('/:userId/recommendations', (req, res) => {
  try {
    const { userId } = req.params;
    const profile = getProfile(userId);
    
    if (!profile) {
      return res.status(404).json({
        success: false,
        error: 'Profile not found'
      });
    }
    
    // Basic recommendations
    const recommendations = generateRecommendations(profile);
    
    // Collaborative filtering: find similar users
    const similarUsers = [];
    for (const otherProfile of getAllProfiles()) {
      if (otherProfile.user_id === userId) continue;
      
      // Calculate similarity based on shared characters
      const sharedChars = profile.unique_characters.filter(c => 
        otherProfile.unique_characters.includes(c)
      );
      
      if (sharedChars.length > 0) {
        similarUsers.push({
          user_id: otherProfile.user_id,
          similarity: sharedChars.length,
          characters: otherProfile.unique_characters
        });
      }
    }
    
    // Sort by similarity
    similarUsers.sort((a, b) => b.similarity - a.similarity);
    
    // Get characters that similar users liked but current user hasn't tried
    const collaborativeRecs = [];
    for (const similar of similarUsers.slice(0, 3)) {
      const newChars = similar.characters.filter(c => 
        !profile.unique_characters.includes(c)
      );
      
      for (const char of newChars) {
        if (!collaborativeRecs.some(r => r.id === char)) {
          collaborativeRecs.push({
            type: 'character',
            id: char,
            reason: 'Người dùng tương tự đã thích',
            priority: 'medium'
          });
        }
      }
    }
    
    // Combine all recommendations
    const allRecs = [...recommendations, ...collaborativeRecs].slice(0, 10);
    
    res.json({
      success: true,
      recommendations: allRecs,
      similar_users_count: similarUsers.length
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get recommendations'
    });
  }
});

/**
 * GET /api/profiles (Admin: list all profiles for testing)
 */
router.get('/', (req, res) => {
  try {
    const allProfiles = getAllProfiles();
    
    res.json({
      success: true,
      count: allProfiles.length,
      profiles: allProfiles.map(p => ({
        user_id: p.user_id,
        xp: p.xp,
        level: getLevel(p.xp).label,
        badges: p.badges.length,
        total_chats: p.total_chats,
        total_quizzes: p.total_quizzes,
        streak_days: p.streak_days
      }))
    });
  } catch (error) {
    console.error('Error listing profiles:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to list profiles'
    });
  }
});

export default router;
