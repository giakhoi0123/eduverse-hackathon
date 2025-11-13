/**
 * Activity Tracker Utility
 * Logs user activities to the profile API
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Get current user ID
 */
function getUserId() {
  let userId = localStorage.getItem('eduverse_user_id');
  if (!userId) {
    userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('eduverse_user_id', userId);
  }
  return userId;
}

/**
 * Log a chat activity
 */
export async function logChatActivity(characterId, duration, era, tags = []) {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_URL}/api/profiles/${userId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chat',
        character_id: characterId,
        duration, // in seconds
        era,
        tags,
        timestamp: new Date().toISOString()
      })
    });
    
    const data = await response.json();
    
    // Show badge notification if new badges earned
    if (data.rewards?.new_badges?.length > 0) {
      showBadgeNotification(data.rewards.new_badges);
    }
    
    return data;
  } catch (error) {
    console.error('Error logging chat activity:', error);
    return null;
  }
}

/**
 * Log a quiz activity
 */
export async function logQuizActivity(score, correctAnswers, totalQuestions, topic = 'general') {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_URL}/api/profiles/${userId}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'quiz',
        score,
        correct_answers: correctAnswers,
        total_questions: totalQuestions,
        topic,
        timestamp: new Date().toISOString()
      })
    });
    
    const data = await response.json();
    
    // Show badge notification if new badges earned
    if (data.rewards?.new_badges?.length > 0) {
      showBadgeNotification(data.rewards.new_badges);
    }
    
    // Show XP gained notification
    if (data.rewards?.xp_earned > 0) {
      showXPNotification(data.rewards.xp_earned);
    }
    
    return data;
  } catch (error) {
    console.error('Error logging quiz activity:', error);
    return null;
  }
}

/**
 * Log a login activity
 */
export async function logLoginActivity() {
  try {
    const userId = getUserId();
    
    // Check if this is first login today
    const lastLogin = localStorage.getItem('eduverse_last_login');
    const today = new Date().toDateString();
    const isFirstToday = lastLogin !== today;
    
    if (isFirstToday) {
      localStorage.setItem('eduverse_last_login', today);
      
      const response = await fetch(`${API_URL}/api/profiles/${userId}/activities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'login',
          is_first_today: true,
          timestamp: new Date().toISOString()
        })
      });
      
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('Error logging login activity:', error);
    return null;
  }
}

/**
 * Show badge notification
 */
function showBadgeNotification(badges) {
  for (const badge of badges) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-slide-in-right';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <span class="text-4xl">${badge.icon}</span>
        <div>
          <p class="font-bold text-lg">Huy hiệu mới!</p>
          <p class="text-sm">${badge.name}</p>
          <p class="text-xs opacity-90">+${badge.xp_reward} XP</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  }
}

/**
 * Show XP gained notification
 */
function showXPNotification(xp) {
  const notification = document.createElement('div');
  notification.className = 'fixed top-20 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in-right';
  notification.innerHTML = `
    <div class="flex items-center space-x-2">
      <span class="text-2xl">✨</span>
      <p class="font-semibold">+${xp} XP</p>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('animate-fade-out');
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

/**
 * Get user profile
 */
export async function getUserProfile() {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_URL}/api/profiles/${userId}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Export user data (GDPR)
 */
export async function exportUserData() {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_URL}/api/profiles/${userId}/export`);
    const data = await response.json();
    
    if (data.success) {
      // Download as JSON file
      const blob = new Blob([JSON.stringify(data.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `eduverse-profile-${userId}-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    return data;
  } catch (error) {
    console.error('Error exporting user data:', error);
    return null;
  }
}

/**
 * Delete user profile (GDPR)
 */
export async function deleteUserProfile() {
  try {
    const userId = getUserId();
    const response = await fetch(`${API_URL}/api/profiles/${userId}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    
    if (data.success) {
      // Clear local storage
      localStorage.removeItem('eduverse_user_id');
      localStorage.removeItem('eduverse_last_login');
      alert('Dữ liệu của bạn đã được xóa thành công');
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting user profile:', error);
    return null;
  }
}
