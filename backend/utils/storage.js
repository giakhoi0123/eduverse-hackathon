import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');
const HISTORY_FILE = path.join(DATA_DIR, 'history.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize history file if it doesn't exist
if (!fs.existsSync(HISTORY_FILE)) {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify({ conversations: {} }, null, 2));
}

/**
 * Read all conversation data
 * @returns {Object} All conversations
 */
function readData() {
  try {
    const data = fs.readFileSync(HISTORY_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { conversations: {} };
  }
}

/**
 * Write conversation data
 * @param {Object} data - Data to write
 */
function writeData(data) {
  try {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
}

/**
 * Save a conversation message
 * @param {Object} message - Message data
 * @returns {Object} Saved message with metadata
 */
export function saveConversation(message) {
  const data = readData();
  const { conversationId } = message;

  // Initialize conversation if it doesn't exist
  if (!data.conversations[conversationId]) {
    data.conversations[conversationId] = {
      id: conversationId,
      characterId: message.characterId,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  // Add message to conversation
  const conversation = data.conversations[conversationId];
  conversation.messages.push({
    userMessage: message.userMessage,
    aiResponse: message.aiResponse,
    audioUrl: message.audioUrl,
    timestamp: message.timestamp
  });
  conversation.updatedAt = new Date().toISOString();

  // Save data
  writeData(data);

  return {
    conversationId,
    messageIndex: conversation.messages.length - 1,
    timestamp: message.timestamp
  };
}

/**
 * Get conversation history
 * @param {string} conversationId - Conversation ID
 * @returns {Array} List of messages
 */
export function getConversationHistory(conversationId) {
  const data = readData();
  const conversation = data.conversations[conversationId];
  
  return conversation ? conversation.messages : [];
}

/**
 * Get all conversations
 * @returns {Array} List of all conversations
 */
export function getAllConversations() {
  const data = readData();
  return Object.values(data.conversations).map(conv => ({
    id: conv.id,
    characterId: conv.characterId,
    messageCount: conv.messages.length,
    createdAt: conv.createdAt,
    updatedAt: conv.updatedAt
  }));
}

/**
 * Delete a conversation
 * @param {string} conversationId - Conversation ID
 * @returns {boolean} Success status
 */
export function deleteConversation(conversationId) {
  const data = readData();
  
  if (data.conversations[conversationId]) {
    delete data.conversations[conversationId];
    writeData(data);
    return true;
  }
  
  return false;
}
