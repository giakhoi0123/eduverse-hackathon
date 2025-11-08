# 🧪 TESTING GUIDE - Hướng Dẫn Test EduVerse

## ✅ Pre-Test Checklist

### 1. Kiểm Tra Servers
```bash
# Backend (Terminal 1)
✅ Server running: http://localhost:3000
✅ Environment loaded
✅ OpenAI API key found

# Frontend (Terminal 2)
✅ Vite running: http://localhost:5173
✅ No build errors
```

### 2. Browser Setup
- ✅ Chrome/Safari/Firefox (latest version)
- ✅ Cho phép autoplay audio
- ✅ Network tab mở (để debug nếu cần)

---

## 🎯 Test Scenarios

### Scenario 1: UI/UX - Landing Page 🏠

#### Desktop Testing (>1024px)

**Expected Results**:
1. **Header**
   - [ ] Logo "EduVerse" hiển thị với gradient text
   - [ ] Icon Sparkles màu trắng trong gradient box
   - [ ] Menu items có hover effect

2. **Hero Section**
   - [ ] Badge "Powered by AI • Made for Vietnam 🇻🇳"
   - [ ] Title "Trò Chuyện Với Lịch Sử" với gradient
   - [ ] 4 avatar circles hiển thị
   - [ ] Text "4 nhân vật lịch sử đang chờ bạn"

3. **Character Cards** (4 cards)
   - [ ] Emoji avatar hiển thị (⚔️👑📜🛡️)
   - [ ] Badge "Giọng nói AI" với icon Volume2
   - [ ] Era badge hiển thị đúng thế kỷ
   - [ ] Hover: Card scale lên + translate lên
   - [ ] Hover: Glow effect theo màu nhân vật
   - [ ] Hover: Sparkle particles xuất hiện 3 vị trí
   - [ ] Hover: Preview bubble hiện với quote
   - [ ] Hover: Button đổi màu theo character
   - [ ] Hover: Shimmer effect trên button
   - [ ] Avatar rotate + scale khi hover

4. **Features Section**
   - [ ] 3 feature cards ngang hàng
   - [ ] Icons: Sparkles, BookOpen, Users
   - [ ] Hover: Scale 1.05

#### Mobile Testing (<768px)

**Cách test**: Chrome DevTools → Toggle device toolbar → iPhone SE

**Expected Results**:
1. [ ] Character cards xếp 1 column
2. [ ] Preview quote hiển thị inline (không phải bubble)
3. [ ] Text sizes nhỏ hơn, dễ đọc
4. [ ] Buttons đủ lớn cho touch (min 44px)
5. [ ] Features grid: 1 column (third card full width)
6. [ ] No horizontal scroll
7. [ ] All content fits viewport

#### Test Steps:
```
1. Mở http://localhost:5173
2. Quan sát fade-in animation
3. Hover vào từng character card
4. Click vào "Trần Hưng Đạo"
→ Phải navigate đến /chat/tran-hung-dao
```

---

### Scenario 2: Character Selection & Navigation 🎭

**Test Cases**:

#### TC1: Trần Hưng Đạo
```
Action: Click card "Trần Hưng Đạo"
Expected:
- Navigate to /chat/tran-hung-dao
- Header shows "Trần Hưng Đạo • Đại Tướng Quân • Thế kỷ 13"
- Avatar màu đỏ (#DC2626)
- Welcome message: "Xin chào! Ta là Trần Hưng Đạo..."
- 3 suggested questions hiển thị
```

#### TC2: Hai Bà Trưng
```
Action: Click card "Hai Bà Trưng"
Expected:
- Navigate to /chat/hai-ba-trung
- Avatar màu tím (#7C3AED)
- Emoji 👑 hiển thị
```

#### TC3: Back Navigation
```
Action: Click nút back (ArrowLeft)
Expected:
- Navigate về trang Home
- Character cards vẫn hiển thị đầy đủ
```

---

### Scenario 3: Chat Functionality 💬

#### TC1: Send Simple Message
```
Steps:
1. Chọn nhân vật "Nguyễn Trãi"
2. Type: "Xin chào!"
3. Click Send hoặc Enter

Expected:
- User bubble hiển thị bên phải, màu blue
- Loading animation (3 dots bounce)
- AI response hiển thị bên trái
- Avatar Nguyễn Trãi bên cạnh message
- Audio icon Volume2 hiển thị
```

#### TC2: Audio Playback
```
Steps:
1. Sau khi AI trả lời
2. Quan sát audio tự động phát

Expected:
- Header hiện "Đang phát" với bars animation
- Audio indicator: 3 bars pulse
- Sau khi audio kết thúc, indicator biến mất
```

#### TC3: Manual Audio Play
```
Steps:
1. Click icon Volume2 trên message

Expected:
- Audio phát lại
- "Đang phát" hiển thị
```

#### TC4: Suggested Questions
```
Steps:
1. Click "Ngài có lời khuyên gì cho thế hệ trẻ?"

Expected:
- Message tự động gửi
- AI response về lời khuyên
```

#### TC5: New Conversation
```
Steps:
1. Chat vài tin nhắn
2. Click nút RefreshCw (reload icon)

Expected:
- Messages clear
- Chỉ còn welcome message
- Conversation ID mới được tạo
```

---

### Scenario 4: Responsive Chat (Mobile) 📱

**Device**: iPhone 12 (390x844)

**Test Steps**:
```
1. Toggle device toolbar
2. Select iPhone 12
3. Navigate to chat

Expected:
- Header compact, text truncate
- Messages có padding nhỏ hơn
- Suggested questions wrap
- Input textarea full width
- "Đang phát" text ẩn (chỉ còn icon bars)
```

---

### Scenario 5: Error Handling 🚨

