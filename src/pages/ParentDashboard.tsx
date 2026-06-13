import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { getParentDashboardData } from '../services/firestore.service';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, TrendingUp, AlertCircle, Target, Award, Calendar } from 'lucide-react';
import type { ParentDashboardData } from '../types';

export default function ParentDashboard() {
  const { user } = useStore();
  const [data, setData] = useState<ParentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const dashboardData = await getParentDashboardData(user.uid);
      setData(dashboardData);
    } catch (error) {
      console.error('Failed to load parent dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600">No data available yet</p>
      </div>
    );
  }

  const stressChartData = data.stress_trend.map((value, index) => ({
    day: `Day ${index + 1}`,
    stress: value,
  }));

  const focusChartData = data.focus_trend.map((value, index) => ({
    day: `Day ${index + 1}`,
    focus: value,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Parent Dashboard</h1>
          <p className="text-gray-600">
            Privacy-protected wellness overview - No private journal content visible
          </p>
        </div>
        <div className="text-right text-sm text-gray-500">
          Last updated: {new Date(data.last_updated).toLocaleString()}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <Award className="w-8 h-8 text-blue-600" />
            <span className="text-4xl font-bold text-blue-600">
              {data.consistency_score}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Consistency Score</h3>
          <p className="text-sm text-gray-600">
            Based on daily journaling habits
          </p>
        </div>

        <div className={`card border-2 ${
          data.burnout_risk > 70 ? 'bg-red-50 border-red-300' :
          data.burnout_risk > 40 ? 'bg-yellow-50 border-yellow-300' :
          'bg-green-50 border-green-300'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className={`w-8 h-8 ${
              data.burnout_risk > 70 ? 'text-red-600' :
              data.burnout_risk > 40 ? 'text-yellow-600' :
              'text-green-600'
            }`} />
            <span className={`text-4xl font-bold ${
              data.burnout_risk > 70 ? 'text-red-600' :
              data.burnout_risk > 40 ? 'text-yellow-600' :
              'text-green-600'
            }`}>
              {data.burnout_risk}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Burnout Risk</h3>
          <p className="text-sm text-gray-600">
            {data.burnout_risk > 70 ? 'High - Needs attention' :
             data.burnout_risk > 40 ? 'Moderate - Monitor' :
             'Low - Healthy'}
          </p>
        </div>

        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
            <span className="text-4xl font-bold text-purple-600">
              {data.streak_days}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Day Streak</h3>
          <p className="text-sm text-gray-600">
            Consecutive days journaling
          </p>
        </div>

        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 text-green-600" />
            <span className="text-4xl font-bold text-green-600">
              {data.total_entries}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Total Entries</h3>
          <p className="text-sm text-gray-600">
            Journal entries logged
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Stress Trend (7 Days)</h2>
          </div>
          {stressChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={stressChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="stress" 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#ef4444' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-12">No data available</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Focus Trend (7 Days)</h2>
          </div>
          {focusChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={focusChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="focus" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center text-gray-500 py-12">No data available</p>
          )}
        </div>
      </div>

      <div className="card bg-blue-50 border-2 border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Privacy Notice</h2>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <p>✓ This dashboard shows only aggregated wellness metrics</p>
          <p>✓ Private journal content is NOT visible to parents</p>
          <p>✓ Only trends, scores, and consistency data are displayed</p>
          <p>✓ Designed to respect student privacy while keeping parents informed</p>
        </div>
      </div>
    </div>
  );
}
