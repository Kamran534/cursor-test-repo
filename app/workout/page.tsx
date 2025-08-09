'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Play, 
  Clock, 
  Target,
  Trophy,
  Dumbbell,
  Heart,
  Zap,
  ArrowLeft,
  Save,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import { exercises, getExercisesByCategory, getExercisesByDifficulty } from '../data/exercises';
import { Exercise, WorkoutExercise, WorkoutSet } from '../types';
import AIChat from '../components/AIChat';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const categories = [
  { id: 'all', name: 'All', icon: Dumbbell, color: 'from-gray-500 to-gray-600' },
  { id: 'chest', name: 'Chest', icon: Heart, color: 'from-red-500 to-pink-500' },
  { id: 'back', name: 'Back', icon: Target, color: 'from-blue-500 to-cyan-500' },
  { id: 'legs', name: 'Legs', icon: Zap, color: 'from-yellow-500 to-orange-500' },
  { id: 'shoulders', name: 'Shoulders', icon: Trophy, color: 'from-purple-500 to-indigo-500' },
  { id: 'arms', name: 'Arms', icon: Dumbbell, color: 'from-green-500 to-emerald-500' },
  { id: 'core', name: 'Core', icon: Target, color: 'from-orange-500 to-red-500' },
  { id: 'cardio', name: 'Cardio', icon: Heart, color: 'from-pink-500 to-rose-500' }
];

const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

