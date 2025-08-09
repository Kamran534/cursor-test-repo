'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award,
  ArrowLeft,
  Activity,
  Clock,
  Zap,
  Trophy,
  Flame,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import Link from 'next/link';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';
import AIChat from '../components/AIChat';

// Mock data for demonstrations
const workoutData = [
  { date: '2024-01-01', workouts: 3, duration: 120, calories: 450 },
  { date: '2024-01-02', workouts: 2, duration: 90, calories: 320 },
  { date: '2024-01-03', workouts: 4, duration: 150, calories: 520 },
  { date: '2024-01-04', workouts: 1, duration: 60, calories: 280 },
  { date: '2024-01-05', workouts: 3, duration: 135, calories: 480 },
  { date: '2024-01-06', workouts: 2, duration: 80, calories: 340 },
  { date: '2024-01-07', workouts: 5, duration: 180, calories: 620 },
];

const strengthData = [
  { exercise: 'Bench Press', week1: 135, week2: 140, week3: 145, week4: 150 },
  { exercise: 'Squat', week1: 185, week2: 190, week3: 195, week4: 200 },
  { exercise: 'Deadlift', week1: 225, week2: 235, week3: 245, week4: 255 },
  { exercise: 'Overhead Press', week1: 95, week2: 100, week3: 102, week4: 105 },
];

const muscleGroupData = [
  { name: 'Chest', value: 25, color: '#ef4444' },
  { name: 'Back', value: 20, color: '#3b82f6' },
  { name: 'Legs', value: 30, color: '#eab308' },
  { name: 'Shoulders', value: 15, color: '#8b5cf6' },
  { name: 'Arms', value: 10, color: '#10b981' },
];

const achievements = [
  { id: 1, title: 'First Workout', description: 'Complete your first workout', earned: true, date: '2024-01-01', icon: '🎯' },
  { id: 2, title: 'Week Warrior', description: 'Work out 5 times in a week', earned: true, date: '2024-01-07', icon: '💪' },
  { id: 3, title: 'Consistency King', description: 'Work out for 30 days straight', earned: false, progress: 7, total: 30, icon: '👑' },
  { id: 4, title: 'Strength Seeker', description: 'Increase bench press by 50lbs', earned: false, progress: 15, total: 50, icon: '🏋️' },
  { id: 5, title: 'Cardio Champion', description: 'Complete 100 cardio sessions', earned: false, progress: 23, total: 100, icon: '🏃' },
  { id: 6, title: 'Personal Record', description: 'Set a new personal record', earned: true, date: '2024-01-05', icon: '🏆' },
];

const stats = [
  { label: 'Total Workouts', value: '156', change: '+12%', icon: Activity, color: 'from-blue-500 to-cyan-500' },
  { label: 'Total Hours', value: '78', change: '+8%', icon: Clock, color: 'from-green-500 to-emerald-500' },
  { label: 'Calories Burned', value: '12.5K', change: '+15%', icon: Flame, color: 'from-red-500 to-orange-500' },
  { label: 'Current Streak', value: '7 days', change: '+3 days', icon: Zap, color: 'from-purple-500 to-pink-500' },
];

