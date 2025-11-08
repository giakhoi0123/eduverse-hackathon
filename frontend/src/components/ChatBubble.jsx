import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import Avatar from './Avatar';

function ChatBubble({ message, character, onPlayAudio, isPlaying }) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-start space-x-2 slide-up`}>
      {isAI && (
        <div className="flex-shrink-0">
          <Avatar character={character} size="sm" />
        </div>
      )}
      
      <div className={`max-w-[70%] ${isAI ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 shadow-sm ${
            isAI
              ? message.isError
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-white text-gray-900 border border-gray-200'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Audio button for AI messages */}
        {isAI && message.audioUrl && (
          <button
            onClick={() => onPlayAudio(message.audioUrl)}
            className={`mt-2 flex items-center space-x-1 text-xs font-medium transition-colors px-2 py-1 rounded-full ${
              isPlaying 
                ? 'text-primary bg-blue-50' 
                : 'text-gray-600 hover:text-primary hover:bg-blue-50'
            }`}
          >
            {isPlaying ? (
              <>
                <div className="flex space-x-0.5">
                  <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
                  <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-3 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>Đang phát...</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Nghe lại</span>
              </>
            )}
          </button>
        )}

        {/* Timestamp */}
        <p className="text-xs text-gray-500 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
}

export default ChatBubble;
