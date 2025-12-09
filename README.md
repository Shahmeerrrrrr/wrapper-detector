# WrapperDetector

Detect if websites are LLM/GPT wrappers using AI analysis.

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# 1. Set environment variables
cp .env.docker.example .env
# Edit .env and add your AI_API_KEY

# 2. Build and run
docker-compose up --build

# 3. Access
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
```

See [DOCKER.md](./DOCKER.md) for detailed Docker instructions.

### Option 2: Local Development

```bash
# Backend
cd back
npm install
# Create .env with AI_API_KEY=your_key
npm start

# Frontend (new terminal)
cd web
npm install
npm run dev
```

See [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for detailed testing instructions.

## 📁 Project Structure

```
67-wrappers/
├── back/              # Node.js + Express backend
│   ├── index.js      # Main server file
│   ├── prompt.txt    # AI prompt template
│   └── Dockerfile    # Backend Docker image
├── web/              # React + Vite frontend
│   ├── src/          # Source files
│   └── Dockerfile    # Frontend Docker image
├── docker-compose.yml # Docker orchestration
└── .env              # Environment variables
```

## 🔧 Configuration

### Environment Variables

**Backend** (`back/.env`):
```env
AI_API_KEY=your_groq_api_key_here
PORT=8000
```

**Frontend** (`web/.env` or root `.env` for Docker):
```env
VITE_API_URL=http://localhost:8000
```

## 📚 Documentation

- [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) - Local testing guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment instructions
- [DOCKER.md](./DOCKER.md) - Docker setup and usage

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, Groq SDK
- **AI**: Groq API (Llama models)
- **Containerization**: Docker, Docker Compose

## 📝 Features

- ✅ AI-powered website analysis
- ✅ Real-time URL checking
- ✅ Typewriter effect for AI responses
- ✅ Beautiful, responsive UI
- ✅ Docker support
- ✅ Health checks
- ✅ Error handling

## 🚢 Deployment

### 🚀 Deploy to Vercel (Recommended)
**Step-by-step guide**: See [DEPLOY_VERCEL_STEP_BY_STEP.md](./DEPLOY_VERCEL_STEP_BY_STEP.md)

**Quick Summary:**
1. Deploy backend to Railway (5 min)
2. Deploy frontend to Vercel (5 min)
3. Add your custom domain (optional)

### Other Guides
- [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - Quick reference
- [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) - Detailed guide
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Alternative options

**Recommended Setup:**
- **Frontend**: Vercel (Free) ✅
- **Backend**: Railway (Free tier) ✅
- **Domain**: Your custom domain ✅

## 📄 License

ISC

