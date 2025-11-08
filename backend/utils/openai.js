import OpenAI from 'openai';
import { getCharacterById } from './characters.js';

// Initialize OpenAI client
let openai;
try {
  if (!process.env.OPENAI_API_KEY) {
    console.error('⚠️  WARNING: OPENAI_API_KEY not found in environment variables');
    console.error('Please check your .env file');
  }
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-testing'
  });
} catch (error) {
  console.error('Failed to initialize OpenAI client:', error);
}

/**
 * Generate AI response based on character and conversation history
 * @param {string} userMessage - User's message
 * @param {string} characterId - ID of the historical character
 * @param {Array} history - Previous conversation messages
 * @returns {Object} AI response
 */
export async function generateResponse(userMessage, characterId, history = []) {
  try {
    const character = getCharacterById(characterId);
    
    if (!character) {
      throw new Error('Character not found');
    }

    // Build conversation messages
    const messages = [
      {
        role: 'system',
        content: character.systemPrompt
      },
      // Add conversation history
      ...history.map(msg => ([
        { role: 'user', content: msg.userMessage },
        { role: 'assistant', content: msg.aiResponse }
      ])).flat(),
      // Add current user message
      {
        role: 'user',
        content: userMessage
      }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4' for better quality
      messages: messages,
      temperature: 0.8,
      max_tokens: 500,
      presence_penalty: 0.6,
      frequency_penalty: 0.3
    });

    const responseText = completion.choices[0].message.content;

    return {
      text: responseText,
      character: character.name,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate response: ${error.message}`);
  }
}

/**
 * Check if OpenAI API key is configured
 * @returns {boolean}
 */
export function isConfigured() {
  return !!process.env.OPENAI_API_KEY;
}

/**
 * Simple chat completion for assistant (no character context)
 * @param {Array} messages - Array of {role, content} objects
 * @returns {string} AI response text
 */
export async function createChatCompletion(messages) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
      temperature: 0.7,
      max_tokens: 300
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI Chat Completion Error:', error);
    throw new Error(`Failed to generate completion: ${error.message}`);
  }
}
