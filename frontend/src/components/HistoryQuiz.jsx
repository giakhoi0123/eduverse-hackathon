import { useState, useEffect } from "react";
import {
  X,
  Trophy,
  CheckCircle,
  XCircle,
  Sparkles,
  Loader,
} from "lucide-react";
import { generateQuiz } from "../services/api";
import { logQuizActivity } from "../utils/activity-tracker";

function HistoryQuiz({ character, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch quiz questions from AI when component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching quiz for character:", character.id);
        const quizData = await generateQuiz(character.id, 10, "mixed");
        console.log("Quiz data received:", quizData);
        
        if (!quizData || !quizData.questions || quizData.questions.length === 0) {
          throw new Error("Không nhận được câu hỏi từ server");
        }
        
        setQuestions(quizData.questions);
      } catch (err) {
        console.error("Failed to fetch quiz questions:", err);
        setError(err.response?.data?.error || err.message || "Không thể tạo câu hỏi. Vui lòng thử lại.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [character.id]);

  const handleAnswer = (answerIndex) => {
    if (showResult || isTransitioning) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    // Store answer history
    const newAnswer = {
      question: questions[currentQuestion].question,
      selectedIndex: answerIndex,
      selected: questions[currentQuestion].options[answerIndex],
      correctIndex: questions[currentQuestion].correctAnswer,
      correct:
        questions[currentQuestion].options[
          questions[currentQuestion].correctAnswer
        ],
      explanation: questions[currentQuestion].explanation,
      isCorrect,
    };
    setAnswers([...answers, newAnswer]);

    // Wait 2.5 seconds to show result, then start transition
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setIsTransitioning(true);

        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setShowResult(false);
          setSelectedAnswer(null);
          setIsTransitioning(false);
        }, 300); // 300ms for fade out
      } else {
        setGameCompleted(true);
        
        // Log quiz activity
        const correctAnswers = answers.filter(a => a.isCorrect).length + (isCorrect ? 1 : 0);
        const totalQuestions = questions.length;
        const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
        logQuizActivity(scorePercent, correctAnswers, totalQuestions, character.name || 'general');
      }
    }, 2500); // 2.5s to show result
  };

  const resetQuiz = async () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
    setAnswers([]);
    setIsTransitioning(false);
    setLoading(true);
    setError(null);

    try {
      console.log("Regenerating quiz for character:", character.id);
      const quizData = await generateQuiz(character.id, 10, "mixed");
      console.log("New quiz data:", quizData);
      
      if (!quizData || !quizData.questions || quizData.questions.length === 0) {
        throw new Error("Không nhận được câu hỏi từ server");
      }
      
      setQuestions(quizData.questions);
    } catch (err) {
      console.error("Failed to fetch quiz questions:", err);
      setError(err.response?.data?.error || err.message || "Không thể tạo câu hỏi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <Loader className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Đang tạo câu hỏi...</h3>
          <p className="text-gray-600">AI đang chuẩn bị trắc nghiệm cho bạn</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Có lỗi xảy ra</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 btn bg-gray-200">
              Đóng
            </button>
            <button onClick={resetQuiz} className="flex-1 btn btn-primary">
              Thử lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Game Completed State
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
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${
                percentage >= 75
                  ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                  : percentage >= 50
                  ? "bg-gradient-to-br from-blue-400 to-blue-600"
                  : "bg-gradient-to-br from-gray-400 to-gray-600"
              }`}
            >
              <Trophy className="w-12 h-12 text-white" />
            </div>

            <h2 className="text-3xl font-bold mb-2 gradient-text">
              {percentage >= 75
                ? "🎉 Xuất sắc!"
                : percentage >= 50
                ? "👍 Khá tốt!"
                : "💪 Cố gắng thêm!"}
            </h2>

            <div className="text-6xl font-bold gradient-text mb-2">
              {percentage.toFixed(0)}%
            </div>

            <p className="text-gray-600 mb-4">
              Bạn đã trả lời đúng{" "}
              <span className="font-bold text-primary">
                {score}/{questions.length}
              </span>{" "}
              câu hỏi
            </p>

            <div className="flex gap-3 mb-6">
              <button
                onClick={resetQuiz}
                className="flex-1 btn bg-white border-2 border-gray-200 hover:border-primary hover:bg-blue-50"
              >
                🔄 Chơi lại
              </button>
              <button onClick={onClose} className="flex-1 btn btn-primary">
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
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {answer.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">
                        Câu {idx + 1}: {answer.question}
                      </p>
                      {!answer.isCorrect && (
                        <>
                          <p className="text-xs text-red-700">
                            Bạn chọn:{" "}
                            <span className="font-semibold">
                              {answer.selected}
                            </span>
                          </p>
                          <p className="text-xs text-green-700">
                            Đáp án đúng:{" "}
                            <span className="font-semibold">
                              {answer.correct}
                            </span>
                          </p>
                        </>
                      )}
                      {answer.isCorrect && (
                        <p className="text-xs text-green-700">✓ Đúng rồi!</p>
                      )}
                      {answer.explanation && (
                        <p className="text-xs text-gray-600 mt-2 italic">
                          💡 {answer.explanation}
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

  // Active Quiz State
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
              Trắc nghiệm AI
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
                  style={{
                    width: `${
                      ((currentQuestion + 1) / questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
              <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-bold text-yellow-700">
                  {score}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    idx < currentQuestion
                      ? "bg-green-500"
                      : idx === currentQuestion
                      ? "bg-blue-500 animate-pulse"
                      : "bg-gray-200"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Question */}
        <div
          className={`mb-6 transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
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
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 gap-3">
            {questions[currentQuestion].options.map((option, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect =
                idx === questions[currentQuestion].correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={`q${currentQuestion}-opt${idx}`}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult || isTransitioning}
                  className={`p-4 rounded-xl text-left font-medium transition-all duration-300 transform disabled:cursor-not-allowed relative overflow-hidden ${
                    showCorrect
                      ? "bg-green-100 border-2 border-green-500 text-green-800 shadow-lg scale-105"
                      : showWrong
                      ? "bg-red-100 border-2 border-red-500 text-red-800"
                      : showResult
                      ? "bg-gray-50 border-2 border-gray-200 text-gray-400 opacity-50"
                      : "bg-white border-2 border-gray-200 hover:border-primary hover:bg-blue-50 hover:scale-102 hover:shadow-md active:scale-98"
                  }`}
                >
                  {/* Background animation */}
                  {showCorrect && (
                    <div className="absolute inset-0 bg-green-200 opacity-50 animate-pulse"></div>
                  )}

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300 ${
                          showCorrect
                            ? "bg-green-500 text-white scale-110"
                            : showWrong
                            ? "bg-red-500 text-white"
                            : showResult
                            ? "bg-gray-300 text-gray-500"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>

                    {showCorrect && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <CheckCircle className="w-6 h-6 text-green-600 animate-bounce" />
                        <span className="text-xs font-bold text-green-700">
                          ĐÚNG!
                        </span>
                      </div>
                    )}
                    {showWrong && (
                      <div className="flex items-center gap-2 animate-fadeIn">
                        <XCircle className="w-6 h-6 text-red-600 animate-shake" />
                        <span className="text-xs font-bold text-red-700">
                          SAI
                        </span>
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
