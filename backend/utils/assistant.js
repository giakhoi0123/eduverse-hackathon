import { createChatCompletion } from './openai.js';
import { CHARACTER_DEFINITIONS } from './characters-data.js';

const characters = CHARACTER_DEFINITIONS;

// Knowledge base về lịch sử Việt Nam
const historicalEvents = {
  'bạch đằng': {
    name: 'Chiến thắng Bạch Đằng',
    time: '938 (Ngô Quyền), 981 (Lê Hoàn), 1288 (Trần Hưng Đạo)',
    summary: 'Ba lần đánh bại quân xâm lược trên sông Bạch Đằng bằng chiến thuật cọc ngầm.',
    significance: 'Khẳng định chủ quyền, độc lập dân tộc',
    figures: ['Ngô Quyền', 'Lê Hoàn', 'Trần Hưng Đạo']
  },
  'nam quốc sơn hà': {
    name: 'Bài thơ Nam quốc sơn hà',
    time: '1077',
    author: 'Lý Thường Kiệt',
    context: 'Viết khi đối đầu với quân Tống, khẳng định chủ quyền lãnh thổ',
    content: 'Nam quốc sơn hà Nam đế cư, Tiệt nhiên định phận tại thiên thư...'
  },
  'tây sơn': {
    name: 'Nhà Tây Sơn',
    time: '1778 - 1802',
    figures: ['Nguyễn Nhạc', 'Nguyễn Huệ', 'Nguyễn Lữ'],
    achievements: [
      'Thống nhất đất nước',
      'Đánh bại 29 vạn quân Thanh (1789)',
      'Cải cách xã hội, phát triển kinh tế'
    ]
  },
  'trần': {
    name: 'Triều đại nhà Trần',
    time: '1225 - 1400',
    figures: ['Trần Thái Tông', 'Trần Nhân Tông', 'Trần Hưng Đạo'],
    achievements: [
      'Ba lần đánh bại quân Nguyên - Mông',
      'Phát triển văn hóa, Phật giáo',
      'Xây dựng bộ máy nhà nước vững chắc'
    ],
    quiz: [
      {
        question: 'Nhà Trần đánh bại quân xâm lược nào?',
        options: ['Nguyên - Mông', 'Minh', 'Tống', 'Thanh'],
        correct: 'Nguyên - Mông',
        explanation: 'Nhà Trần đã 3 lần chiến thắng quân Nguyên - Mông (1258, 1285, 1288).'
      },
      {
        question: 'Vị vua nào của nhà Trần xuất gia làm Phật?',
        options: ['Trần Nhân Tông', 'Trần Thái Tông', 'Trần Anh Tông', 'Trần Minh Tông'],
        correct: 'Trần Nhân Tông',
        explanation: 'Trần Nhân Tông xuất gia, sáng lập phái Thiền Trúc Lâm Yên Tử.'
      },
      {
        question: 'Trận nào đánh dấu chiến thắng quyết định với quân Nguyên?',
        options: ['Bạch Đằng 1288', 'Hàm Tử 1285', 'Chương Dương 1285', 'Tây Kết 1285'],
        correct: 'Bạch Đằng 1288',
        explanation: 'Trận Bạch Đằng 1288 do Trần Hưng Đạo chỉ huy, tiêu diệt hơn 400 chiến thuyền địch.'
      }
    ]
  }
};

