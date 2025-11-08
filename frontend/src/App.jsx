import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:characterId" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
