import { describe, it, expect } from 'vitest';
import { calculateStreak, getStreakEmoji, isStreakActive } from './streak';

describe('calculateStreak', () => {
  it('should calculate correct streak for consecutive days', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const journals = [
      { createdAt: today.toISOString() },
      { createdAt: yesterday.toISOString() },
      { createdAt: twoDaysAgo.toISOString() },
    ] as any;

    const streak = calculateStreak(journals);
    expect(streak).toBe(3);
  });

  it('should return 0 for empty journals', () => {
    const streak = calculateStreak([]);
    expect(streak).toBe(0);
  });

  it('should handle single journal entry', () => {
    const journals = [{ createdAt: new Date().toISOString() }] as any;
    const streak = calculateStreak(journals);
    expect(streak).toBe(1);
  });

  it('should break streak with gap in days', () => {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const journals = [
      { createdAt: today.toISOString() },
      { createdAt: threeDaysAgo.toISOString() },
    ] as any;

    const streak = calculateStreak(journals);
    expect(streak).toBeLessThanOrEqual(1);
  });

  it('should handle journals with timestamps', () => {
    const today = Date.now();
    const yesterday = today - 24 * 60 * 60 * 1000;

    const journals = [
      { createdAt: today },
      { createdAt: yesterday },
    ] as any;

    const streak = calculateStreak(journals);
    expect(streak).toBeGreaterThanOrEqual(1);
  });
});

describe('getStreakEmoji', () => {
  it('should return fire emoji for active streak', () => {
    expect(getStreakEmoji(5)).toBe('🔥');
    expect(getStreakEmoji(1)).toBe('🔥');
  });

  it('should return star for milestone streaks', () => {
    expect(getStreakEmoji(7)).toBe('⭐');
    expect(getStreakEmoji(30)).toBe('⭐');
    expect(getStreakEmoji(100)).toBe('⭐');
  });

  it('should return empty for zero streak', () => {
    expect(getStreakEmoji(0)).toBe('');
  });
});

describe('isStreakActive', () => {
  it('should return true for journal from today', () => {
    const journals = [{ createdAt: new Date().toISOString() }] as any;
    expect(isStreakActive(journals)).toBe(true);
  });

  it('should return true for journal from yesterday', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const journals = [{ createdAt: yesterday.toISOString() }] as any;
    expect(isStreakActive(journals)).toBe(true);
  });

  it('should return false for old journals', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const journals = [{ createdAt: threeDaysAgo.toISOString() }] as any;
    expect(isStreakActive(journals)).toBe(false);
  });

  it('should return false for empty journals', () => {
    expect(isStreakActive([])).toBe(false);
  });

  it('should check most recent journal only', () => {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const journals = [
      { createdAt: today.toISOString() },
      { createdAt: fiveDaysAgo.toISOString() },
    ] as any;

    expect(isStreakActive(journals)).toBe(true);
  });
});
