# 📋 CHANGELOG - EduVerse

## [v2.0.0] - 8/11/2025 - UI/UX Major Update 🎨

### ✨ New Features

#### 🎭 Character Avatars
- Thêm emoji avatar cho mỗi nhân vật:
  - ⚔️ Trần Hưng Đạo (kiếm)
  - 👑 Hai Bà Trưng (vương miện)
  - 📜 Nguyễn Trãi (cuộn giấy)
  - 🛡️ Lý Thường Kiệt (khiên)

#### 💬 Preview Quotes
- Mỗi nhân vật có câu nói iconic:
  - "Hỡi tướng sĩ! Giặc đến đây là đến chỗ chết!" - Trần Hưng Đạo
  - "Đàn bà lập nghiệp, huống chi đàn ông!" - Hai Bà Trưng
  - "Nhân nghĩa chi sư, vương giả chi lược!" - Nguyễn Trãi
  - "Nam Quốc Sơn Hà, Nam Đế Cư!" - Lý Thường Kiệt
- Preview bubble hiện khi hover (desktop)
- Preview inline trên mobile

#### 🎙️ Voice Preview Badge
- Badge "Giọng nói AI" với icon Volume2
- Animate pulse effect
- Backdrop blur hiệu ứng

### 🎨 UI/UX Improvements

#### CharacterCard Component
- **Hover Effects**:
  - Scale từ 1.0 → 1.05
  - Translate lên -12px
  - Glow effect với màu của nhân vật
  - Border ring 3px
  - Shadow tăng lên 50px

- **Sparkle Animations**:
  - 3 sparkle particles xuất hiện khi hover
  - Animation ping với delay khác nhau
  - Positioned ở các góc card

- **Avatar Section**:
  - Emoji size 7xl (112px)
  - Rotate 6° + scale 1.25 khi hover
  - Gradient background theo màu nhân vật
  - Drop shadow effect

- **CTA Button**:
  - Gradient background theo màu nhân vật khi hover
  - Shimmer animation (sóng ánh sáng)
  - Scale 1.05 khi hover
  - Icon rotate và sparkle fade in

#### Home Page
- **Responsive Breakpoints**:
  - Mobile (<640px): 1 column, text nhỏ hơn
  - Tablet (640-1024px): 2 columns
  - Desktop (>1024px): 4 columns

- **Hero Section**:
  - Adaptive text sizes (3xl → 6xl)
  - Badge responsive padding
  - Avatar indicators với size adaptive

- **Features Grid**:
  - 1 column mobile → 3 columns desktop
  - Hover scale 1.05
  - Card shadow transition

#### Chat Page
- **Header Responsive**:
  - Compact padding trên mobile
  - Truncate text cho tên dài
  - Hide text "Đang phát" trên mobile nhỏ

- **Messages**:
  - Padding adaptive (3-4 → 4-6)
  - Suggested questions wrap tốt hơn
  - Scale animation khi hover suggestion

### 🎯 CSS Enhancements

#### New Animations
```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

#### Animation Delay Utilities
- `.animation-delay-200` - 0.2s delay
- `.animation-delay-400` - 0.4s delay

#### Responsive Classes
- Mobile-first breakpoints
- Adaptive padding/margin
- Flexible font sizing

### 🔧 Backend Updates

#### Character Data Schema
```javascript
{
  id: string,
  name: string,
  title: string,
  era: string,
  description: string,
  avatar: string, // emoji
  previewQuote: string, // NEW
  voicePreview: boolean, // NEW
  systemPrompt: string,
  color: string
}
```

### 📱 Mobile Optimization

#### Tested Breakpoints
- ✅ iPhone SE (375px)
- ✅ iPhone 12/13 (390px)
- ✅ iPhone 14 Pro Max (430px)
- ✅ iPad Mini (768px)
- ✅ iPad Pro (1024px)

#### Mobile Features
- Touch-friendly button sizes (min 44x44px)
- Inline preview quotes
- Adaptive spacing
- Fast hover states removal
- Smooth scrolling

### 🎭 Design Tokens

#### Colors by Character
- Red (#DC2626): Trần Hưng Đạo - Chiến binh
- Purple (#7C3AED): Hai Bà Trưng - Nữ tướng
- Green (#059669): Nguyễn Trãi - Nhà thơ
- Blue (#2563EB): Lý Thường Kiệt - Thái úy

### 📚 Documentation Added
- `FEATURE_IDEAS.md` - 10 ý tưởng mở rộng
- `CHANGELOG.md` - File này

---

## [v1.0.0] - 7/11/2025 - Initial Release 🚀

### Features
- ✅ Chat AI với 4 nhân vật lịch sử
- ✅ Text-to-Speech tiếng Việt
- ✅ Conversation history
- ✅ Responsive UI
- ✅ Backend API với Express
- ✅ Frontend với React + Vite + TailwindCSS
- ✅ Git workflow & documentation
- ✅ GitHub repository setup

### Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, React Router, Axios
- **Backend**: Node.js (ESM), Express, OpenAI, gTTS
- **DevOps**: Git, GitHub, nodemon

---

## 🎯 Upcoming Features (Roadmap)

### v2.1.0 - Quiz System
- [ ] Mini game lịch sử
- [ ] Multiple choice questions
- [ ] Score tracking

### v2.2.0 - Gamification
- [ ] Achievement badges
- [ ] Points system
- [ ] User levels

### v3.0.0 - Advanced Features
- [ ] Timeline map
- [ ] Voice input
- [ ] More characters
- [ ] Analytics dashboard

---

**Last Updated**: 8/11/2025  
**Version**: 2.0.0  
**Status**: ✅ Production Ready
