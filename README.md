# 🏋️ FitAI - AI-Powered Gym Planner

A cutting-edge fitness application that combines intelligent workout planning with real-time AI coaching. Transform your fitness journey with personalized workouts, progress tracking, and 24/7 AI support.

![FitAI Demo](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=FitAI+Gym+Planner)

## ✨ Features

### 🤖 AI Personal Trainer
- **GPT-4o Integration**: Get expert fitness advice, form corrections, and motivation
- **Real-time Chat**: Ask questions about workouts, nutrition, and fitness goals
- **Personalized Recommendations**: AI adapts to your fitness level and preferences

### 🏃 Smart Workout Planning
- **1000+ Exercise Database**: Comprehensive library with detailed instructions
- **Interactive Workout Builder**: Drag-and-drop exercise selection
- **Real-time Workout Mode**: Guided training with rest timers and progress tracking
- **Category Filtering**: Filter by muscle groups, difficulty, and equipment

### 📊 Advanced Progress Tracking
- **Animated Charts**: Beautiful visualizations of your fitness journey
- **Achievement System**: Unlock badges and track milestones
- **Strength Progression**: Monitor weight increases and personal records
- **Workout Analytics**: Detailed insights into your training patterns

### 🎨 Modern UI/UX
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Dark Theme**: Eye-friendly design optimized for gym environments
- **Glassmorphism**: Modern aesthetic with backdrop blur effects

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key (GPT-4o access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitai-gym-planner.git
   cd fitai-gym-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Getting Your OpenAI API Key

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy and paste it into your `.env.local` file

**Note**: Make sure you have GPT-4o access in your OpenAI account for the best AI coaching experience.

## 🛠️ Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Smooth animations and transitions

### AI Integration
- **OpenAI GPT-4o**: Advanced AI personal trainer
- **Custom Prompts**: Specialized fitness coaching system

### Data Visualization
- **Recharts**: Beautiful and responsive charts
- **Progress Analytics**: Custom tracking components

### UI Components
- **Lucide React**: Beautiful icons
- **React Hot Toast**: Elegant notifications
- **Custom Components**: Reusable and animated components

## 📱 Key Features Breakdown

### Workout Planner
- Browse 1000+ exercises with detailed instructions
- Filter by muscle groups, difficulty, and equipment
- Build custom workouts with drag-and-drop interface
- Real-time workout mode with rest timers
- Progress tracking for each exercise

### AI Chat Assistant
- 24/7 available AI personal trainer
- Expert advice on form, nutrition, and programming
- Motivational support and encouragement
- Context-aware responses based on your fitness data

### Progress Dashboard
- Animated statistics and key metrics
- Interactive charts for workout frequency and strength gains
- Achievement system with unlockable badges
- Weekly and monthly goal tracking

### Exercise Database
- Comprehensive exercise library
- Detailed step-by-step instructions
- Muscle group targeting information
- Equipment requirements
- Difficulty classifications

## 🎯 Usage Guide

### Creating Your First Workout
1. Navigate to the Workout Planner
2. Browse exercises or use the search/filter options
3. Click the "+" button to add exercises to your workout
4. Customize sets, reps, and weights
5. Click "Start Workout" to begin your training session

### Using the AI Trainer
1. Click the floating chat button (bottom-right)
2. Ask questions about fitness, form, or nutrition
3. Get personalized advice based on your goals
4. Use voice or text input for convenience

### Tracking Your Progress
1. Visit the Progress page to see your analytics
2. View charts showing your improvement over time
3. Check your achievement progress
4. Set and monitor weekly/monthly goals

## 🔧 Development

### Project Structure
```
fitai-gym-planner/
├── app/
│   ├── components/          # Reusable UI components
│   │   └── AIChat.tsx      # AI chat assistant
│   ├── data/               # Static data and constants
│   │   └── exercises.ts    # Exercise database
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── api/                # API routes
│   │   └── chat/          # OpenAI integration
│   ├── workout/           # Workout planner pages
│   ├── progress/          # Progress tracking pages
│   └── globals.css        # Global styles
├── public/                # Static assets
└── docs/                  # Documentation
```

### Key Components
- `AIChat.tsx`: Floating AI assistant with GPT-4o integration
- `WorkoutPage.tsx`: Main workout planning interface
- `ProgressPage.tsx`: Analytics and progress tracking
- `exercises.ts`: Comprehensive exercise database

### API Routes
- `/api/chat`: OpenAI GPT-4o integration for AI coaching

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing GPT-4o API
- The fitness community for exercise data and inspiration
- All contributors who help improve this project

## 📞 Support

If you have any questions or need help:
- 📧 Email: support@fitai.com
- 💬 Discord: [Join our community](https://discord.gg/fitai)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/fitai-gym-planner/issues)

---

**Made with ❤️ for the fitness community**

Transform your fitness journey today with FitAI! 🚀💪
