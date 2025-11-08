import express from 'express';
import { getCharacters, getCharacterById } from '../utils/characters.js';

const router = express.Router();

/**
 * GET /api/characters
 * Get all available historical characters
 */
router.get('/', (req, res) => {
  try {
    const characters = getCharacters();
    res.json({
      success: true,
      data: characters
    });
  } catch (error) {
    console.error('Error getting characters:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve characters',
      details: error.message 
    });
  }
});

/**
 * GET /api/characters/:id
 * Get specific character details
 */
router.get('/:id', (req, res) => {
  try {
    const character = getCharacterById(req.params.id);
    
    if (!character) {
      return res.status(404).json({ 
        error: 'Character not found' 
      });
    }

    res.json({
      success: true,
      data: character
    });
  } catch (error) {
    console.error('Error getting character:', error);
    res.status(500).json({ 
      error: 'Failed to retrieve character',
      details: error.message 
    });
  }
});

export default router;
