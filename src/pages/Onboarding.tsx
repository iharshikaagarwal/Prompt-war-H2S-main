import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { createUserProfile } from '../services/firestore.service';
import { showToast } from '../utils/toast';
import type { ExamType, PersonaType } from '../types';
import { GraduationCap, User, Mail, ArrowRight } from 'lucide-react';

const EXAM_TYPES: ExamType[] = ['JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'CUET', 'Boards'];

const PERSONAS: { type: PersonaType; label: string; description: string }[] = [
  {
    type: 'strict',
    label: 'Strict Mentor',
    description: 'Direct, disciplined guidance focused on structure and accountability',
  },
  {
    type: 'friendly',
    label: 'Friendly Senior',
    description: 'Warm, empathetic support like talking to an understanding friend',
  },
  {
    type: 'motivational',
    label: 'Motivational Coach',
    description: 'Energetic, inspiring encouragement focused on your potential',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [step, setStep] = useState(1);
  const [examType, setExamType] = useState<ExamType | ''>('');
  const [persona, setPersona] = useState<PersonaType | ''>('');
  const [parentEmail, setParentEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!examType || !persona || !user) return;

    setLoading(true);
    try {
      await createUserProfile(
        user.uid,
        user.email,
        user.displayName,
        user.photoURL,
        examType,
        persona,
        parentEmail || undefined
      );

      setUser({
        ...user,
        examType,
        persona,
        parentEmail: parentEmail || undefined,
        createdAt: new Date(),
      });

      navigate('/');
    } catch (error) {
      console.error('Onboarding error:', error);
      showToast.error('Failed to complete onboarding. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Let's Get You Started
          </h1>
          <p className="text-gray-600">
            Step {step} of 3 - We'll personalize your experience
          </p>
        </div>

        <div className="card space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Which exam are you preparing for?</h2>
                  <p className="text-sm text-gray-600">We'll tailor guidance to your exam</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {EXAM_TYPES.map((exam) => (
                  <button
                    key={exam}
                    onClick={() => setExamType(exam)}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                      examType === exam
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {exam}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!examType}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Choose Your AI Mentor Persona</h2>
                  <p className="text-sm text-gray-600">This affects how AI communicates with you</p>
                </div>
              </div>

              <div className="space-y-3">
                {PERSONAS.map((p) => (
                  <button
                    key={p.type}
                    onClick={() => setPersona(p.type)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                      persona === p.type
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{p.label}</h3>
                    <p className="text-sm text-gray-600">{p.description}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary flex-1">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!persona}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-pink-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Parent Dashboard Access (Optional)</h2>
                  <p className="text-sm text-gray-600">
                    Parents can view your wellness trends without seeing journal content
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent's Email (Optional)
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="parent@example.com"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 mt-2">
                  They'll receive view-only access to your wellness scores and trends
                </p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary flex-1">
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {loading ? 'Setting up...' : 'Complete Setup'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
