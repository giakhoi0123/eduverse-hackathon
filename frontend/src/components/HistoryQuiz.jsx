import { useState, useEffect } from 'react';
import { X, Trophy, CheckCircle, XCircle, Sparkles } from 'lucide-react';

function HistoryQuiz({ character, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Generate more comprehensive quiz questions
  const generateQuestions = () => {
    // Other historical figures for wrong answers
    const otherCharacters = [
      { name: 'Lý Thái Tổ', era: 'Thế kỷ 11', dynasty: 'Nhà Lý', title: 'Hoàng đế' },
      { name: 'Trần Hưng Đạo', era: 'Thế kỷ 13', dynasty: 'Nhà Trần', title: 'Hưng Đạo Vương' },
      { name: 'Lê Lợi', era: 'Thế kỷ 15', dynasty: 'Nhà Lê', title: 'Hoàng đế' },
      { name: 'Nguyễn Huệ', era: 'Thế kỷ 18', dynasty: 'Nhà Tây Sơn', title: 'Hoàng đế' },
      { name: 'Nguyễn Trãi', era: 'Thế kỷ 15', dynasty: 'Nhà Lê', title: 'Trạng nguyên' },
      { name: 'Hồ Chí Minh', era: 'Thế kỷ 20', dynasty: 'Hiện đại', title: 'Chủ tịch' },
      { name: 'Võ Nguyên Giáp', era: 'Thế kỷ 20', dynasty: 'Hiện đại', title: 'Đại tướng' },
      { name: 'Trưng Trắc', era: 'Thế kỷ 1', dynasty: 'Thời Bắc thuộc', title: 'Nữ tướng' },
    ];

    const allQuestions = [];

    // Question 1: Era identification
    const wrongEras = ['Thế kỷ 10', 'Thế kỷ 12', 'Thế kỷ 14', 'Thế kỷ 16', 'Thế kỷ 19'];
    const eraOptions = [character.era, ...wrongEras.filter(e => e !== character.era)];
    allQuestions.push({
      question: `${character.name} sinh sống và hoạt động vào thời kỳ nào trong lịch sử Việt Nam?`,
      options: eraOptions.sort(() => Math.random() - 0.5).slice(0, 4),
      correct: character.era,
      type: 'era'
    });

    // Question 2: Dynasty
    const wrongDynasties = ['Nhà Lý', 'Nhà Trần', 'Nhà Lê', 'Nhà Nguyễn', 'Nhà Tây Sơn', 'Nhà Hồ'];
    const dynastyOptions = [character.dynasty, ...wrongDynasties.filter(d => d !== character.dynasty)];
    allQuestions.push({
      question: `${character.name} đã cống hiến cho triều đại nào?`,
      options: dynastyOptions.sort(() => Math.random() - 0.5).slice(0, 4),
      correct: character.dynasty,
      type: 'dynasty'
    });

    // Question 3: Title/Position
    const wrongTitles = ['Hoàng đế', 'Tướng quân', 'Trạng nguyên', 'Thái sư', 'Chủ tịch', 'Đại tướng'];
    const titleOptions = [character.title, ...wrongTitles.filter(t => t !== character.title)];
    allQuestions.push({
      question: `Chức vị/danh hiệu cao nhất mà ${character.name} đạt được là gì?`,
      options: titleOptions.sort(() => Math.random() - 0.5).slice(0, 4),
      correct: character.title,
      type: 'title'
    });

    // Question 4: Category/Field
    const categories = {
      'military': { correct: 'Quân sự và chiến tranh', wrong: ['Văn học và thơ ca', 'Khoa học và công nghệ', 'Ngoại giao'] },
      'scholar': { correct: 'Học thuật và giáo dục', wrong: ['Quân sự', 'Kinh tế', 'Y học'] },
      'leader': { correct: 'Lãnh đạo và quản trị', wrong: ['Nghệ thuật', 'Tôn giáo', 'Thương mại'] },
      'revolutionary': { correct: 'Cách mạng và độc lập', wrong: ['Kiến trúc', 'Âm nhạc', 'Thể thao'] }
    };
    const catInfo = categories[character.category] || categories['leader'];
    allQuestions.push({
      question: `${character.name} có đóng góp lớn nhất trong lĩnh vực nào?`,
      options: [catInfo.correct, ...catInfo.wrong].sort(() => Math.random() - 0.5),
      correct: catInfo.correct,
      type: 'category'
    });

    // Question 5-7: Achievement-based (harder questions)
    if (character.highlights && character.highlights.length > 0) {
      character.highlights.slice(0, 3).forEach((highlight) => {
        const fakeHighlights = [
          'Đánh bại quân Minh tại sông Bạch Đằng',
          'Soạn bộ luật Hồng Đức',
          'Phát minh chữ Nôm',
          'Xây dựng thành Nhà Hồ',
          'Sáng lập nền độc lập dân tộc',
          'Chiến thắng Điện Biên Phủ',
        ];
        allQuestions.push({
          question: `Thành tựu nào dưới đây KHÔNG PHẢI là công lao của ${character.name}?`,
          options: [
            ...fakeHighlights.filter(f => f !== highlight).slice(0, 3),
            highlight
          ].sort(() => Math.random() - 0.5),
          correct: fakeHighlights.filter(f => f !== highlight)[0], // Wrong answer is correct here!
          type: 'not_achievement',
          isNegative: true
        });
      });
    }

    // Question 8: Description matching
    if (character.description) {
      const fakeDescriptions = [
        'Một nhà thám hiểm đầu tiên khám phá Châu Mỹ',
        'Vị vua trị vì lâu nhất trong lịch sử phương Đông',
        'Nhà khoa học phát minh ra máy in',
        'Danh tướng chưa từng thua trận trong suốt cuộc đời',
      ];
      allQuestions.push({
        question: `Câu nào mô tả ĐÚNG NHẤT về ${character.name}?`,
        options: [character.description, ...fakeDescriptions.slice(0, 3)].sort(() => Math.random() - 0.5),
        correct: character.description,
        type: 'description'
      });
    }

    // Question 9: Gender (easy filler)
    allQuestions.push({
      question: `${character.name} là nam giới hay nữ giới?`,
      options: [
        character.gender === 'male' ? 'Nam giới' : 'Nữ giới',
        character.gender === 'male' ? 'Nữ giới' : 'Nam giới',
      ],
      correct: character.gender === 'male' ? 'Nam giới' : 'Nữ giới',
      type: 'gender'
    });

    // Question 10: Contemporary comparison
    const sameEraChar = otherCharacters.find(c => c.era === character.era && c.name !== character.name);
    if (sameEraChar) {
      allQuestions.push({
        question: `Ai là người cùng thời với ${character.name}?`,
        options: [sameEraChar.name, ...otherCharacters.filter(c => c.era !== character.era).slice(0, 3).map(c => c.name)].sort(() => Math.random() - 0.5),
        correct: sameEraChar.name,
        type: 'contemporary'
      });
    }

    // Shuffle and return 10 random questions
    return allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);
  };

  const [questions] = useState(generateQuestions());

  const handleAnswer = (answer) => {
    if (showResult || isTransitioning) return; // Prevent multiple clicks during transition
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    const isCorrect = answer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Store answer history
    const newAnswer = {
      question: questions[currentQuestion].question,
      selected: answer,
      correct: questions[currentQuestion].correct,
      isCorrect
    };
    setAnswers([...answers, newAnswer]);

    // Wait 2.5 seconds to show result, then start transition
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setIsTransitioning(true);
        
        // Small delay for fade out effect
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setShowResult(false);
          setSelectedAnswer(null);
          setIsTransitioning(false);
        }, 300);
      } else {
        setGameCompleted(true);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
    setAnswers([]);
    setIsTransitioning(false);
  };

  if (gameCompleted) {
    const percentage = (score / questions.length) * 100;
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative animate-scale-in my-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center mb-6">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
              percentage >= 75 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
              percentage >= 50 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
              'bg-gradient-to-br from-gray-400 to-gray-600'
            }`}>
              <Trophy className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-2 gradient-text">
              {percentage >= 75 ? '🎉 Xuất sắc!' : percentage >= 50 ? '👍 Khá tốt!' : '💪 Cố gắng thêm!'}
            </h2>
            
            <div className="text-6xl font-bold gradient-text mb-2">
              {percentage.toFixed(0)}%
            </div>
            
            <p className="text-gray-600 mb-4">
              Bạn đã trả lời đúng <span className="font-bold text-primary">{score}/{questions.length}</span> câu hỏi
            </p>

            <div className="flex gap-3 mb-6">
              <button
                onClick={resetQuiz}
                className="flex-1 btn bg-white border-2 border-gray-200 hover:border-primary hover:bg-blue-50"
              >
                🔄 Chơi lại
              </button>
              <button
                onClick={onClose}
                className="flex-1 btn btn-primary"
              >
                Đóng
              </button>
            </div>
          </div>

          {/* Review Answers */}
          <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Xem lại đáp án
            </h3>
            <div className="space-y-3">
              {answers.map((answer, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-lg border-2 ${
                    answer.isCorrect 
                      ? 'bg-green-50 border-green-300' 
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    {answer.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">Câu {idx + 1}: {answer.question}</p>
                      {!answer.isCorrect && (
                        <>
                          <p className="text-xs text-red-700">
                            Bạn chọn: <span className="font-semibold">{answer.selected}</span>
                          </p>
                          <p className="text-xs text-green-700">
                            Đáp án đúng: <span className="font-semibold">{answer.correct}</span>
                          </p>
                        </>
                      )}
                      {answer.isCorrect && (
                        <p className="text-xs text-green-700">
                          ✓ Đúng rồi!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative animate-scale-in">
        <button
          onClick={onClose}
          className="sticky top-0 float-right p-2 hover:bg-gray-100 rounded-full transition-colors z-10 bg-white shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 clear-both">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold gradient-text flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Trắc nghiệm lịch sử
            </h2>
            <div className="bg-blue-50 px-3 py-1.5 rounded-full">
              <span className="text-sm font-semibold text-primary">
                Câu {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 rounded-full"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">{score}</span>
              </div>
            </div>
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx < currentQuestion ? 'bg-green-500' :
                    idx === currentQuestion ? 'bg-blue-500 animate-pulse' :
                    'bg-gray-200'
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Question */}
        <div 
          className={`mb-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          key={`question-block-${currentQuestion}`}
        >
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 mb-6 border-2 border-blue-100 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {currentQuestion + 1}
              </div>
              <p className="text-lg sm:text-xl font-semibold text-gray-800 leading-relaxed flex-1">
                {questions[currentQuestion].question}
              </p>
            </div>
            {questions[currentQuestion].isNegative && (
              <div className="mt-3 bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded">
                <p className="text-sm text-yellow-800 font-semibold">⚠️ Chú ý: Câu hỏi phủ định - tìm đáp án SAI!</p>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {questions[currentQuestion].options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === questions[currentQuestion].correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={`q${currentQuestion}-opt${idx}-${option.substring(0, 20)}`}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult || isTransitioning}
                  className={`p-4 rounded-xl text-left font-medium transition-all duration-300 transform disabled:cursor-not-allowed relative overflow-hidden ${
                    showCorrect
                      ? 'bg-green-100 border-2 border-green-500 text-green-800 shadow-lg scale-105'
                      : showWrong
                      ? 'bg-red-100 border-2 border-red-500 text-red-800'
                      : showResult
                      ? 'bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-50'
                      : 'bg-white border-2 border-gray-200 hover:border-primary hover:bg-blue-50 hover:scale-102 hover:shadow-md active:scale-98'
                  }`}
                >
                  {/* Background animation */}
                  {showCorrect && (
                    <div className="absolute inset-0 bg-green-200 opacity-50 animate-pulse"></div>
                  )}
                  
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300 ${
                        showCorrect ? 'bg-green-500 text-white scale-110' :
                        showWrong ? 'bg-red-500 text-white' :
                        showResult ? 'bg-gray-300 text-gray-500' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                    
                    {showCorrect && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <CheckCircle className="w-6 h-6 text-green-600 animate-bounce" />
                        <span className="text-xs font-bold text-green-700">ĐÚNG!</span>
                      </div>
                    )}
                    {showWrong && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <XCircle className="w-6 h-6 text-red-600 animate-shake" />
                        <span className="text-xs font-bold text-red-700">SAI</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Character Info */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-600">Về nhân vật:</span>
            <span className="font-bold text-gray-800">{character.name}</span>
            <span className="px-2 py-0.5 bg-white rounded-full text-xs font-semibold text-primary border border-primary">
              {character.era}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryQuiz;
