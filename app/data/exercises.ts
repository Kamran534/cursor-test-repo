import { Exercise } from '../types';

export const exercises: Exercise[] = [
  // Chest Exercises
  {
    id: 'push-up',
    name: 'Push-up',
    category: 'chest',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Start in a plank position with hands slightly wider than shoulders',
      'Lower your body until chest nearly touches the floor',
      'Push back up to starting position',
      'Keep your core tight throughout the movement'
    ],
    muscleGroups: ['chest', 'shoulders', 'triceps', 'core']
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'chest',
    equipment: ['barbell', 'bench'],
    difficulty: 'intermediate',
    instructions: [
      'Lie on bench with feet flat on floor',
      'Grip barbell slightly wider than shoulder width',
      'Lower bar to chest with control',
      'Press bar back up to starting position'
    ],
    muscleGroups: ['chest', 'shoulders', 'triceps']
  },
  {
    id: 'dumbbell-flyes',
    name: 'Dumbbell Flyes',
    category: 'chest',
    equipment: ['dumbbells', 'bench'],
    difficulty: 'intermediate',
    instructions: [
      'Lie on bench holding dumbbells above chest',
      'Lower weights in wide arc until chest stretch is felt',
      'Bring dumbbells back together above chest',
      'Keep slight bend in elbows throughout'
    ],
    muscleGroups: ['chest', 'shoulders']
  },

  // Back Exercises
  {
    id: 'pull-up',
    name: 'Pull-up',
    category: 'back',
    equipment: ['pull-up bar'],
    difficulty: 'intermediate',
    instructions: [
      'Hang from bar with palms facing away',
      'Pull body up until chin clears bar',
      'Lower with control to starting position',
      'Keep core engaged throughout'
    ],
    muscleGroups: ['lats', 'rhomboids', 'biceps', 'rear delts']
  },
  {
    id: 'bent-over-row',
    name: 'Bent-over Row',
    category: 'back',
    equipment: ['barbell'],
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet hip-width apart holding barbell',
      'Hinge at hips, keeping back straight',
      'Pull bar to lower chest/upper abdomen',
      'Lower with control'
    ],
    muscleGroups: ['lats', 'rhomboids', 'rear delts', 'biceps']
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'back',
    equipment: ['cable machine'],
    difficulty: 'beginner',
    instructions: [
      'Sit at lat pulldown machine with wide grip',
      'Pull bar down to upper chest',
      'Squeeze shoulder blades together',
      'Return to starting position with control'
    ],
    muscleGroups: ['lats', 'rhomboids', 'rear delts', 'biceps']
  },

  // Leg Exercises
  {
    id: 'squat',
    name: 'Squat',
    category: 'legs',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Lower body as if sitting back into chair',
      'Keep knees behind toes',
      'Push through heels to return to standing'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves']
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'legs',
    equipment: ['barbell'],
    difficulty: 'advanced',
    instructions: [
      'Stand with feet hip-width apart, bar over mid-foot',
      'Bend at hips and knees to grip bar',
      'Keep chest up and back straight',
      'Drive through heels to stand up straight'
    ],
    muscleGroups: ['hamstrings', 'glutes', 'erector spinae', 'traps']
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'legs',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Step forward with one leg',
      'Lower hips until both knees are at 90 degrees',
      'Push back to starting position',
      'Alternate legs or complete all reps on one side'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings', 'calves']
  },

  // Shoulder Exercises
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    category: 'shoulders',
    equipment: ['barbell'],
    difficulty: 'intermediate',
    instructions: [
      'Stand with feet shoulder-width apart',
      'Hold barbell at shoulder level',
      'Press bar straight up overhead',
      'Lower with control to starting position'
    ],
    muscleGroups: ['shoulders', 'triceps', 'core']
  },
  {
    id: 'lateral-raises',
    name: 'Lateral Raises',
    category: 'shoulders',
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: [
      'Stand with dumbbells at sides',
      'Raise arms out to sides until parallel with floor',
      'Lower with control',
      'Keep slight bend in elbows'
    ],
    muscleGroups: ['side delts']
  },

  // Arms Exercises
  {
    id: 'bicep-curls',
    name: 'Bicep Curls',
    category: 'arms',
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: [
      'Stand with dumbbells at sides',
      'Curl weights up toward shoulders',
      'Lower with control',
      'Keep elbows stationary'
    ],
    muscleGroups: ['biceps']
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'arms',
    equipment: ['bench', 'bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Sit on edge of bench with hands beside hips',
      'Slide off bench, supporting weight with arms',
      'Lower body by bending elbows',
      'Push back up to starting position'
    ],
    muscleGroups: ['triceps', 'shoulders']
  },

  // Core Exercises
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Start in push-up position',
      'Hold body in straight line from head to heels',
      'Keep core tight and breathe normally',
      'Hold for specified time'
    ],
    muscleGroups: ['core', 'shoulders', 'glutes']
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'core',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Lie on back with knees bent',
      'Place hands behind head lightly',
      'Lift shoulders off ground using abs',
      'Lower with control'
    ],
    muscleGroups: ['abs']
  },

  // Cardio Exercises
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    category: 'cardio',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Start with feet together, arms at sides',
      'Jump feet apart while raising arms overhead',
      'Jump back to starting position',
      'Repeat at steady pace'
    ],
    muscleGroups: ['full body']
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio',
    equipment: ['bodyweight'],
    difficulty: 'advanced',
    instructions: [
      'Start in standing position',
      'Drop into squat and place hands on floor',
      'Jump feet back to plank position',
      'Do push-up, jump feet back to squat, then jump up'
    ],
    muscleGroups: ['full body']
  }
];

export const getExercisesByCategory = (category: string) => {
  return exercises.filter(exercise => exercise.category === category);
};

export const getExercisesByDifficulty = (difficulty: string) => {
  return exercises.filter(exercise => exercise.difficulty === difficulty);
};

export const getExercisesByEquipment = (equipment: string[]) => {
  return exercises.filter(exercise => 
    exercise.equipment.some(eq => equipment.includes(eq))
  );
};