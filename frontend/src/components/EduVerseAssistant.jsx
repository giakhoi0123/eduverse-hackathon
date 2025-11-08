import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, BookOpen, Lightbulb, Trophy, Map, RefreshCw } from 'lucide-react';

function EduVerseAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message
      setTimeout(() => {
        setMessages([{
          type: 'bot',
          text: 'Xin chào! Mình là **EduVerse AI** - trợ lý học Lịch sử Việt Nam của bạn! 🇻🇳\n\nBạn có thể hỏi mình bất cứ điều gì về lịch sử. Ví dụ:\n\n� "Chiến thắng Bạch Đằng là gì?"\n💬 "Cho tôi 3 câu hỏi về nhà Trần"\n� "Tìm nhân vật đánh Tống"\n💬 "Tóm tắt về Tây Sơn"\n💬 "Tôi học lớp 7, nên học gì?"\n\n*Cứ thoải mái hỏi nhé!* 😊',
          timestamp: new Date().toISOString()
        }]);
      }, 500);
    }
  }, [isOpen]);

  const handleSuggestionClick = (action) => {
    // Không còn cần suggestions cứng, người dùng tự gõ
    return;
  };

  const handleSendMessage = async (customText) => {
    const text = customText || inputText.trim();
    if (!text) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Prepare conversation history (last 5 messages for context)
      const conversationHistory = messages.slice(-5).map(msg => ({
        type: msg.type,
        text: msg.text
      }));

      // Call assistant API
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: text,
          conversationHistory: conversationHistory 
        })
      });

      const data = await response.json();

      // Add bot response
      const botMessage = {
        type: 'bot',
        text: data.response,
        timestamp: new Date().toISOString(),
        suggestions: data.suggestions || null,
        quiz: data.quiz || null,
        characters: data.characters || null,
        summary: data.summary || null
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800);

    } catch (error) {
      console.error('Assistant error:', error);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Xin lỗi, mình đang gặp chút vấn đề. Bạn thử lại nhé! 🙏',
        timestamp: new Date().toISOString(),
        isError: true
      }]);
      setIsTyping(false);
    }
  };

  const handleQuizAnswer = (questionIndex, answer) => {
    // Handle quiz answer logic
    setMessages(prev => prev.map((msg, idx) => 
      idx === prev.length - 1 && msg.quiz
        ? { ...msg, quiz: { ...msg.quiz, userAnswer: answer } }
        : msg
    ));
  };

  const resetChat = () => {
    setMessages([]);
    setIsOpen(false);
    setTimeout(() => setIsOpen(true), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group"
      >
        <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap">
            💬 EduVerse AI - Trợ lý Lịch sử
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-scale-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-white">
            <h3 className="font-bold text-sm">EduVerse AI</h3>
            <p className="text-xs opacity-90">Trợ lý Lịch sử Việt Nam</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            title="Làm mới chat"
          >
            <RefreshCw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, idx) => (
          <div key={idx} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {message.type === 'bot' && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-xs text-gray-500">EduVerse AI</span>
                </div>
              )}
              
              {/* Chỉ hiển thị text nếu không phải JSON */}
              {!message.text.includes('```json') && (
                <div className={`rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}>
                  <div className="text-sm whitespace-pre-wrap">
                    {message.text.split('**').map((part, i) => 
                      i % 2 === 0 ? part : <strong key={i}>{part}</strong>
                    )}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => handleSuggestionClick(suggestion.action)}
                      className="w-full text-left px-4 py-2.5 bg-white border-2 border-blue-100 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-sm flex items-center gap-2 group"
                    >
                      <span className="text-lg">{suggestion.icon}</span>
                      <span className="flex-1 font-medium text-gray-700 group-hover:text-blue-700">
                        {suggestion.text}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Quiz */}
              {message.quiz && (
                <div className="mt-3 bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    {message.quiz.question}
                  </h4>
                  <div className="space-y-2">
                    {message.quiz.options.map((option, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleQuizAnswer(idx, option)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                          message.quiz.userAnswer === option
                            ? option === message.quiz.correct
                              ? 'bg-green-500 text-white border-2 border-green-600'
                              : 'bg-red-500 text-white border-2 border-red-600'
                            : 'bg-white border border-gray-300 hover:border-purple-500'
                        }`}
                        disabled={message.quiz.userAnswer}
                      >
                        {String.fromCharCode(65 + oIdx)}. {option}
                      </button>
                    ))}
                  </div>
                  {message.quiz.userAnswer && (
                    <div className={`mt-3 p-3 rounded-lg text-sm ${
                      message.quiz.userAnswer === message.quiz.correct
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {message.quiz.userAnswer === message.quiz.correct ? '✅ Chính xác!' : '❌ Sai rồi!'}
                      <br />
                      <strong>Giải thích:</strong> {message.quiz.explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Characters list */}
              {message.characters && (
                <div className="mt-3 space-y-2">
                  {message.characters.map((char, cIdx) => (
                    <div key={cIdx} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="font-bold text-blue-900">{char.name}</div>
                      <div className="text-xs text-blue-700">{char.title} • {char.era}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Summary */}
              {message.summary && (
                <div className="mt-3 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <div className="space-y-2 text-sm">
                    <div><strong className="text-yellow-900">⏰ Thời gian:</strong> {message.summary.time}</div>
                    <div><strong className="text-yellow-900">👤 Nhân vật:</strong> {message.summary.figures}</div>
                    <div><strong className="text-yellow-900">🏆 Thành tựu:</strong> {message.summary.achievements}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Hỏi gì về Lịch sử nhé..."
            className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-sm"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default EduVerseAssistant;
