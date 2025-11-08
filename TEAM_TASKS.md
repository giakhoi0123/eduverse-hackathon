# 🎯 PHÂN CÔNG CÔNG VIỆC - TEAM HACKATHON

## 👤 NGƯỜI 1: Backend Developer

### Nhiệm vụ chính:
1. **Setup Backend Server**
   - ✅ Cài đặt dependencies
   - ✅ Cấu hình Express server
   - ✅ Setup CORS và middleware

2. **Tích hợp AI & APIs**
   - [ ] Lấy OpenAI API key và test
   - [ ] Hoàn thiện logic trong `utils/openai.js`
   - [ ] Test và tối ưu prompts cho từng nhân vật
   - [ ] Implement text-to-speech với gTTS

3. **Database & Storage**
   - [ ] Test storage system với `utils/storage.js`
   - [ ] Tối ưu lưu trữ conversation history
   - [ ] Implement cleanup cho old audio files

4. **Testing**
   - [ ] Test tất cả API endpoints
   - [ ] Error handling
   - [ ] Performance optimization

### Files cần làm:
- `backend/server.js` ✅
- `backend/routes/chat.js` ✅
- `backend/utils/openai.js` ✅
- `backend/utils/tts.js` ✅
- `backend/utils/storage.js` ✅

### Thời gian ước tính: 6-8 giờ

---

## 👤 NGƯỜI 2: Frontend Developer

### Nhiệm vụ chính:
1. **Setup Frontend Project**
   - ✅ Cài đặt dependencies
   - ✅ Cấu hình TailwindCSS
   - ✅ Setup routing với React Router

2. **Xây dựng UI Components**
   - [ ] Hoàn thiện responsive design
   - [ ] Thêm animations & transitions
   - [ ] Tối ưu UX cho mobile
   - [ ] Thêm loading states & error handling UI

3. **Styling & Polish**
   - [ ] Design character cards đẹp hơn
   - [ ] Tạo avatar images hoặc placeholders
   - [ ] Thêm theme colors cho từng nhân vật
   - [ ] Responsive design cho tất cả màn hình

4. **Testing UI**
   - [ ] Test trên các trình duyệt khác nhau
   - [ ] Test responsive trên mobile
   - [ ] Kiểm tra accessibility

### Files cần làm:
- `frontend/src/pages/Home.jsx` ✅
- `frontend/src/pages/Chat.jsx` ✅
- `frontend/src/components/*.jsx` ✅
- `frontend/src/index.css` ✅

### Thời gian ước tính: 6-8 giờ

---

## 👤 NGƯỜI 3: Full-stack Integration

### Nhiệm vụ chính:
1. **Frontend-Backend Integration**
   - [ ] Test kết nối API
   - [ ] Implement error handling
   - [ ] Add retry logic cho failed requests
   - [ ] Optimize API calls

2. **Audio Playback**
   - [ ] Implement audio player với controls
   - [ ] Add auto-play functionality
   - [ ] Handle audio loading states
   - [ ] Add audio queue system (optional)

3. **Chat Features**
   - [ ] Implement conversation history
   - [ ] Add "New conversation" feature
   - [ ] Add "Delete conversation" feature
   - [ ] LocalStorage fallback

4. **Testing & Deployment**
   - [ ] End-to-end testing
   - [ ] Bug fixing
   - [ ] Performance optimization
   - [ ] Prepare for deployment

### Files cần làm:
- `frontend/src/services/api.js` ✅
- `frontend/src/hooks/useChat.js` (tạo mới)
- `backend/middleware/*` (nếu cần)
- Testing & Integration

### Thời gian ước tính: 6-8 giờ

---

## 📅 Timeline Đề Xuất (1-2 ngày)

### Ngày 1 - Morning (4 giờ)
- **Người 1**: Setup backend + tích hợp OpenAI
- **Người 2**: Setup frontend + basic UI
- **Người 3**: Setup integration + API testing

### Ngày 1 - Afternoon (4 giờ)
- **Người 1**: Implement TTS + storage
- **Người 2**: Hoàn thiện UI components
- **Người 3**: Implement chat logic + audio player

### Ngày 1 - Evening (2 giờ)
- **TEAM**: Integration testing + bug fixing

### Ngày 2 - Morning (3 giờ)
- **Người 1**: Optimize backend performance
- **Người 2**: Polish UI/UX + responsive
- **Người 3**: End-to-end testing

### Ngày 2 - Afternoon (3 giờ)
- **TEAM**: Final testing + deployment prep + demo practice

---

## 🚀 Quick Start Commands

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Thêm OPENAI_API_KEY vào .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Checklist Trước Khi Demo

- [ ] Backend chạy được và kết nối OpenAI thành công
- [ ] Frontend hiển thị đẹp trên cả desktop và mobile
- [ ] Chat functionality hoạt động tốt
- [ ] Audio playback hoạt động
- [ ] Ít nhất 2-3 nhân vật hoạt động tốt
- [ ] Error handling đầy đủ
- [ ] Loading states rõ ràng
- [ ] Code clean và có comment
- [ ] README đầy đủ hướng dẫn

---

## 📞 Communication

Sử dụng:
- **Discord/Slack**: Chat realtime
- **GitHub Issues**: Track bugs & features
- **Daily Standup**: 15 phút mỗi sáng

Cập nhật tiến độ thường xuyên! 🎉
