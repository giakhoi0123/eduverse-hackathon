import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, BookOpen, Users, ChevronLeft, ChevronRight, X, MessageCircle, Gamepad2, Volume2, Search } from 'lucide-react';
import { getCharacters } from '../services/api';
import CharacterCard from '../components/CharacterCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import EduVerseAssistant from '../components/EduVerseAssistant';

const DEFAULT_FILTERS = {
  category: 'all',
  gender: 'all',
  dynasty: 'all'
};

const ITEMS_PER_PAGE = 12;

function Home() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ ...DEFAULT_FILTERS });
  const [totalCharacters, setTotalCharacters] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLearnModal, setShowLearnModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const navigate = useNavigate();

  const { category, gender, dynasty } = filters;
  const hasActiveFilters = Boolean(searchQuery.trim()) ||
    category !== 'all' ||
    gender !== 'all' ||
    dynasty !== 'all';

  useEffect(() => {
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
  }, [searchQuery, category, gender, dynasty]);


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
              <div 
                onClick={() => setShowLearnModal(true)}
                className="flex items-center space-x-2 hover:text-primary transition-colors cursor-pointer group"
              >
                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">Học Lịch Sử</span>
              </div>
              <div 
                onClick={() => setShowAIModal(true)}
                className="flex items-center space-x-2 hover:text-secondary transition-colors cursor-pointer group"
              >
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">AI Tương Tác</span>
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
                : `Tất cả nhân vật (${characters.length})`}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              Click vào nhân vật để bắt đầu cuộc trò chuyện
            </p>
          </div>
          
          {loading ? (
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {characters
                  .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
                  .map((character, index) => (
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
                  ))
                }
              </div>

              {/* Pagination */}
              {characters.length > ITEMS_PER_PAGE && (
                <div className="mt-8 flex items-center justify-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <div className="flex items-center space-x-1">
                    {(() => {
                      const totalPages = Math.ceil(characters.length / ITEMS_PER_PAGE);
                      const pages = [];
                      
                      if (totalPages <= 7) {
                        // Show all pages if 7 or less
                        for (let i = 1; i <= totalPages; i++) {
                          pages.push(i);
                        }
                      } else {
                        // Always show first page
                        pages.push(1);
                        
                        if (currentPage > 3) {
                          pages.push('...');
                        }
                        
                        // Show pages around current page
                        const start = Math.max(2, currentPage - 1);
                        const end = Math.min(totalPages - 1, currentPage + 1);
                        
                        for (let i = start; i <= end; i++) {
                          if (!pages.includes(i)) {
                            pages.push(i);
                          }
                        }
                        
                        if (currentPage < totalPages - 2) {
                          pages.push('...');
                        }
                        
                        // Always show last page
                        if (!pages.includes(totalPages)) {
                          pages.push(totalPages);
                        }
                      }
                      
                      return pages.map((page, idx) => 
                        page === '...' ? (
                          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                              currentPage === page
                                ? 'bg-primary text-white shadow-lg scale-110'
                                : 'border-2 border-gray-200 hover:border-primary hover:scale-105'
                            }`}
                          >
                            {page}
                          </button>
                        )
                      );
                    })()}
                  </div>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(Math.ceil(characters.length / ITEMS_PER_PAGE), p + 1))}
                    disabled={currentPage === Math.ceil(characters.length / ITEMS_PER_PAGE)}
                    className="p-2 rounded-lg border-2 border-gray-200 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
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

      {/* Learn History Modal */}
      {showLearnModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-scale-in">
            <button
              onClick={() => setShowLearnModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-2">Học Lịch Sử</h2>
              <p className="text-gray-600">Cách học lịch sử hiệu quả với EduVerse</p>
            </div>

            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Search className="w-5 h-5 text-blue-600" />
                    Tìm kiếm nhân vật
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Sử dụng thanh tìm kiếm để tìm nhân vật lịch sử bạn quan tâm. Bạn có thể tìm theo tên, 
                    thời kỳ, triều đại hoặc lĩnh vực.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 p-4 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    Trò chuyện tương tác
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Click vào nhân vật để bắt đầu trò chuyện. AI sẽ nhập vai và trả lời mọi câu hỏi của bạn 
                    với kiến thức lịch sử chính xác và văn phong đặc trưng.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 p-4 bg-green-50 rounded-xl border-l-4 border-green-500">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-green-600" />
                    Chơi trắc nghiệm
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Sau khi trò chuyện, click nút 🎮 để chơi trắc nghiệm 10 câu hỏi. 
                    Kiểm tra kiến thức và xem lại đáp án để học sâu hơn!
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-500">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-yellow-600" />
                    Nghe giọng nói
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Mỗi câu trả lời đều có giọng đọc tiếng Việt tự nhiên. 
                    Nghe để hiểu rõ hơn và ghi nhớ kiến thức tốt hơn!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowLearnModal(false)}
                className="flex-1 btn btn-primary"
              >
                Bắt đầu học ngay! 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Interaction Modal */}
      {showAIModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-scale-in">
            <button
              onClick={() => setShowAIModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold gradient-text mb-2">AI Tương Tác</h2>
              <p className="text-gray-600">Công nghệ AI tiên tiến cho trải nghiệm học tập tốt nhất</p>
            </div>

            <div className="space-y-6">
              {/* Feature 1 */}
              <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  AI Nhập Vai Chính Xác
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>AI được huấn luyện với dữ liệu lịch sử Việt Nam chính xác</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>Nhập vai với văn phong và tính cách của từng nhân vật</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>Trả lời câu hỏi dựa trên kiến thức lịch sử có căn cứ</span>
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-100">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                  Trò Chuyện Tự Nhiên
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-0.5">✓</span>
                    <span>Hỏi bất kỳ câu hỏi nào về lịch sử, triết lý, cuộc đời</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-0.5">✓</span>
                    <span>AI hiểu ngữ cảnh và cho câu trả lời phù hợp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold mt-0.5">✓</span>
                    <span>Trò chuyện liên tục, AI nhớ nội dung đã nói</span>
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="p-5 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border-2 border-green-100">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-green-600" />
                  Giọng Nói AI Tiếng Việt
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>Text-to-Speech chất lượng cao với giọng Việt tự nhiên</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>Phát âm chuẩn, dễ nghe và dễ hiểu</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold mt-0.5">✓</span>
                    <span>Có thể dừng/phát lại theo ý muốn</span>
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div className="p-5 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-100">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-yellow-600" />
                  Trắc Nghiệm Thông Minh
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-0.5">✓</span>
                    <span>10 câu hỏi đa dạng, từ dễ đến khó</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-0.5">✓</span>
                    <span>Câu hỏi được tạo động dựa trên thông tin nhân vật</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 font-bold mt-0.5">✓</span>
                    <span>Xem lại đáp án và giải thích chi tiết sau khi hoàn thành</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-blue-700">💡 Mẹo:</span> Hãy đặt câu hỏi cụ thể và chi tiết để nhận được 
                câu trả lời sâu sắc nhất từ AI!
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowAIModal(false)}
                className="flex-1 btn btn-secondary"
              >
                Trải nghiệm ngay! ✨
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EduVerse Assistant Chatbot */}
      <EduVerseAssistant />
    </div>
  );
}

export default Home;
