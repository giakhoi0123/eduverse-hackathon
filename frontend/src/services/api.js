import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all characters
 */
export const getCharacters = async () => {
  const response = await api.get('/characters');
  return response.data.data;
};

/**
 * Get character by ID
 */
export const getCharacterById = async (id) => {
  const response = await api.get(`/characters/${id}`);
  return response.data.data;
};

/**
 * Send a message to AI character
 */
export const sendMessage = async (data) => {
  const response = await api.post('/chat/message', data);
  return response.data.data;
};

/**
 * Get conversation history
 */
export const getConversationHistory = async (conversationId) => {
  const response = await api.get(`/chat/history/${conversationId}`);
  return response.data.data;
};

/**
 * Delete conversation
 */
export const deleteConversation = async (conversationId) => {
  const response = await api.delete(`/chat/history/${conversationId}`);
  return response.data;
};

export default api;
