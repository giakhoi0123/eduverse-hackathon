import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Users } from 'lucide-react';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const DEFAULT_FILTERS = {
  category: 'all',
  gender: 'all',
  dynasty: 'all'
};

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [totalCharacters, setTotalCharacters] = useState(100);
  const navigate = useNavigate();

  const { category, gender, dynasty } = filters;
  const hasActiveFilters = Boolean(searchQuery.trim()) ||
    category !== 'all' ||
    gender !== 'all' ||
    dynasty !== 'all';

  useEffect(() => {
    if (!hasActiveFilters) {
      setCharacters([]);
      setLoading(false);
      return;
    }

    let isCancelled = false;

    const fetchCharacters = async () => {
      setLoading(true);
      const params = {
        search: searchQuery || undefined,
        category: category !== 'all' ? category : undefined,
        gender: gender !== 'all' ? gender : undefined,
        dynasty: dynasty !== 'all' ? dynasty : undefined
      };

      try {
        const result = await getCharacters(params);
        if (!isCancelled) {
          setCharacters(result.data);
          if (typeof result.total === 'number') {
            setTotalCharacters(result.total);
          }
        }
      } catch (error) {
        if (!isCancelled) {
          console.error('Failed to load characters:', error);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchCharacters();

    return () => {
      isCancelled = true;
    };
  }, [hasActiveFilters, searchQuery, category, gender, dynasty]);


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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12 sm:mb-16 slide-up">
          <div className="inline-block mb-4">
            <span className="px-3 sm:px-4 py-2 bg-blue-100 text-primary rounded-full text-xs sm:text-sm font-medium">
              ✨ Powered by AI • Made for Vietnam 🇻🇳
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 gradient-text leading-tight px-2">
            Trò Chuyện Với Lịch Sử
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Khám phá lịch sử Việt Nam qua cuộc trò chuyện trực tiếp với các nhân vật lịch sử. 
            AI sẽ nhập vai và chia sẻ kiến thức, kinh nghiệm của họ một cách sinh động và dễ hiểu.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].slice(0, (hasActiveFilters ? characters.length : totalCharacters) || 10).map((i) => (
                <div key={i} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white"></div>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {(hasActiveFilters ? characters.length : totalCharacters)} nhân vật lịch sử đang chờ bạn
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4 max-w-4xl mx-auto">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Tìm kiếm theo tên, thời kỳ, triều đại..."
          />
          <FilterBar 
            filters={filters}
            onChange={setFilters}
          />
        </div>

        {/* Characters Grid */}
        <div className="mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 gradient-text">
              {hasActiveFilters
                ? `Kết quả (${characters.length})`
                : 'Nhập từ khóa hoặc chọn bộ lọc để bắt đầu'}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              {hasActiveFilters ? 'Click vào nhân vật để bắt đầu cuộc trò chuyện' : 'Hệ thống hiển thị nhân vật sau khi bạn tìm kiếm hoặc áp dụng bộ lọc'}
            </p>
          </div>
          
          {!hasActiveFilters ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-block p-6 bg-blue-50 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Bắt đầu hành trình</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Sử dụng thanh tìm kiếm hoặc lựa chọn bộ lọc để khám phá hơn {totalCharacters} nhân vật lịch sử Việt Nam.
              </p>
            </div>
          ) : loading ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-block relative">
                <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-primary border-t-transparent"></div>
                <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="mt-4 sm:mt-6 text-gray-600 font-medium text-sm sm:text-base">Đang tải nhân vật...</p>
            </div>
          ) : characters.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
                <Sparkles className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy nhân vật</h3>
              <p className="text-gray-600 mb-6">Thử thay đổi từ khóa hoặc bộ lọc</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilters({ ...DEFAULT_FILTERS });
                }}
                className="btn btn-primary"
              >
                Xóa bộ lọc
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 px-2 sm:px-0">
          <div className="card text-center hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h4 className="font-bold text-base sm:text-lg mb-2">AI Nhập Vai</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              AI sẽ nhập vai nhân vật lịch sử, trả lời với văn phong và kiến thức chính xác
            </p>
          </div>

          <div className="card text-center hover:scale-105 transition-transform duration-300">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
            </div>
            <h4 className="font-bold text-base sm:text-lg mb-2">Giọng Nói Sinh Động</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              Nghe giọng nói tiếng Việt tự nhiên từ các nhân vật lịch sử
            </p>
          </div>

          <div className="card text-center hover:scale-105 transition-transform duration-300 sm:col-span-2 lg:col-span-1">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-success" />
            </div>
            <h4 className="font-bold text-base sm:text-lg mb-2">Học Tập Tương Tác</h4>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
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
