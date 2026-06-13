# 🚀 Quick Setup Guide for MindMate AI

## Step 1: Get API Keys

### Google Gemini API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key (starts with `AIza...`)

### Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it "mindmate-ai" and create

## Step 2: Configure Firebase

### Enable Authentication
1. In Firebase Console, go to **Build** → **Authentication**
2. Click "Get Started"
3. Enable **Google** sign-in provider
4. Save

### Enable Firestore
1. Go to **Build** → **Firestore Database**
2. Click "Create Database"
3. Select "Start in **test mode**" (for development)
4. Choose a location and create

### Get Firebase Web Config
1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click "Web" icon (`</>`)
4. Register app with nickname "MindMate Web"
5. Copy the config object values

### Get Firebase Admin Credentials
1. Still in **Project Settings**
2. Go to **Service Accounts** tab
3. Click "Generate New Private Key"
4. Save the JSON file as `backend/firebase-credentials.json`

## Step 3: Backend Setup

```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
GEMINI_API_KEY=AIza...your_gemini_key_here
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
PORT=8000
FRONTEND_URL=http://localhost:3000
```

## Step 4: Frontend Setup

```bash
# Go back to root directory
cd ..

# Install Node dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env` with Firebase config from Step 2:
```env
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=mindmate-ai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mindmate-ai
VITE_FIREBASE_STORAGE_BUCKET=mindmate-ai.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_API_URL=http://localhost:8000
```

## Step 5: Run the Application

### Terminal 1 - Backend
```bash
cd backend
python main.py
```

You should see:
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Terminal 2 - Frontend
```bash
npm run dev
```

You should see:
```
VITE v5.3.4  ready in 500 ms

➜  Local:   http://localhost:3000/
```

## Step 6: Test the Application

1. Open browser: `http://localhost:3000`
2. Click "Continue with Google"
3. Sign in with your Google account
4. Complete onboarding:
   - Select exam type (e.g., JEE)
   - Choose persona (e.g., Friendly Senior)
   - Optionally add parent email
5. Create your first journal entry
6. Explore all features!

## ✅ Checklist

- [ ] Gemini API key obtained
- [ ] Firebase project created
- [ ] Google sign-in enabled in Firebase
- [ ] Firestore database created
- [ ] Firebase web config copied to `.env`
- [ ] Firebase admin credentials downloaded
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Backend dependencies installed (`pip install -r requirements.txt`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend running on port 8000
- [ ] Frontend running on port 3000
- [ ] Successfully signed in with Google

## 🆘 Troubleshooting

### Backend won't start
- Check `GEMINI_API_KEY` is correct in `backend/.env`
- Verify `firebase-credentials.json` exists in `backend/` folder
- Try: `pip install --upgrade -r requirements.txt`

### Frontend won't connect to backend
- Ensure backend is running first
- Check `VITE_API_URL=http://localhost:8000` in `.env`
- Clear browser cache and reload

### Firebase authentication fails
- Verify all Firebase config values in `.env`
- Check Google sign-in is enabled in Firebase Console
- Make sure you're using the correct Firebase project

### Gemini API errors
- Verify API key is valid
- Check you have Gemini API enabled in Google Cloud Console
- Ensure you have billing enabled (free tier available)

## 🎉 Success!

If everything works, you should see:
1. Login page with Google sign-in
2. Onboarding flow
3. Dashboard with empty state
4. Ability to create journal entries
5. AI analysis returning wellness scores
6. All charts and visualizations working

**You're ready to predict, prevent, and recover from burnout!** 🧠✨
