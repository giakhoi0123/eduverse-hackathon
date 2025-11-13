/**
 * User Profile & Progress Manager
 * Tracks learning progress, awards badges, calculates XP, and provides personalized recommendations
 */

// Badge definitions
const BADGES = {
  first_chat: {
    id: 'first_chat',
    name: 'Người Khai Phá',
    description: 'Hoàn thành cuộc trò chuyện đầu tiên',
    icon: '🎯',
    xp_reward: 50,
    condition: (profile) => profile.total_chats >= 1
  },
  chat_master: {
    id: 'chat_master',
    name: 'Bậc Thầy Đối Thoại',
    description: 'Trò chuyện với 5 nhân vật khác nhau',
    icon: '💬',
    xp_reward: 200,
    condition: (profile) => profile.unique_characters.length >= 5
  },
  quiz_ace: {
    id: 'quiz_ace',
    name: 'Thần Đồng Quiz',
    description: 'Đạt 100% trong 3 quiz liên tiếp',
    icon: '🏆',
    xp_reward: 300,
    condition: (profile) => {
      const recent = profile.quiz_history.slice(-3);
      return recent.length === 3 && recent.every(q => q.score === 100);
    }
  },
  tran_expert: {
    id: 'tran_expert',
    name: 'Chuyên Gia Nhà Trần',
    description: 'Trò chuyện với 3 nhân vật nhà Trần',
    icon: '⚔️',
    xp_reward: 150,
    condition: (profile) => {
      const tranChars = ['tran-hung-dao', 'tran-nhan-tong', 'tran-quoc-tuan'];
      return tranChars.filter(c => profile.unique_characters.includes(c)).length >= 3;
    }
  },
  naval_enthusiast: {
    id: 'naval_enthusiast',
    name: 'Mê Hải Chiến',
    description: 'Học 5 sự kiện về chiến tranh trên sông/biển',
    icon: '⛵',
    xp_reward: 100,
    condition: (profile) => {
      return profile.topics_explored.naval >= 5;
    }
  },
  week_streak: {
    id: 'week_streak',
    name: 'Kiên Trì Một Tuần',
    description: 'Học 7 ngày liên tiếp',
    icon: '🔥',
    xp_reward: 250,
    condition: (profile) => profile.streak_days >= 7
  },
  time_traveler: {
    id: 'time_traveler',
    name: 'Du Hành Thời Gian',
    description: 'Khám phá 4 thời kỳ lịch sử khác nhau',
    icon: '⏰',
    xp_reward: 200,
    condition: (profile) => profile.unique_eras.length >= 4
  }
};

// XP calculation rules
const XP_RULES = {
  chat_per_minute: 5,       // 5 XP per minute chatting
  quiz_correct_answer: 20,  // 20 XP per correct answer
  quiz_perfect_bonus: 100,  // Bonus for 100% score
  daily_first_login: 25,    // Daily login bonus
  streak_multiplier: 1.1    // 10% bonus per streak day
};

// Learning levels
const LEVELS = {
  beginner: { min_xp: 0, max_xp: 500, label: 'Người Mới' },
  intermediate: { min_xp: 501, max_xp: 2000, label: 'Trung Cấp' },
  advanced: { min_xp: 2001, max_xp: 5000, label: 'Cao Cấp' },
  expert: { min_xp: 5001, max_xp: Infinity, label: 'Chuyên Gia' }
};

/**
 * Calculate XP earned from an activity
 */
export function calculateXP(activity, profile) {
  let xp = 0;
  
  // Chat XP
  if (activity.type === 'chat') {
    const minutes = Math.floor(activity.duration / 60);
    xp += minutes * XP_RULES.chat_per_minute;
    
    // Streak multiplier
    if (profile.streak_days > 0) {
      xp *= Math.pow(XP_RULES.streak_multiplier, Math.min(profile.streak_days, 7));
    }
  }
  
  // Quiz XP
  if (activity.type === 'quiz') {
    xp += activity.correct_answers * XP_RULES.quiz_correct_answer;
    
    // Perfect score bonus
    if (activity.score === 100) {
      xp += XP_RULES.quiz_perfect_bonus;
    }
  }
  
  // Daily first login bonus
  if (activity.type === 'login' && activity.is_first_today) {
    xp += XP_RULES.daily_first_login;
  }
  
  return Math.round(xp);
}

/**
 * Get user's learning level based on XP
 */
export function getLevel(xp) {
  for (const [key, level] of Object.entries(LEVELS)) {
    if (xp >= level.min_xp && xp <= level.max_xp) {
      return {
        level: key,
        label: level.label,
        xp_current: xp,
        xp_min: level.min_xp,
        xp_max: level.max_xp === Infinity ? null : level.max_xp,
        progress: level.max_xp === Infinity ? 100 : 
                  ((xp - level.min_xp) / (level.max_xp - level.min_xp) * 100)
      };
    }
  }
  return null;
}

/**
 * Check and award new badges
 */
