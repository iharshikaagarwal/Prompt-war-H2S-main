import type { JournalEntry } from '../types';

export function calculateStreak(journals: JournalEntry[]): number {
  if (journals.length === 0) return 0;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const sortedJournals = [...journals].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  for (let i = 0; i < sortedJournals.length; i++) {
    const journalDate = new Date(sortedJournals[i].date);
    journalDate.setHours(0, 0, 0, 0);
    const expectedDate = new Date(today);
    expectedDate.setDate(expectedDate.getDate() - i);
    expectedDate.setHours(0, 0, 0, 0);
    
    if (journalDate.getTime() === expectedDate.getTime()) {
      streak++;
    } else {
      break;
    }
  }
  
  return streak;
}

export interface ChartDataPoint {
  day: string;
  date: string;
  stress: number;
  focus: number;
  motivation: number;
  burnout: number;
  mood: string;
}

export function generateChartData(journals: JournalEntry[], days: number = 7): ChartDataPoint[] {
  const MOOD_EMOJIS: Record<string, string> = {
    happy: '😊',
    good: '🙂',
    neutral: '😐',
    worried: '😟',
    stressed: '😰',
  };

  const recentJournals = journals.slice(0, days).reverse();
  
  return recentJournals.map((journal, index) => ({
    day: `Day ${index + 1}`,
    date: new Date(journal.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }),
    stress: journal.analysis.stress_score,
    focus: journal.analysis.focus_score,
    motivation: journal.analysis.motivation_score,
    burnout: journal.analysis.burnout_risk,
    mood: MOOD_EMOJIS[journal.mood] || '😐',
  }));
}

export function calculateWellnessMetrics(journals: JournalEntry[]) {
  if (journals.length === 0) {
    return {
      avgStress: 0,
      avgFocus: 0,
      avgMotivation: 0,
      avgBurnout: 0,
      wellnessScore: 0,
    };
  }

  const avgStress = Math.round(
    journals.reduce((sum, j) => sum + j.analysis.stress_score, 0) / journals.length
  );
  const avgFocus = Math.round(
    journals.reduce((sum, j) => sum + j.analysis.focus_score, 0) / journals.length
  );
  const avgMotivation = Math.round(
    journals.reduce((sum, j) => sum + j.analysis.motivation_score, 0) / journals.length
  );
  const avgBurnout = Math.round(
    journals.reduce((sum, j) => sum + j.analysis.burnout_risk, 0) / journals.length
  );

  const wellnessScore = Math.round(
    (100 - avgStress) * 0.3 +
    avgFocus * 0.25 +
    avgMotivation * 0.25 +
    (100 - avgBurnout) * 0.2
  );

  return {
    avgStress,
    avgFocus,
    avgMotivation,
    avgBurnout,
    wellnessScore,
  };
}

export type GaugeColor = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';

export function getHealthColor(value: number, inverse: boolean = false): GaugeColor {
  const normalizedValue = inverse ? 100 - value : value;
  
  if (normalizedValue >= 70) return 'green';
  if (normalizedValue >= 40) return 'yellow';
  return 'red';
}

export function getStressColor(value: number): GaugeColor {
  if (value <= 40) return 'green';
  if (value <= 70) return 'yellow';
  return 'red';
}

export function getBurnoutColor(value: number): GaugeColor {
  if (value <= 40) return 'green';
  if (value <= 70) return 'orange';
  return 'red';
}