import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { useStore } from './store/useStore';
import { getUserProfile, getUserJournals } from './services/firestore.service';

import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Journal from './pages/Journal';
import BurnoutPredictor from './pages/BurnoutPredictor';
import Mentor from './pages/Mentor';
import ParentDashboard from './pages/ParentDashboard';
import RecoveryPlan from './pages/RecoveryPlan';
import Layout from './components/Layout';

function App() {
  const { user, setUser, setJournals, setLoading } = useStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      
      if (firebaseUser) {
        const userProfile = await getUserProfile(firebaseUser.uid);
        
        if (userProfile) {
          setUser(userProfile);
          const journals = await getUserJournals(firebaseUser.uid);
          setJournals(journals);
        } else {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email!,
            displayName: firebaseUser.displayName || 'Student',
            photoURL: firebaseUser.photoURL || '',
          });
        }
      } else {
        setUser(null);
        setJournals([]);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setJournals, setLoading]);

  const needsOnboarding = user && !user.examType;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/onboarding" element={
          user && needsOnboarding ? <Onboarding /> : <Navigate to="/" />
        } />
        
        <Route path="/" element={
          !user ? <Navigate to="/login" /> :
          needsOnboarding ? <Navigate to="/onboarding" /> :
          <Layout />
        }>
          <Route index element={<Dashboard />} />
          <Route path="journal" element={<Journal />} />
          <Route path="recovery-plan" element={<RecoveryPlan />} />
          <Route path="burnout-predictor" element={<BurnoutPredictor />} />
          <Route path="mentor" element={<Mentor />} />
          <Route path="parent-dashboard" element={<ParentDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
