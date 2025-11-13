import { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

/**
 * Profile Dashboard Component
 * Displays user XP, level, badges, streaks, and personalized recommendations
 */
export default function ProfileDashboard({ userId = 'demo-user' }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/profiles/${userId}`);
      const data = await response.json();
      
      if (data.success) {
        setProfile(data.profile);
      } else {
        setError('Không thể tải profile');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Lỗi kết nối');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!profile) return null;

  const { level, badges, recommendations, achievements, streak_days, total_chats, total_quizzes } = profile;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Hồ Sơ Học Tập</h1>
          <p className="text-gray-600">Theo dõi tiến trình và thành tích của bạn</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* XP Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Cấp Độ
            </h3>
            <div className="w-32 h-32 mx-auto mb-3">
              <CircularProgressbar
                value={level?.progress || 0}
                text={level?.label || 'N/A'}
                styles={buildStyles({
                  textSize: '14px',
                  pathColor: '#3B82F6',
                  textColor: '#1F2937',
                  trailColor: '#E5E7EB',
                })}
              />
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{profile.xp} XP</p>
              {level?.xp_max && (
                <p className="text-sm text-gray-500">
                  Còn {level.xp_max - profile.xp} XP để lên cấp
                </p>
              )}
            </div>
          </div>

          {/* Streak */}
          <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">🔥 Streak</h3>
            <p className="text-4xl font-bold mb-1">{streak_days} ngày</p>
            <p className="text-sm opacity-90">Kiên trì học mỗi ngày!</p>
          </div>

          {/* Total Chats */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">💬 Trò chuyện</h3>
            <p className="text-4xl font-bold mb-1">{total_chats}</p>
            <p className="text-sm opacity-90">Cuộc đối thoại hoàn thành</p>
          </div>

          {/* Total Quizzes */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">🎯 Quiz</h3>
            <p className="text-4xl font-bold mb-1">{total_quizzes}</p>
            <p className="text-sm opacity-90">Bài kiểm tra đã làm</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🏆</span>
            Huy Hiệu ({badges.length})
          </h2>
          
          {badges.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Chưa có huy hiệu nào. Hãy tiếp tục học để mở khóa!
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-100 to-amber-200 rounded-xl p-4 text-center hover:scale-105 transition-transform"
                >
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-bold text-gray-800 text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                  <span className="inline-block bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    +{badge.xp_reward} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Achievements Progress */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">📊</span>
            Tiến Trình Thành Tích
          </h2>
          
          <div className="space-y-4">
            {achievements?.map((achievement, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-800">{achievement.name}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  {achievement.earned ? (
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      ✓ Đạt được
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-blue-600">
                      {achievement.progress_percentage}%
                    </span>
                  )}
                </div>
                
                {!achievement.earned && (
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${achievement.progress_percentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">✨</span>
            Đề Xuất Cho Bạn
          </h2>
          
          {recommendations?.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              Chưa có đề xuất. Hãy học thêm để nhận gợi ý cá nhân hóa!
            </p>
          ) : (
            <div className="space-y-3">
              {recommendations?.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {rec.type === 'character' && '👤 '}
                      {rec.type === 'era' && '⏰ '}
                      {rec.type === 'quiz' && '🎯 '}
                      {rec.type === 'practice' && '📚 '}
                      {rec.name || rec.type}
                    </h4>
                    <p className="text-sm text-gray-600">{rec.reason}</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                    Bắt đầu
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
