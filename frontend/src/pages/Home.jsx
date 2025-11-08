import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Users } from 'lucide-react';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const data = await getCharacters();
      setCharacters(data);
    } catch (error) {
      console.error('Failed to load characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCharacterSelect = (characterId) => {
    navigate(`/chat/${characterId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EduVerse
              </h1>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Học Lịch Sử</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>AI Tương Tác</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Trò Chuyện Với Lịch Sử
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá lịch sử Việt Nam qua cuộc trò chuyện trực tiếp với các nhân vật lịch sử. 
            AI sẽ nhập vai và chia sẻ kiến thức, kinh nghiệm của họ.
          </p>
        </div>

        {/* Characters Grid */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Chọn Nhân Vật Lịch Sử
          </h3>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Đang tải...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onSelect={handleCharacterSelect}
                />
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-bold text-lg mb-2">AI Nhập Vai</h4>
            <p className="text-gray-600 text-sm">
              AI sẽ nhập vai nhân vật lịch sử, trả lời với văn phong và kiến thức chính xác
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-secondary" />
            </div>
            <h4 className="font-bold text-lg mb-2">Giọng Nói Sinh Động</h4>
            <p className="text-gray-600 text-sm">
              Nghe giọng nói tiếng Việt tự nhiên từ các nhân vật lịch sử
            </p>
          </div>

          <div className="card text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-success" />
            </div>
            <h4 className="font-bold text-lg mb-2">Học Tập Tương Tác</h4>
            <p className="text-gray-600 text-sm">
              Học lịch sử một cách sinh động, hấp dẫn và dễ nhớ
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 text-sm">
            © 2025 EduVerse - Hackathon Project | Made with ❤️ for Vietnam
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
