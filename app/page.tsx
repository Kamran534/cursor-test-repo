'use client';

import { motion } from 'framer-motion';
import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  MessageCircle, 
  Calendar,
  Trophy,
  Activity,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';


const features = [
  {
    icon: Dumbbell,
    title: 'Smart Workouts',
    description: 'AI-powered workout plans tailored to your fitness level and goals',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: MessageCircle,
    title: 'AI Personal Trainer',
    description: 'Get instant advice, form tips, and motivation from your AI coach',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor your gains with detailed analytics and progress charts',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Calendar,
    title: 'Workout Planning',
    description: 'Schedule and organize your training sessions effectively',
    color: 'from-orange-500 to-red-500'
  }
];

const stats = [
  { number: '1000+', label: 'Exercises', icon: Activity },
  { number: '50+', label: 'Workout Plans', icon: Calendar },
  { number: '24/7', label: 'AI Support', icon: MessageCircle },
  { number: '100%', label: 'Results', icon: Trophy }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 p-6"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Dumbbell className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">FitAI</span>
          </motion.div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/workout" className="text-gray-300 hover:text-white transition-colors">
              Workouts
            </Link>
            <Link href="/progress" className="text-gray-300 hover:text-white transition-colors">
              Progress
            </Link>
            <Link href="/chat" className="text-gray-300 hover:text-white transition-colors">
              AI Trainer
            </Link>
            <Link href="/workout">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Your AI-Powered
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Fitness Journey
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Transform your body with intelligent workout planning, real-time AI coaching, 
              and comprehensive progress tracking. Your personal trainer that never sleeps.
            </motion.p>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/workout">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
                >
                  <span>Start Training</span>
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </Link>
              
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:border-white transition-all flex items-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Try AI Trainer</span>
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-20"
              initial={{ 
                x: Math.random() * 1200, 
                y: Math.random() * 800 
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <stat.icon className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + 0.1 * index }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Cutting-edge AI technology meets proven fitness science to deliver results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:shadow-lg transition-all`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Fitness?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who have already started their AI-powered fitness journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/workout">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center space-x-3"
                >
                  <span>Begin Your Journey</span>
                  <ArrowRight className="h-6 w-6" />
                </motion.button>
              </Link>
              
              <Link href="/chat">
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-12 py-6 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center space-x-3"
                >
                  <MessageCircle className="h-6 w-6" />
                  <span>Chat with AI</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