// Learning roadmap theo cấp học
const learningRoadmap = {
  'lớp 7': [
    { period: 'Thời kỳ Hùng Vương', topics: ['Văn Lang', 'Âu Lạc', 'Truyền thuyết'] },
    { period: 'Bắc thuộc lần 1', topics: ['Triệu Đà', 'Hai Bà Trưng', 'Bà Triệu'] },
    { period: 'Độc lập tự chủ', topics: ['Ngô Quyền', 'Đinh Tiên Hoàng', '12 sứ quân'] }
  ],
  'lớp 8': [
    { period: 'Nhà Lý - Trần', topics: ['Lý Thái Tổ', 'Trần Hưng Đạo', 'Kháng chiến chống Nguyên - Mông'] },
    { period: 'Nhà Hồ - Lê', topics: ['Hồ Quý Ly', 'Lê Lợi', 'Bình Ngô đại cáo'] }
  ],
  'lớp 9': [
    { period: 'Nhà Nguyễn', topics: ['Thống nhất đất nước', 'Cải cách Minh Mạng'] },
    { period: 'Pháp thuộc', topics: ['Kháng chiến chống Pháp', 'Phong trào yêu nước'] }
  ],
  'lớp 10': [
    { period: 'Cách mạng tháng 8', topics: ['Việt Minh', 'Tuyên ngôn độc lập'] },
    { period: 'Kháng chiến', topics: ['Điện Biên Phủ', 'Thống nhất 1975'] }
  ]
};

