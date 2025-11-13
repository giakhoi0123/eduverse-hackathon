import { useState, useEffect } from 'react';
import { Clock, MessageCircle, Trash2, User, Calendar, ArrowRight } from 'lucide-react';
import { getAllConversations, getConversationHistory, deleteConversation } from '../services/api';
import Avatar from './Avatar';

function ConversationHistory({ onClose, onLoadConversation }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedConv, setSelectedConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllConversations();
      setConversations(data || []);
    } catch (err) {
      console.error('Error loading conversations:', err);
      setError('Không thể tải lịch sử trò chuyện');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (conv) => {
    setSelectedConv(conv);
    setLoadingMessages(true);
    try {
      const history = await getConversationHistory(conv.id);
      setMessages(history || []);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Không thể tải chi tiết cuộc trò chuyện');
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleDelete = async (convId, e) => {
    e.stopPropagation();
    
    if (!confirm('Bạn có chắc muốn xóa cuộc trò chuyện này?')) return;

    try {
      await deleteConversation(convId);
      setConversations(prev => prev.filter(c => c.id !== convId));
      if (selectedConv?.id === convId) {
        setSelectedConv(null);
        setMessages([]);
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
      alert('Không thể xóa cuộc trò chuyện');
    }
  };

  const handleLoadIntoChat = (conv) => {
    if (onLoadConversation) {
      onLoadConversation(conv);
    }
    onClose();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;
    
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full h-[85vh] overflow-hidden shadow-2xl flex">
        
        {/* Left Panel - Conversations List */}
        <div className="w-1/3 border-r border-gray-200 flex flex-col bg-gray-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6" />
                <h2 className="text-xl font-bold">Lịch sử trò chuyện</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <p className="text-white/90 text-sm">
              {conversations.length} cuộc trò chuyện
            </p>
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
                <p className="text-gray-600 text-sm">Đang tải...</p>
              </div>
            ) : error && !conversations.length ? (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">❌ {error}</p>
                <button onClick={loadConversations} className="btn btn-primary text-sm">
                  Thử lại
                </button>
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-sm mb-2">Chưa có lịch sử</p>
                <p className="text-gray-400 text-xs">
                  Trò chuyện với nhân vật để lưu lịch sử
                </p>
              </div>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => handleViewDetails(conv)}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border-2 ${
                    selectedConv?.id === conv.id
                      ? 'bg-blue-50 border-blue-500 shadow-md'
                      : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {conv.characterName?.charAt(0) || '?'}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-gray-800 truncate mb-1">
                        {conv.characterName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                        <MessageCircle className="w-3 h-3" />
                        <span>{conv.messageCount} tin nhắn</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatDate(conv.updatedAt)}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDelete(conv.id, e)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Conversation Details */}
        <div className="flex-1 flex flex-col">
          {!selectedConv ? (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <MessageCircle className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">
                  Chọn cuộc trò chuyện
                </h3>
                <p className="text-gray-500 text-sm">
                  Chọn một cuộc trò chuyện bên trái để xem chi tiết
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Conversation Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedConv.characterName?.charAt(0) || '?'}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {selectedConv.characterName}
                      </h3>
                      <p className="text-sm text-gray-600">{selectedConv.characterEra}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleLoadIntoChat(selectedConv)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                  >
                    <span className="text-sm font-medium">Tiếp tục trò chuyện</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{selectedConv.messageCount} tin nhắn</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedConv.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-white">
                {loadingMessages ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3"></div>
                    <p className="text-gray-600 text-sm">Đang tải tin nhắn...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Không có tin nhắn</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((msg, idx) => (
                      <div key={idx} className="space-y-3">
                        {/* User Message */}
                        <div className="flex justify-end">
                          <div className="max-w-[70%] bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
                            <p className="text-sm leading-relaxed">{msg.userMessage}</p>
                            <p className="text-xs text-blue-100 mt-2">
                              {formatDate(msg.timestamp)}
                            </p>
                          </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex justify-start">
                          <div className="max-w-[70%] bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                              {msg.aiResponse}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <p className="text-xs text-gray-500">
                                {selectedConv.characterName}
                              </p>
                              {msg.audioUrl && (
                                <span className="text-xs text-purple-600">🔊</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversationHistory;
