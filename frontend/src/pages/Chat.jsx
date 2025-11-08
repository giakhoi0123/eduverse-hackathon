import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Volume2, Loader2 } from 'lucide-react';
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
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <Avatar character={character} size="md" />
        
        <div className="flex-1">
          <h2 className="font-bold text-lg">{character.name}</h2>
          <p className="text-sm text-gray-600">{character.title} • {character.era}</p>
        </div>

        {playingAudio && (
          <div className="flex items-center space-x-2 text-primary">
            <Volume2 className="w-5 h-5 animate-pulse" />
            <span className="text-sm">Đang phát...</span>
          </div>
        )}
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
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
          <div className="flex items-center space-x-2 text-gray-500">
            <Avatar character={character} size="sm" />
            <div className="bg-gray-100 rounded-2xl px-4 py-3">
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
