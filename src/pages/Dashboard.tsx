import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Brain, TrendingUp, Target, Zap, AlertTriangle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import WellnessGauge from '../components/WellnessGauge';
import { calculateStreak } from '../utils/streak';
import type { MoodType } from '../types';

interface ChartData {
  day: string;
  date: string;
  stress: number;
  focus: number;
  motivation: number;
  burnout: number;
  mood: string;
}

const MOOD_EMOJIS: Record<MoodType, string> = {
  happy: '😊',
  good: '🙂',
  neutral: '😐',
  worried: '😟',
  stressed: '😰',
};

export default function Dashboard() {
  const { journals, calculateWellnessScore, isLoading } = useStore();
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    const recentJournals = journals.slice(0, 7).reverse();
    const data = recentJournals.map((journal, index) => ({
      day: `Day ${index + 1}`,
      date: new Date(journal.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      stress: journal.analysis.stress_score,
      focus: journal.analysis.focus_score,
      motivation: journal.analysis.motivation_score,
      burnout: journal.analysis.burnout_risk,
      mood: MOOD_EMOJIS[journal.mood],
    }));
    setChartData(data);
  }, [journals]);

  const wellnessScore = calculateWellnessScore();
  const recentJournals = journals.slice(0, 7);

  const avgStress = recentJournals.length > 0
    ? Math.round(recentJournals.reduce((sum, j) => sum + j.analysis.stress_score, 0) / recentJournals.length)
    : 0;
  const avgFocus = recentJournals.length > 0
    ? Math.round(recentJournals.reduce((sum, j) => sum + j.analysis.focus_score, 0) / recentJournals.length)
    : 0;
  const avgMotivation = recentJournals.length > 0
    ? Math.round(recentJournals.reduce((sum, j) => sum + j.analysis.motivation_score, 0) / recentJournals.length)
    : 0;
  const avgBurnout = recentJournals.length > 0
    ? Math.round(recentJournals.reduce((sum, j) => sum + j.analysis.burnout_risk, 0) / recentJournals.length)
    : 0;

  const streak = calculateStreak(journals);

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-20 bg-gray-200 rounded-xl"></div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 rounded-xl"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
        <div className="h-80 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wellness Dashboard</h1>
        <p className="text-gray-600">Your mental health journey at a glance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">AI Wellness Twin</h2>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-4">
              <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {wellnessScore}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Mental Wellness Score</h3>
            <p className="text-sm text-gray-600">
              {wellnessScore >= 75 ? 'Excellent! Keep it up!' :
               wellnessScore >= 50 ? 'Good progress, stay consistent' :
               wellnessScore >= 25 ? 'Needs attention, let\'s improve' :
               'Critical - Please talk to someone'}
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4">
            <WellnessGauge
              label="Stress"
              value={100 - avgStress}
              color={avgStress > 70 ? 'red' : avgStress > 40 ? 'yellow' : 'green'}
              icon={<AlertTriangle className="w-5 h-5" />}
            />
            <WellnessGauge
              label="Focus"
              value={avgFocus}
              color={avgFocus > 70 ? 'blue' : avgFocus > 40 ? 'yellow' : 'red'}
              icon={<Target className="w-5 h-5" />}
            />
            <WellnessGauge
              label="Motivation"
              value={avgMotivation}
              color={avgMotivation > 70 ? 'purple' : avgMotivation > 40 ? 'yellow' : 'red'}
              icon={<Zap className="w-5 h-5" />}
            />
            <WellnessGauge
              label="Burnout Risk"
              value={100 - avgBurnout}
              color={avgBurnout > 70 ? 'red' : avgBurnout > 40 ? 'yellow' : 'green'}
              icon={<AlertTriangle className="w-5 h-5" />}
            />
            <WellnessGauge
              label="Streak"
              value={streak}
              max={30}
              color="blue"
              icon={<Calendar className="w-5 h-5" />}
            />
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Mood Pattern</h2>
            <TrendingUp className="w-6 h-6 text-blue-600" />
          </div>

          <div className="space-y-3">
            {recentJournals.slice(0, 5).map((journal) => (
              <div key={journal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{MOOD_EMOJIS[journal.mood]}</span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {new Date(journal.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-600">{journal.analysis.emotion}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Wellness</p>
                  <p className={`text-lg font-bold ${
                    journal.analysis.stress_score < 40 ? 'text-green-600' :
                    journal.analysis.stress_score < 70 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {Math.round(
                      (100 - journal.analysis.stress_score) * 0.4 +
                      journal.analysis.focus_score * 0.3 +
                      journal.analysis.motivation_score * 0.3
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {journals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No journal entries yet</p>
              <a href="/journal" className="btn-primary inline-block">
                Create Your First Entry
              </a>
            </div>
          )}
        </div>
      </div>

      {journals.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 mb-4">No data to show trends yet. Keep journaling!</p>
        </div>
      ) : chartData.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">7-Day Wellness Trends</h2>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="stress" 
                stroke="#ef4444" 
                strokeWidth={2}
                name="Stress"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="focus" 
                stroke="#3b82f6" 
                strokeWidth={2}
                name="Focus"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="motivation" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                name="Motivation"
                dot={{ r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="burnout" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Burnout Risk"
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}


