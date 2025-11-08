import express from 'express';
import { generateAssistantResponse } from '../utils/assistant.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await generateAssistantResponse(message, conversationHistory);
    res.json(response);

  } catch (error) {
    console.error('Assistant error:', error);
    res.status(500).json({ 
      error: 'Failed to generate response',
      response: 'Xin lỗi, mình đang gặp chút vấn đề kỹ thuật. Bạn thử lại nhé! 🙏',
      suggestions: [
        { icon: '📖', text: 'Học Lịch sử', action: 'explain' },
        { icon: '🎯', text: 'Quiz', action: 'quiz' }
      ]
    });
  }
});

export default router;

