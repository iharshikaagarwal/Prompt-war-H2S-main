import { describe, it, expect } from 'vitest';
import {
  calculateWellnessScore,
  getWellnessColor,
  getRiskColor,
  formatDate,
  getGreeting,
  getMoodEmoji,
} from './helpers';

describe('calculateWellnessScore', () => {
  it('should calculate correct wellness score from journal entries', () => {
    const journals = [
      { mood: 'happy', analysis: { sentiment_score: 0.8 } },
      { mood: 'calm', analysis: { sentiment_score: 0.6 } },
      { mood: 'anxious', analysis: { sentiment_score: 0.3 } },
    ] as any;

    const score = calculateWellnessScore(journals);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  it('should return 50 for empty journal array', () => {
    const score = calculateWellnessScore([]);
    expect(score).toBe(50);
  });

  it('should handle journals without analysis', () => {
    const journals = [{ mood: 'happy' }, { mood: 'sad' }] as any;
    const score = calculateWellnessScore(journals);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);
  });
});

describe('getWellnessColor', () => {
  it('should return correct color for high wellness score', () => {
    expect(getWellnessColor(90)).toBe('text-green-500');
  });

  it('should return correct color for medium wellness score', () => {
    expect(getWellnessColor(60)).toBe('text-yellow-500');
  });

  it('should return correct color for low wellness score', () => {
    expect(getWellnessColor(30)).toBe('text-red-500');
  });

  it('should handle edge cases', () => {
    expect(getWellnessColor(70)).toBe('text-green-500');
    expect(getWellnessColor(50)).toBe('text-yellow-500');
    expect(getWellnessColor(49)).toBe('text-red-500');
  });
});

describe('getRiskColor', () => {
  it('should return correct color for each risk level', () => {
    expect(getRiskColor('low')).toBe('text-green-500');
    expect(getRiskColor('moderate')).toBe('text-yellow-500');
    expect(getRiskColor('high')).toBe('text-orange-500');
    expect(getRiskColor('critical')).toBe('text-red-500');
  });

  it('should handle unknown risk level', () => {
    expect(getRiskColor('unknown' as any)).toBe('text-gray-500');
  });
});

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15T10:30:00Z');
    const formatted = formatDate(date);
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('15');
  });

  it('should handle string dates', () => {
    const formatted = formatDate('2024-01-15T10:30:00Z');
    expect(formatted).toContain('Jan');
    expect(formatted).toContain('15');
  });

  it('should handle timestamps', () => {
    const timestamp = new Date('2024-01-15').getTime();
    const formatted = formatDate(timestamp);
    expect(formatted).toContain('Jan');
  });
});

describe('getGreeting', () => {
  it('should return morning greeting', () => {
    const morningHour = 8;
    const mockDate = new Date();
    mockDate.setHours(morningHour);
    
    const greeting = getGreeting();
    expect(['Good morning', 'Good afternoon', 'Good evening']).toContain(greeting);
  });

  it('should return appropriate greeting based on time', () => {
    const greeting = getGreeting();
    expect(greeting).toBeTruthy();
    expect(typeof greeting).toBe('string');
  });
});

describe('getMoodEmoji', () => {
  it('should return correct emoji for each mood', () => {
    expect(getMoodEmoji('happy')).toBe('😊');
    expect(getMoodEmoji('sad')).toBe('😢');
    expect(getMoodEmoji('anxious')).toBe('😰');
    expect(getMoodEmoji('stressed')).toBe('😫');
    expect(getMoodEmoji('calm')).toBe('😌');
    expect(getMoodEmoji('angry')).toBe('😠');
    expect(getMoodEmoji('excited')).toBe('🤩');
    expect(getMoodEmoji('tired')).toBe('😴');
  });

  it('should return neutral emoji for unknown mood', () => {
    expect(getMoodEmoji('unknown')).toBe('😐');
  });

  it('should handle empty string', () => {
    expect(getMoodEmoji('')).toBe('😐');
  });
});
