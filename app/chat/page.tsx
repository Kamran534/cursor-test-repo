'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Bot, 
  User, 
  Loader2,
  ArrowLeft,
  MessageCircle,
  Trash2,
  Download,
  Settings,
  Sparkles,
  Zap,
  Heart,
  Target,
  Trophy,
  Coffee,
  Moon,
  Sun
} from 'lucide-react';
import Link from 'next/link';
import { ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const quickPrompts = [
  {
    icon: Zap,
    title: "Quick Workout",
    prompt: "Give me a quick 15-minute workout I can do at home",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Heart,
    title: "Cardio Tips",
    prompt: "What are the best cardio exercises for beginners?",
    color: "from-red-500 to-pink-500"
  },
  {
    icon: Target,
    title: "Form Check",
    prompt: "How do I improve my squat form?",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Trophy,
    title: "Motivation",
    prompt: "I'm feeling unmotivated to workout, help me get back on track",
    color: "from-purple-500 to-indigo-500"
  },
  {
    icon: Coffee,
    title: "Nutrition",
    prompt: "What should I eat before and after a workout?",
    color: "from-green-500 to-emerald-500"
  }
];

const sampleConversations = [
  {
    title: "Upper Body Workout",
    lastMessage: "Great! Here's a complete upper body routine...",
    time: "2 hours ago",
    messageCount: 8
  },
  {
    title: "Nutrition Questions",
    lastMessage: "For muscle building, aim for 1.6-2.2g protein per kg...",
    time: "Yesterday",
    messageCount: 12
  },
  {
    title: "Running Tips",
    lastMessage: "Start with a 5-minute warm-up walk...",
    time: "3 days ago",
    messageCount: 6
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: "👋 Hey there! I'm FitBot, your AI personal trainer! I'm here to help you with workouts, form tips, nutrition advice, and motivation. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      // Simulate typing delay
      setTimeout(() => {
        setIsTyping(false);
        const aiMessage: ChatMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1000 + Math.random() * 1000);

    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      toast.error('Failed to get AI response. Please try again.');
      
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again in a moment! 💪",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: "Chat cleared! I'm ready to help you with your fitness journey. What would you like to know?",
        timestamp: new Date()
      }
    ]);
    toast.success('Chat cleared!');
  };

  const exportChat = () => {
    const chatData = {
      messages,
      exportDate: new Date().toISOString(),
      totalMessages: messages.length
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitai-chat-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Chat exported!');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'} transition-all duration-300`}>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-sm border-b ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} sticky top-0 z-40`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                >
                  <Bot className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>FitBot AI Trainer</h1>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Your 24/7 Fitness Companion</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-yellow-400' : 'bg-gray-200 text-gray-700'} transition-colors`}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSidebar(!showSidebar)}
                className={`p-2 rounded-full ${isDarkMode ? 'bg-slate-800 text-gray-300' : 'bg-gray-200 text-gray-700'} transition-colors md:hidden`}
              >
                <Settings className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <AnimatePresence>
          {(showSidebar || !isMobile) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className={`w-80 ${isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'} backdrop-blur-sm border-r ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} p-6 overflow-y-auto`}
            >
              {/* Quick Actions */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Actions</h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearChat}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}
                  >
                    <Trash2 className="h-5 w-5" />
                    <span>Clear Chat</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={exportChat}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-colors`}
                  >
                    <Download className="h-5 w-5" />
                    <span>Export Chat</span>
                  </motion.button>
                </div>
              </div>

              {/* Quick Prompts */}
              <div className="mb-8">
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Quick Prompts</h3>
                <div className="space-y-3">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(prompt.prompt)}
                      className={`w-full text-left p-4 rounded-xl ${isDarkMode ? 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700' : 'bg-white/50 hover:bg-white border border-gray-200'} transition-all group`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${prompt.color}`}>
                          <prompt.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-blue-500 transition-colors`}>
                            {prompt.title}
                          </h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 line-clamp-2`}>
                            {prompt.prompt}
                          </p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Recent Conversations */}
              <div>
                <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Recent Chats</h3>
                <div className="space-y-2">
                  {sampleConversations.map((conv, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-gray-100/50 hover:bg-gray-100'} transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'} text-sm`}>
                          {conv.title}
                        </h4>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {conv.messageCount}
                        </span>
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-1 mb-1`}>
                        {conv.lastMessage}
                      </p>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        {conv.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-4 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      } shadow-lg`}
                    >
                      {message.role === 'user' ? (
                        <User className="h-6 w-6 text-white" />
                      ) : (
                        <Bot className="h-6 w-6 text-white" />
                      )}
                    </motion.div>

                    {/* Message Bubble */}
                    <div className={`relative ${
                      message.role === 'user'
                        ? `${isDarkMode ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-blue-500 to-blue-400'} text-white`
                        : `${isDarkMode ? 'bg-slate-800/80 text-gray-100 border border-slate-700' : 'bg-white text-gray-900 border border-gray-200'}`
                    } rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm`}>
                      {/* Message Content */}
                      <div className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </div>
                      
                      {/* Timestamp */}
                      <div className={`text-xs mt-2 ${
                        message.role === 'user' 
                          ? 'text-blue-100' 
                          : isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>

                      {/* Message Tail */}
                      <div className={`absolute top-4 ${
                        message.role === 'user' ? 'right-0 translate-x-1' : 'left-0 -translate-x-1'
                      }`}>
                        <div className={`w-3 h-3 rotate-45 ${
                          message.role === 'user'
                            ? isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                            : isDarkMode ? 'bg-slate-800 border-l border-t border-slate-700' : 'bg-white border-l border-t border-gray-200'
                        }`}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-4 max-w-[80%]">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className={`${isDarkMode ? 'bg-slate-800/80 border border-slate-700' : 'bg-white border border-gray-200'} rounded-2xl px-6 py-4 shadow-lg backdrop-blur-sm`}>
                    <div className="flex space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                          className={`w-2 h-2 ${isDarkMode ? 'bg-gray-500' : 'bg-gray-400'} rounded-full`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-sm border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-200'} p-6`}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-4">
                {/* Input Field */}
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about workouts, nutrition, form tips, or anything fitness related..."
                    className={`w-full ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} border rounded-2xl px-6 py-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all`}
                    rows={1}
                    style={{ minHeight: '56px', maxHeight: '120px' }}
                    disabled={isLoading}
                  />
                  
                  {/* Character Counter */}
                  <div className={`absolute bottom-2 right-4 text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {inputMessage.length}/1000
                  </div>
                </div>

                {/* Send Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => sendMessage()}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-2xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Send className="h-6 w-6" />
                    )}
                  </div>
                </motion.button>
              </div>

              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  {['Quick workout ideas', 'Form tips', 'Nutrition advice', 'Motivation boost'].map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setInputMessage(suggestion)}
                      className={`px-4 py-2 rounded-full text-sm ${isDarkMode ? 'bg-slate-800 text-gray-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
                    >
                      <Sparkles className="h-4 w-4 inline mr-2" />
                      {suggestion}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
