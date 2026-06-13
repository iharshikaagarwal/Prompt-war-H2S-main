import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { analyzeJournal, generateRecoveryPlan } from '../services/gemini.service';
import { saveJournalEntry } from '../services/firestore.service';
import { startVoiceRecording, isSpeechRecognitionSupported, type SpeechRecognition } from '../utils/speech';
import { showToast } from '../utils/toast';
import type { MoodType } from '../types';
import { Mic, MicOff, Loader, Send, Sparkles, Calendar, Clock, Book } from 'lucide-react';

const MOODS: { type: MoodType; emoji: string; label: string }[] = [
  { type: 'happy', emoji: '😊', label: 'Happy' },
  { type: 'good', emoji: '🙂', label: 'Good' },
  { type: 'neutral', emoji: '😐', label: 'Neutral' },
  { type: 'worried', emoji: '😟', label: 'Worried' },
  { type: 'stressed', emoji: '😰', label: 'Stressed' },
];

export default function Journal() {
  const navigate = useNavigate();
  const { user, addJournal } = useStore();
  
  const [mood, setMood] = useState<MoodType | ''>('');
  const [journalText, setJournalText] = useState('');
  const [studyHours, setStudyHours] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVoiceEntry, setIsVoiceEntry] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleStartRecording = () => {
    if (!isSpeechRecognitionSupported()) {
      showToast.error('Voice recording is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    const rec = startVoiceRecording(
      (transcript, isFinal) => {
        if (isFinal) {
          setJournalText(prev => prev + ' ' + transcript);
        }
      },
      (error) => {
        console.error('Voice recording error:', error);
        showToast.error('Voice recording failed. Please try again.');
        setIsRecording(false);
        setRecognition(null);
      }
    );

    if (rec) {
      setRecognition(rec);
      setIsRecording(true);
      setIsVoiceEntry(true);
    }
  };

  const handleStopRecording = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
    setIsRecording(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mood || !journalText.trim() || !user) {
      showToast.error('Please select a mood and write your journal entry');
      return;
    }

    setIsAnalyzing(true);

    try {
      const analysis = await analyzeJournal(
        journalText,
        mood,
        user.examType!,
        user.persona!,
        studyHours ? parseFloat(studyHours) : undefined,
        sleepHours ? parseFloat(sleepHours) : undefined
      );

      const recoveryPlan = await generateRecoveryPlan(
        analysis,
        user.examType!,
        user.persona!
      );

      const journalEntry = {
        id: `${user.uid}_${Date.now()}`,
        userId: user.uid,
        date: new Date(),
        mood,
        journalText,
        isVoiceEntry,
        studyHours: studyHours ? parseFloat(studyHours) : undefined,
        sleepHours: sleepHours ? parseFloat(sleepHours) : undefined,
        analysis,
        recoveryPlan,
        timestamp: new Date(),
      };

      await saveJournalEntry(journalEntry);
      addJournal(journalEntry);

      setAnalysisComplete(true);
      showToast.success('Journal analyzed successfully!');
      setTimeout(() => {
        navigate('/recovery-plan');
      }, 2000);
    } catch (error) {
      console.error('Journal submission error:', error);
      showToast.error('Failed to analyze journal. Please try again.');
      setIsAnalyzing(false);
    }
  };

  if (analysisComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Sparkles className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Analysis Complete!</h2>
          <p className="text-gray-600 mb-4">
            Your journal has been analyzed and your personalized recovery plan is ready.
          </p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Journal</h1>
        <p className="text-gray-600">Share your thoughts and let AI understand your mental state</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">How are you feeling today?</h2>
              <p className="text-sm text-gray-600">Select your current mood</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {MOODS.map((m) => (
              <button
                key={m.type}
                type="button"
                onClick={() => setMood(m.type)}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  mood === m.type
                    ? 'border-blue-600 bg-blue-50 scale-105'
                    : 'border-gray-200 hover:border-gray-300 hover:scale-105'
                }`}
              >
                <span className="text-4xl">{m.emoji}</span>
                <span className="text-sm font-semibold text-gray-700">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Book className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Write Your Journal</h2>
                <p className="text-sm text-gray-600">Express your thoughts freely</p>
              </div>
            </div>

            {isSpeechRecognitionSupported() && (
              <button
                type="button"
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  isRecording
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    Voice Journal
                  </>
                )}
              </button>
            )}
          </div>

          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="How was your day? What are you worried about? What went well? Share anything on your mind..."
            rows={8}
            className="textarea-field"
            disabled={isRecording}
          />

          {isRecording && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-700 font-medium">Recording... Speak freely</span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <label className="font-semibold text-gray-900">Study Hours Today</label>
            </div>
            <input
              type="number"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              placeholder="e.g., 6.5"
              step="0.5"
              min="0"
              max="24"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-2">Optional but helps AI give better advice</p>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-purple-600" />
              <label className="font-semibold text-gray-900">Sleep Hours Last Night</label>
            </div>
            <input
              type="number"
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              placeholder="e.g., 7"
              step="0.5"
              min="0"
              max="24"
              className="input-field"
            />
            <p className="text-xs text-gray-500 mt-2">Optional but helps AI give better advice</p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isAnalyzing || !mood || !journalText.trim()}
          className="btn-primary w-full flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit & Get AI Analysis
            </>
          )}
        </button>
      </form>
    </div>
  );
}
