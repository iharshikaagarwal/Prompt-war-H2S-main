import { useStore } from '../store/useStore';
import { Clock, Book, Coffee, Sparkles, Sunrise, Moon, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RecoveryPlan() {
  const { journals } = useStore();
  
  const latestJournal = journals.length > 0 ? journals[0] : null;
  const recoveryPlan = latestJournal?.recoveryPlan;

  if (!recoveryPlan) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Recovery Plan Yet</h2>
          <p className="text-gray-600 mb-6">
            Create a journal entry to get your personalized AI-generated recovery plan
          </p>
          <a href="/journal" className="btn-primary inline-block">
            Create Journal Entry
          </a>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="max-w-5xl mx-auto space-y-8"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Personalized Recovery Plan</h1>
        <p className="text-gray-600">
          AI-generated schedule optimized for your mental wellness
        </p>
      </motion.div>

      <motion.div className="card bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200" variants={item}>
        <div className="flex items-center gap-3 mb-4">
          <Sunrise className="w-6 h-6 text-orange-600" />
          <h2 className="text-xl font-bold text-gray-900">Morning Routine</h2>
        </div>
        <div className="text-center py-6">
          <p className="text-sm text-gray-600 mb-2">Wake Up Time</p>
          <p className="text-4xl font-bold text-purple-600">{recoveryPlan.wake_up_time}</p>
        </div>
      </motion.div>

      <motion.div className="card" variants={item}>
        <div className="flex items-center gap-3 mb-6">
          <Book className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Study Blocks</h2>
        </div>
        <div className="space-y-4">
          {recoveryPlan.study_blocks.map((block, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{block.subject}</h3>
                <p className="text-sm text-gray-600">
                  {block.start_time} - {block.end_time} ({block.duration_minutes} minutes)
                </p>
              </div>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="card" variants={item}>
        <div className="flex items-center gap-3 mb-6">
          <Coffee className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Scheduled Breaks</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {recoveryPlan.breaks.map((breakItem, index) => (
            <div key={index} className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{breakItem.start_time}</span>
                <span className="text-sm text-green-600 font-medium">{breakItem.duration_minutes} min</span>
              </div>
              <p className="text-sm text-gray-600">{breakItem.activity}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200" variants={item}>
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Meditation Session</h2>
        </div>
        <div className="text-center py-4">
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">{recoveryPlan.meditation_time}</span>
          </p>
          <p className="text-sm text-purple-600 font-medium">
            {recoveryPlan.meditation_duration} minutes of mindfulness
          </p>
        </div>
      </motion.div>

      <motion.div className="card bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200" variants={item}>
        <div className="flex items-center gap-3 mb-4">
          <Moon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900">Night Routine</h2>
        </div>
        <div className="text-center py-6">
          <p className="text-sm text-gray-600 mb-2">Recommended Sleep Time</p>
          <p className="text-4xl font-bold text-indigo-600">{recoveryPlan.sleep_time}</p>
        </div>
      </motion.div>

      <motion.div className="card" variants={item}>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-yellow-600" />
          <h2 className="text-xl font-bold text-gray-900">Additional Wellness Tips</h2>
        </div>
        <ul className="space-y-3">
          {recoveryPlan.additional_suggestions.map((suggestion, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-semibold text-sm flex-shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-gray-700">{suggestion}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div className="card bg-blue-50 border-2 border-blue-200" variants={item}>
        <p className="text-sm text-blue-800">
          💡 <strong>Pro Tip:</strong> Set phone reminders for each activity to stay on track. 
          Consistency is key to recovery!
        </p>
      </motion.div>
    </motion.div>
  );
}
