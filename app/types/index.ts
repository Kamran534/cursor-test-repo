export interface Exercise {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'cardio';
  equipment: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  muscleGroups: string[];
  image?: string;
}

export interface WorkoutSet {
  reps: number;
  weight?: number;
  duration?: number;
  restTime?: number;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  duration?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  date: Date;
  workoutId: string;
  exercises: {
    exerciseId: string;
    sets: WorkoutSet[];
    personalRecord?: boolean;
  }[];
  duration: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  age?: number;
  weight?: number;
  height?: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  preferences: {
    equipmentAccess: string[];
    workoutDuration: number;
    workoutFrequency: number;
  };
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  duration: number; // in weeks
  workouts: Workout[];
  targetLevel: 'beginner' | 'intermediate' | 'advanced';
}