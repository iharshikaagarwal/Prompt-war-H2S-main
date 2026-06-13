from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime
import os
from dotenv import load_dotenv

from services.gemini_service import GeminiService
from services.firebase_service import FirebaseService
from models.schemas import (
    JournalAnalysisRequest,
    JournalAnalysisResponse,
    RecoveryPlanRequest,
    RecoveryPlanResponse,
    BurnoutPredictionRequest,
    BurnoutPredictionResponse,
    MentorAdviceRequest,
    MentorAdviceResponse,
    UserProfile,
    JournalEntry,
    ParentDashboardResponse
)

load_dotenv()

app = FastAPI(
    title="Wellora API",
    description="Backend API for Mental Wellness Tracker",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.getenv("FRONTEND_URL", "http://localhost:3000"),
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gemini_service = GeminiService()
firebase_service = FirebaseService()

@app.get("/")
async def root():
    return {
        "message": "Wellora API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "services": {
            "gemini": "connected",
            "firebase": "connected"
        }
    }

@app.post("/api/analyze-journal", response_model=JournalAnalysisResponse)
async def analyze_journal(request: JournalAnalysisRequest):
    try:
        analysis = await gemini_service.analyze_journal(
            journal_text=request.journal_text,
            mood=request.mood,
            exam_type=request.exam_type,
            persona=request.persona,
            study_hours=request.study_hours,
            sleep_hours=request.sleep_hours
        )
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze journal: {str(e)}")

@app.post("/api/generate-recovery-plan", response_model=RecoveryPlanResponse)
async def generate_recovery_plan(request: RecoveryPlanRequest):
    try:
        recovery_plan = await gemini_service.generate_recovery_plan(
            stress_score=request.stress_score,
            focus_score=request.focus_score,
            motivation_score=request.motivation_score,
            burnout_risk=request.burnout_risk,
            negative_patterns=request.negative_patterns,
            exam_type=request.exam_type,
            persona=request.persona
        )
        return recovery_plan
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate recovery plan: {str(e)}")

@app.post("/api/predict-burnout", response_model=BurnoutPredictionResponse)
async def predict_burnout(request: BurnoutPredictionRequest):
    try:
        prediction = await gemini_service.predict_burnout(
            recent_journals=request.journals,
            persona=request.persona
        )
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to predict burnout: {str(e)}")

@app.post("/api/mentor-advice", response_model=MentorAdviceResponse)
async def get_mentor_advice(request: MentorAdviceRequest):
    try:
        advice = await gemini_service.get_mentor_advice(
            question=request.question,
            exam_type=request.exam_type,
            persona=request.persona,
            wellness_score=request.wellness_score
        )
        return MentorAdviceResponse(response=advice)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get mentor advice: {str(e)}")

@app.post("/api/users/profile")
async def create_user_profile(profile: UserProfile):
    try:
        await firebase_service.create_user_profile(profile)
        return {"message": "User profile created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create user profile: {str(e)}")

@app.get("/api/users/{user_id}/profile", response_model=UserProfile)
async def get_user_profile(user_id: str):
    try:
        profile = await firebase_service.get_user_profile(user_id)
        if not profile:
            raise HTTPException(status_code=404, detail="User profile not found")
        return profile
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get user profile: {str(e)}")

@app.post("/api/journals")
async def save_journal_entry(journal: JournalEntry):
    try:
        await firebase_service.save_journal_entry(journal)
        return {"message": "Journal entry saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save journal entry: {str(e)}")

@app.get("/api/users/{user_id}/journals", response_model=List[JournalEntry])
async def get_user_journals(user_id: str, limit: int = 30):
    try:
        journals = await firebase_service.get_user_journals(user_id, limit)
        return journals
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get journals: {str(e)}")

@app.get("/api/users/{user_id}/parent-dashboard", response_model=ParentDashboardResponse)
async def get_parent_dashboard(user_id: str):
    try:
        dashboard_data = await firebase_service.get_parent_dashboard_data(user_id)
        return dashboard_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get parent dashboard data: {str(e)}")

@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={
            "message": "An unexpected error occurred",
            "detail": str(exc)
        }
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
