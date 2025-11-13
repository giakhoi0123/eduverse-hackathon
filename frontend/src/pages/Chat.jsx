import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Volume2, VolumeX, Loader2, Sparkles, RefreshCw, Gamepad2, History } from 'lucide-react';
import { getCharacterById, sendMessage, getConversationHistory } from '../services/api';
import ChatBubble from '../components/ChatBubble';
import Avatar from '../components/Avatar';
import MessageInput from '../components/MessageInput';
import HistoryQuiz from '../components/HistoryQuiz';
import ConversationHistory from '../components/ConversationHistory';
import { logChatActivity } from '../utils/activity-tracker';

function Chat() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const chatStartTime = useRef(Date.now());

  useEffect(() => {
    loadCharacter();
    // Generate conversation ID
    setConversationId(`conv_${Date.now()}_${characterId}`);
    chatStartTime.current = Date.now();
  }, [characterId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Track chat activity when leaving
  useEffect(() => {
    return () => {
      if (character) {
        const duration = Math.floor((Date.now() - chatStartTime.current) / 1000);
        if (duration > 10) { // Only log if chat lasted > 10 seconds
          logChatActivity(
            characterId,
            duration,
            character.era || 'Unknown',
            character.tags || []
          );
        }
      }
    };
  }, [character, characterId]);

  const loadCharacter = async () => {
    try {
      const data = await getCharacterById(characterId);
      setCharacter(data);
      
      // Add welcome message
      setMessages([{
        type: 'ai',
        text: `Xin chào! Ta là ${data.name}. Hãy hỏi ta bất cứ điều gì về lịch sử, triết lý hay cuộc đời của ta.`,
        timestamp: new Date().toISOString()
      }]);
    } catch (error) {
      console.error('Failed to load character:', error);
      navigate('/');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text) => {
    if (!text.trim() || loading) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: text.trim(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Send to API
      const response = await sendMessage({
        message: text.trim(),
        characterId,
        conversationId
      });

      // Add AI response
      const aiMessage = {
        type: 'ai',
        text: response.text,
        audioUrl: response.audioUrl,
        timestamp: response.timestamp
      };
      setMessages(prev => [...prev, aiMessage]);

      // Auto-play audio
      if (response.audioUrl) {
        playAudio(response.audioUrl);
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      setMessages(prev => [...prev, {
        type: 'ai',
        text: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại.',
        timestamp: new Date().toISOString(),
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setPlayingAudio(audioUrl);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingAudio(null);
    }
  };

  const handleAudioEnded = () => {
    setPlayingAudio(null);
  };

  const handleLoadConversation = async (conv) => {
    try {
      // Load conversation messages
      const history = await getConversationHistory(conv.id);
      
      // Convert history to messages format
      const loadedMessages = [
        {
          type: 'ai',
          text: `Xin chào! Ta là ${character.name}. Đây là cuộc trò chuyện trước đó của chúng ta.`,
          timestamp: conv.createdAt
        }
      ];
      
      history.forEach(msg => {
        loadedMessages.push({
          type: 'user',
          text: msg.userMessage,
          timestamp: msg.timestamp
        });
        loadedMessages.push({
          type: 'ai',
          text: msg.aiResponse,
          audioUrl: msg.audioUrl,
          timestamp: msg.timestamp
        });
      });
      
      setMessages(loadedMessages);
      setConversationId(conv.id);
      setShowHistory(false);
    } catch (error) {
      console.error('Failed to load conversation:', error);
      alert('Không thể tải cuộc trò chuyện');
    }
  };

  if (!character) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
        </div>
        <p className="mt-6 text-gray-600 font-medium">Đang tải nhân vật...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sm:py-4 flex items-center space-x-2 sm:space-x-4 shadow-sm">
        <button
          onClick={() => navigate('/')}
          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <Avatar character={character} size="md" />
        
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-base sm:text-lg gradient-text truncate">{character.name}</h2>
          <p className="text-xs sm:text-sm text-gray-600 truncate">{character.title} • {character.era}</p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {playingAudio && (
            <>
              <div className="hidden sm:flex items-center space-x-2 text-primary bg-blue-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                <div className="flex space-x-0.5">
                  <div className="w-1 h-3 sm:h-4 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 sm:h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-3 sm:h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Đang phát giọng nói</span>
              </div>
              
              <button
                onClick={stopAudio}
                className="p-1.5 sm:p-2 bg-red-100 hover:bg-red-200 rounded-lg transition-colors group"
                title="Dừng phát giọng nói"
              >
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </button>
            </>
          )}
          
          {/* History Button */}
          <div className="relative group">
            <button
              onClick={() => setShowHistory(true)}
              className="p-1.5 sm:p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all group-hover:scale-105"
              title="Xem lịch sử trò chuyện"
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:scale-110 transition-transform" />
            </button>
            <span className="hidden sm:block absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Lịch sử 📚
            </span>
          </div>

          {/* Quiz Game Button */}
          <div className="relative group">
            <button
              onClick={() => setShowQuiz(true)}
              className="p-1.5 sm:p-2 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all group-hover:scale-105"
              title="Chơi trắc nghiệm lịch sử"
            >
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-600 rounded-full animate-pulse"></span>
            </button>
            <span className="hidden sm:block absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Trắc nghiệm 🎮
            </span>
          </div>
          
          {/* New Conversation Button */}
          <div className="relative group">
            <button
              onClick={() => {
                setMessages([{
                  type: 'ai',
                  text: `Xin chào! Ta là ${character.name}. Hãy hỏi ta bất cứ điều gì về lịch sử, triết lý hay cuộc đời của ta.`,
                  timestamp: new Date().toISOString()
                }]);
                setConversationId(`conv_${Date.now()}_${characterId}`);
              }}
              className="p-1.5 sm:p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all group-hover:scale-105"
              title="Bắt đầu cuộc trò chuyện mới"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-primary group-hover:rotate-180 transition-all duration-300" />
            </button>
            <span className="hidden sm:block absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Làm mới chat ✨
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6 bg-gradient-to-br from-gray-50 to-white">
        {messages.length === 1 && (
          <div className="text-center py-6 sm:py-8 slide-up">
            <div className="inline-block p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-3 sm:mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-2 px-4">
              Bắt đầu cuộc trò chuyện với {character.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto px-4 mb-4 sm:mb-6">
              Hãy hỏi về lịch sử, chiến thuật, triết lý hay bất cứ điều gì bạn muốn biết
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 justify-center px-4">
              {[
                "Xin chào! Cuộc đời ngài như thế nào?",
                "Ngài có lời khuyên gì cho thế hệ trẻ?",
                "Kể cho tôi nghe về chiến công của ngài"
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  disabled={loading}
                  className="text-xs px-2.5 sm:px-3 py-1.5 sm:py-2 bg-white border-2 border-gray-200 rounded-full hover:border-primary hover:text-primary transition-colors disabled:opacity-50 hover:scale-105 transform duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message}
            character={character}
            onPlayAudio={playAudio}
            isPlaying={playingAudio === message.audioUrl}
          />
        ))}
        
        {loading && (
          <div className="flex items-center space-x-3 slide-up">
            <Avatar character={character} size="sm" />
            <div className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <MessageInput onSend={handleSendMessage} disabled={loading} />

      {/* Hidden audio player */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        className="hidden"
      />

      {/* Conversation History Modal */}
      {showHistory && (
        <ConversationHistory
          onClose={() => setShowHistory(false)}
          onLoadConversation={handleLoadConversation}
        />
      )}

      {/* History Quiz Modal */}
      {showQuiz && (
        <HistoryQuiz
          character={character}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </div>
  );
}

export default Chat;