#### TC1: Network Error
```
Steps:
1. Stop backend server (Ctrl+C)
2. Send message

Expected:
- Error message: "Xin lỗi, có lỗi xảy ra..."
- Message có class isError
- Không crash app
```

#### TC2: Invalid Character ID
```
Steps:
1. Navigate to /chat/invalid-id

Expected:
- Redirect về home page
- Console log error
```

---

### Scenario 6: Performance Testing ⚡

#### Load Time
```
Steps:
1. Hard refresh (Cmd+Shift+R)
2. Quan sát Network tab

Expected:
- First paint < 1s
- Full load < 2s
- No console errors
```

#### Animation Performance
```
Steps:
1. Hover qua lại nhiều cards
2. Quan sát FPS (Performance tab)

Expected:
- FPS > 50
- No janky animations
- Smooth transitions
```

---

## 🎨 Visual Regression Checklist

### Character Colors
- [ ] Trần Hưng Đạo: Red gradient
- [ ] Hai Bà Trưng: Purple gradient
- [ ] Nguyễn Trãi: Green gradient
- [ ] Lý Thường Kiệt: Blue gradient

### Hover States
- [ ] Cards: Scale + Glow + Sparkles
- [ ] Buttons: Gradient + Shimmer
- [ ] Icons: Rotate/Pulse

### Animations
- [ ] Fade in on page load
- [ ] Slide up with stagger delay
- [ ] Shimmer on button hover
- [ ] Ping on sparkles
- [ ] Bounce on loading dots
- [ ] Pulse on audio bars

---

## 🐛 Known Issues & Edge Cases

### Issue 1: Safari Audio Autoplay
**Problem**: Safari block autoplay audio  
**Solution**: User must interact first (click anywhere)  
**Workaround**: Show tooltip "Click anywhere to enable audio"

### Issue 2: Long Messages
**Problem**: Very long AI response overflow  
**Solution**: Add max-width + line-clamp  
**Status**: ✅ Fixed with line-clamp-3

### Issue 3: Mobile Keyboard
**Problem**: Keyboard pushes input out of view  
**Solution**: Auto-scroll to bottom when keyboard opens  
**Status**: ✅ Working with messagesEndRef

---

## 📊 Test Results Template

```markdown
## Test Session: [Date]
**Tester**: [Name]
**Browser**: Chrome 120
**Device**: MacBook Pro M1

### Scenarios Passed: 5/6
- ✅ Scenario 1: UI/UX Desktop
- ✅ Scenario 2: Navigation
- ✅ Scenario 3: Chat
- ⚠️ Scenario 4: Mobile (minor issue)
- ✅ Scenario 5: Error Handling
- ✅ Scenario 6: Performance

### Issues Found:
1. **Preview bubble position** - Slightly off-center on iPad
   - Severity: Low
   - Fix: Adjust left-1/2 transform

### Screenshots:
[Attach screenshots if needed]

### Notes:
- Audio quality tốt
- Animations mượt mà
- Responsive tốt trên hầu hết devices
```

---

## 🚀 Demo Preparation

### Pre-Demo Checklist (5 minutes trước)
```bash
# 1. Clear browser cache
Cmd+Shift+Delete

# 2. Restart servers
pkill node
pkill -f vite
cd backend && npm run dev
cd frontend && npm run dev

# 3. Test critical path
- Homepage load
- Click 1 character
- Send 1 message
- Hear audio

# 4. Prepare backup
- Have screenshots ready
- Record screen video (QuickTime)
```

### Demo Script (5 minutes)
```
[0:00] Intro
"Xin chào, tôi là [name], đây là EduVerse - ứng dụng chat AI với nhân vật lịch sử Việt Nam"

[0:30] Show Homepage
- Hover qua cards → sparkles, glow
- Explain: "4 nhân vật, mỗi người 1 màu sắc riêng"

[1:00] Click Trần Hưng Đạo
- Show suggested questions
- Click "Cuộc đời ngài như thế nào?"

[2:00] Wait for AI response
- Explain: "AI nhập vai, trả lời với văn phong cổ"
- Audio tự động phát

[3:00] Send custom question
- Type: "Ngài đánh bại Mông Cổ như thế nào?"
- Show response + audio

[4:00] Show mobile
- Toggle device view
- Show responsive design

[4:30] Conclusion
- Tech stack: React + OpenAI + TTS
- Future: Mini games, more characters
```

---

## 📝 Bug Report Template

```markdown
## 🐛 Bug Report

**Title**: [Short description]

**Severity**: 🔴 Critical / 🟡 Medium / 🟢 Low

**Environment**:
- Browser: Chrome 120
- OS: macOS Sonoma
- Screen: 1920x1080

**Steps to Reproduce**:
1. Navigate to ...
2. Click on ...
3. Observe ...

**Expected Behavior**:
[What should happen]

**Actual Behavior**:
[What actually happened]

**Screenshots**:
[Attach if relevant]

**Console Errors**:
```
[Paste console errors]
```

**Suggested Fix**:
[If you have an idea]
```

---

## ✅ Final Checklist Before Hackathon

### Functionality
- [ ] All 4 characters work
- [ ] Chat sends/receives
- [ ] Audio plays
- [ ] No console errors
- [ ] Backend API responds

### UI/UX
- [ ] All hover effects work
- [ ] Responsive on mobile
- [ ] Animations smooth
- [ ] Colors correct
- [ ] Typography legible

### Performance
- [ ] Load < 2s
- [ ] No lag on interactions
- [ ] Audio plays without delay

### Backup Plan
- [ ] Screenshots prepared
- [ ] Screen recording done
- [ ] Offline demo ready
- [ ] Fallback if API fails

---

**Good luck testing! 🚀**

**Nếu phát hiện bug, báo ngay để fix!** 🐛