export function checkBadges(profile) {
  const newBadges = [];
  const earnedIds = profile.badges.map(b => b.id);
  
  for (const [badgeId, badge] of Object.entries(BADGES)) {
    // Skip if already earned
    if (earnedIds.includes(badgeId)) continue;
    
    // Check condition
    if (badge.condition(profile)) {
      newBadges.push({
        id: badge.id,
        name: badge.name,
        description: badge.description,
        icon: badge.icon,
        earned_at: new Date().toISOString(),
        xp_reward: badge.xp_reward
      });
    }
  }
  
  return newBadges;
}

/**
 * Update streak days
 */
export function updateStreak(profile, lastActiveDate) {
  const now = new Date();
  const last = new Date(lastActiveDate);
  
  // Reset hour/minute/second for date comparison
  now.setHours(0, 0, 0, 0);
  last.setHours(0, 0, 0, 0);
  
  const daysDiff = Math.floor((now - last) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 0) {
    // Same day, no change
    return profile.streak_days;
  } else if (daysDiff === 1) {
    // Next day, increment streak
    return profile.streak_days + 1;
  } else {
    // Missed a day, reset streak
    return 1;
  }
}

/**
 * Generate personalized recommendations
 */
export function generateRecommendations(profile) {
  const recommendations = [];
  
  // Recommend characters based on interests
  if (profile.topics_explored.naval > 2) {
    recommendations.push({
      type: 'character',
      id: 'tran-hung-dao',
      name: 'Trần Hưng Đạo',
      reason: 'Bạn thích chiến tranh trên sông/biển',
      priority: 'high'
    });
  }
  
  if (profile.topics_explored.independence > 2) {
    recommendations.push({
      type: 'character',
      id: 'le-loi',
      name: 'Lê Lợi',
      reason: 'Bạn quan tâm đến độc lập dân tộc',
      priority: 'high'
    });
  }
  
  // Recommend eras not yet explored
  const allEras = ['Cổ đại', 'Trung đại', 'Cận đại', 'Hiện đại'];
  const unexplored = allEras.filter(era => !profile.unique_eras.includes(era));
  
  if (unexplored.length > 0) {
    recommendations.push({
      type: 'era',
      id: unexplored[0].toLowerCase().replace(/\s+/g, '-'),
      name: unexplored[0],
      reason: 'Khám phá thời kỳ mới',
      priority: 'medium'
    });
  }
  
  // Recommend quiz if chat/quiz ratio is imbalanced
  const chatQuizRatio = profile.total_chats / Math.max(profile.total_quizzes, 1);
  if (chatQuizRatio > 3) {
    recommendations.push({
      type: 'quiz',
      reason: 'Thử thách kiến thức với quiz',
      priority: 'medium'
    });
  }
  
  // Recommend weak topics (low quiz scores)
  const weakTopics = Object.entries(profile.quiz_performance_by_topic || {})
    .filter(([topic, perf]) => perf.avg_score < 70)
    .sort((a, b) => a[1].avg_score - b[1].avg_score)
    .slice(0, 2);
  
  for (const [topic, perf] of weakTopics) {
    recommendations.push({
      type: 'practice',
      topic,
      reason: `Cải thiện về ${topic} (điểm TB: ${Math.round(perf.avg_score)}%)`,
      priority: 'low'
    });
  }
  
  return recommendations.slice(0, 5); // Top 5 recommendations
}

/**
 * Calculate topic engagement from activities
 */
export function calculateTopicEngagement(activities) {
  const topics = {};
  
  for (const activity of activities) {
    if (activity.tags) {
      for (const tag of activity.tags) {
        topics[tag] = (topics[tag] || 0) + 1;
      }
    }
  }
  
  return topics;
}

/**
 * Get achievement progress
 */
export function getAchievementProgress(profile) {
  const progress = [];
  
  for (const [badgeId, badge] of Object.entries(BADGES)) {
    const earned = profile.badges.some(b => b.id === badgeId);
    
    // Calculate progress percentage
    let percentage = 0;
    if (!earned) {
      // Simple heuristic based on badge type
      if (badgeId === 'first_chat') {
        percentage = Math.min(100, profile.total_chats * 100);
      } else if (badgeId === 'chat_master') {
        percentage = Math.min(100, (profile.unique_characters.length / 5) * 100);
      } else if (badgeId === 'week_streak') {
        percentage = Math.min(100, (profile.streak_days / 7) * 100);
      }
    }
    
    progress.push({
      badge_id: badgeId,
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      earned,
      progress_percentage: earned ? 100 : Math.round(percentage)
    });
  }
  
  return progress;
}

/**
 * Create initial profile
 */
export function createInitialProfile(userId, preferences = {}) {
  return {
    user_id: userId,
    created_at: new Date().toISOString(),
    xp: 0,
    badges: [],
    total_chats: 0,
    total_quizzes: 0,
    unique_characters: [],
    unique_eras: [],
    topics_explored: {},
    quiz_history: [],
    quiz_performance_by_topic: {},
    streak_days: 0,
    last_active: new Date().toISOString(),
    preferences: {
      language: 'vi',
      voice: 'default',
      learning_goal: preferences.learning_goal || 'Basic',
      ...preferences
    },
    privacy_settings: {
      share_progress: false,
      anonymous_mode: false
    }
  };
}