export default function ProgressPage() {
  const [selectedChart, setSelectedChart] = useState('workout');
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [animatedStats, setAnimatedStats] = useState(stats.map(() => 0));

  useEffect(() => {
    // Animate stats numbers
    const intervals = stats.map((stat, index) => {
      const targetValue = parseInt(stat.value.replace(/[^\d]/g, ''));
      let currentValue = 0;
      const increment = targetValue / 50;
      
      return setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          currentValue = targetValue;
          clearInterval(intervals[index]);
        }
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = Math.floor(currentValue);
          return newStats;
        });
      }, 30);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const formatStatValue = (originalValue: string, animatedValue: number) => {
    if (originalValue.includes('K')) {
      return `${(animatedValue / 1000).toFixed(1)}K`;
    } else if (originalValue.includes('days')) {
      return `${animatedValue} days`;
    }
    return animatedValue.toString();
  };

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
          <h1 className="text-4xl font-bold">Progress Tracking</h1>
          <div className="w-20" />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 400 } }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className="h-6 w-6 text-white" />
                </motion.div>
                <div className="text-right">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-2xl font-bold"
                  >
                    {formatStatValue(stat.value, animatedStats[index])}
                  </motion.div>
                  <div className="text-sm text-green-400">{stat.change}</div>
                </div>
              </div>
              <h3 className="text-gray-400 text-sm">{stat.label}</h3>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chart Controls */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Analytics</h2>
                <div className="flex items-center space-x-4">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { id: 'workout', label: 'Workout Frequency', icon: BarChart3 },
                  { id: 'strength', label: 'Strength Progress', icon: LineChart },
                  { id: 'muscle', label: 'Muscle Groups', icon: PieChart }
                ].map(chart => (
                  <motion.button
                    key={chart.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedChart(chart.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all ${
                      selectedChart === chart.id
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <chart.icon className="h-4 w-4" />
                    <span>{chart.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Chart Display */}
              <motion.div
                key={selectedChart}
                variants={chartVariants}
                initial="hidden"
                animate="visible"
                className="h-80"
              >
                {selectedChart === 'workout' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={workoutData}>
                      <defs>
                        <linearGradient id="workoutGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="workouts" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#workoutGradient)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}

                {selectedChart === 'strength' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={strengthData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="exercise" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <Line type="monotone" dataKey="week1" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="week2" stroke="#f97316" strokeWidth={2} />
                      <Line type="monotone" dataKey="week3" stroke="#eab308" strokeWidth={2} />
                      <Line type="monotone" dataKey="week4" stroke="#22c55e" strokeWidth={2} />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                )}

                {selectedChart === 'muscle' && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1f2937', 
                          border: '1px solid #374151',
                          borderRadius: '8px'
                        }}
                      />
                      <RechartsPieChart data={muscleGroupData} cx="50%" cy="50%" outerRadius={120}>
                        {muscleGroupData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                )}
              </motion.div>
            </motion.div>

            {/* Recent Activities */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-4">Recent Workouts</h3>
              <div className="space-y-3">
                {[
                  { date: 'Today', workout: 'Upper Body Strength', duration: '45 min', calories: 320 },
                  { date: 'Yesterday', workout: 'Cardio HIIT', duration: '30 min', calories: 280 },
                  { date: '2 days ago', workout: 'Lower Body Power', duration: '50 min', calories: 380 },
                  { date: '3 days ago', workout: 'Core & Flexibility', duration: '25 min', calories: 180 },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-all cursor-pointer"
                  >
                    <div>
                      <h4 className="font-semibold">{activity.workout}</h4>
                      <p className="text-sm text-gray-400">{activity.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-blue-400">{activity.duration}</p>
                      <p className="text-xs text-gray-500">{activity.calories} cal</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Achievements Section */}
          <div className="space-y-6">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Achievements</h2>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 rounded-xl border transition-all ${
                      achievement.earned
                        ? 'bg-yellow-500/10 border-yellow-500/30'
                        : 'bg-gray-800 border-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.earned ? 'text-yellow-400' : 'text-gray-300'
                        }`}>
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {achievement.description}
                        </p>
                        
                        {achievement.earned ? (
                          <div className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-xs text-yellow-400">
                              Earned on {achievement.date}
                            </span>
                          </div>
                        ) : (
                          achievement.progress !== undefined && (
                            <div>
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>Progress</span>
                                <span>{achievement.progress}/{achievement.total}</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: `${(achievement.progress / achievement.total) * 100}%` 
                                  }}
                                  transition={{ delay: 0.6 + index * 0.1, duration: 1 }}
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                />
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Weekly Goal */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-blue-500/30"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold">Weekly Goal</h3>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">5/7</div>
                <p className="text-sm text-gray-400 mb-4">Workouts completed this week</p>
                
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '71%' }}
                    transition={{ delay: 1, duration: 1.5 }}
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                  />
                </div>
                
                <p className="text-xs text-gray-500">2 more workouts to reach your goal!</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <AIChat />
    </div>
  );
}