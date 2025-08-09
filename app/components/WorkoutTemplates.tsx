'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Target, 
  Trophy, 
  Users, 
  Calendar,
  Play,
  BookOpen,
  Star,
  Filter,
  Search
} from 'lucide-react';
import { workoutTemplates, workoutPlans } from '../data/workoutTemplates';
import { Workout, WorkoutPlan } from '../types';
import toast from 'react-hot-toast';

interface WorkoutTemplatesProps {
  onSelectWorkout: (workout: Workout) => void;
  className?: string;
}

export default function WorkoutTemplates({ onSelectWorkout, className = '' }: WorkoutTemplatesProps) {
  const [activeTab, setActiveTab] = useState<'workouts' | 'plans'>('workouts');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  const filteredWorkouts = workoutTemplates.filter(workout => {
    const matchesDifficulty = selectedDifficulty === 'all' || workout.difficulty === selectedDifficulty;
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const filteredPlans = workoutPlans.filter(plan => {
    const matchesDifficulty = selectedDifficulty === 'all' || plan.targetLevel === selectedDifficulty;
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  const handleSelectWorkout = (workout: Workout) => {
    onSelectWorkout(workout);
    toast.success(`${workout.name} selected!`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header and Tabs */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Workout Templates</h2>
            <p className="text-gray-400">Choose from pre-built workouts or complete programs</p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveTab('workouts')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'workouts'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="h-4 w-4 inline mr-2" />
              Workouts
            </button>
            <button
              onClick={() => setActiveTab('plans')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'plans'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Programs
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search workouts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-full pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="bg-gray-800 border border-gray-600 rounded-full px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'workouts' ? (
          <motion.div
            key="workouts"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredWorkouts.map((workout, index) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                onClick={() => handleSelectWorkout(workout)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">{workout.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(workout.difficulty)} text-white text-xs font-medium`}>
                    {getDifficultyIcon(workout.difficulty)} {workout.difficulty}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Clock className="h-4 w-4 text-blue-400" />
                    <span>{workout.duration}min</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-300">
                    <Target className="h-4 w-4 text-green-400" />
                    <span>{workout.exercises.length} exercises</span>
                  </div>
                </div>

                {/* Category */}
                <div className="flex items-center justify-between">
                  <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                    {workout.category}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                  >
                    <Play className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="plans"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {filteredPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                onClick={() => setSelectedPlan(plan)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">{plan.description}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(plan.targetLevel)} text-white text-xs font-medium`}>
                    {getDifficultyIcon(plan.targetLevel)} {plan.targetLevel}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{plan.duration}</div>
                    <div className="text-xs text-gray-400">weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{plan.workouts.length}</div>
                    <div className="text-xs text-gray-400">workouts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      {plan.workouts.reduce((acc, w) => acc + w.exercises.length, 0)}
                    </div>
                    <div className="text-xs text-gray-400">exercises</div>
                  </div>
                </div>

                {/* Workouts Preview */}
                <div className="space-y-2 mb-4">
                  <div className="text-sm font-medium text-gray-300">Includes:</div>
                  {plan.workouts.slice(0, 3).map((workout, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{workout.name}</span>
                    </div>
                  ))}
                  {plan.workouts.length > 3 && (
                    <div className="text-sm text-gray-500">+{plan.workouts.length - 3} more...</div>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                >
                  <Trophy className="h-5 w-5" />
                  <span>Start Program</span>
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plan Detail Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPlan(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedPlan.name}</h2>
                  <p className="text-gray-400 mt-2">{selectedPlan.description}</p>
                </div>
                <button
                  onClick={() => setSelectedPlan(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {selectedPlan.workouts.map((workout, index) => (
                  <div key={index} className="bg-gray-800 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{workout.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{workout.description}</p>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span>{workout.duration}min</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-300">
                        <Target className="h-4 w-4 text-green-400" />
                        <span>{workout.exercises.length} exercises</span>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        handleSelectWorkout(workout);
                        setSelectedPlan(null);
                      }}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                    >
                      Select This Workout
                    </motion.button>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
