# 🌐 Hướng Dẫn Push Lên GitHub

## 📋 Prerequisites
- [ ] Đã có tài khoản GitHub
- [ ] Git đã được cài đặt
- [ ] Project đã được init (✅ Done)

---

## 🚀 Cách 1: Tạo Repository Mới Trên GitHub

### Bước 1: Tạo Repository
1. Vào https://github.com/new
2. Repository name: `EduVerse` hoặc `eduverse-hackathon`
3. Description: `AI Avatar Lịch Sử Việt Nam - Hackathon 2025`
4. Chọn **Public** (hoặc Private nếu muốn)
5. ⚠️ **KHÔNG** check "Add README" (vì đã có sẵn)
6. Click **Create repository**

### Bước 2: Connect Local với GitHub
```bash
cd /Users/phamgiakhoi/Hackathon/EduVerse

# Thêm remote origin
git remote add origin https://github.com/YOUR_USERNAME/EduVerse.git

# Kiểm tra remote
git remote -v
```

### Bước 3: Push Code Lên GitHub
```bash
# Push main branch
git checkout main
git push -u origin main

# Push develop branch
git checkout develop
git push -u origin develop

# Hoặc push tất cả branches
git push --all origin
```

### Bước 4: Set Develop as Default Branch (Optional)
1. Vào repository trên GitHub
2. Settings > Branches
3. Default branch > Switch to `develop`
4. Update default branch

---

## 🔐 Cách 2: Sử Dụng SSH (Recommended for Team)

### Setup SSH Key
```bash
# Generate SSH key (nếu chưa có)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Start ssh-agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
# Copy output và paste vào GitHub Settings > SSH Keys
```

### Push với SSH
```bash
# Thêm remote với SSH
git remote add origin git@github.com:YOUR_USERNAME/EduVerse.git

# Push
git push -u origin main
git push -u origin develop
```

---

## 👥 Setup Cho Team Members

### Clone Repository
```bash
# HTTPS
git clone https://github.com/YOUR_USERNAME/EduVerse.git
cd EduVerse

# SSH (recommended)
git clone git@github.com:YOUR_USERNAME/EduVerse.git
cd EduVerse
```

### Setup Development
```bash
# Install backend dependencies
cd backend
npm install
cp .env.example .env
# Thêm OPENAI_API_KEY

# Install frontend dependencies
cd ../frontend
npm install
```

### Create Feature Branch
```bash
# Checkout develop
git checkout develop

# Create your feature branch
git checkout -b feature/your-name
```

---

## 📝 Git Commands Reference

### Daily Workflow
```bash
# Pull latest changes
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature

# Work on code...

# Stage changes
git add .

# Commit
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature
```

### Create Pull Request
1. Vào GitHub repository
2. Click "Compare & pull request"
3. Base: `develop` ← Compare: `feature/your-feature`
4. Viết description
5. Request review
6. Wait for approval và merge

### After Merge
```bash
# Switch back to develop
git checkout develop

# Pull latest
git pull origin develop

# Delete feature branch
git branch -d feature/your-feature

# Delete remote branch (if needed)
git push origin --delete feature/your-feature
```

---

## 🔒 Important Files to Keep Secret

### ⚠️ NEVER Commit These Files:
- `backend/.env` - Contains API keys
- `node_modules/` - Dependencies (huge)
- `backend/audio/*.mp3` - Generated files
- `backend/data/history.json` - User data

### Already Protected by .gitignore ✅
```
node_modules/
.env
.env.local
backend/audio/*.mp3
backend/data/history.json
*.db
*.sqlite
```

---

## 📦 Repository Settings

### Recommended Settings
1. **Branch Protection Rules** (develop & main)
   - ✅ Require pull request before merging
   - ✅ Require approvals (1 approval)
   - ✅ Dismiss stale reviews
   - ✅ Require status checks to pass

2. **Collaborators**
   - Add team members
   - Set role: Write access

3. **Issues & Projects**
   - Enable Issues
   - Create Project board
   - Add labels: bug, feature, enhancement

---

## 🏷️ GitHub Labels Suggestion

```
bug          - 🐛 Something isn't working
feature      - ✨ New feature
enhancement  - 💡 Improvement
documentation - 📝 Documentation
backend      - 🔧 Backend related
frontend     - 🎨 Frontend related
priority-high - ⚠️ High priority
help-wanted  - 🙋 Help needed
```

---

## 🎯 Quick Commands Cheatsheet

```bash
# Check status
git status

# View branches
git branch -a

# Switch branch
git checkout branch-name

# Pull latest
git pull origin develop

# Push changes
git push origin your-branch

# View log
git log --oneline --graph

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Stash changes
git stash
git stash pop
```

---

## 🔗 Example Repository URLs

Replace `YOUR_USERNAME` with your actual GitHub username:

**HTTPS:**
```
https://github.com/YOUR_USERNAME/EduVerse.git
```

**SSH:**
```
git@github.com:YOUR_USERNAME/EduVerse.git
```

**Repository Page:**
```
https://github.com/YOUR_USERNAME/EduVerse
```

---

## ✅ Verification Checklist

Sau khi push, verify:
- [ ] Code đã lên GitHub
- [ ] README.md hiển thị đẹp
- [ ] Both main & develop branches exist
- [ ] .gitignore working (no node_modules)
- [ ] Team members có thể clone
- [ ] CI/CD setup (optional)

---

## 🎉 Next Steps

1. Share repository URL với team
2. Add team members as collaborators
3. Create issues cho tasks
4. Setup project board
5. Start coding!

---

Good luck! 🚀
