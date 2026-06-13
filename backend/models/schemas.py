from pydantic import BaseModel, Field
from typing import List, Optional, Literal
from datetime import datetime

ExamType = Literal["JEE", "NEET", "UPSC", "CAT", "GATE", "CUET", "Boards"]
MoodType = Literal["happy", "good", "neutral", "worried", "stressed"]
PersonaType = Literal["strict", "friendly", "motivational"]
RiskLevel = Literal["low", "medium", "high", "critical"]

class JournalAnalysisRequest(BaseModel):
    journal_text: str = Field(..., min_length=10)
    mood: MoodType
    exam_type: ExamType
    persona: PersonaType
    study_hours: Optional[float] = None
    sleep_hours: Optional[float] = None

class JournalAnalysisResponse(BaseModel):
    emotion: str
    stress_score: int = Field(..., ge=0, le=100)
    motivation_score: int = Field(..., ge=0, le=100)
    focus_score: int = Field(..., ge=0, le=100)
    burnout_risk: int = Field(..., ge=0, le=100)
    negative_thought_patterns: List[str]
    positive_indicators: List[str]
    summary: str
    wellness_avatar: str

class StudyBlock(BaseModel):
    start_time: str
    end_time: str
    subject: str
    duration_minutes: int

class Break(BaseModel):
    start_time: str
    duration_minutes: int
    activity: str

class RecoveryPlanRequest(BaseModel):
    stress_score: int
    focus_score: int
    motivation_score: int
    burnout_risk: int
    negative_patterns: List[str]
    exam_type: ExamType
    persona: PersonaType

class RecoveryPlanResponse(BaseModel):
    wake_up_time: str
    study_blocks: List[StudyBlock]
    breaks: List[Break]
    meditation_time: str
    meditation_duration: int
    sleep_time: str
    additional_suggestions: List[str]

class JournalSummary(BaseModel):
    date: datetime
    mood: MoodType
    stress_score: int
    focus_score: int
    motivation_score: int
    burnout_risk: int
    study_hours: Optional[float] = None
    sleep_hours: Optional[float] = None

class BurnoutPredictionRequest(BaseModel):
    journals: List[JournalSummary]
    persona: PersonaType

class TimelineForecast(BaseModel):
    day: str
    probability: int
    factors: List[str]

class BurnoutPredictionResponse(BaseModel):
    burnout_probability: int = Field(..., ge=0, le=100)
    risk_level: RiskLevel
    reasons: List[str]
    recommended_actions: List[str]
    trend_analysis: str
    timeline_forecast: List[TimelineForecast]

class MentorAdviceRequest(BaseModel):
    question: str = Field(..., min_length=5)
    exam_type: ExamType
    persona: PersonaType
    wellness_score: int = Field(..., ge=0, le=100)

class MentorAdviceResponse(BaseModel):
    response: str

class UserProfile(BaseModel):
    uid: str
    email: str
    display_name: str
    photo_url: str
    exam_type: ExamType
    persona: PersonaType
    parent_email: Optional[str] = None
    created_at: datetime

class JournalEntry(BaseModel):
    id: str
    user_id: str
    date: datetime
    mood: MoodType
    journal_text: str
    is_voice_entry: bool
    study_hours: Optional[float] = None
    sleep_hours: Optional[float] = None
    analysis: JournalAnalysisResponse
    recovery_plan: RecoveryPlanResponse
    timestamp: datetime

class ParentDashboardResponse(BaseModel):
    consistency_score: int
    stress_trend: List[int]
    burnout_risk: int
    focus_trend: List[int]
    last_updated: datetime
    total_entries: int
    streak_days: int
