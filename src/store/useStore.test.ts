import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('useStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useStore.setState({
      user: null,
      journals: [],
      burnoutPrediction: null,
      recoveryPlan: null,
    });
  });

  it('should initialize with default state', () => {
    const state = useStore.getState();
    expect(state.user).toBeNull();
    expect(state.journals).toEqual([]);
    expect(state.burnoutPrediction).toBeNull();
    expect(state.recoveryPlan).toBeNull();
  });

  it('should set user correctly', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
      displayName: 'Test User',
      photoURL: 'https://example.com/photo.jpg',
    };

    useStore.getState().setUser(mockUser);
    const state = useStore.getState();
    expect(state.user).toEqual(mockUser);
  });

  it('should set journals correctly', () => {
    const mockJournals = [
      {
        id: '1',
        userId: 'test-uid',
        content: 'Test journal 1',
        mood: 'happy',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        userId: 'test-uid',
        content: 'Test journal 2',
        mood: 'calm',
        createdAt: new Date().toISOString(),
      },
    ] as any;

    useStore.getState().setJournals(mockJournals);
    const state = useStore.getState();
    expect(state.journals).toEqual(mockJournals);
    expect(state.journals).toHaveLength(2);
  });

  it('should add journal to existing journals', () => {
    const existingJournal = {
      id: '1',
      userId: 'test-uid',
      content: 'Existing journal',
      mood: 'happy',
      createdAt: new Date().toISOString(),
    } as any;

    useStore.getState().setJournals([existingJournal]);

    const newJournal = {
      id: '2',
      userId: 'test-uid',
      content: 'New journal',
      mood: 'calm',
      createdAt: new Date().toISOString(),
    } as any;

    useStore.getState().setJournals([...useStore.getState().journals, newJournal]);
    const state = useStore.getState();
    expect(state.journals).toHaveLength(2);
    expect(state.journals[1]).toEqual(newJournal);
  });

  it('should set burnout prediction correctly', () => {
    const mockPrediction = {
      risk_level: 'moderate',
      risk_score: 65,
      factors: ['High workload', 'Poor sleep'],
      recommendations: ['Take breaks', 'Improve sleep hygiene'],
      timeline_forecast: [
        { day: 1, risk_score: 65, status: 'moderate' },
        { day: 3, risk_score: 70, status: 'high' },
      ],
    } as any;

    useStore.getState().setBurnoutPrediction(mockPrediction);
    const state = useStore.getState();
    expect(state.burnoutPrediction).toEqual(mockPrediction);
  });

  it('should set recovery plan correctly', () => {
    const mockRecoveryPlan = {
      overall_wellness: 65,
      priority_actions: ['Exercise daily', 'Meditate'],
      weekly_goals: ['Sleep 8 hours', 'Journal daily'],
      resources: ['Meditation app', 'Therapy'],
      timeline: '4 weeks',
    } as any;

    useStore.getState().setRecoveryPlan(mockRecoveryPlan);
    const state = useStore.getState();
    expect(state.recoveryPlan).toEqual(mockRecoveryPlan);
  });

  it('should clear user data', () => {
    const mockUser = {
      uid: 'test-uid',
      email: 'test@example.com',
    } as any;

    useStore.getState().setUser(mockUser);
    useStore.getState().setUser(null);
    
    const state = useStore.getState();
    expect(state.user).toBeNull();
  });

  it('should handle multiple state updates', () => {
    const mockUser = { uid: 'test-uid', email: 'test@example.com' } as any;
    const mockJournals = [
      { id: '1', content: 'Journal 1', mood: 'happy' },
    ] as any;
    const mockPrediction = { risk_level: 'low', risk_score: 30 } as any;

    useStore.getState().setUser(mockUser);
    useStore.getState().setJournals(mockJournals);
    useStore.getState().setBurnoutPrediction(mockPrediction);

    const state = useStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.journals).toEqual(mockJournals);
    expect(state.burnoutPrediction).toEqual(mockPrediction);
  });

  it('should maintain immutability when updating journals', () => {
    const journal1 = { id: '1', content: 'Journal 1' } as any;
    const journal2 = { id: '2', content: 'Journal 2' } as any;

    useStore.getState().setJournals([journal1]);
    const firstState = useStore.getState().journals;

    useStore.getState().setJournals([journal1, journal2]);
    const secondState = useStore.getState().journals;

    expect(firstState).not.toBe(secondState);
    expect(firstState).toHaveLength(1);
    expect(secondState).toHaveLength(2);
  });
});
