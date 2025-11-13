import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Chat from './pages/Chat';
import TimelinePage from './pages/TimelinePage';
import ProfilePage from './pages/ProfilePage';
import { logLoginActivity } from './utils/activity-tracker';

function App() {
  // Log login activity on app start
  useEffect(() => {
    logLoginActivity();
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:characterId" element={<Chat />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
