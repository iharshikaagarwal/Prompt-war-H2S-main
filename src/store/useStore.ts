import { create } from 'zustand';
import type { User, JournalEntry, BurnoutPrediction } from '../types';

interface AppState {
  user: User | null;
  journals: JournalEntry[];
  currentBurnoutPrediction: BurnoutPrediction | null;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setJournals: (journals: JournalEntry[]) => void;
  addJournal: (journal: JournalEntry) => void;
  setBurnoutPrediction: (prediction: BurnoutPrediction | null) => void;
  setLoading: (loading: boolean) => void;
  
  getRecentJournals: (days: number) => JournalEntry[];
  calculateWellnessScore: () => number;
}

export const useStore = create<AppState>((set, get) => ({
  user: null,
  journals: [],
  currentBurnoutPrediction: null,
  isLoading: false,
  
  setUser: (user) => set({ user }),
  setJournals: (journals) => set({ journals }),
  addJournal: (journal) => set((state) => ({ 
    journals: [journal, ...state.journals] 
  })),
  setBurnoutPrediction: (prediction) => set({ 
    currentBurnoutPrediction: prediction 
  }),
  setLoading: (loading) => set({ isLoading: loading }),
  
  getRecentJournals: (days) => {
    const journals = get().journals;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return journals.filter(j => new Date(j.date) >= cutoffDate)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  
  calculateWellnessScore: () => {
    const recentJournals = get().getRecentJournals(7);
    if (recentJournals.length === 0) return 0;
    
    const avgStress = recentJournals.reduce((sum, j) => 
      sum + j.analysis.stress_score, 0) / recentJournals.length;
    const avgFocus = recentJournals.reduce((sum, j) => 
      sum + j.analysis.focus_score, 0) / recentJournals.length;
    const avgMotivation = recentJournals.reduce((sum, j) => 
      sum + j.analysis.motivation_score, 0) / recentJournals.length;
    const avgBurnout = recentJournals.reduce((sum, j) => 
      sum + j.analysis.burnout_risk, 0) / recentJournals.length;
    
    const wellnessScore = (
      (100 - avgStress) * 0.3 +
      avgFocus * 0.25 +
      avgMotivation * 0.25 +
      (100 - avgBurnout) * 0.2
    );
    
    return Math.round(wellnessScore);
  },
}));
