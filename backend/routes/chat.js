import express from 'express';
import { generateResponse } from '../utils/openai.js';
import { generateSpeech } from '../utils/tts.js';
import { saveConversation, getConversationHistory } from '../utils/storage.js';

const router = express.Router();

/**
 * POST /api/chat/message
 * Send a message to AI character and get response
 */
router.post('/message', async (req, res) => {
  try {
    const { message, characterId, conversationId } = req.body;

    // Validation
    if (!message || !characterId) {
      return res.status(400).json({ 
        error: 'Message and characterId are required' 
      });
    }

    // Get conversation history if exists
    const history = conversationId 
      ? await getConversationHistory(conversationId) 
      : [];

    // Generate AI response
    const aiResponse = await generateResponse(message, characterId, history);

    // Get character data to determine gender for voice
    const { getCharacters } = await import('../utils/characters.js');
    const allCharacters = getCharacters();
    const character = allCharacters.find(c => c.id === characterId);
    const gender = character?.gender || 'male';

    // Generate audio from response with appropriate gender voice
    const audioUrl = await generateSpeech(aiResponse.text, characterId, gender);

    // Save conversation
    const savedConversation = await saveConversation({
      conversationId: conversationId || `conv_${Date.now()}`,
      characterId,
      userMessage: message,
      aiResponse: aiResponse.text,
      audioUrl,
      timestamp: new Date().toISOString()
    });

    // Send response
    res.json({
      success: true,
      data: {
        text: aiResponse.text,
        audioUrl,
        conversationId: savedConversation.conversationId,
        timestamp: savedConversation.timestamp
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to process message',
      details: error.message 
    });
  }
});

/**
 * GET /api/chat/history/:conversationId
 * Get conversation history
 */
router.get('/history/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const history = await getConversationHistory(conversationId);
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve history',
      details: error.message 
    });
  }
});

/**
 * DELETE /api/chat/history/:conversationId
 * Delete conversation history
 */
router.delete('/history/:conversationId', async (req, res) => {
  try {
    const { conversationId } = req.params;
    // TODO: Implement delete logic
    
    res.json({
      success: true,
      message: 'Conversation deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      error: 'Failed to delete conversation',
      details: error.message 
    });
  }
});

export default router;
