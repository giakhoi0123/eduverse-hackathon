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
    <div className="min-h-screen fade-in">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 slide-up">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">
                EduVerse
              </h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2 hover:text-primary transition-colors cursor-pointer">
                <BookOpen className="w-4 h-4" />
                <span>Học Lịch Sử</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-secondary transition-colors cursor-pointer">
                <Users className="w-4 h-4" />
                <span>AI Tương Tác</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16 slide-up">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium">
              ✨ Powered by AI • Made for Vietnam 🇻🇳
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text leading-tight">
            Trò Chuyện Với Lịch Sử
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Khám phá lịch sử Việt Nam qua cuộc trò chuyện trực tiếp với các nhân vật lịch sử. 
            AI sẽ nhập vai và chia sẻ kiến thức, kinh nghiệm của họ một cách sinh động và dễ hiểu.
          </p>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white"></div>
              ))}
            </div>
            <span className="text-sm text-gray-600">4 nhân vật lịch sử đang chờ bạn</span>
          </div>
        </div>

        {/* Characters Grid */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-3 gradient-text">
              Chọn Nhân Vật Lịch Sử
            </h3>
            <p className="text-gray-600">
              Click vào nhân vật để bắt đầu cuộc trò chuyện
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
                <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
              </div>
              <p className="mt-6 text-gray-600 font-medium">Đang tải nhân vật...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {characters.map((character, index) => (
                <div 
                  key={character.id}
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CharacterCard
                    character={character}
                    onSelect={handleCharacterSelect}
                  />
                </div>
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
