import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Get all characters or filtered characters
 * @param {Object} params - Query parameters {search, category, gender, dynasty}
 */
export const getCharacters = async (params = {}) => {
  const response = await api.get('/characters', { params });
  return response.data;
};

/**
 * Get filter options (categories, dynasties, genders)
 */
export const getFilterOptions = async () => {
  const response = await api.get('/characters/filters');
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

/**
 * Get all conversations
 */
export const getAllConversations = async () => {
  const response = await api.get('/chat/conversations');
  return response.data.data;
};

/**
 * Generate AI-powered quiz questions for a character
 * @param {string} characterId - Character ID
 * @param {number} numQuestions - Number of questions (default: 10)
 * @param {string} difficulty - 'easy', 'medium', 'hard', or 'mixed' (default: 'mixed')
 */
export const generateQuiz = async (characterId, numQuestions = 10, difficulty = 'mixed') => {
  const response = await api.post('/quiz/generate', {
    characterId,
    numQuestions,
    difficulty
  });
  return response.data.data;
};

export default api;
