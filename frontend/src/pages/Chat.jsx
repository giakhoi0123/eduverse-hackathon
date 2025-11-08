import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Volume2, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { getCharacterById, sendMessage } from '../services/api';
import ChatBubble from '../components/ChatBubble';
import Avatar from '../components/Avatar';
import MessageInput from '../components/MessageInput';

function Chat() {
  const { characterId } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(null);
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    loadCharacter();
    // Generate conversation ID
    setConversationId(`conv_${Date.now()}_${characterId}`);
  }, [characterId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleAudioEnded = () => {
    setPlayingAudio(null);
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
            <div className="hidden sm:flex items-center space-x-2 text-primary bg-blue-50 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
              <div className="flex space-x-0.5">
                <div className="w-1 h-3 sm:h-4 bg-primary rounded-full animate-pulse"></div>
                <div className="w-1 h-3 sm:h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-3 sm:h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Đang phát</span>
            </div>
          )}
          
          <button
            onClick={() => {
              setMessages([{
                type: 'ai',
                text: `Xin chào! Ta là ${character.name}. Hãy hỏi ta bất cứ điều gì về lịch sử, triết lý hay cuộc đời của ta.`,
                timestamp: new Date().toISOString()
              }]);
              setConversationId(`conv_${Date.now()}_${characterId}`);
            }}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            title="Cuộc trò chuyện mới"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-primary group-hover:rotate-180 transition-all duration-300" />
          </button>
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
    </div>
  );
}

export default Chat;
