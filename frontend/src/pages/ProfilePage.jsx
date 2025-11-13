import { useState, useEffect } from 'react';
import ProfileDashboard from '../components/ProfileDashboard';

export default function ProfilePage() {
  const [userId, setUserId] = useState('demo-user');

  // In production, get userId from authentication
  useEffect(() => {
    // For now, use localStorage to persist demo user
    const storedUserId = localStorage.getItem('eduverse_user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      // Generate a random user ID for demo
      const newUserId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('eduverse_user_id', newUserId);
      setUserId(newUserId);
    }
  }, []);

  return <ProfileDashboard userId={userId} />;
}