export default function WorkoutPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExercises, setFilteredExercises] = useState(exercises);
  const [currentWorkout, setCurrentWorkout] = useState<WorkoutExercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isWorkoutMode, setIsWorkoutMode] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);

  useEffect(() => {
    let filtered = exercises;

    if (selectedCategory !== 'all') {
      filtered = getExercisesByCategory(selectedCategory);
    }

    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }

    if (searchTerm) {
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.muscleGroups.some(mg => mg.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredExercises(filtered);
  }, [selectedCategory, selectedDifficulty, searchTerm]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => {
          if (prev <= 1) {
            setIsResting(false);
            toast.success('Rest time over! Ready for the next set! 💪');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  const addExerciseToWorkout = (exercise: Exercise) => {
    const workoutExercise: WorkoutExercise = {
      exercise,
      sets: [{ reps: 10, weight: 0, restTime: 60 }],
      notes: ''
    };
    setCurrentWorkout(prev => [...prev, workoutExercise]);
    toast.success(`${exercise.name} added to workout!`);
  };

  const removeExerciseFromWorkout = (index: number) => {
    setCurrentWorkout(prev => prev.filter((_, i) => i !== index));
    toast.success('Exercise removed from workout');
  };

  const updateExerciseSets = (exerciseIndex: number, sets: WorkoutSet[]) => {
    setCurrentWorkout(prev => prev.map((item, i) => 
      i === exerciseIndex ? { ...item, sets } : item
    ));
  };

  const startWorkout = () => {
    if (currentWorkout.length === 0) {
      toast.error('Please add some exercises to your workout first!');
      return;
    }
    setIsWorkoutMode(true);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    toast.success('Workout started! Let\'s get pumped! 🔥');
  };

  const completeSet = () => {
    const currentExercise = currentWorkout[currentExerciseIndex];
    const restTime = currentExercise.sets[currentSet - 1]?.restTime || 60;
    
    if (currentSet < currentExercise.sets.length) {
      setCurrentSet(prev => prev + 1);
      setRestTimer(restTime);
      setIsResting(true);
      toast.success(`Set ${currentSet} complete! Rest for ${restTime}s`);
    } else {
      // Move to next exercise
      if (currentExerciseIndex < currentWorkout.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setCurrentSet(1);
        toast.success('Exercise complete! Moving to next exercise 🎯');
      } else {
        // Workout complete
        setIsWorkoutMode(false);
        setCurrentExerciseIndex(0);
        setCurrentSet(1);
        toast.success('🎉 Workout Complete! Great job! 🎉');
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isWorkoutMode) {
    const currentExercise = currentWorkout[currentExerciseIndex];
    const currentSetData = currentExercise.sets[currentSet - 1];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between mb-8"
          >
            <button
              onClick={() => setIsWorkoutMode(false)}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Exit Workout</span>
            </button>
            <div className="text-center">
              <h1 className="text-2xl font-bold">Workout in Progress</h1>
              <p className="text-gray-400">Exercise {currentExerciseIndex + 1} of {currentWorkout.length}</p>
            </div>
            <div className="w-20" />
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: (currentExerciseIndex + (currentSet / currentExercise.sets.length)) / currentWorkout.length }}
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-8 origin-left"
          />

          {/* Current Exercise */}
          <motion.div
            key={currentExerciseIndex}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-8"
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">{currentExercise.exercise.name}</h2>
              <p className="text-gray-400">Set {currentSet} of {currentExercise.sets.length}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                <ul className="space-y-2">
                  {currentExercise.exercise.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-blue-500 font-bold">{index + 1}.</span>
                      <span className="text-gray-300">{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <h3 className="text-lg font-semibold mb-4">Current Set</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Reps:</span>
                      <span className="font-bold text-blue-400">{currentSetData.reps}</span>
                    </div>
                    {currentSetData.weight && (
                      <div className="flex justify-between">
                        <span>Weight:</span>
                        <span className="font-bold text-green-400">{currentSetData.weight} lbs</span>
                      </div>
                    )}
                    {currentSetData.duration && (
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="font-bold text-yellow-400">{currentSetData.duration}s</span>
                      </div>
                    )}
                  </div>
                </div>

                {isResting ? (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="bg-orange-500/20 border border-orange-500 rounded-xl p-6 text-center"
                  >
                    <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <h3 className="text-lg font-semibold mb-2">Rest Time</h3>
                    <div className="text-3xl font-bold text-orange-400">
                      {formatTime(restTimer)}
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={completeSet}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Complete Set
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        <AIChat />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold">Workout Planner</h1>
          <div className="flex items-center space-x-4">
            {currentWorkout.length > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startWorkout}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold flex items-center space-x-2"
              >
                <Play className="h-4 w-4" />
                <span>Start Workout</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exercise Browser */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-full pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-gray-800 border border-gray-600 rounded-full px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>
                      {diff === 'all' ? 'All Levels' : diff.charAt(0).toUpperCase() + diff.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Exercise Grid */}
            <div className="grid md:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredExercises.map((exercise, index) => (
                  <motion.div
                    key={exercise.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-blue-400 transition-colors">
                          {exercise.name}
                        </h3>
                        <p className="text-sm text-gray-400 capitalize">
                          {exercise.category} • {exercise.difficulty}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          addExerciseToWorkout(exercise);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </motion.button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {exercise.muscleGroups.slice(0, 3).map(muscle => (
                        <span
                          key={muscle}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Current Workout */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Current Workout</h2>
                {currentWorkout.length > 0 && (
                  <button
                    onClick={() => setCurrentWorkout([])}
                    className="text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>

              {currentWorkout.length === 0 ? (
                <div className="text-center py-8">
                  <Dumbbell className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">No exercises added yet</p>
                  <p className="text-sm text-gray-500">Click the + button to add exercises</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentWorkout.map((workoutExercise, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="bg-gray-800 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{workoutExercise.exercise.name}</h3>
                        <button
                          onClick={() => removeExerciseFromWorkout(index)}
                          className="text-gray-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        {workoutExercise.sets.map((set, setIndex) => (
                          <div key={setIndex} className="flex items-center space-x-2 text-sm">
                            <span className="text-gray-400">Set {setIndex + 1}:</span>
                            <span>{set.reps} reps</span>
                            {set.weight && <span>@ {set.weight}lbs</span>}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startWorkout}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                  >
                    <Play className="h-5 w-5" />
                    <span>Start Workout</span>
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Exercise Detail Modal */}
        <AnimatePresence>
          {selectedExercise && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedExercise(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">{selectedExercise.name}</h2>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Instructions</h3>
                    <ol className="space-y-2">
                      {selectedExercise.instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="bg-blue-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span className="text-gray-300">{instruction}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Muscle Groups</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.muscleGroups.map(muscle => (
                        <span
                          key={muscle}
                          className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Equipment</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedExercise.equipment.map(item => (
                        <span
                          key={item}
                          className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm border border-green-500/30"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      addExerciseToWorkout(selectedExercise);
                      setSelectedExercise(null);
                    }}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-5 w-5" />
                    <span>Add to Workout</span>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AIChat />
    </div>
  );
}