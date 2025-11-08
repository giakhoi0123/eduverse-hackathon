# Frontend - EduVerse Web App

## 🎯 Mục đích
Web application cho EduVerse - giao diện trò chuyện với AI historical characters.

## 📦 Cài đặt
```bash
npm install
```

## 🚀 Chạy
```bash
# Development
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

App chạy tại: **http://localhost:5173**

## 📁 Cấu trúc
```
frontend/
├── src/
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global styles
│   ├── pages/
│   │   ├── Home.jsx         # Landing page
│   │   └── Chat.jsx         # Chat interface
│   ├── components/
│   │   ├── CharacterCard.jsx    # Character selection
│   │   ├── ChatBubble.jsx       # Message bubble
│   │   ├── Avatar.jsx           # Character avatar
│   │   └── MessageInput.jsx     # Input field
│   └── services/
│       └── api.js           # API integration
├── index.html
└── vite.config.js
```

## 🎨 Tech Stack
- **React 18** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons

## 🎯 Pages

### Home (`/`)
- Giới thiệu EduVerse
- Danh sách 4 nhân vật lịch sử
- Features overview

### Chat (`/chat/:characterId`)
- Chat interface
- Real-time messaging
- Audio playback
- Conversation history

## 🎨 Components

### CharacterCard
Display character info với avatar và description
```jsx
<CharacterCard character={character} onSelect={handleSelect} />
```

### ChatBubble
Message bubble cho user và AI
```jsx
<ChatBubble message={message} character={character} />
```

### Avatar
Character avatar với color coding
```jsx
<Avatar character={character} size="md" />
```

### MessageInput
Input field với submit button
```jsx
<MessageInput onSend={handleSend} disabled={loading} />
```

## 🔧 Configuration

### Vite Config
Proxy setup cho API calls:
```js
proxy: {
  '/api': 'http://localhost:5000',
  '/audio': 'http://localhost:5000'
}
```

### TailwindCSS
Custom colors và components trong `index.css`

## 🌐 API Integration
```js
import { getCharacters, sendMessage } from './services/api';

// Get characters
const characters = await getCharacters();

// Send message
const response = await sendMessage({
  message: 'Xin chào',
  characterId: 'tran-hung-dao'
});
```

## 🎨 Styling
TailwindCSS với custom classes:
- `.btn` - Button base
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.card` - Card container

## 📱 Responsive
Fully responsive design:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 4 columns

## 🧪 Build
```bash
npm run build
# Output: dist/
```

## 🚀 Deploy
Build output có thể deploy lên:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting
