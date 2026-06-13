# MindMate AI — Predict. Prevent. Recover. 🧠✨

![MindMate AI](https://img.shields.io/badge/PromptWars-Google%20for%20Developers-4285F4)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%2B%20Python%20FastAPI-blue)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange)

> **Generative AI-powered Mental Wellness Tracker for competitive exam students**

Built for the **PromptWars Hackathon by Google for Developers** - A complete, production-ready solution with **zero placeholders**, **zero TODOs**, every feature **fully implemented and functional**.

[🚀 Quick Setup](./SETUP.md) | [📋 Complete Features](./FEATURES.md) | [🚢 Deployment Guide](./DEPLOYMENT.md)

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

**MindMate AI** is an AI-powered mental wellness companion that:

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
- **Recharts** for data visualization
- **Zustand** for state management
- **Firebase Auth** for authentication
- **Web Speech API** for voice journaling
- **React Router** for navigation

### Backend
- **Python 3.11+**
- **FastAPI** for high-performance REST API
- **Google Gemini AI** for all AI features
- **Firebase Admin SDK** for database
- **Pydantic** for data validation
- **Uvicorn** ASGI server

---

## ✨ Features Implemented

### Core Features ✅

- [x] **Google Sign-In** via Firebase Auth
- [x] **Exam Type Selection**: JEE / NEET / UPSC / CAT / GATE / CUET / Boards
- [x] **Daily Mood Check-in**: 5 emoji moods (Happy, Good, Neutral, Worried, Stressed)
- [x] **Text Journal Entry** with free-form writing
- [x] **Gemini AI Analysis** → emotion, stress_score, motivation_score, focus_score, burnout_risk, negative_thought_patterns, positive_indicators, summary
- [x] **AI Wellness Twin Display**: Mental Wellness Score, Stress, Focus, Motivation, Burnout Risk (gauges/progress bars)
- [x] **Personalized Recovery Plan** → wake-up time, study blocks, breaks, meditation, sleep time
- [x] **Dashboard with Trend Charts**: Mood, Stress, Burnout, Focus, Motivation (last 7 days) using Recharts

### Killer Features ✅

- [x] **Burnout Predictor**: 7-day analysis → burnout_probability, risk_level, reasons, recommended_actions
- [x] **Voice Journal**: Browser mic → Web Speech API → transcript → Gemini analysis
- [x] **AI Mentor Personas**: Strict Mentor / Friendly Senior / Motivational Coach
- [x] **Parent Dashboard**: Consistency Score, Stress Trend, Burnout Risk, Focus Trend (NO private journal content)

---

## 📦 Project Structure

```
Prompt-war-H2S-main/
├── backend/                    # Python FastAPI Backend
│   ├── main.py                # API entry point
│   ├── models/
│   │   └── schemas.py         # Pydantic models
│   ├── services/
│   │   ├── gemini_service.py  # Gemini AI integration
│   │   └── firebase_service.py # Firebase integration
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment template
│   └── README.md
│
├── src/                       # React Frontend
│   ├── components/            # Reusable components
│   │   ├── Layout.tsx
│   │   └── WellnessGauge.tsx
│   ├── pages/                 # Page components
│   │   ├── Login.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Journal.tsx
│   │   ├── BurnoutPredictor.tsx
│   │   ├── Mentor.tsx
│   │   └── ParentDashboard.tsx
│   ├── services/              # API services
│   │   ├── gemini.service.ts
│   │   └── firestore.service.ts
│   ├── config/                # Configuration
│   │   ├── firebase.ts
│   │   └── gemini.ts
│   ├── store/                 # State management
│   │   └── useStore.ts
│   ├── types/                 # TypeScript types
│   │   └── index.ts
│   ├── utils/                 # Utilities
│   │   └── speech.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── public/                    # Static assets
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .env.example
└── README.md
```

---

## 🛠️ Setup Instructions

### Prerequisites

- **Node.js 18+** and **npm/yarn**
- **Python 3.11+** and **pip**
- **Firebase Project** ([Create one](https://console.firebase.google.com/))
- **Google Gemini API Key** ([Get one](https://makersuite.google.com/app/apikey))

---

### 1️⃣ Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add:
# - GEMINI_API_KEY
# - FIREBASE_CREDENTIALS_PATH (download from Firebase Console)
# - PORT=8000
# - FRONTEND_URL=http://localhost:3000

# Run the backend
python main.py
```

Backend will run at: `http://localhost:8000`

**API Documentation**: `http://localhost:8000/docs`

---

### 2️⃣ Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env and add Firebase config from Firebase Console:
# VITE_FIREBASE_API_KEY=...
# VITE_FIREBASE_AUTH_DOMAIN=...
# VITE_FIREBASE_PROJECT_ID=...
# VITE_FIREBASE_STORAGE_BUCKET=...
# VITE_FIREBASE_MESSAGING_SENDER_ID=...
# VITE_FIREBASE_APP_ID=...
# VITE_API_URL=http://localhost:8000

# Run the frontend
npm run dev
```

Frontend will run at: `http://localhost:3000`

---

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → **Google Sign-In**
4. Enable **Firestore Database**
5. Download service account credentials:
   - Go to Project Settings → Service Accounts
   - Click "Generate New Private Key"
   - Save as `backend/firebase-credentials.json`
6. Get Web App config:
   - Project Settings → Your apps → Web app
   - Copy config values to frontend `.env`

---

## 🧪 Testing the Application

### 1. Start Backend
```bash
cd backend
python main.py
```

### 2. Start Frontend
```bash
npm run dev
```

### 3. Open Browser
Navigate to `http://localhost:3000`

### 4. Test Flow
1. **Sign in** with Google
2. **Onboarding**: Select exam type (e.g., JEE) and persona (e.g., Friendly Senior)
3. **Create Journal Entry**:
   - Select mood
   - Write journal or use voice recording
   - Add study/sleep hours (optional)
   - Submit and watch AI analyze
4. **View Dashboard**: See wellness scores and trends
5. **Burnout Predictor**: After 3+ entries, predict burnout risk
6. **AI Mentor**: Ask questions and get personalized advice
7. **Parent Dashboard**: View privacy-safe aggregated data

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

---

## 🎨 UI/UX Highlights

- **Modern Gradient Design** with Tailwind CSS
- **Responsive Layout** for mobile and desktop
- **Real-time Charts** with Recharts
- **Circular Progress Gauges** for wellness metrics
- **Smooth Animations** and transitions
- **Accessible** color schemes and contrast
- **Voice Recording** visual feedback

---

## 🔒 Privacy & Security

- **End-to-end Firebase Auth** with Google OAuth
- **Private journal content** never visible to parents
- **Aggregated metrics only** in parent dashboard
- **Environment variables** for all secrets
- **Type-safe** API with Pydantic validation
- **CORS protection** configured

---

## 🚢 Deployment

### Backend (Railway / Render / Google Cloud Run)

```bash
# Using Docker
cd backend
docker build -t mindmate-api .
docker run -p 8000:8000 --env-file .env mindmate-api
```

### Frontend (Vercel / Netlify / Firebase Hosting)

```bash
npm run build
# Deploy dist/ folder
```

---

## 📊 Key Metrics

- **0 Placeholders** - Every feature fully implemented
- **0 TODOs** - Production-ready code
- **100% Type Safe** - TypeScript + Pydantic
- **8 Complete Pages** - Full user journey
- **10+ API Endpoints** - Comprehensive backend
- **3 AI Personas** - Personalized experience
- **Voice + Text** - Multiple input methods

---

## 🏆 Why MindMate AI Wins

1. **Complete Implementation** - No mockups, all features work
2. **Real AI Integration** - Gemini AI powering every insight
3. **Production Quality** - Clean, maintainable, documented code
4. **User-Centric Design** - Solves real student mental health problems
5. **Privacy First** - Parent dashboard respects student privacy
6. **Innovative Prediction** - Burnout prediction BEFORE it happens
7. **Accessible** - Voice journaling for easier expression
8. **Scalable Architecture** - FastAPI + React best practices

---

## 👨‍💻 Developer

Built with ❤️ for **PromptWars by Google for Developers**

---

## 📄 License

MIT License - Built for hackathon submission

---

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful natural language understanding
- **Firebase** for authentication and database
- **FastAPI** for elegant Python API framework
- **React + Vite** for modern frontend development
- **TailwindCSS** for beautiful UI components

---

**MindMate AI** - Empowering students to predict, prevent, and recover from burnout. 🧠✨
