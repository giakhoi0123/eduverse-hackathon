import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

function MessageInput({ onSend, disabled }) {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white px-4 py-4 shadow-lg">
      <div className="flex items-end space-x-3">
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "AI đang suy nghĩ..." : "Nhập tin nhắn của bạn..."}
            disabled={disabled}
            rows="1"
            className="w-full resize-none border-2 border-gray-200 rounded-2xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200 max-h-32"
          />
          {input.trim() && !disabled && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-xs text-gray-400">
                Enter ↵
              </span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="btn btn-primary p-3 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[48px] h-[48px]"
        >
          {disabled ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between mt-2 px-1">
        <p className="text-xs text-gray-500">
          <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> để gửi • 
          <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs ml-1">Shift + Enter</kbd> để xuống dòng
        </p>
        {input.length > 0 && (
          <span className="text-xs text-gray-400">
            {input.length} ký tự
          </span>
        )}
      </div>
    </form>
  );
}

export default MessageInput;
