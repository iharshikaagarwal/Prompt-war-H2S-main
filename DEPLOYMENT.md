# 🚢 Deployment Guide for MindMate AI

## Production Deployment Options

### Backend Deployment

#### Option 1: Railway.app (Recommended - Easy)

1. **Create Railway Account**: [railway.app](https://railway.app)

2. **Install Railway CLI**:
```bash
npm i -g @railway/cli
railway login
```

3. **Deploy Backend**:
```bash
cd backend
railway init
railway add
```

4. **Set Environment Variables** in Railway Dashboard:
```
GEMINI_API_KEY=your_key
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
FRONTEND_URL=https://your-frontend-url.vercel.app
```

5. **Upload Firebase Credentials**:
- Go to Railway project → Variables
- Upload `firebase-credentials.json` content as text variable
- Or use Railway's file upload feature

6. **Deploy**:
```bash
railway up
```

Your backend will be live at: `https://your-app.railway.app`

---

#### Option 2: Google Cloud Run

1. **Install Google Cloud SDK**

2. **Build Docker Image**:
```bash
cd backend
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/mindmate-api
```

3. **Deploy to Cloud Run**:
```bash
gcloud run deploy mindmate-api \
  --image gcr.io/YOUR_PROJECT_ID/mindmate-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key
```

4. **Set up Firebase credentials** as a secret

---

#### Option 3: Render.com

1. **Create Render Account**: [render.com](https://render.com)

2. **Create New Web Service**:
   - Connect your GitHub repo
   - Select `backend` folder
   - Build command: `pip install -r requirements.txt`
   - Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**:
```
GEMINI_API_KEY=your_key
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
FRONTEND_URL=https://your-frontend-url.vercel.app
```

4. **Upload Firebase credentials** via Render dashboard

---

### Frontend Deployment

#### Option 1: Vercel (Recommended - Fastest)

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Build the app**:
```bash
npm run build
```

3. **Deploy**:
```bash
vercel --prod
```

4. **Set Environment Variables** in Vercel Dashboard:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=https://your-backend-url.railway.app
```

Your frontend will be live at: `https://your-app.vercel.app`

---

#### Option 2: Netlify

1. **Install Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Build**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```

4. **Environment Variables**: Set in Netlify Dashboard

---

#### Option 3: Firebase Hosting

1. **Install Firebase CLI**:
```bash
npm i -g firebase-tools
firebase login
```

2. **Initialize**:
```bash
firebase init hosting
# Select your project
# Public directory: dist
# Single-page app: Yes
# GitHub deploys: Optional
```

3. **Build and Deploy**:
```bash
npm run build
firebase deploy --only hosting
```

---

## Docker Deployment

### Backend Dockerfile

Create `backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Build and Run:
```bash
cd backend
docker build -t mindmate-api .
docker run -p 8000:8000 --env-file .env mindmate-api
```

---

## Production Checklist

### Backend
- [ ] Set `FRONTEND_URL` to production frontend URL
- [ ] Enable HTTPS (automatic on Railway/Render/Cloud Run)
- [ ] Upload Firebase credentials securely
- [ ] Set up monitoring/logging
- [ ] Configure rate limiting
- [ ] Enable error tracking (Sentry)

### Frontend
- [ ] Update `VITE_API_URL` to production backend URL
- [ ] Enable production Firebase rules
- [ ] Configure CDN caching
- [ ] Enable analytics (optional)
- [ ] Test all API endpoints

### Firebase
- [ ] Switch Firestore to production mode
- [ ] Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /journals/{journalId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

- [ ] Set up Firebase Auth domain
- [ ] Configure authorized domains for OAuth

---

## Environment Variables Summary

### Backend (.env)
```env
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
PORT=8000
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
VITE_API_URL=https://your-backend-url.railway.app
```

---

## Monitoring & Maintenance

### Backend Monitoring
- Railway: Built-in metrics dashboard
- Render: Automatic health checks
- Cloud Run: Google Cloud Monitoring

### Error Tracking
```bash
pip install sentry-sdk
```

Add to `main.py`:
```python
import sentry_sdk
sentry_sdk.init(dsn="your-sentry-dsn")
```

### Performance Monitoring
- Monitor API response times
- Track Gemini API usage
- Monitor Firebase read/write operations

---

## Cost Optimization

### Gemini API
- Free tier: 60 requests/minute
- Monitor usage in Google Cloud Console
- Implement caching for common queries

### Firebase
- Free tier: 50K reads, 20K writes/day
- Monitor Firestore usage
- Implement query limits

### Hosting
- Railway: Free tier available
- Vercel: Free for hobby projects
- Render: Free tier with limitations

---

## Security Best Practices

1. **Never commit**:
   - `.env` files
   - `firebase-credentials.json`
   - API keys

2. **Use environment variables** for all secrets

3. **Enable HTTPS** (automatic on all platforms)

4. **Configure CORS** properly in backend

5. **Implement rate limiting** on API endpoints

6. **Validate all inputs** (already done with Pydantic)

7. **Set up Firebase security rules** (shown above)

---

## Testing in Production

1. **Smoke Test**:
   - Sign in with Google
   - Create journal entry
   - View dashboard
   - Check burnout predictor
   - Test AI mentor

2. **Performance Test**:
   - Check API response times
   - Monitor Gemini API latency
   - Test with multiple concurrent users

3. **Error Handling**:
   - Test with invalid inputs
   - Check error messages
   - Verify fallback behaviors

---

## Support & Maintenance

- Monitor logs regularly
- Set up alerts for errors
- Keep dependencies updated
- Regular security patches
- Backup Firebase data

---

**Your app is now production-ready!** 🎉
