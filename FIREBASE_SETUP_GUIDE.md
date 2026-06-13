# 🔥 Firebase Setup Guide for Wellora

## ✅ Step 1: Frontend Config (Already Done!)

Your frontend `.env` file has been created with your Firebase config.

✅ **This is already configured!**

---

## 🔐 Step 2: Get Backend Credentials (Required)

The backend needs a **Service Account Key** file. Here's how to get it:

### Method 1: Firebase Console (Recommended)

1. **Go to Firebase Console**: https://console.firebase.google.com/

2. **Select your project**: `wellora-h`

3. **Open Project Settings**:
   - Click the **gear icon** ⚙️ in the left sidebar
   - Click **"Project settings"**

4. **Go to Service Accounts tab**:
   - Click the **"Service accounts"** tab at the top

5. **Generate Private Key**:
   - Scroll down to **"Firebase Admin SDK"**
   - Click **"Generate new private key"**
   - Click **"Generate key"** in the popup

6. **Save the file**:
   - A JSON file will download (e.g., `wellora-h-firebase-adminsdk-xxxxx.json`)
   - **Rename it to**: `firebase-credentials.json`
   - **Move it to**: `backend/` folder

Your file structure should look like:
```
Prompt-war-H2S-main/
├── backend/
│   ├── firebase-credentials.json  ← Put the file here
│   ├── .env
│   ├── main.py
│   └── ...
```

### Method 2: Using Firebase CLI (Alternative)

If you prefer using CLI:

```bash
firebase login
firebase projects:list
# Copy the project ID (wellora-h)

# Generate service account key
firebase apps:sdkconfig --project wellora-h
```

---

## 🔑 Step 3: Configure Backend Environment

Create `backend/.env` file:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your keys:

```env
GEMINI_API_KEY=your_gemini_api_key_here
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
PORT=8000
FRONTEND_URL=http://localhost:3000
```

**Important Notes**:
- `FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json` means the file is in the `backend/` folder
- You still need to get your **Gemini API key** from: https://makersuite.google.com/app/apikey

---

## 🔥 Step 4: Enable Firebase Services

### Enable Authentication

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: `wellora-h`
3. Click **"Build"** → **"Authentication"**
4. Click **"Get started"**
5. Click **"Sign-in method"** tab
6. Enable **"Google"** provider:
   - Click on "Google"
   - Toggle "Enable"
   - Add a support email
   - Click "Save"

### Enable Firestore Database

1. Still in Firebase Console
2. Click **"Build"** → **"Firestore Database"**
3. Click **"Create database"**
4. Choose **"Start in test mode"** (for development)
5. Select location: Choose closest to you (e.g., `us-central1`)
6. Click **"Enable"**

---

## 🔒 Security: Verify .gitignore

Check that `.env` and credentials are in `.gitignore`:

```bash
cat .gitignore | grep -E "\.env|firebase-credentials"
```

You should see:
```
.env
.env.local
.env.production
firebase-credentials.json
*-firebase-adminsdk-*.json
```

✅ **Already configured in your .gitignore!**

---

## 🧪 Step 5: Test the Setup

### Test Frontend

```bash
npm install
npm run dev
```

Open http://localhost:3000 - You should see the login page.

### Test Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Test Full Flow

1. Open http://localhost:3000
2. Click "Continue with Google"
3. Sign in with your Google account
4. Complete onboarding (select exam + persona)
5. Create a journal entry

---

## ❌ Troubleshooting

### Error: "FIREBASE_CREDENTIALS_PATH not found"

**Solution**: Make sure `firebase-credentials.json` is in the `backend/` folder:

```bash
ls -la backend/firebase-credentials.json
```

### Error: "GEMINI_API_KEY not found"

**Solution**: Get your Gemini API key:
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to `backend/.env`: `GEMINI_API_KEY=AIza...`

### Error: "Firebase Auth not enabled"

**Solution**: Enable Google sign-in:
1. Firebase Console → Authentication → Sign-in method
2. Enable Google provider

### Error: "Firestore not initialized"

**Solution**: Enable Firestore:
1. Firebase Console → Firestore Database
2. Create database in test mode

---

## 📁 Final Folder Structure

```
Prompt-war-H2S-main/
├── .env                           ← Frontend config (created ✅)
├── .env.example                   ← Template (updated ✅)
├── .gitignore                     ← Protects secrets (configured ✅)
├── package.json
├── index.html
│
├── src/
│   ├── config/
│   │   └── firebase.ts            ← Uses .env variables
│   └── ...
│
└── backend/
    ├── .env                        ← Backend config (need to create)
    ├── .env.example                ← Template
    ├── firebase-credentials.json   ← Service account key (need to download)
    ├── main.py
    ├── requirements.txt
    └── services/
        └── firebase_service.py     ← Uses credentials
```

---

## ✅ Checklist

Before running the app:

- [x] Frontend `.env` created (done automatically)
- [ ] Download `firebase-credentials.json` from Firebase Console
- [ ] Move `firebase-credentials.json` to `backend/` folder
- [ ] Create `backend/.env` from `backend/.env.example`
- [ ] Add Gemini API key to `backend/.env`
- [ ] Enable Google Authentication in Firebase Console
- [ ] Enable Firestore Database in Firebase Console
- [ ] Run `npm install`
- [ ] Run `pip install -r backend/requirements.txt`
- [ ] Test backend: `cd backend && python main.py`
- [ ] Test frontend: `npm run dev`

---

## 🎯 Quick Commands

```bash
# 1. Install dependencies
npm install
cd backend && pip install -r requirements.txt && cd ..

# 2. Download firebase-credentials.json from console and put in backend/

# 3. Create backend/.env
cd backend
cp .env.example .env
# Edit .env with Gemini API key
cd ..

# 4. Run backend
cd backend && python main.py

# 5. Run frontend (new terminal)
npm run dev
```

---

## 🆘 Need Help?

1. **Frontend config**: Already done! Check `.env` file
2. **Backend credentials**: Download from Firebase Console → Settings → Service Accounts
3. **Gemini API**: Get from https://makersuite.google.com/app/apikey
4. **Firebase Console**: https://console.firebase.google.com/project/wellora-h

---

**Your Firebase project is**: `wellora-h`  
**Your hosting site**: `wellora-h-6ef86`  

Everything is configured! Just need to:
1. Download the backend credentials file
2. Add your Gemini API key
3. Run the app!

🚀 **You're almost there!**