async function generateAssistantResponse(userMessage, conversationHistory = []) {
  const lowerMessage = userMessage.toLowerCase();

  // Build context từ lịch sử hội thoại
  const contextMessages = conversationHistory.map(msg => ({
    role: msg.type === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));

  // System prompt cho assistant
  const systemPrompt = `Bạn là EduVerse AI - trợ lý học tập lịch sử Việt Nam thông minh và thân thiện.

NHIỆM VỤ:
- Giải thích sự kiện lịch sử một cách dễ hiểu, sinh động
- Tạo câu hỏi trắc nghiệm chất lượng cao
- Gợi ý nhân vật lịch sử phù hợp
- Tóm tắt kiến thức ngắn gọn
- Hướng dẫn lộ trình học tập

PHONG CÁCH:
- Thân thiện, dễ gần như người bạn
- Giải thích đơn giản, tránh thuật ngữ khó
- Sử dụng emoji phù hợp (📖, ⭐, 🎯, 👤)
- Trả lời ngắn gọn, súc tích (3-5 câu)
- Khuyến khích học tập tích cực
- KHÔNG cần gợi ý suggestion buttons, người dùng sẽ tự hỏi tiếp

KHI TẠO QUIZ:
- Câu hỏi phải có độ khó vừa phải
- 4 đáp án, chỉ 1 đúng
- Đáp án sai phải hợp lý, không quá vô lý
- Giải thích rõ ràng tại sao đúng/sai

KIẾN THỨC:
Bạn có kiến thức sâu về:
- Các triều đại: Hùng Vương, Lý, Trần, Lê, Nguyễn...
- Nhân vật lịch sử: Vua, tướng, học giả, cách mạng
- Sự kiện: Bạch Đằng, kháng chiến, độc lập
- Văn hóa: thơ ca, kiến trúc, phong tục

QUAN TRỌNG - CHỐNG BỊA THÔNG TIN:
- CHỈ trả lời về nhân vật/sự kiện LỊCH SỬ VIỆT NAM THẬT
- Nếu KHÔNG BIẾT hoặc KHÔNG CÓ THÔNG TIN → Thừa nhận thẳng thắn: "Xin lỗi, mình không có thông tin về..."
- KHÔNG bịa đặt tên nhân vật, năm tháng, sự kiện
- KHÔNG trả lời về nhân vật hư cấu, truyện cổ tích, thần thoại như nhân vật lịch sử thật
- Nếu người dùng hỏi về nhân vật không tồn tại → Nói rõ "Nhân vật này không có trong lịch sử Việt Nam"
- Nếu không chắc chắn → Dùng cụm từ "Theo như tài liệu lịch sử...", "Có ghi nhận rằng..."`;

  // 1. Phát hiện intent thông minh
  const intentPrompt = `Phân tích câu hỏi sau và xác định ý định:
"${userMessage}"

Trả về JSON với format:
{
  "intent": "explain|quiz|search|summary|roadmap|general",
  "topic": "chủ đề chính",
  "keywords": ["từ khóa 1", "từ khóa 2"]
}`;

  // 1. Phát hiện intent thông minh hơn
  let intent = 'general';
  let topic = '';

  // Phát hiện QUIZ
  if (lowerMessage.match(/quiz|trắc nghiệm|câu hỏi|hỏi (tôi|mình|em)|kiểm tra|ôn tập/)) {
    intent = 'quiz';
  }
  // Phát hiện EXPLAIN
  else if (lowerMessage.match(/giải thích|là gì|tại sao|vì sao|như thế nào|diễn ra|xảy ra/)) {
    intent = 'explain';
  }
  // Phát hiện SEARCH
  else if (lowerMessage.match(/tìm|ai là|nhân vật|người nào|danh tướng|vua nào|hoàng đế|liệt kê/)) {
    intent = 'search';
  }
  // Phát hiện SUMMARY
  else if (lowerMessage.match(/tóm tắt|tổng hợp|tổng quan|overview|summary/)) {
    intent = 'summary';
  }
  // Phát hiện ROADMAP
  else if (lowerMessage.match(/lộ trình|nên học|bắt đầu|học gì|học (trước|sau)|thứ tự|cấp \d/)) {
    intent = 'roadmap';
  }

  // Tìm topic từ message (mở rộng keywords)
  const topicPatterns = {
    'trần': /nhà trần|triều trần|trần hưng đạo|trần nhân tông|trần thái tông/i,
    'lý': /nhà lý|triều lý|lý thái tổ|lý thường kiệt|lý thánh tông/i,
    'lê': /nhà lê|triều lê|lê lợi|lê thánh tông|lam sơn/i,
    'nguyễn': /nhà nguyễn|triều nguyễn|gia long|minh mạng|tự đức/i,
    'tây sơn': /tây sơn|nguyễn huệ|quang trung|nguyễn nhạc/i,
    'bạch đằng': /bạch đằng|ngô quyền|lê hoàn/i,
    'hùng vương': /hùng vương|văn lang|âu lạc|hồng bàng/i,
    'độc lập': /độc lập|kháng chiến|giải phóng/i,
    'hai bà trưng': /hai bà trưng|trưng trắc|trưng nhị/i
  };

  for (const [key, pattern] of Object.entries(topicPatterns)) {
    if (pattern.test(lowerMessage)) {
      topic = key;
      break;
    }
  }

  let response = {};

  switch (intent) {
    case 'quiz':
      response = await handleSmartQuiz(userMessage, topic, contextMessages, systemPrompt);
      break;
    
    case 'explain':
      response = await handleSmartExplain(userMessage, contextMessages, systemPrompt);
      break;
    
    case 'search':
      response = await handleSmartSearch(userMessage, contextMessages, systemPrompt);
      break;
    
    case 'summary':
      response = await handleSmartSummary(userMessage, topic, contextMessages, systemPrompt);
      break;
    
    case 'roadmap':
      response = handleRoadmap(lowerMessage);
      break;
    
    default:
      response = await handleSmartGeneral(userMessage, contextMessages, systemPrompt);
  }

  return response;
}

// === SMART HANDLERS SỬ DỤNG AI ===

async function handleSmartQuiz(userMessage, topic, contextMessages, systemPrompt) {
  const quizPrompt = `Tạo 1 câu hỏi trắc nghiệm về lịch sử Việt Nam dựa trên yêu cầu: "${userMessage}"

YÊU CẦU:
- Câu hỏi phải về SỰ KIỆN/NHÂN VẬT LỊCH SỬ THẬT
- KHÔNG bịa đặt thông tin, tên người, năm tháng
- Nếu không có đủ thông tin để tạo quiz → Trả lời: "Xin lỗi, mình chưa có đủ thông tin để tạo câu hỏi về chủ đề này."
- Câu hỏi phải có tính tư duy
- 4 đáp án hợp lý, chỉ 1 đúng
- Giải thích ngắn gọn (1-2 câu) dựa trên SỰ THẬT LỊCH SỬ

Format trả lời:
**Câu hỏi:** [Câu hỏi]

A. [Đáp án A]
B. [Đáp án B]
C. [Đáp án C]
D. [Đáp án D]

**Đáp án đúng:** [A/B/C/D]
**Giải thích:** [Giải thích]`;

  try {
    const aiResponse = await createChatCompletion([
      { role: 'system', content: systemPrompt },
      ...contextMessages,
      { role: 'user', content: quizPrompt }
    ]);

    return {
      response: aiResponse
    };
  } catch (error) {
    console.error('Smart quiz error:', error);
    return await handleQuiz(userMessage);
  }
}

async function handleSmartExplain(userMessage, contextMessages, systemPrompt) {
  const explainPrompt = `${userMessage}

Giải thích ngắn gọn, dễ hiểu cho học sinh. 

⚠️ QUAN TRỌNG:
- CHỈ giải thích về SỰ KIỆN/NHÂN VẬT LỊCH SỬ VIỆT NAM THẬT
- KHÔNG bịa đặt thông tin
- Nếu KHÔNG BIẾT hoặc KHÔNG CÓ TRONG LỊCH SỬ → Thừa nhận: "Xin lỗi, mình không có thông tin chính xác về điều này trong lịch sử Việt Nam."

Bao gồm (nếu có):
- Thời gian (nếu có)
- Bối cảnh
- Diễn biến chính
- Ý nghĩa/Kết quả

Format: văn xuôi, 4-6 câu, có emoji phù hợp.`;

  try {
    const aiResponse = await createChatCompletion([
      { role: 'system', content: systemPrompt },
      ...contextMessages,
      { role: 'user', content: explainPrompt }
    ]);

    return {
      response: aiResponse
    };
  } catch (error) {
    console.error('Smart explain error:', error);
    return await handleExplainEvent(userMessage);
  }
}

async function handleSmartSearch(userMessage, contextMessages, systemPrompt) {
  const searchPrompt = `${userMessage}

CHỈ liệt kê nhân vật LỊCH SỬ VIỆT NAM THẬT (3-5 người phù hợp nhất).

⚠️ QUAN TRỌNG:
- KHÔNG bịa đặt tên nhân vật
- KHÔNG liệt kê nhân vật hư cấu, thần thoại, truyền thuyết
- Nếu KHÔNG CÓ nhân vật phù hợp → Trả lời: "Xin lỗi, mình không tìm thấy nhân vật lịch sử nào phù hợp với yêu cầu này."
- CHỈ liệt kê nhân vật có TÊN THẬT, LỊCH SỬ GHI NHẬN

Format (chỉ khi CÓ nhân vật phù hợp):
- **Tên nhân vật** (Chức vụ • Thời kỳ)
  Mô tả ngắn gọn về nhân vật này (1-2 câu)

Ví dụ:
- **Lê Lợi** (Vua • Thế kỷ 15)
  Người lãnh đạo cuộc khởi nghĩa Lam Sơn, đánh đuổi quân Minh và sáng lập nhà Lê.`;

  try {
    const aiResponse = await createChatCompletion([
      { role: 'system', content: systemPrompt },
      ...contextMessages,
      { role: 'user', content: searchPrompt }
    ]);

    return {
      response: aiResponse
    };
  } catch (error) {
    console.error('Smart search error:', error);
    return handleSearchCharacter(userMessage);
  }
}

async function handleSmartSummary(userMessage, topic, contextMessages, systemPrompt) {
  const summaryPrompt = `${userMessage}

Tóm tắt ngắn gọn theo format:

⏰ **Thời gian:** [Thời gian diễn ra]

👤 **Nhân vật chính:** [Liệt kê nhân vật quan trọng]

🏆 **Thành tựu nổi bật:** [Những thành tựu/sự kiện chính]

Mỗi mục ngắn gọn, dễ nhớ.`;

  try {
    const aiResponse = await createChatCompletion([
      { role: 'system', content: systemPrompt },
      ...contextMessages,
      { role: 'user', content: summaryPrompt }
    ]);

    return {
      response: aiResponse
    };
  } catch (error) {
    console.error('Smart summary error:', error);
    return await handleSummary(userMessage);
  }
}

async function handleSmartGeneral(userMessage, contextMessages, systemPrompt) {
  try {
    const aiResponse = await createChatCompletion([
      { role: 'system', content: systemPrompt },
      ...contextMessages,
      { role: 'user', content: userMessage }
    ]);

    return {
      response: aiResponse
    };
  } catch (error) {
    console.error('Smart general error:', error);
    return {
      response: 'Xin lỗi, mình đang gặp chút vấn đề. Bạn thử hỏi lại nhé! 🙏'
    };
  }
}

function detectIntent(message) {
  if (message.includes('giải thích') || message.includes('là gì') || message.includes('tại sao')) {
    return 'explain';
  }
  if (message.includes('quiz') || message.includes('trắc nghiệm') || message.includes('hỏi tôi') || message.includes('câu hỏi')) {
    return 'quiz';
  }
  if (message.includes('tìm') || message.includes('nhân vật') || message.includes('ai')) {
    return 'search_character';
  }
  if (message.includes('tóm tắt') || message.includes('tổng hợp')) {
    return 'summary';
  }
  if (message.includes('lộ trình') || message.includes('nên học') || message.includes('bắt đầu')) {
    return 'roadmap';
  }
  return 'general';
}

async function handleExplainEvent(message) {
  // Tìm sự kiện trong knowledge base
  for (const [key, event] of Object.entries(historicalEvents)) {
    if (message.includes(key)) {
      let explanation = `📖 **${event.name}**\n\n`;
      explanation += `⏰ **Thời gian:** ${event.time}\n\n`;
      
      if (event.summary) {
        explanation += `📝 **Tóm tắt:** ${event.summary}\n\n`;
      }
      
      if (event.context) {
        explanation += `🔍 **Bối cảnh:** ${event.context}\n\n`;
      }
      
      if (event.significance) {
        explanation += `⭐ **Ý nghĩa:** ${event.significance}\n\n`;
      }
      
      if (event.figures) {
        explanation += `👥 **Nhân vật liên quan:** ${event.figures.join(', ')}`;
      }

      return {
        response: explanation,
        suggestions: [
          { icon: '🎯', text: 'Quiz về sự kiện này', action: 'quiz' },
          { icon: '👤', text: 'Xem nhân vật liên quan', action: 'search' }
        ]
      };
    }
  }

  // Nếu không tìm thấy, dùng AI
  const prompt = `Bạn là trợ lý lịch sử Việt Nam. Giải thích ngắn gọn (3-4 câu) về: ${message}`;
  const aiResponse = await createChatCompletion([
    { role: 'system', content: 'Bạn là chuyên gia lịch sử Việt Nam, giải thích ngắn gọn, dễ hiểu.' },
    { role: 'user', content: prompt }
  ]);

  return {
    response: aiResponse,
    suggestions: [
      { icon: '📚', text: 'Tìm hiểu thêm', action: 'explain' },
      { icon: '🎯', text: 'Quiz liên quan', action: 'quiz' }
    ]
  };
}

async function handleQuiz(message) {
  // Phát hiện chủ đề
  for (const [key, data] of Object.entries(historicalEvents)) {
    if (message.includes(key) && data.quiz) {
      const randomQuiz = data.quiz[Math.floor(Math.random() * data.quiz.length)];
      
      return {
        response: `Được rồi! Đây là câu hỏi về **${data.name}**:`,
        quiz: randomQuiz
      };
    }
  }

  // Quiz mặc định về triều Trần
  const tranQuiz = historicalEvents['trần'].quiz;
  const randomQuiz = tranQuiz[Math.floor(Math.random() * tranQuiz.length)];

  return {
    response: 'Đây là câu hỏi về **Nhà Trần**:',
    quiz: randomQuiz
  };
}

function handleSearchCharacter(message) {
  let results = [];

  // Tìm theo từ khóa
  if (message.includes('tống') || message.includes('kháng chiến chống tống')) {
    results = characters.filter(c => 
      c.highlights?.some(h => h.includes('Tống')) || 
      c.description?.includes('Tống')
    ).slice(0, 5);
  } else if (message.includes('nguyên') || message.includes('mông')) {
    results = characters.filter(c => 
      c.highlights?.some(h => h.includes('Nguyên') || h.includes('Mông')) ||
      c.description?.includes('Nguyên')
    ).slice(0, 5);
  } else if (message.includes('pháp')) {
    results = characters.filter(c => 
      c.highlights?.some(h => h.includes('Pháp')) ||
      c.description?.includes('Pháp')
    ).slice(0, 5);
  } else {
    // Tìm theo category
    if (message.includes('quân sự') || message.includes('tướng')) {
      results = characters.filter(c => c.category === 'military').slice(0, 5);
    } else if (message.includes('học giả') || message.includes('văn học')) {
      results = characters.filter(c => c.category === 'scholar').slice(0, 5);
    } else if (message.includes('vua') || message.includes('hoàng đế')) {
      results = characters.filter(c => c.title?.includes('Hoàng đế')).slice(0, 5);
    }
  }

  if (results.length === 0) {
    results = characters.slice(0, 5);
  }

  return {
    response: `Tìm thấy **${results.length} nhân vật** phù hợp:`,
    characters: results.map(c => ({
      id: c.id,
      name: c.name,
      title: c.title,
      era: c.era,
      dynasty: c.dynasty
    })),
    suggestions: [
      { icon: '💬', text: 'Trò chuyện với nhân vật', action: 'chat' }
    ]
  };
}

async function handleSummary(message) {
  // Tìm chủ đề cần tóm tắt
  for (const [key, data] of Object.entries(historicalEvents)) {
    if (message.includes(key)) {
      return {
        response: `📝 Đây là tóm tắt về **${data.name}**:`,
        summary: {
          time: data.time,
          figures: data.figures?.join(', ') || 'Nhiều nhân vật',
          achievements: Array.isArray(data.achievements) 
            ? data.achievements.join(', ') 
            : data.summary || data.significance
        },
        suggestions: [
          { icon: '🎯', text: 'Quiz kiểm tra', action: 'quiz' },
          { icon: '👤', text: 'Xem nhân vật', action: 'search' }
        ]
      };
    }
  }

  // Dùng AI nếu không tìm thấy
  const prompt = `Tóm tắt ngắn gọn về ${message} theo 3 mục: Thời gian, Nhân vật chính, Thành tựu nổi bật.`;
  const aiResponse = await createChatCompletion([
    { role: 'system', content: 'Bạn là chuyên gia lịch sử Việt Nam, tóm tắt theo định dạng: Thời gian / Nhân vật / Thành tựu' },
    { role: 'user', content: prompt }
  ]);

  return { response: aiResponse };
}

function handleRoadmap(message) {
  // Phát hiện cấp học
  let grade = 'lớp 7';
  for (const level of ['lớp 7', 'lớp 8', 'lớp 9', 'lớp 10', 'lớp 11', 'lớp 12']) {
    if (message.includes(level)) {
      grade = level;
      break;
    }
  }

  const roadmap = learningRoadmap[grade] || learningRoadmap['lớp 7'];
  
  let response = `🗺️ **Lộ trình học Lịch sử cho ${grade.charAt(0).toUpperCase() + grade.slice(1)}**\n\n`;
  roadmap.forEach((step, idx) => {
    response += `**${idx + 1}. ${step.period}**\n`;
    response += `   📌 ${step.topics.join(', ')}\n\n`;
  });

  response += '💡 *Học theo thứ tự này để dễ hiểu và logic nhất!*';

  return {
    response
  };
}

async function handleGeneralQuestion(message) {
  const prompt = `Bạn là trợ lý học tập lịch sử Việt Nam tên EduVerse AI. Trả lời câu hỏi ngắn gọn, dễ hiểu, thân thiện: ${message}`;
  
  const aiResponse = await createChatCompletion([
    { role: 'system', content: 'Bạn là trợ lý lịch sử Việt Nam thân thiện, trả lời ngắn gọn, chính xác.' },
    { role: 'user', content: prompt }
  ]);

  return {
    response: aiResponse,
    suggestions: [
      { icon: '📖', text: 'Giải thích sâu hơn', action: 'explain' },
      { icon: '🎯', text: 'Quiz kiểm tra', action: 'quiz' }
    ]
  };
}

export {
  generateAssistantResponse
};
