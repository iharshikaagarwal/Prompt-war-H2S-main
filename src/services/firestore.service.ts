import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { User, JournalEntry, ExamType, PersonaType, ParentDashboardData } from '../types';

export async function createUserProfile(
  uid: string,
  email: string,
  displayName: string,
  photoURL: string,
  examType: ExamType,
  persona: PersonaType,
  parentEmail?: string
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, {
    uid,
    email,
    displayName,
    photoURL,
    examType,
    persona,
    parentEmail: parentEmail || null,
    createdAt: Timestamp.now(),
  });
}

export async function getUserProfile(uid: string): Promise<User | null> {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    const data = userSnap.data();
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
    } as User;
  }
  
  return null;
}

export async function updateUserProfile(
  uid: string, 
  updates: Partial<User>
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, updates, { merge: true });
}

export async function saveJournalEntry(journal: JournalEntry): Promise<void> {
  const journalRef = doc(db, 'users', journal.userId, 'journals', journal.id);
  await setDoc(journalRef, {
    ...journal,
    date: Timestamp.fromDate(journal.date),
    timestamp: Timestamp.fromDate(journal.timestamp),
  });
}

export async function getUserJournals(
  userId: string, 
  limitCount: number = 30
): Promise<JournalEntry[]> {
  const journalsRef = collection(db, 'users', userId, 'journals');
  const q = query(
    journalsRef,
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  );
  
  const querySnapshot = await getDocs(q);
  const journals: JournalEntry[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    journals.push({
      ...data,
      date: data.date.toDate(),
      timestamp: data.timestamp.toDate(),
    } as JournalEntry);
  });
  
  return journals;
}

export async function getParentDashboardData(userId: string): Promise<ParentDashboardData> {
  const journals = await getUserJournals(userId, 30);
  
  if (journals.length === 0) {
    return {
      consistency_score: 0,
      stress_trend: [],
      burnout_risk: 0,
      focus_trend: [],
      last_updated: new Date(),
      total_entries: 0,
      streak_days: 0,
    };
  }
  
  const last7Days = journals.slice(0, 7);
  const stressTrend = last7Days.map(j => j.analysis.stress_score).reverse();
  const focusTrend = last7Days.map(j => j.analysis.focus_score).reverse();
  const avgBurnout = last7Days.reduce((sum, j) => 
    sum + j.analysis.burnout_risk, 0) / last7Days.length;
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < journals.length; i++) {
    const journalDate = new Date(journals[i].date);
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
  
  const consistencyScore = Math.min(100, (journals.length / 30) * 100 + (streak * 5));
  
  return {
    consistency_score: Math.round(consistencyScore),
    stress_trend: stressTrend,
    burnout_risk: Math.round(avgBurnout),
    focus_trend: focusTrend,
    last_updated: new Date(),
    total_entries: journals.length,
    streak_days: streak,
  };
}
