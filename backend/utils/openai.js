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
 * Enhanced with historical accuracy training
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

    // Enhanced system prompt with historical accuracy training
    const enhancedSystemPrompt = `${character.systemPrompt}

QUAN TRỌNG - Hướng dẫn trả lời chính xác cho học sinh:
1. **Độ chính xác lịch sử**: Luôn dựa trên sự kiện lịch sử có căn cứ. Tránh thông tin sai lệch.
2. **Ngữ cảnh giáo dục**: Câu trả lời phải phù hợp cho học sinh THCS và THPT.
3. **Trích dẫn cụ thể**: Nếu đề cập sự kiện lịch sử, hãy nói rõ thời gian, địa điểm.
4. **Bài học đạo đức**: Luôn kết nối với giá trị nhân văn và bài học cho thế hệ trẻ.
5. **Ngôn ngữ sinh động**: Kể chuyện lịch sử như một câu chuyện hấp dẫn, không khô khan.

Ví dụ trả lời tốt:
- "Trong trận Bạch Đằng năm 1288, ta đã sử dụng chiến thuật cọc ngầm..."
- "Câu nói 'Việc gì khó, đem lòng nhân nghĩa mà cảm hóa' xuất phát từ..."

Tránh trả lời:
- Thông tin mơ hồ không có nguồn gốc
- Câu chuyện viễn tưởng không có trong lịch sử
- Ngôn ngữ quá cao siêu khó hiểu với học sinh`;

    // Build conversation messages with enhanced context
    const messages = [
      {
        role: 'system',
        content: enhancedSystemPrompt
      },
      // Add conversation history for context continuity
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

    // Call OpenAI API with optimized parameters for educational content
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // or 'gpt-4' for better quality
      messages: messages,
      temperature: 0.7, // Reduced for more factual accuracy
      max_tokens: 600, // Increased for detailed explanations
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
      top_p: 0.9 // Added for better response quality
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
