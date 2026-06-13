# MindMate AI Backend

Production-ready FastAPI backend for the Mental Wellness Tracker.

## Features

- **Gemini AI Integration**: Journal analysis, recovery plan generation, burnout prediction, and AI mentor
- **Firebase Integration**: User profiles, journal storage, and parent dashboard data
- **RESTful API**: Clean, well-documented endpoints
- **Type Safety**: Full Pydantic validation
- **CORS Support**: Configured for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables

Create a `.env` file:

```env
GEMINI_API_KEY=your_gemini_api_key
FIREBASE_CREDENTIALS_PATH=./firebase-credentials.json
PORT=8000
FRONTEND_URL=http://localhost:3000
```

### 3. Firebase Credentials

Download your Firebase service account credentials JSON file and place it in the `backend` directory as `firebase-credentials.json`.

### 4. Run the Server

```bash
python main.py
```

Or with uvicorn:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Journal Analysis
- `POST /api/analyze-journal` - Analyze journal entry with Gemini AI

### Recovery Plan
- `POST /api/generate-recovery-plan` - Generate personalized recovery plan

### Burnout Prediction
- `POST /api/predict-burnout` - Predict burnout risk from 7-day history

### AI Mentor
- `POST /api/mentor-advice` - Get advice from AI mentor

### User Management
- `POST /api/users/profile` - Create user profile
- `GET /api/users/{user_id}/profile` - Get user profile

### Journal Entries
- `POST /api/journals` - Save journal entry
- `GET /api/users/{user_id}/journals` - Get user journals

### Parent Dashboard
- `GET /api/users/{user_id}/parent-dashboard` - Get aggregated wellness data

## API Documentation

Interactive API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Architecture

```
backend/
├── main.py                 # FastAPI application entry point
├── models/
│   ├── __init__.py
│   └── schemas.py         # Pydantic models
├── services/
│   ├── __init__.py
│   ├── gemini_service.py  # Gemini AI integration
│   └── firebase_service.py # Firebase integration
├── requirements.txt       # Python dependencies
├── .env.example          # Environment template
└── README.md
```

## Development

### Type Checking

All request/response models use Pydantic for automatic validation and serialization.

### Error Handling

The API includes global exception handlers and returns structured error responses.

### CORS

CORS is configured to accept requests from the frontend URL specified in environment variables.

## Production Deployment

### Using Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Using Gunicorn

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## Security Notes

- Never commit `.env` or `firebase-credentials.json` files
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Implement rate limiting for API endpoints
- Add authentication middleware for protected routes
