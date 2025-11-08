# 🚀 Hướng dẫn Deploy EduVerse

## 📦 Deploy Backend lên Render (Free)

### Bước 1: Tạo tài khoản Render
1. Truy cập https://render.com
2. Sign up với GitHub account
3. Authorize Render truy cập repo

### Bước 2: Deploy Backend
1. Dashboard → Click **"New +"** → **"Web Service"**
2. Connect repository: `eduverse-hackathon`
3. Cấu hình:
   - **Name**: `eduverse-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

4. **Environment Variables** → Add:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NODE_ENV=production
   ```

5. Click **"Create Web Service"**
6. Đợi deploy xong (3-5 phút)
7. Copy URL (ví dụ: `https://eduverse-backend.onrender.com`)

### Bước 3: Update Frontend config
1. Mở file `frontend/src/config.js`
2. Thay URL Render vừa copy:
   ```javascript
   export const API_URL = import.meta.env.PROD 
     ? 'https://eduverse-backend.onrender.com' // ← Thay URL của bạn
     : 'http://localhost:3000';
   ```
3. Save và commit

---

## 🌐 Deploy Frontend lên GitHub Pages

### Bước 1: Enable GitHub Pages
1. Vào repo: https://github.com/giakhoi0123/eduverse-hackathon
2. **Settings** → **Pages**
3. **Source**: GitHub Actions

### Bước 2: Push code
```bash
git add .
git commit -m "Setup deployment configuration"
git push origin main
```

### Bước 3: Chờ GitHub Actions build
1. Vào tab **Actions** trên GitHub
2. Đợi workflow **"Deploy to GitHub Pages"** chạy xong (2-3 phút)
3. Website sẽ live tại: `https://giakhoi0123.github.io/eduverse-hackathon/`

---

## ✅ Kiểm tra sau khi deploy

### Backend (Render)
- Truy cập: `https://eduverse-backend.onrender.com`
- Nếu thấy JSON: `{"message": "EduVerse API is running"}` → ✅ Thành công

### Frontend (GitHub Pages)
- Truy cập: `https://giakhoi0123.github.io/eduverse-hackathon/`
- Test AI Assistant chatbot
- Kiểm tra API calls (F12 → Network tab)

---

## 🔧 Troubleshooting

### Backend không chạy trên Render
- Kiểm tra **Logs** trên Render Dashboard
- Đảm bảo `OPENAI_API_KEY` đã set đúng
- Build command phải là `npm install`

### Frontend không kết nối được Backend
- Kiểm tra `frontend/src/config.js` có đúng URL Render không
- Kiểm tra CORS trong `backend/server.js` (phải allow GitHub Pages domain)
- F12 → Console → Xem lỗi

### GitHub Pages 404
- Đảm bảo `base: '/eduverse-hackathon/'` trong `vite.config.js`
- Settings → Pages → Source phải là **GitHub Actions**

---

## 📝 Notes

- **Render Free**: Backend sẽ sleep sau 15 phút không dùng (cold start ~30s lần đầu)
- **GitHub Pages**: Chỉ host static files, cần backend riêng
- Mỗi lần push lên `main` → Tự động deploy GitHub Pages
- Render cần manual redeploy hoặc setup auto-deploy từ GitHub

---

## 🎯 URL sau khi deploy

- **Backend API**: https://eduverse-backend.onrender.com
- **Frontend**: https://giakhoi0123.github.io/eduverse-hackathon/
