import type { JournalAnalysis, RecoveryPlan, BurnoutPrediction, PersonaType, ExamType } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

async function apiCall<T>(endpoint: string, data: any): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'API request failed');
  }

  return response.json();
}

export async function analyzeJournal(
  journalText: string,
  mood: string,
  examType: ExamType,
  persona: PersonaType,
  studyHours?: number,
  sleepHours?: number
): Promise<JournalAnalysis> {
  return apiCall<JournalAnalysis>('/api/analyze-journal', {
    journal_text: journalText,
    mood,
    exam_type: examType,
    persona,
    study_hours: studyHours,
    sleep_hours: sleepHours,
  });
}

export async function generateRecoveryPlan(
  analysis: JournalAnalysis,
  examType: ExamType,
  persona: PersonaType
): Promise<RecoveryPlan> {
  return apiCall<RecoveryPlan>('/api/generate-recovery-plan', {
    stress_score: analysis.stress_score,
    focus_score: analysis.focus_score,
    motivation_score: analysis.motivation_score,
    burnout_risk: analysis.burnout_risk,
    negative_patterns: analysis.negative_thought_patterns,
    exam_type: examType,
    persona,
  });
}

export async function predictBurnout(
  recentJournals: Array<{
    date: Date;
    mood: string;
    analysis: JournalAnalysis;
    studyHours?: number;
    sleepHours?: number;
  }>,
  persona: PersonaType
): Promise<BurnoutPrediction> {
  const journals = recentJournals.map(j => ({
    date: j.date.toISOString(),
    mood: j.mood,
    stress_score: j.analysis.stress_score,
    focus_score: j.analysis.focus_score,
    motivation_score: j.analysis.motivation_score,
    burnout_risk: j.analysis.burnout_risk,
    study_hours: j.studyHours,
    sleep_hours: j.sleepHours,
  }));

  return apiCall<BurnoutPrediction>('/api/predict-burnout', {
    journals,
    persona,
  });
}

export async function getMentorAdvice(
  question: string,
  examType: ExamType,
  persona: PersonaType,
  currentWellnessScore: number
): Promise<string> {
  const result = await apiCall<{ response: string }>('/api/mentor-advice', {
    question,
    exam_type: examType,
    persona,
    wellness_score: currentWellnessScore,
  });
  
  return result.response;
}
