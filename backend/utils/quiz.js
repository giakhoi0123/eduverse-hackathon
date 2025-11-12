import OpenAI from 'openai';
import { getCharacterById } from './characters.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Generate quiz questions using AI
 * @param {string} characterId - Character ID
 * @param {number} numQuestions - Number of questions to generate
 * @param {string} difficulty - 'easy', 'medium', 'hard', or 'mixed'
 * @returns {Array} Array of quiz questions
 */
export async function generateQuizQuestions(characterId, numQuestions = 10, difficulty = 'mixed') {
  try {
    const character = getCharacterById(characterId);
    
    if (!character) {
      throw new Error('Character not found');
    }

    const prompt = `Bạn là một giáo viên lịch sử chuyên nghiệp. Hãy tạo ${numQuestions} câu hỏi trắc nghiệm về nhân vật lịch sử: ${character.name}.

THÔNG TIN NHÂN VẬT:
- Tên: ${character.name}
- Thời kỳ: ${character.era}
- Triều đại: ${character.dynasty}
- Chức vụ: ${character.title}
- Giới tính: ${character.gender === 'male' ? 'Nam' : 'Nữ'}
- Lĩnh vực: ${character.category}
- Thành tựu nổi bật: ${character.highlights ? character.highlights.join(', ') : 'Không có'}
- Mô tả: ${character.description}

YÊU CẦU:
1. Mỗi câu hỏi phải có 4 đáp án (A, B, C, D)
2. Chỉ có 1 đáp án đúng
3. Các đáp án sai phải hợp lý, không quá dễ nhận biết
4. Câu hỏi phải đa dạng: thời kỳ, triều đại, chức vụ, thành tựu, so sánh với nhân vật khác
5. Độ khó: ${difficulty === 'mixed' ? 'trộn lẫn dễ, trung bình, khó' : difficulty}
6. Tất cả đáp án phải KHÁC NHAU, KHÔNG TRÙNG LẶP (ví dụ: tránh "Nhà Trần" và "Trần" cùng xuất hiện)
7. Sử dụng tên đầy đủ và chính xác (ví dụ: "Nhà Trần", không viết tắt "Trần")

ĐỊNH DẠNG PHẢN HỒI (JSON):
Trả về JSON object với key "questions" chứa mảng câu hỏi:
{
  "questions": [
    {
      "question": "Câu hỏi về nhân vật?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctAnswer": 0,
      "explanation": "Giải thích tại sao đáp án đúng",
      "difficulty": "easy"
    }
  ]
}

LƯU Ý: 
- correctAnswer là index của đáp án đúng trong mảng options (0-3)
- Đảm bảo 4 options KHÁC NHAU HOÀN TOÀN
- Không có câu hỏi trùng lặp`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Bạn là một chuyên gia tạo câu hỏi trắc nghiệm lịch sử Việt Nam. Trả về JSON với key "questions" là một array.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2500,
      response_format: { type: 'json_object' }
    });

    const responseText = completion.choices[0].message.content;
    console.log('AI Response:', responseText); // Debug log
    
    // Parse JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
      
      // Handle different possible response structures
      let questions;
      if (parsedResponse.questions && Array.isArray(parsedResponse.questions)) {
        questions = parsedResponse.questions;
      } else if (Array.isArray(parsedResponse)) {
        questions = parsedResponse;
      } else {
        console.error('Unexpected response structure:', parsedResponse);
        throw new Error('Response format is invalid');
      }
      
      if (!questions || questions.length === 0) {
        throw new Error('No questions generated');
      }

      // Validate and sanitize questions
      const validatedQuestions = questions.map((q, index) => {
        // Ensure all required fields exist
        if (!q.question || !q.options || !Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Invalid question format at index ${index}`);
        }

        // Check for duplicate options
        const uniqueOptions = [...new Set(q.options.map(opt => opt.trim().toLowerCase()))];
        if (uniqueOptions.length !== q.options.length) {
          console.warn(`Warning: Question ${index + 1} has duplicate options. Regenerating...`);
          // Keep original but log warning
        }

        return {
          question: q.question.trim(),
          options: q.options.map(opt => opt.trim()),
          correctAnswer: parseInt(q.correctAnswer),
          explanation: q.explanation?.trim() || '',
          difficulty: q.difficulty || 'medium'
        };
      });

      return validatedQuestions;

    } catch (parseError) {
      console.error('Failed to parse AI response:', responseText);
      throw new Error('AI returned invalid JSON format');
    }

  } catch (error) {
    console.error('Quiz generation error:', error);
    throw new Error(`Failed to generate quiz: ${error.message}`);
  }
}

/**
 * Validate a user's answer
 * @param {Object} question - Question object
 * @param {number} userAnswer - Index of user's selected answer
 * @returns {Object} Validation result
 */
export function validateAnswer(question, userAnswer) {
  const isCorrect = userAnswer === question.correctAnswer;
  
  return {
    isCorrect,
    correctAnswer: question.options[question.correctAnswer],
    userAnswer: question.options[userAnswer],
    explanation: question.explanation
  };
}
