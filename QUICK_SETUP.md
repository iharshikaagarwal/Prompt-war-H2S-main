# 🚀 QUICK SETUP - Get Running in 5 Minutes!

## ✅ Frontend Config (DONE!)

Your `.env` file has been created with Firebase config. You're all set for the frontend!

---

## 🔐 Backend Credentials (2 minutes)

You need to download ONE file from Firebase Console:

### Step-by-Step:

1. **Open this link**: https://console.firebase.google.com/project/wellora-h/settings/serviceaccounts/adminsdk

2. **Click "Generate new private key"**

3. **Click "Generate key"** in the popup

4. **A file will download** (named something like `wellora-h-firebase-adminsdk-xxxxx.json`)

5. **Rename it to**: `firebase-credentials.json`

6. **Move it here**: `backend/firebase-credentials.json`
   - Drag it into the `backend` folder in your project

---

## 🤖 Gemini API Key (1 minute)

1. **Open this link**: https://makersuite.google.com/app/apikey

2. **Click "Create API Key"**

3. **Copy the key** (starts with `AIza...`)

4. **Create `backend/.env`** file:
   ```bash
   cd backend
   nano .env
   ```

5. **Paste this** (replace `your_key_here` with your actual key):
   ```env
   GEMINI_API_KEY=your_key_here
   FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
   PORT=8000
   FRONTEND_URL=http://localhost:3000
   ```

6. **Save**: Press `Ctrl+O`, then `Enter`, then `Ctrl+X`

---

## 🔥 Enable Firebase Services (2 minutes)

### Enable Google Sign-In:
1. Go to: https://console.firebase.google.com/project/wellora-h/authentication/providers
2. Click on **"Google"**
3. Toggle **"Enable"**
4. Add support email (your email)
5. Click **"Save"**

### Enable Firestore:
1. Go to: https://console.firebase.google.com/project/wellora-h/firestore
2. Click **"Create database"**
3. Choose **"Start in test mode"**
4. Select location (e.g., `us-central`)
5. Click **"Enable"**

---

## 🏃 Run the App!

```bash
# Terminal 1 - Backend
cd backend
pip install -r requirements.txt
python main.py

# Terminal 2 - Frontend
npm install
npm run dev
```

Open: **http://localhost:3000**

---

## ✅ Checklist

- [x] Frontend `.env` created (DONE!)
- [ ] Download `firebase-credentials.json` and put in `backend/`
- [ ] Get Gemini API key
- [ ] Create `backend/.env` with Gemini key
- [ ] Enable Google Auth in Firebase
- [ ] Enable Firestore in Firebase
- [ ] Run backend (`cd backend && python main.py`)
- [ ] Run frontend (`npm run dev`)

---

## 🆘 Quick Help

**Can't find the credentials file?**
→ Check your Downloads folder, look for `wellora-h-firebase-adminsdk-*.json`

**Backend won't start?**
→ Make sure `firebase-credentials.json` is in the `backend/` folder

**Frontend won't connect?**
→ Make sure backend is running first on port 8000

**Google Sign-In not working?**
→ Enable it at: https://console.firebase.google.com/project/wellora-h/authentication/providers

---

**That's it! You're ready to demo Wellora!** 🎉
