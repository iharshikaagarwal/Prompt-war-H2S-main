export type ExamType = 'JEE' | 'NEET' | 'UPSC' | 'CAT' | 'GATE' | 'CUET' | 'Boards';

export type MoodType = 'happy' | 'good' | 'neutral' | 'worried' | 'stressed';

export type PersonaType = 'strict' | 'friendly' | 'motivational';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  examType?: ExamType;
  persona?: PersonaType;
  parentEmail?: string;
  createdAt?: Date;
}

export interface JournalAnalysis {
  emotion: string;
  stress_score: number;
  motivation_score: number;
  focus_score: number;
  burnout_risk: number;
  negative_thought_patterns: string[];
  positive_indicators: string[];
  summary: string;
  wellness_avatar: string;
}

export interface RecoveryPlan {
  wake_up_time: string;
  study_blocks: Array<{
    start_time: string;
    end_time: string;
    subject: string;
    duration_minutes: number;
  }>;
  breaks: Array<{
    start_time: string;
    duration_minutes: number;
    activity: string;
  }>;
  meditation_time: string;
  meditation_duration: number;
  sleep_time: string;
  additional_suggestions: string[];
}

export interface JournalEntry {
  id: string;
  userId: string;
  date: Date;
  mood: MoodType;
  journalText: string;
  isVoiceEntry: boolean;
  studyHours?: number;
  sleepHours?: number;
  analysis: JournalAnalysis;
  recoveryPlan: RecoveryPlan;
  timestamp: Date;
}

export interface BurnoutPrediction {
  burnout_probability: number;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
  recommended_actions: string[];
  trend_analysis: string;
  timeline_forecast: Array<{
    day: string;
    probability: number;
    factors: string[];
  }>;
}

export interface WellnessScore {
  overall: number;
  stress: number;
  focus: number;
  motivation: number;
  burnoutRisk: number;
  consistency: number;
}

export interface ParentDashboardData {
  consistency_score: number;
  stress_trend: number[];
  burnout_risk: number;
  focus_trend: number[];
  last_updated: Date;
  total_entries: number;
  streak_days: number;
}
