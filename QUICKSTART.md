# 🚀 Quick Start Guide - EduVerse

## Bước 1: Clone Repository

```bash
git clone <repository-url>
cd EduVerse
```

## Bước 2: Setup Backend

```bash
cd backend
npm install
```

### Tạo file .env
```bash
cp .env.example .env
```

### Thêm OpenAI API Key vào .env
Mở file `.env` và thêm:
```
OPENAI_API_KEY=sk-your-api-key-here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Chạy Backend
```bash
npm run dev
```

Backend sẽ chạy tại: **http://localhost:5000**

## Bước 3: Setup Frontend

Mở terminal mới:

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: **http://localhost:5173**

## Bước 4: Test

1. Mở browser tại `http://localhost:5173`
2. Chọn một nhân vật lịch sử
3. Bắt đầu trò chuyện!

---

## 🔧 Troubleshooting

### Lỗi: Port đã được sử dụng

```bash
# Kill process trên port 5000 (Backend)
lsof -ti:5000 | xargs kill -9

# Kill process trên port 5173 (Frontend)
lsof -ti:5173 | xargs kill -9
```

### Lỗi: OpenAI API

- Kiểm tra API key trong `.env`
- Verify account có credits tại: https://platform.openai.com/account/billing

### Lỗi: Module not found

```bash
# Xóa node_modules và cài lại
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Features Hoạt Động

✅ Chọn nhân vật lịch sử  
✅ Chat với AI  
✅ Nghe giọng nói tiếng Việt  
✅ Lưu lịch sử hội thoại  
✅ Responsive design  

---

## 📝 API Endpoints

### GET /api/health
Health check

### GET /api/characters
Lấy danh sách nhân vật

### GET /api/characters/:id
Lấy thông tin nhân vật

### POST /api/chat/message
Gửi tin nhắn

Body:
```json
{
  "message": "Xin chào",
  "characterId": "tran-hung-dao",
  "conversationId": "conv_123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "text": "Xin chào...",
    "audioUrl": "/audio/...",
    "conversationId": "conv_123",
    "timestamp": "..."
  }
}
```

---

Enjoy coding! 🎉
