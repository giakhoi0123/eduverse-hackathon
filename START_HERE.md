# 🚀 EduVerse - SETUP NHANH CHO TEAM

## ⚡ TÓM TẮT DỰ ÁN
- **Tên:** EduVerse - AI Avatar Lịch Sử Việt Nam
- **Mục đích:** Chat với nhân vật lịch sử bằng AI
- **Tech Stack:** React + Node.js + OpenAI + TTS
- **Team:** 3 người
- **Thời gian:** 1-2 ngày

---

## 📂 CẤU TRÚC DỰ ÁN

```
EduVerse/
├── backend/              # Node.js API
│   ├── routes/          # API routes
│   ├── utils/           # OpenAI, TTS, Storage
│   └── server.js        # Main server
├── frontend/            # React app
│   └── src/
│       ├── pages/       # Home, Chat
│       ├── components/  # UI components
│       └── services/    # API calls
└── docs/                # Documentation
```

---

## 🎯 PHÂN CÔNG NHANH

### 👤 Người 1: Backend
- OpenAI API integration
- Text-to-Speech
- API endpoints

### 👤 Người 2: Frontend  
- UI/UX design
- Components
- Styling

### 👤 Người 3: Integration
- Connect FE & BE
- Audio playback
- Testing

---

## ⚙️ SETUP NHANH (5 phút)

### 1. Clone & Install
```bash
cd /Users/phamgiakhoi/Hackathon/EduVerse

# Backend
cd backend
npm install
cp .env.example .env
# ⚠️ QUAN TRỌNG: Thêm OPENAI_API_KEY vào .env

# Frontend (terminal mới)
cd frontend
npm install
```

### 2. Lấy OpenAI API Key
1. Vào: https://platform.openai.com/api-keys
2. Tạo new key
3. Copy và paste vào `backend/.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

### 3. Chạy dự án
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Mở browser
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

---

## 📋 CHECKLIST TRƯỚC KHI BẮT ĐẦU

- [ ] Git đã được init ✅
- [ ] Đã có OpenAI API key
- [ ] Node.js đã cài (v18+)
- [ ] npm/yarn đã cài
- [ ] VSCode hoặc editor đã sẵn sàng
- [ ] Team đã đọc TEAM_TASKS.md
- [ ] Đã tạo GitHub repo (optional)

---

## 🔧 COMMANDS HỮU ÍCH

### Git
```bash
# Tạo branch mới
git checkout -b feature/your-name

# Commit
git add .
git commit -m "feat: your message"

# Push
git push origin feature/your-name
```

### Development
```bash
# Kill port nếu bị conflict
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 TÀI LIỆU QUAN TRỌNG

1. **README.md** - Tổng quan dự án
2. **QUICKSTART.md** - Hướng dẫn setup chi tiết
3. **TEAM_TASKS.md** - Phân công công việc
4. **GIT_WORKFLOW.md** - Quy trình Git
5. **DEMO_SCRIPT.md** - Script cho demo
6. **TODO.md** - Danh sách việc cần làm

---

## 🎯 MỤC TIÊU NGÀY 1

### Morning (4h)
- [ ] Setup xong môi trường
- [ ] Backend connect OpenAI thành công
- [ ] Frontend hiển thị được UI cơ bản

### Afternoon (4h)
- [ ] Chat flow hoạt động
- [ ] Audio playback hoạt động
- [ ] Integration testing

### Evening (2h)
- [ ] Bug fixing
- [ ] UI polish
- [ ] Test demo

---

## 🆘 KHI GẶP VẤN ĐỀ

### OpenAI Error
- Check API key trong .env
- Check credits: https://platform.openai.com/account/billing
- Xem log ở terminal backend

### Frontend không connect Backend
- Check backend đang chạy port 5000
- Check CORS settings
- Mở DevTools > Network tab

### Audio không phát
- Check backend logs
- Check `backend/audio/` có files không
- Test với browser khác

---

## 💡 TIPS

✅ Commit thường xuyên
✅ Test ngay khi code xong
✅ Communicate với team
✅ Đọc error messages kỹ
✅ Google là bạn thân 😄
✅ Keep calm and code!

---

## 📞 CONTACTS

- Backend Lead: [Tên]
- Frontend Lead: [Tên]  
- Integration Lead: [Tên]

---

**LET'S BUILD SOMETHING AWESOME! 🚀**

Nhớ đọc các file .md khác để hiểu rõ hơn nhé!
