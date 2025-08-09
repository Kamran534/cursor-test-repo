import { Workout, WorkoutPlan } from '../types';
import { exercises } from './exercises';

// Helper function to find exercise by ID
const findExercise = (id: string) => exercises.find(ex => ex.id === id);

// Pre-built workout templates
export const workoutTemplates: Workout[] = [
  {
    id: 'beginner-upper-body',
    name: 'Beginner Upper Body',
    description: 'Perfect for beginners starting their fitness journey',
    exercises: [
      {
        exercise: findExercise('push-up')!,
        sets: [
          { reps: 8, restTime: 60 },
          { reps: 8, restTime: 60 },
          { reps: 8, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('lat-pulldown')!,
        sets: [
          { reps: 10, weight: 50, restTime: 60 },
          { reps: 10, weight: 50, restTime: 60 },
          { reps: 10, weight: 50, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('lateral-raises')!,
        sets: [
          { reps: 12, weight: 10, restTime: 45 },
          { reps: 12, weight: 10, restTime: 45 },
          { reps: 12, weight: 10, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('bicep-curls')!,
        sets: [
          { reps: 12, weight: 15, restTime: 45 },
          { reps: 12, weight: 15, restTime: 45 },
          { reps: 12, weight: 15, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('tricep-dips')!,
        sets: [
          { reps: 8, restTime: 60 },
          { reps: 8, restTime: 60 },
          { reps: 8, restTime: 90 }
        ]
      }
    ],
    duration: 45,
    difficulty: 'beginner',
    category: 'Upper Body',
    createdAt: new Date()
  },
  
  {
    id: 'beginner-lower-body',
    name: 'Beginner Lower Body',
    description: 'Build a strong foundation with basic leg exercises',
    exercises: [
      {
        exercise: findExercise('squat')!,
        sets: [
          { reps: 12, restTime: 60 },
          { reps: 12, restTime: 60 },
          { reps: 12, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('lunges')!,
        sets: [
          { reps: 10, restTime: 60 },
          { reps: 10, restTime: 60 },
          { reps: 10, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('leg-press')!,
        sets: [
          { reps: 15, weight: 100, restTime: 60 },
          { reps: 15, weight: 100, restTime: 60 },
          { reps: 15, weight: 100, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('calf-raises')!,
        sets: [
          { reps: 15, restTime: 45 },
          { reps: 15, restTime: 45 },
          { reps: 15, restTime: 60 }
        ]
      }
    ],
    duration: 40,
    difficulty: 'beginner',
    category: 'Lower Body',
    createdAt: new Date()
  },

  {
    id: 'intermediate-push',
    name: 'Push Day (Intermediate)',
    description: 'Chest, shoulders, and triceps focused workout',
    exercises: [
      {
        exercise: findExercise('bench-press')!,
        sets: [
          { reps: 8, weight: 135, restTime: 90 },
          { reps: 8, weight: 135, restTime: 90 },
          { reps: 6, weight: 145, restTime: 120 },
          { reps: 6, weight: 145, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('incline-dumbbell-press')!,
        sets: [
          { reps: 10, weight: 35, restTime: 75 },
          { reps: 10, weight: 35, restTime: 75 },
          { reps: 8, weight: 40, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('dips')!,
        sets: [
          { reps: 10, restTime: 60 },
          { reps: 8, restTime: 60 },
          { reps: 6, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('overhead-press')!,
        sets: [
          { reps: 8, weight: 95, restTime: 90 },
          { reps: 8, weight: 95, restTime: 90 },
          { reps: 6, weight: 105, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('lateral-raises')!,
        sets: [
          { reps: 12, weight: 15, restTime: 45 },
          { reps: 12, weight: 15, restTime: 45 },
          { reps: 10, weight: 20, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('overhead-tricep-extension')!,
        sets: [
          { reps: 12, weight: 25, restTime: 60 },
          { reps: 10, weight: 30, restTime: 60 },
          { reps: 8, weight: 35, restTime: 75 }
        ]
      }
    ],
    duration: 60,
    difficulty: 'intermediate',
    category: 'Push',
    createdAt: new Date()
  },

  {
    id: 'intermediate-pull',
    name: 'Pull Day (Intermediate)',
    description: 'Back and biceps focused workout',
    exercises: [
      {
        exercise: findExercise('pull-up')!,
        sets: [
          { reps: 6, restTime: 90 },
          { reps: 5, restTime: 90 },
          { reps: 4, restTime: 120 },
          { reps: 3, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('bent-over-row')!,
        sets: [
          { reps: 8, weight: 115, restTime: 90 },
          { reps: 8, weight: 115, restTime: 90 },
          { reps: 6, weight: 125, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('cable-rows')!,
        sets: [
          { reps: 10, weight: 120, restTime: 75 },
          { reps: 10, weight: 120, restTime: 75 },
          { reps: 8, weight: 140, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('deadlift-rows')!,
        sets: [
          { reps: 10, weight: 90, restTime: 75 },
          { reps: 8, weight: 100, restTime: 90 },
          { reps: 6, weight: 110, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('face-pulls')!,
        sets: [
          { reps: 15, weight: 40, restTime: 45 },
          { reps: 15, weight: 40, restTime: 45 },
          { reps: 12, weight: 50, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('bicep-curls')!,
        sets: [
          { reps: 12, weight: 25, restTime: 60 },
          { reps: 10, weight: 30, restTime: 60 },
          { reps: 8, weight: 35, restTime: 75 }
        ]
      },
      {
        exercise: findExercise('hammer-curls')!,
        sets: [
          { reps: 12, weight: 20, restTime: 60 },
          { reps: 10, weight: 25, restTime: 60 },
          { reps: 8, weight: 30, restTime: 75 }
        ]
      }
    ],
    duration: 65,
    difficulty: 'intermediate',
    category: 'Pull',
    createdAt: new Date()
  },

  {
    id: 'leg-day-advanced',
    name: 'Advanced Leg Day',
    description: 'Complete lower body strength and power workout',
    exercises: [
      {
        exercise: findExercise('squat')!,
        sets: [
          { reps: 5, weight: 185, restTime: 120 },
          { reps: 5, weight: 185, restTime: 120 },
          { reps: 3, weight: 205, restTime: 180 },
          { reps: 3, weight: 205, restTime: 180 },
          { reps: 1, weight: 225, restTime: 240 }
        ]
      },
      {
        exercise: findExercise('deadlift')!,
        sets: [
          { reps: 5, weight: 225, restTime: 120 },
          { reps: 3, weight: 245, restTime: 180 },
          { reps: 1, weight: 275, restTime: 240 }
        ]
      },
      {
        exercise: findExercise('romanian-deadlift')!,
        sets: [
          { reps: 8, weight: 135, restTime: 90 },
          { reps: 8, weight: 135, restTime: 90 },
          { reps: 6, weight: 155, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('bulgarian-split-squat')!,
        sets: [
          { reps: 10, weight: 25, restTime: 75 },
          { reps: 8, weight: 30, restTime: 75 },
          { reps: 6, weight: 35, restTime: 90 }
        ]
      },
      {
        exercise: findExercise('leg-press')!,
        sets: [
          { reps: 15, weight: 270, restTime: 90 },
          { reps: 12, weight: 315, restTime: 90 },
          { reps: 10, weight: 360, restTime: 120 }
        ]
      },
      {
        exercise: findExercise('calf-raises')!,
        sets: [
          { reps: 20, weight: 45, restTime: 60 },
          { reps: 15, weight: 70, restTime: 60 },
          { reps: 12, weight: 90, restTime: 75 }
        ]
      }
    ],
    duration: 75,
    difficulty: 'advanced',
    category: 'Lower Body',
    createdAt: new Date()
  },

  {
    id: 'hiit-cardio',
    name: 'HIIT Cardio Blast',
    description: 'High-intensity interval training for maximum calorie burn',
    exercises: [
      {
        exercise: findExercise('jumping-jacks')!,
        sets: [
          { duration: 30, restTime: 15 },
          { duration: 30, restTime: 15 },
          { duration: 30, restTime: 15 },
          { duration: 30, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('burpees')!,
        sets: [
          { duration: 20, restTime: 40 },
          { duration: 20, restTime: 40 },
          { duration: 20, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('high-knees')!,
        sets: [
          { duration: 30, restTime: 15 },
          { duration: 30, restTime: 15 },
          { duration: 30, restTime: 15 },
          { duration: 30, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('mountain-climbers')!,
        sets: [
          { duration: 30, restTime: 30 },
          { duration: 30, restTime: 30 },
          { duration: 30, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('box-jumps')!,
        sets: [
          { reps: 10, restTime: 45 },
          { reps: 8, restTime: 45 },
          { reps: 6, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('bear-crawl')!,
        sets: [
          { duration: 30, restTime: 30 },
          { duration: 30, restTime: 30 },
          { duration: 30, restTime: 90 }
        ]
      }
    ],
    duration: 25,
    difficulty: 'advanced',
    category: 'Cardio',
    createdAt: new Date()
  },

  {
    id: 'core-strength',
    name: 'Core Strength Builder',
    description: 'Comprehensive core workout for stability and strength',
    exercises: [
      {
        exercise: findExercise('plank')!,
        sets: [
          { duration: 30, restTime: 30 },
          { duration: 45, restTime: 45 },
          { duration: 60, restTime: 60 }
        ]
      },
      {
        exercise: findExercise('crunches')!,
        sets: [
          { reps: 20, restTime: 30 },
          { reps: 20, restTime: 30 },
          { reps: 15, restTime: 45 }
        ]
      },
      {
        exercise: findExercise('russian-twists')!,
        sets: [
          { reps: 20, restTime: 30 },
          { reps: 20, restTime: 30 },
          { reps: 15, restTime: 45 }
        ]
      },
      {
        exercise: findExercise('bicycle-crunches')!,
        sets: [
          { reps: 24, restTime: 30 },
          { reps: 20, restTime: 30 },
          { reps: 16, restTime: 45 }
        ]
      },
      {
        exercise: findExercise('dead-bug')!,
        sets: [
          { reps: 10, restTime: 30 },
          { reps: 10, restTime: 30 },
          { reps: 8, restTime: 45 }
        ]
      },
      {
        exercise: findExercise('mountain-climbers')!,
        sets: [
          { duration: 20, restTime: 40 },
          { duration: 20, restTime: 40 },
          { duration: 15, restTime: 60 }
        ]
      }
    ],
    duration: 30,
    difficulty: 'intermediate',
    category: 'Core',
    createdAt: new Date()
  }
];

// Pre-built workout plans (multiple workouts)
export const workoutPlans: WorkoutPlan[] = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body Program',
    description: 'A 4-week program perfect for fitness beginners',
    duration: 4,
    workouts: [
      workoutTemplates.find(w => w.id === 'beginner-upper-body')!,
      workoutTemplates.find(w => w.id === 'beginner-lower-body')!,
      workoutTemplates.find(w => w.id === 'core-strength')!
    ],
    targetLevel: 'beginner'
  },
  {
    id: 'intermediate-ppl',
    name: 'Push/Pull/Legs Split',
    description: 'A 6-week intermediate program focusing on strength and muscle building',
    duration: 6,
    workouts: [
      workoutTemplates.find(w => w.id === 'intermediate-push')!,
      workoutTemplates.find(w => w.id === 'intermediate-pull')!,
      workoutTemplates.find(w => w.id === 'leg-day-advanced')!
    ],
    targetLevel: 'intermediate'
  },
  {
    id: 'fat-loss-hiit',
    name: 'Fat Loss HIIT Program',
    description: 'High-intensity program designed for maximum calorie burn and fat loss',
    duration: 8,
    workouts: [
      workoutTemplates.find(w => w.id === 'hiit-cardio')!,
      workoutTemplates.find(w => w.id === 'core-strength')!,
      workoutTemplates.find(w => w.id === 'beginner-upper-body')!,
      workoutTemplates.find(w => w.id === 'beginner-lower-body')!
    ],
    targetLevel: 'intermediate'
  }
];

// Helper functions
export const getWorkoutsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
  return workoutTemplates.filter(workout => workout.difficulty === difficulty);
};

export const getWorkoutsByCategory = (category: string) => {
  return workoutTemplates.filter(workout => workout.category.toLowerCase().includes(category.toLowerCase()));
};

export const getWorkoutById = (id: string) => {
  return workoutTemplates.find(workout => workout.id === id);
};

export const getPlanById = (id: string) => {
  return workoutPlans.find(plan => plan.id === id);
};
