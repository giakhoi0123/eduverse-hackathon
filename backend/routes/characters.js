import express from 'express';
import { 
  getCharacters, 
  getCharacterById,
  filterCharacters,
  getFilterOptions
} from '../utils/characters.js';

const router = express.Router();

/**
 * GET /api/characters/filters
 * Get available filter options
 * MUST BE BEFORE /:id route
 */
router.get('/filters', (req, res) => {
  try {
    const options = getFilterOptions();
    res.json({
      success: true,
      data: options
    });
  } catch (error) {
    console.error('Error getting filter options:', error);
    res.status(500).json({ 
      error: 'Failed to get filter options',
      details: error.message 
    });
  }
});

/**
 * GET /api/characters
 * Get all available historical characters or filtered characters
 */
router.get('/', (req, res) => {
  try {
    const { search, category, gender, dynasty } = req.query;
    const allCharacters = getCharacters();
    
    // If any filter is applied, use filterCharacters
    let characters;
    if (search || category || gender || dynasty) {
      characters = filterCharacters({ search, category, gender, dynasty });
    } else {
      characters = allCharacters;
    }
    
    res.json({
      success: true,
      data: characters,
      count: characters.length,
      total: allCharacters.length
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
 * MUST BE AFTER /filters route
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
