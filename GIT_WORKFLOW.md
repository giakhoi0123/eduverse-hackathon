# Git Workflow cho Team

## 🌿 Branch Strategy

```
main (production)
  └── develop (development)
       ├── feature/backend-api
       ├── feature/frontend-ui
       └── feature/integration
```

## 📋 Quy trình làm việc

### 1. Clone repository lần đầu

```bash
git clone <repository-url>
cd EduVerse
```

### 2. Tạo branch mới cho feature

```bash
# Checkout develop branch
git checkout develop
git pull origin develop

# Tạo branch mới
git checkout -b feature/your-feature-name
```

**Naming convention:**
- `feature/backend-openai` - Backend features
- `feature/frontend-chat-ui` - Frontend features
- `feature/integration-audio` - Integration work
- `bugfix/fix-audio-playback` - Bug fixes
- `hotfix/critical-issue` - Critical fixes

### 3. Làm việc trên branch

```bash
# Kiểm tra thay đổi
git status

# Add files
git add .

# Hoặc add từng file
git add backend/server.js
git add frontend/src/App.jsx

# Commit với message rõ ràng
git commit -m "feat: add OpenAI integration"
```

### 4. Push lên remote

```bash
git push origin feature/your-feature-name
```

### 5. Tạo Pull Request

1. Vào GitHub repository
2. Click "Compare & pull request"
3. Base: `develop` ← Compare: `feature/your-feature-name`
4. Viết mô tả rõ ràng
5. Request review từ teammate
6. Wait for approval và merge

### 6. Sync với develop

```bash
# Về develop branch
git checkout develop
git pull origin develop

# Xóa branch cũ (nếu đã merge)
git branch -d feature/your-feature-name
```

## 💬 Commit Message Convention

Sử dụng format:
```
<type>(<scope>): <subject>

<body>
```

**Types:**
- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Cập nhật documentation
- `style`: Format code, không ảnh hưởng logic
- `refactor`: Refactor code
- `test`: Thêm tests
- `chore`: Cập nhật build, dependencies

**Examples:**
```bash
git commit -m "feat(backend): add OpenAI GPT integration"
git commit -m "fix(frontend): resolve audio playback issue"
git commit -m "docs: update README with setup instructions"
git commit -m "style(frontend): format code with prettier"
```

## 🔄 Sync với team

### Pull latest changes

```bash
# On your feature branch
git checkout feature/your-feature
git pull origin develop
```

### Resolve conflicts

```bash
# If conflicts occur
git status  # See conflicted files
# Edit files to resolve conflicts
git add .
git commit -m "merge: resolve conflicts with develop"
```

## 🚨 Important Rules

1. **NEVER commit directly to `main` or `develop`**
2. **ALWAYS create a feature branch**
3. **Pull latest `develop` before starting work**
4. **Write clear commit messages**
5. **Request code review before merging**
6. **Test your code before pushing**
7. **Keep commits small and focused**

## 🛠️ Useful Commands

```bash
# See all branches
git branch -a

# Switch branch
git checkout branch-name

# Delete local branch
git branch -d branch-name

# Delete remote branch
git push origin --delete branch-name

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# See commit history
git log --oneline --graph

# Stash changes
git stash
git stash pop
```

## 📦 First Time Setup

```bash
# Set your identity
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# Enable color
git config --global color.ui auto
```

## 🎯 Daily Workflow Example

```bash
# Morning - Start work
git checkout develop
git pull origin develop
git checkout -b feature/my-new-feature

# During the day - Commit progress
git add .
git commit -m "feat: implement feature X"
git push origin feature/my-new-feature

# End of day - Create PR
# Go to GitHub and create Pull Request

# Next day - Continue work
git checkout feature/my-new-feature
git pull origin develop  # Sync with latest
# Continue working...
```

---

Happy coding! 🚀
