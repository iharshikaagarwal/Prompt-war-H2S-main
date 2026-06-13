import os
from typing import List, Optional
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore
from models.schemas import (
    UserProfile,
    JournalEntry,
    ParentDashboardResponse
)

class FirebaseService:
    def __init__(self):
        creds_path = os.getenv("FIREBASE_CREDENTIALS_PATH", "./firebase-credentials.json")
        
        if not firebase_admin._apps:
            if os.path.exists(creds_path):
                cred = credentials.Certificate(creds_path)
                firebase_admin.initialize_app(cred)
            else:
                firebase_admin.initialize_app()
        
        self.db = firestore.client()
    
    async def create_user_profile(self, profile: UserProfile):
        user_ref = self.db.collection('users').document(profile.uid)
        user_ref.set({
            'uid': profile.uid,
            'email': profile.email,
            'display_name': profile.display_name,
            'photo_url': profile.photo_url,
            'exam_type': profile.exam_type,
            'persona': profile.persona,
            'parent_email': profile.parent_email,
            'created_at': firestore.SERVER_TIMESTAMP
        })
    
    async def get_user_profile(self, user_id: str) -> Optional[UserProfile]:
        user_ref = self.db.collection('users').document(user_id)
        doc = user_ref.get()
        
        if doc.exists:
            data = doc.to_dict()
            data['created_at'] = data.get('created_at', datetime.utcnow())
            return UserProfile(**data)
        
        return None
    
    async def save_journal_entry(self, journal: JournalEntry):
        journal_ref = self.db.collection('users').document(journal.user_id).collection('journals').document(journal.id)
        journal_data = journal.model_dump()
        journal_data['date'] = journal.date
        journal_data['timestamp'] = journal.timestamp
        journal_ref.set(journal_data)
    
    async def get_user_journals(self, user_id: str, limit: int = 30) -> List[JournalEntry]:
        journals_ref = (
            self.db.collection('users')
            .document(user_id)
            .collection('journals')
            .order_by('timestamp', direction=firestore.Query.DESCENDING)
            .limit(limit)
        )
        
        docs = journals_ref.stream()
        journals = []
        
        for doc in docs:
            data = doc.to_dict()
            journals.append(JournalEntry(**data))
        
        return journals
    
    async def get_parent_dashboard_data(self, user_id: str) -> ParentDashboardResponse:
        journals = await self.get_user_journals(user_id, 30)
        
        if not journals:
            return ParentDashboardResponse(
                consistency_score=0,
                stress_trend=[],
                burnout_risk=0,
                focus_trend=[],
                last_updated=datetime.utcnow(),
                total_entries=0,
                streak_days=0
            )
        
        last_7_journals = journals[:7]
        stress_trend = [j.analysis.stress_score for j in reversed(last_7_journals)]
        focus_trend = [j.analysis.focus_score for j in reversed(last_7_journals)]
        
        avg_burnout = sum(j.analysis.burnout_risk for j in last_7_journals) // len(last_7_journals)
        
        streak = 0
        today = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        
        for i, journal in enumerate(journals):
            journal_date = journal.date.replace(hour=0, minute=0, second=0, microsecond=0)
            expected_date = today.replace(day=today.day - i)
            
            if journal_date == expected_date:
                streak += 1
            else:
                break
        
        consistency_score = min(100, int((len(journals) / 30) * 100 + (streak * 5)))
        
        return ParentDashboardResponse(
            consistency_score=consistency_score,
            stress_trend=stress_trend,
            burnout_risk=avg_burnout,
            focus_trend=focus_trend,
            last_updated=datetime.utcnow(),
            total_entries=len(journals),
            streak_days=streak
        )
