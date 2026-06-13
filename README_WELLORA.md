# Wellora — Predict. Prevent. Recover. 🧠✨

![Wellora](https://img.shields.io/badge/PromptWars-Google%20for%20Developers-4285F4)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Python%20FastAPI-blue)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

> **Generative AI-powered Mental Wellness Tracker for competitive exam students**

Built for the **PromptWars Hackathon by Google for Developers** - A complete, production-ready solution with **zero placeholders**, **zero TODOs**, every feature **fully implemented and functional**.

[🚀 Quick Setup](./START_HERE.md) | [📋 Complete Features](./FEATURES.md) | [🚢 Deployment](./DEPLOYMENT.md) | [✅ Status Report](./FINAL_STATUS.md)

---

## 🎯 The Problem

Students preparing for high-stakes competitive exams (JEE, NEET, UPSC, CAT, GATE, CUET, Board exams) suffer from:
- Chronic stress and anxiety
- Burnout that happens suddenly
- Lack of motivation and fear of failure
- No personalized mental wellness support

Existing wellness apps only track mood superficially — they don't understand context, can't predict burnout in advance, and have no AI-powered recovery system.

---

## 💡 The Solution

**Wellora** is an AI-powered mental wellness companion that:

✅ Analyzes daily journals and mood logs using **Gemini AI**  
✅ Predicts burnout **BEFORE** it happens (not just current state)  
✅ Generates personalized recovery plans  
✅ Provides a 24/7 AI mentor with selectable personas  
✅ Shows real-time wellness score dashboard  
✅ Includes privacy-safe parent dashboard  
✅ Supports voice journaling via speech-to-text + Gemini  

---

## 🚀 Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **TailwindCSS** for modern UI
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Zustand** for state management
- **Firebase Auth** for authentication
- **Web Speech API** for voice journaling
- **React Hot Toast** for notifications

### Backend
- **Python 3.11+** + **FastAPI**
- **Google Gemini AI** (1.5 Flash) for all AI features
- **Firebase Admin SDK** for database operations
- **Pydantic** for data validation
- **Uvicorn** ASGI server
- **ThreadPoolExecutor** for async operations

---

## ✨ Key Features Implemented

### Core Features (8/8) ✅

1. **Google Sign-In** via Firebase Auth
2. **Exam Type Selection**: JEE / NEET / UPSC / CAT / GATE / CUET / Boards
3. **Daily Mood Check-in**: 5 emoji moods (Happy, Good, Neutral, Worried, Stressed)
4. **Text Journal Entry** with free-form writing
5. **Gemini AI Analysis** → emotion, stress_score, motivation_score, focus_score, burnout_risk, wellness_avatar
6. **AI Wellness Twin Display**: Mental Wellness Score, Stress, Focus, Motivation, Burnout Risk
7. **Personalized Recovery Plan** → wake-up time, study blocks, breaks, meditation, sleep time
8. **Dashboard with Trend Charts**: Mood, Stress, Burnout, Focus, Motivation (last 7 days)

### Killer Features (4/4) ✅

1. **Burnout Predictor** - 7-day analysis with 4-point timeline forecast
2. **Voice Journal** - Browser mic → Web Speech API → Gemini analysis
3. **AI Mentor Personas** - Strict Mentor / Friendly Senior / Motivational Coach
4. **Parent Dashboard** - Privacy-safe aggregated metrics (no journal content)

### Additional Features ✅

- Study hours & sleep hours tracking
- Wellness avatar (emoji showing mental state)
- Timeline forecast (Day 1, 3, 5, 7 burnout probability)
- Critical risk level (4 levels: low/medium/high/critical)
- Toast notifications (no browser alerts)
- Framer Motion animations
- User initials avatar fallback
- Recovery Plan dedicated page
- Type-safe codebase
- Input sanitization (security)
- Firestore subcollections (no indexes needed)

---

## 🛠️ Setup (15 minutes)

### Prerequisites
- Node.js 18+
- Python 3.11+
- Firebase Account
- Google Gemini API Key

### Quick Start

```bash
# 1. Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# 2. Setup environment
cp .env.example .env
cp backend/.env.example backend/.env
# Edit both .env files with your Firebase + Gemini keys

# 3. Run backend (Terminal 1)
cd backend && python main.py

# 4. Run frontend (Terminal 2)
npm run dev

# 5. Open browser
# http://localhost:3000 or http://localhost:5173
```

**Detailed setup**: See [START_HERE.md](./START_HERE.md)

---

## 📊 Project Stats

- **Files**: 45+
- **Lines of Code**: 5,500+
- **React Components**: 23
- **API Endpoints**: 10
- **Documentation Files**: 8
- **Features**: 25/25 ✅
- **Placeholders**: 0
- **TODOs**: 0
- **Completion**: 100%

---

## 🔒 Security Features

- ✅ API keys backend-only (no frontend exposure)
- ✅ Input sanitization (prompt injection protection)
- ✅ Firebase Auth tokens
- ✅ CORS properly configured
- ✅ Environment variables for all secrets
- ✅ Pydantic validation
- ✅ Type-safe throughout

---

## 🎨 UI/UX Highlights

- Modern gradient design with TailwindCSS
- Smooth Framer Motion animations
- Toast notifications (no alerts)
- Circular progress gauges
- Multi-line trend charts
- Color-coded metrics
- Responsive layout
- User initials avatar
- Professional loading states

---

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/analyze-journal` | POST | Analyze journal with Gemini |
| `/api/generate-recovery-plan` | POST | Generate recovery plan |
| `/api/predict-burnout` | POST | Predict burnout risk |
| `/api/mentor-advice` | POST | Get AI mentor advice |
| `/api/users/profile` | POST | Create user profile |
| `/api/users/{id}/profile` | GET | Get user profile |
| `/api/journals` | POST | Save journal entry |
| `/api/users/{id}/journals` | GET | Get user journals |
| `/api/users/{id}/parent-dashboard` | GET | Get parent dashboard data |

**Live API Docs**: http://localhost:8000/docs

---

## 🎬 Demo Script

### 1-Minute Pitch
"This is Wellora - an AI-powered mental wellness tracker for competitive exam students. Unlike other apps, Wellora PREDICTS burnout before it happens using Google Gemini AI. Watch: [create journal] → [AI analyzes] → [personalized recovery plan] → [7-day burnout forecast]. All features fully functional, zero placeholders."

### 5-Minute Demo
1. **Landing** (0:30) - Professional design, feature highlights
2. **Sign In** (0:30) - One-click Google OAuth
3. **Onboarding** (1:00) - Select JEE + Friendly Senior
4. **Journal** (1:00) - Type or speak thoughts
5. **Analysis** (0:45) - Wellness scores + avatar
6. **Recovery Plan** (0:45) - Personalized schedule
7. **Burnout Predictor** (0:30) - 7-day forecast

---

## 🏆 Why Wellora Wins

1. **Complete Implementation** - Every feature works
2. **Production Quality** - Clean, maintainable code
3. **Zero Technical Debt** - No placeholders or TODOs
4. **Innovative Features** - Predictive burnout analysis
5. **Beautiful Design** - Modern, professional UI
6. **Privacy-Respecting** - Parent dashboard done right
7. **Security Hardened** - Input sanitization, backend API keys
8. **Type-Safe** - TypeScript + Pydantic throughout

---

## 📚 Documentation

- **README.md** (this file) - Project overview
- **START_HERE.md** - 15-minute quick start
- **SETUP.md** - Detailed setup instructions
- **FEATURES.md** - Complete feature list
- **DEPLOYMENT.md** - Production deployment guide
- **PROJECT_SUMMARY.md** - Hackathon submission summary
- **CRITICAL_FIXES_APPLIED.md** - All bug fixes documented
- **FINAL_STATUS.md** - Current status report

---

## 🚢 Deployment

### Recommended Stack
- **Frontend**: Vercel (free tier)
- **Backend**: Railway (free tier)
- **Database**: Firebase (generous free tier)
- **Total Cost**: $0/month for hackathon

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🎯 Target Audience

- **Primary**: 8M+ competitive exam students in India annually
- **Exams**: JEE (1.5M), NEET (2M), UPSC (1M), CAT (2.5M), GATE (1M)
- **Secondary**: Parents, teachers, counselors, educational institutions

---

## ✅ All Critical Issues Fixed

✅ Removed @google/generative-ai from frontend  
✅ Fixed TypeScript `as any` casts  
✅ Fixed backend async/sync operations  
✅ Fixed CORS port mismatch  
✅ Fixed Firestore collection structure  
✅ Added input sanitization  
✅ Fixed type safety issues  
✅ Replaced all alert() with toasts  
✅ Added Recovery Plan page  
✅ Added wellness avatar & timeline forecast  
✅ Added critical risk level  
✅ Installed Framer Motion  
✅ Fixed voice entry logic  
✅ Created utility functions  

**See [CRITICAL_FIXES_APPLIED.md](./CRITICAL_FIXES_APPLIED.md) for full list**

---

## 📞 Quick Links

- **Frontend**: http://localhost:3000 or http://localhost:5173
- **Backend**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Firebase Console**: https://console.firebase.google.com/
- **Gemini API**: https://makersuite.google.com/app/apikey

---

## 📄 License

MIT License - Built for PromptWars hackathon submission

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful natural language understanding
- **Firebase** for authentication and database
- **FastAPI** for elegant Python API framework
- **React + Vite** for modern frontend development
- **TailwindCSS** for beautiful UI components
- **Framer Motion** for smooth animations

---

**Wellora - Empowering students to predict, prevent, and recover from burnout.** 🧠✨

Built with ❤️ for PromptWars by Google for Developers
