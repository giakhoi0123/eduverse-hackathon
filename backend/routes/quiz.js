import express from 'express';
import { generateQuizQuestions } from '../utils/quiz.js';

const router = express.Router();

/**
 * POST /api/quiz/generate
 * Generate AI-powered quiz questions for a character
 */
router.post('/generate', async (req, res) => {
  try {
    const { characterId, numQuestions = 10, difficulty = 'mixed' } = req.body;

    // Validation
    if (!characterId) {
      return res.status(400).json({ 
        error: 'characterId is required' 
      });
    }

    // Generate quiz questions using AI
    const questions = await generateQuizQuestions(characterId, numQuestions, difficulty);

    res.json({
      success: true,
      data: {
        questions,
        characterId,
        totalQuestions: questions.length,
        difficulty
      }
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate quiz questions',
      details: error.message 
    });
  }
});

export default router;
