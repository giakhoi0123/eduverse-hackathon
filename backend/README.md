# Backend - EduVerse API

## 🎯 Mục đích
API server cho EduVerse, xử lý chat với AI và text-to-speech.

## 📦 Cài đặt
```bash
npm install
cp .env.example .env
# Thêm OPENAI_API_KEY vào .env
```

## 🚀 Chạy
```bash
# Development
npm run dev

# Production
npm start
```

Server chạy tại: **http://localhost:5000**

## 📁 Cấu trúc
```
backend/
├── server.js           # Main server
├── routes/            # API endpoints
│   ├── chat.js        # Chat API
│   └── characters.js  # Characters API
├── utils/             # Utilities
│   ├── openai.js      # OpenAI integration
│   ├── tts.js         # Text-to-Speech
│   ├── storage.js     # Data storage
│   └── characters.js  # Character database
├── audio/             # Generated audio files
└── data/              # Conversation history
```

## 🔌 API Endpoints

### GET /api/health
Health check
```json
{
  "status": "OK",
  "message": "EduVerse Backend is running"
}
```

### GET /api/characters
Lấy danh sách nhân vật
```json
{
  "success": true,
  "data": [...]
}
```

### POST /api/chat/message
Gửi tin nhắn
```json
{
  "message": "Xin chào",
  "characterId": "tran-hung-dao",
  "conversationId": "conv_123"
}
```

## 🔑 Environment Variables
```
OPENAI_API_KEY=your_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🧪 Test
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test characters
curl http://localhost:5000/api/characters
```

## 📝 Dependencies
- express - Web framework
- openai - OpenAI API client
- gtts - Text-to-Speech
- cors - CORS middleware
- dotenv - Environment variables
