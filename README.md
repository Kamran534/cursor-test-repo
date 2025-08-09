<div align="center">

![FitAI Logo](public/assets/logo.svg)

# 🏋️ FitAI - AI-Powered Fitness Companion

### **Transform your fitness journey with intelligent workout planning, real-time AI coaching, and comprehensive progress tracking**

[![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Models](https://img.shields.io/badge/GitHub_Models-GPT--4o-24292e?style=for-the-badge&logo=github)](https://github.com/marketplace/models)

[🚀 Quick Start](#-quick-start) • [✨ Features](#-features) • [📖 Usage](#-usage) • [🛠️ Tech Stack](#️-tech-stack)

---

</div>

## ✨ Features

### 🤖 **AI Personal Trainer**
- **FREE GPT-4o Access**: Expert fitness advice via GitHub Models
- **Dedicated Chat Page**: Full-featured conversational interface  
- **Quick Prompts**: Pre-built fitness questions for instant help
- **Context-Aware**: AI understands your fitness level and goals

### 🏋️ **Smart Workout Planning**  
- **60+ Exercise Database**: Comprehensive library with instructions
- **Pre-built Templates**: Professional workout plans for all levels
- **Custom Workout Builder**: Create personalized routines
- **Real-time Workout Mode**: Guided training with rest timers

### 📊 **Progress Tracking**
- **Interactive Analytics**: Beautiful charts and visualizations
- **Workout History**: Complete log of your training sessions
- **Achievement System**: Unlock badges and track milestones
- **Statistics Dashboard**: Monitor total workouts, hours, and streaks

### 🎨 **Modern Experience**
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: Powered by Framer Motion
- **Dark Theme**: Eye-friendly design for any environment
- **Local Storage**: Your data persists between sessions

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** - [Download](https://nodejs.org/)
- **GitHub Account** - [Sign up free](https://github.com/)
- **GitHub Token** - [Generate here](https://github.com/settings/tokens)

### Installation

   ```bash
# Clone the repository
   git clone https://github.com/yourusername/fitai-gym-planner.git
   cd fitai-gym-planner

# Install dependencies
   npm install

# Set up environment variables
npm run setup

# Configure your GitHub token (interactive)
npm run set-api-key

# Start the development server
   npm run dev
   ```

Open the URL shown in your terminal (e.g., [http://localhost:3000](http://localhost:3000)) to see your FitAI application!

## 📖 Usage

### 🎯 **Main Features**

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | Overview and navigation hub |
| **AI Trainer** | `/chat` | Chat with your AI personal trainer |
| **Workouts** | `/workout` | Browse exercises and create routines |
| **Progress** | `/progress` | View analytics and track achievements |

### 🤖 **Using the AI Trainer**

1. **Navigate to** `/chat` or click "AI Trainer" in navigation
2. **Start chatting** - Ask questions like:
   - "Create a beginner workout plan"
   - "How do I improve my squat form?"
   - "What exercises target my core?"
3. **Use Quick Prompts** for common fitness questions
4. **Chat History** is automatically saved for reference

### 🏋️ **Creating Workouts**

1. **Browse Templates** - Use pre-built professional workouts
2. **Custom Builder** - Add exercises, sets, reps, and rest times
3. **Real-time Mode** - Follow guided workouts with timers
4. **Save & Track** - Your workouts are automatically logged

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth transitions
- **AI**: GitHub Models (FREE OpenAI GPT-4o) for intelligent coaching
- **Charts**: Recharts for data visualization
- **Storage**: Browser Local Storage for data persistence
- **Icons**: Lucide React for consistent iconography

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# GitHub Models Configuration (Required)
GITHUB_TOKEN=ghp_your_github_token_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### API Key Setup

**Option 1: Interactive Setup**
```bash
npm run set-api-key
```

**Option 2: Manual Setup**
1. Generate a GitHub Personal Access Token from [github.com/settings/tokens](https://github.com/settings/tokens)
2. Add it to your `.env.local` file: `GITHUB_TOKEN=ghp_your_token_here`
3. Restart the development server

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add your GitHub token in Vercel dashboard
# Environment Variables -> GITHUB_TOKEN
```

### Other Platforms

The app works on any platform that supports Next.js:
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Connect your GitHub repo and deploy
- **Docker**: Use the included Dockerfile for containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GitHub Models** for providing FREE access to OpenAI GPT-4o
- **Vercel** for the amazing Next.js framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for beautiful animations
- **Lucide** for the comprehensive icon library

---

<div align="center">

**Built with ❤️ for fitness enthusiasts**

[⭐ Star this repo](https://github.com/yourusername/fitai-gym-planner) if you found it helpful!

</div>