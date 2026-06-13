import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { predictBurnout } from '../services/gemini.service';
import { showToast } from '../utils/toast';
import { AlertTriangle, TrendingUp, Lightbulb, Loader, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { BurnoutPrediction } from '../types';

export default function BurnoutPredictor() {
  const { user, getRecentJournals, currentBurnoutPrediction, setBurnoutPrediction } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<BurnoutPrediction | null>(currentBurnoutPrediction);

  useEffect(() => {
    if (currentBurnoutPrediction) {
      setPrediction(currentBurnoutPrediction);
    }
  }, [currentBurnoutPrediction]);

  const handlePredict = async () => {
    if (!user) return;

    const recentJournals = getRecentJournals(7);

    if (recentJournals.length < 3) {
      showToast.error('You need at least 3 journal entries to predict burnout. Keep journaling!');
      return;
    }

    setIsLoading(true);

    try {
      const journalData = recentJournals.map(j => ({
        date: j.date,
        mood: j.mood,
        analysis: j.analysis,
        studyHours: j.studyHours,
        sleepHours: j.sleepHours,
      }));

      const result = await predictBurnout(journalData, user.persona!);
      setPrediction(result);
      setBurnoutPrediction(result);
      showToast.success('Burnout prediction complete!');
    } catch (error) {
      console.error('Burnout prediction error:', error);
      showToast.error('Failed to predict burnout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low':
        return '✅';
      case 'medium':
        return '⚠️';
      case 'high':
        return '🔥';
      case 'critical':
        return '🚨';
      default:
        return '❓';
    }
  };

  const recentJournals = getRecentJournals(7);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Burnout Predictor</h1>
        <p className="text-gray-600">AI analyzes your 7-day patterns to predict burnout before it happens</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Predict Your Burnout Risk</h2>
              <p className="text-sm text-gray-600">
                {recentJournals.length} of 7 days logged
              </p>
            </div>
          </div>

          <button
            onClick={handlePredict}
            disabled={isLoading || recentJournals.length < 3}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                {prediction ? 'Refresh Prediction' : 'Analyze Burnout Risk'}
              </>
            )}
          </button>
        </div>

        {recentJournals.length < 3 && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800">
              You need at least 3 journal entries to predict burnout. Keep journaling daily for accurate predictions!
            </p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="card space-y-6 animate-pulse">
          <div className="h-40 bg-gray-200 rounded-xl"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-60 bg-gray-200 rounded-xl"></div>
            <div className="h-60 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      )}

      {prediction && !isLoading && (
        <div className="space-y-6">
          <div className={`card border-4 ${getRiskColor(prediction.risk_level)}`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{getRiskIcon(prediction.risk_level)}</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {prediction.burnout_probability}% Burnout Risk
              </h3>
              <span className={`inline-block px-6 py-2 rounded-full text-lg font-bold uppercase ${getRiskColor(prediction.risk_level)}`}>
                {prediction.risk_level} Risk
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-6 mb-6">
              <div
                className={`h-6 rounded-full transition-all duration-500 ${
                  prediction.risk_level === 'critical' ? 'bg-red-800' :
                  prediction.risk_level === 'high' ? 'bg-red-600' :
                  prediction.risk_level === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${prediction.burnout_probability}%` }}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <h4 className="font-bold text-gray-900">Risk Factors Detected</h4>
                </div>
                <ul className="space-y-2">
                  {prediction.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Recommended Actions</h4>
                </div>
                <ul className="space-y-2">
                  {prediction.recommended_actions.map((action, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">✓</span>
                      <span className="text-gray-700 text-sm">{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-bold text-gray-900">Trend Analysis</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">{prediction.trend_analysis}</p>
          </div>

          {(prediction.risk_level === 'high' || prediction.risk_level === 'critical') && (
            <div className="card border-2 border-red-300 bg-red-50">
              <h3 className="text-xl font-bold text-red-900 mb-3">🚨 Immediate Action Needed</h3>
              <p className="text-red-800 mb-4">
                Your burnout risk is critically high. Please consider taking immediate steps to protect your mental health:
              </p>
              <ul className="space-y-2 text-red-800">
                <li>• Talk to a parent, teacher, or counselor</li>
                <li>• Take a complete day off to rest and recover</li>
                <li>• Reduce study hours and increase sleep</li>
                <li>• Practice relaxation techniques (meditation, breathing exercises)</li>
                <li>• If stress persists, consider professional mental health support</li>
              </ul>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
