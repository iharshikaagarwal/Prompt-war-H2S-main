# 🎬 START HERE - MindMate AI Quick Start

Welcome to **MindMate AI**! This guide will get you up and running in **under 15 minutes**.

---

## 📋 What You Need

Before starting, gather these:

1. **Google Gemini API Key** ([Get it here](https://makersuite.google.com/app/apikey))
2. **Firebase Project** (we'll create this together)
3. **Node.js 18+** installed
4. **Python 3.11+** installed
5. **10-15 minutes** of your time

---

## 🚀 Super Quick Start (For the Impatient)

```bash
# 1. Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# 2. Create .env files (then edit them with your keys)
cp .env.example .env
cp backend/.env.example backend/.env

# 3. Start backend (Terminal 1)
cd backend && python main.py

# 4. Start frontend (Terminal 2)
npm run dev

# Open http://localhost:3000 🎉
```

**But wait!** You need to configure Firebase and Gemini first. Keep reading...

---

## 📝 Step-by-Step Setup

### Step 1: Get Google Gemini API Key (2 minutes)

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **"Create API Key"**
3. Copy the key (starts with `AIza...`)
4. Save it somewhere safe

---

### Step 2: Create Firebase Project (5 minutes)

1. **Go to [Firebase Console](https://console.firebase.google.com/)**

2. **Click "Add Project"**
   - Name: `mindmate-ai`
   - Enable Google Analytics: Optional
   - Click "Create Project"

3. **Enable Authentication**
   - In left sidebar: Build → **Authentication**
   - Click "Get Started"
   - Enable **Google** sign-in provider
   - Add your email as a test user
   - Click "Save"

4. **Enable Firestore Database**
   - In left sidebar: Build → **Firestore Database**
   - Click "Create Database"
   - Select **"Start in test mode"** (for development)
   - Choose your nearest location
   - Click "Enable"

5. **Get Web App Config**
   - Click the gear icon ⚙️ → **Project Settings**
   - Scroll to "Your apps"
   - Click the **Web** icon (`</>`)
   - Register app nickname: `MindMate Web`
   - Copy the config object (we'll use it in Step 4)

6. **Download Admin Credentials**
   - Still in Project Settings
   - Go to **Service Accounts** tab
   - Click **"Generate New Private Key"**
   - Save the JSON file
   - Rename it to `firebase-credentials.json`
   - Move it to the `backend/` folder

---

### Step 3: Install Dependencies (3 minutes)

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
pip install -r requirements.txt
cd ..
```

---

### Step 4: Configure Environment Variables (3 minutes)

#### Backend Configuration

Edit `backend/.env`:

```env
GEMINI_API_KEY=AIza...your_gemini_key_from_step_1
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
PORT=8000
FRONTEND_URL=http://localhost:3000
```

#### Frontend Configuration

Edit `.env` (root directory):

```env
# Copy these from Firebase Console (Step 2, sub-step 5)
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=mindmate-ai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mindmate-ai
VITE_FIREBASE_STORAGE_BUCKET=mindmate-ai.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123

# This stays the same
VITE_API_URL=http://localhost:8000
```

---

### Step 5: Run the Application (2 minutes)

**Terminal 1 - Start Backend:**
```bash
cd backend
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

You should see:
```
➜  Local:   http://localhost:3000/
```

---

### Step 6: Test It Out! (5 minutes)

1. **Open browser**: http://localhost:3000

2. **Sign in with Google**
   - Click "Continue with Google"
   - Select your Google account
   - Allow permissions

3. **Complete Onboarding**
   - **Step 1**: Select exam (e.g., JEE)
   - **Step 2**: Choose persona (e.g., Friendly Senior)
   - **Step 3**: Optionally add parent email
   - Click "Complete Setup"

4. **Create Your First Journal**
   - Select a mood (e.g., 🙂 Good)
   - Write something like: "Today I studied physics for 6 hours. Feeling a bit tired but motivated to continue. Exam is in 3 months."
   - Add study hours: 6
   - Add sleep hours: 7
   - Click "Submit & Get AI Analysis"

5. **Watch the Magic** ✨
   - AI analyzes your journal in ~5 seconds
   - You get wellness scores
   - Personalized recovery plan generated
   - View your dashboard

---

## 🎯 Quick Feature Tour

### Dashboard
- View your wellness score
- See trend charts (after 3+ entries)
- Check your streak

### Voice Journaling
- Click the microphone icon
- Speak your thoughts
- Watch it transcribe in real-time
- Submit for AI analysis

### Burnout Predictor
- Create 3+ journal entries
- Go to "Burnout Predictor"
- Click "Analyze Burnout Risk"
- Get prediction with reasons and actions

### AI Mentor
- Go to "AI Mentor"
- Ask questions like "How do I deal with exam stress?"
- Get personalized advice based on your persona

### Parent Dashboard
- View aggregated metrics
- No private journal content visible
- See stress and focus trends

---

## 🆘 Troubleshooting

### Backend won't start
**Error**: `ModuleNotFoundError: No module named 'fastapi'`
- **Fix**: Run `pip install -r requirements.txt` again

**Error**: `GEMINI_API_KEY not found`
- **Fix**: Check `backend/.env` file exists and has the correct key

**Error**: Firebase credentials error
- **Fix**: Ensure `firebase-credentials.json` is in the `backend/` folder

### Frontend won't start
**Error**: `Cannot find module`
- **Fix**: Run `npm install` again

**Error**: Vite config error
- **Fix**: Make sure you're in the root directory (not inside `backend/`)

### Authentication fails
**Error**: Firebase auth domain error
- **Fix**: Check all `VITE_FIREBASE_*` variables in `.env` are correct
- Go to Firebase Console → Authentication → Settings → Authorized domains
- Make sure `localhost` is in the list

### AI Analysis fails
**Error**: 500 error when submitting journal
- **Fix**: Check backend terminal for error logs
- Verify `GEMINI_API_KEY` is valid
- Try the API key in [AI Studio](https://makersuite.google.com/app/prompts/new_chat) first

### Voice recording not working
**Issue**: Microphone button doesn't work
- **Fix**: Use Chrome or Edge browser (Safari has limited support)
- Allow microphone permissions when prompted
- Check browser console for errors

---

## 📚 What to Explore Next

- **[FEATURES.md](./FEATURES.md)** - Complete feature documentation
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy to production
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Hackathon submission details
- **API Docs** - http://localhost:8000/docs (when backend is running)

---

## 🎉 Success Criteria

You know everything is working when:

✅ You can sign in with Google  
✅ Dashboard loads without errors  
✅ Journal submission works  
✅ AI analysis returns scores  
✅ Charts display properly  
✅ All navigation links work  

---

## 💡 Pro Tips

1. **Create multiple entries** to see charts populate
2. **Try voice journaling** for a unique experience
3. **Switch personas** in settings to see different AI responses
4. **Check parent dashboard** to see privacy features
5. **Test burnout predictor** after 3+ entries

---

## 🤝 Need Help?

- Check the **[SETUP.md](./SETUP.md)** for detailed instructions
- View **backend logs** in Terminal 1 for API errors
- View **browser console** (F12) for frontend errors
- Check **Firebase Console** for auth/database issues

---

## 🎬 Demo Script (For Presentations)

**1 Minute Version:**
"This is MindMate AI. It uses Google Gemini to analyze student journals, predict burnout before it happens, and generate personalized recovery plans. Watch: [create journal] → [AI analyzes] → [shows wellness scores] → [recovery plan]. All fully functional, zero placeholders."

**5 Minute Version:**
- Start: Landing page tour
- Sign in with Google (live)
- Onboarding: Select JEE + Friendly Senior
- Dashboard: Show empty state
- Create journal: Type or voice
- AI analysis: Show scores
- Recovery plan: Personalized schedule
- Burnout predictor: Explain prediction
- AI Mentor: Ask a question
- Parent dashboard: Privacy features

---

## 🚀 You're Ready!

You now have a fully functional AI-powered mental wellness tracker running locally!

**Next Steps:**
- Create a few journal entries to populate data
- Test all features
- Explore the codebase
- Deploy to production (see DEPLOYMENT.md)

**Remember:** This is a complete, production-ready application with:
- ✅ Zero placeholders
- ✅ Zero TODOs
- ✅ All features working
- ✅ Beautiful UI/UX
- ✅ Comprehensive documentation

---

**Happy coding! 🧠✨**

*MindMate AI - Predict. Prevent. Recover.*
