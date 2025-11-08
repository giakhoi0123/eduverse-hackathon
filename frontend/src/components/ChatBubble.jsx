import { Volume2, VolumeX } from 'lucide-react';
import Avatar from './Avatar';

function ChatBubble({ message, character, onPlayAudio, isPlaying }) {
  const isAI = message.type === 'ai';

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} items-start space-x-2`}>
      {isAI && <Avatar character={character} size="sm" />}
      
      <div className={`max-w-[70%] ${isAI ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isAI
              ? message.isError
                ? 'bg-red-100 text-red-800'
                : 'bg-gray-100 text-gray-900'
              : 'bg-primary text-white'
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>

        {/* Audio button for AI messages */}
        {isAI && message.audioUrl && (
          <button
            onClick={() => onPlayAudio(message.audioUrl)}
            className="mt-2 flex items-center space-x-1 text-xs text-gray-600 hover:text-primary transition-colors"
          >
            {isPlaying ? (
              <>
                <VolumeX className="w-4 h-4" />
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
        <p className="text-xs text-gray-500 mt-1">
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
