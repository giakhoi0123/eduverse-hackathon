# 🚀 EduVerse - AI Avatar Lịch Sử Việt Nam

## 🎯 Giới thiệu
**EduVerse** là một website AI tương tác, cho phép người dùng trò chuyện trực tiếp với các nhân vật lịch sử Việt Nam như **Trần Hưng Đạo**, **Hai Bà Trưng**, **Nguyễn Trãi**...

AI sẽ nhập vai nhân vật, trả lời sinh động bằng văn phong lịch sử, kèm giọng nói và avatar hoạt hình.

---

## 🧩 Công nghệ sử dụng
- **Frontend:** React + Vite + TailwindCSS  
- **Backend:** Node.js + Express  
- **AI Integration:**  
  - OpenAI GPT-4o-mini → tạo lời thoại nhân vật  
  - gTTS (Google Text-to-Speech) → sinh giọng nói tiếng Việt  
- **Database:** SQLite hoặc JSON file

---

## 📁 Cấu trúc dự án
```
EduVerse/
├── backend/          # Node.js + Express API
├── frontend/         # React + Vite
└── README.md
```

---

## 🚀 Hướng dẫn Setup cho Team

### 1️⃣ Clone Repository
```bash
git clone <repository-url>
cd EduVerse
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Thêm OPENAI_API_KEY vào file .env
npm run dev
```

Backend sẽ chạy tại: `http://localhost:5000`

### 3️⃣ Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

---

## 👥 Phân công công việc (Team 3 người)

### 👤 Người 1: Backend Developer
**Nhiệm vụ:**
- Setup Express server
- Tích hợp OpenAI GPT API
- Xây dựng API endpoint `/api/chat`
- Tích hợp gTTS cho text-to-speech
- Xử lý lưu trữ lịch sử hội thoại

**Files cần làm:**
- `backend/server.js`
- `backend/routes/chat.js`
- `backend/utils/openai.js`
- `backend/utils/tts.js`

### 👤 Người 2: Frontend Developer
**Nhiệm vụ:**
- Setup React + Vite project
- Xây dựng giao diện trang chủ (Home page)
- Xây dựng giao diện chat (Chat page)
- Tạo components (ChatBubble, Avatar, MessageInput)
- Styling với TailwindCSS

**Files cần làm:**
- `frontend/src/pages/Home.jsx`
- `frontend/src/pages/Chat.jsx`
- `frontend/src/components/ChatBubble.jsx`
- `frontend/src/components/Avatar.jsx`
- `frontend/src/components/MessageInput.jsx`

### 👤 Người 3: Full-stack Integration
**Nhiệm vụ:**
- Kết nối Frontend với Backend API
- Xử lý logic phát audio
- Implement lưu trữ lịch sử (localStorage/database)
- Testing và debug
- Deployment preparation

**Files cần làm:**
- `frontend/src/services/api.js`
- `frontend/src/hooks/useChat.js`
- `backend/middleware/cors.js`
- Testing & Integration

---

## 🔑 Environment Variables

Tạo file `.env` trong thư mục `backend/`:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000
NODE_ENV=development
```

---

## 📝 Git Workflow

### Branch Strategy
- `main` - Production ready code
- `develop` - Development branch
- `feature/backend-api` - Backend features
- `feature/frontend-ui` - Frontend features
- `feature/integration` - Integration work

### Quy trình làm việc
1. Tạo branch mới từ `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. Commit code:
   ```bash
   git add .
   git commit -m "feat: mô tả ngắn gọn"
   ```

3. Push và tạo Pull Request:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Review code và merge vào `develop`

---

## 🎨 Design System

### Colors
- Primary: `#3B82F6` (Blue)
- Secondary: `#8B5CF6` (Purple)
- Success: `#10B981` (Green)
- Background: `#F9FAFB` (Light Gray)
- Text: `#1F2937` (Dark Gray)

### Typography
- Font: Inter, system-ui
- Heading: Bold, 24-32px
- Body: Regular, 16px

---

## 🧪 Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

---

## 📱 Demo Features

1. **Trang chủ**: Giới thiệu và chọn nhân vật
2. **Chat Interface**: Giao diện trò chuyện real-time
3. **Voice Response**: AI trả lời bằng giọng nói
4. **Avatar Animation**: Avatar động khi nói
5. **History**: Lưu lịch sử hội thoại

---

## 🐛 Troubleshooting

### Port đã được sử dụng
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### OpenAI API Error
- Kiểm tra API key trong `.env`
- Verify account có credits

---

## 📞 Liên hệ Team

- **Backend**: [Tên người 1]
- **Frontend**: [Tên người 2]
- **Integration**: [Tên người 3]

---

## 📄 License
MIT License - Hackathon Project 2025
