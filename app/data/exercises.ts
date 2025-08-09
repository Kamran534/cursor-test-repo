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
  },

  // Additional Chest Exercises
  {
    id: 'incline-dumbbell-press',
    name: 'Incline Dumbbell Press',
    category: 'chest',
    equipment: ['dumbbells', 'incline bench'],
    difficulty: 'intermediate',
    instructions: [
      'Set bench to 45-degree incline',
      'Hold dumbbells at chest level',
      'Press weights up and together',
      'Lower with control to starting position'
    ],
    muscleGroups: ['upper chest', 'shoulders', 'triceps']
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'chest',
    equipment: ['dip bars', 'bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Grip dip bars with arms straight',
      'Lower body by bending arms',
      'Keep torso upright and lean slightly forward',
      'Push back up to starting position'
    ],
    muscleGroups: ['chest', 'triceps', 'shoulders']
  },
  {
    id: 'cable-crossover',
    name: 'Cable Crossover',
    category: 'chest',
    equipment: ['cable machine'],
    difficulty: 'intermediate',
    instructions: [
      'Set cables to high position',
      'Stand in center with slight forward lean',
      'Bring handles together in front of chest',
      'Return to starting position with control'
    ],
    muscleGroups: ['chest', 'shoulders']
  },

  // Additional Back Exercises
  {
    id: 'deadlift-rows',
    name: 'T-Bar Row',
    category: 'back',
    equipment: ['t-bar', 'weight plates'],
    difficulty: 'intermediate',
    instructions: [
      'Straddle T-bar with feet shoulder-width apart',
      'Bend at hips and knees, keep back straight',
      'Pull bar to chest, squeeze shoulder blades',
      'Lower with control'
    ],
    muscleGroups: ['lats', 'rhomboids', 'rear delts', 'biceps']
  },
  {
    id: 'chin-ups',
    name: 'Chin-ups',
    category: 'back',
    equipment: ['pull-up bar'],
    difficulty: 'intermediate',
    instructions: [
      'Hang from bar with palms facing you',
      'Pull body up until chin clears bar',
      'Lower with control to starting position',
      'Keep core engaged throughout'
    ],
    muscleGroups: ['lats', 'rhomboids', 'biceps']
  },
  {
    id: 'cable-rows',
    name: 'Seated Cable Row',
    category: 'back',
    equipment: ['cable machine'],
    difficulty: 'beginner',
    instructions: [
      'Sit with feet on platform, knees slightly bent',
      'Grab handle with both hands',
      'Pull handle to lower chest',
      'Squeeze shoulder blades together'
    ],
    muscleGroups: ['lats', 'rhomboids', 'rear delts', 'biceps']
  },

  // Additional Leg Exercises
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian Split Squat',
    category: 'legs',
    equipment: ['bench', 'bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Stand 2-3 feet in front of bench',
      'Place top of rear foot on bench',
      'Lower into lunge position',
      'Push through front heel to return'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'legs',
    equipment: ['barbell'],
    difficulty: 'intermediate',
    instructions: [
      'Hold barbell with shoulder-width grip',
      'Keep knees slightly bent',
      'Hinge at hips, lower bar along legs',
      'Drive hips forward to return to standing'
    ],
    muscleGroups: ['hamstrings', 'glutes', 'erector spinae']
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'legs',
    equipment: ['leg press machine'],
    difficulty: 'beginner',
    instructions: [
      'Sit in leg press machine',
      'Place feet shoulder-width apart on platform',
      'Lower weight by bending knees',
      'Press weight back up through heels'
    ],
    muscleGroups: ['quadriceps', 'glutes', 'hamstrings']
  },
  {
    id: 'calf-raises',
    name: 'Calf Raises',
    category: 'legs',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Stand with feet hip-width apart',
      'Rise up onto toes as high as possible',
      'Hold briefly at the top',
      'Lower slowly to starting position'
    ],
    muscleGroups: ['calves']
  },

  // Additional Shoulder Exercises
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    category: 'shoulders',
    equipment: ['dumbbells'],
    difficulty: 'intermediate',
    instructions: [
      'Start with dumbbells at shoulder level, palms facing you',
      'Rotate wrists as you press up',
      'End with palms facing forward at top',
      'Reverse the motion on the way down'
    ],
    muscleGroups: ['shoulders', 'triceps']
  },
  {
    id: 'face-pulls',
    name: 'Face Pulls',
    category: 'shoulders',
    equipment: ['cable machine'],
    difficulty: 'beginner',
    instructions: [
      'Set cable to face height with rope attachment',
      'Pull rope towards face',
      'Separate hands at face level',
      'Focus on squeezing shoulder blades'
    ],
    muscleGroups: ['rear delts', 'rhomboids']
  },
  {
    id: 'upright-rows',
    name: 'Upright Rows',
    category: 'shoulders',
    equipment: ['barbell'],
    difficulty: 'intermediate',
    instructions: [
      'Hold barbell with narrow grip',
      'Pull bar straight up to chest level',
      'Keep elbows higher than wrists',
      'Lower with control'
    ],
    muscleGroups: ['shoulders', 'traps']
  },

  // Additional Arm Exercises
  {
    id: 'hammer-curls',
    name: 'Hammer Curls',
    category: 'arms',
    equipment: ['dumbbells'],
    difficulty: 'beginner',
    instructions: [
      'Hold dumbbells with neutral grip',
      'Keep elbows at sides',
      'Curl weights toward shoulders',
      'Lower with control'
    ],
    muscleGroups: ['biceps', 'forearms']
  },
  {
    id: 'overhead-tricep-extension',
    name: 'Overhead Tricep Extension',
    category: 'arms',
    equipment: ['dumbbell'],
    difficulty: 'intermediate',
    instructions: [
      'Hold dumbbell overhead with both hands',
      'Lower weight behind head by bending elbows',
      'Keep upper arms stationary',
      'Extend arms back to starting position'
    ],
    muscleGroups: ['triceps']
  },
  {
    id: 'preacher-curls',
    name: 'Preacher Curls',
    category: 'arms',
    equipment: ['barbell', 'preacher bench'],
    difficulty: 'intermediate',
    instructions: [
      'Sit at preacher bench with arms extended',
      'Hold barbell with underhand grip',
      'Curl weight up focusing on biceps',
      'Lower slowly to starting position'
    ],
    muscleGroups: ['biceps']
  },
  {
    id: 'cable-tricep-pushdown',
    name: 'Cable Tricep Pushdown',
    category: 'arms',
    equipment: ['cable machine'],
    difficulty: 'beginner',
    instructions: [
      'Stand at cable machine with rope or bar attachment',
      'Keep elbows at sides',
      'Push weight down by extending forearms',
      'Return to starting position with control'
    ],
    muscleGroups: ['triceps']
  },

  // Additional Core Exercises
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core',
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Sit with knees bent, feet slightly off ground',
      'Lean back slightly, keep back straight',
      'Rotate torso side to side',
      'Keep core engaged throughout'
    ],
    muscleGroups: ['obliques', 'abs']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core',
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Start in plank position',
      'Bring one knee toward chest',
      'Quickly switch legs',
      'Maintain plank position throughout'
    ],
    muscleGroups: ['core', 'shoulders', 'legs']
  },
  {
    id: 'dead-bug',
    name: 'Dead Bug',
    category: 'core',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Lie on back with arms extended up',
      'Bring knees to 90 degrees',
      'Lower opposite arm and leg slowly',
      'Return to starting position'
    ],
    muscleGroups: ['core', 'hip flexors']
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'core',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Lie on back with hands behind head',
      'Bring knees to 90 degrees',
      'Bring elbow to opposite knee',
      'Alternate sides in cycling motion'
    ],
    muscleGroups: ['abs', 'obliques']
  },

  // Additional Cardio Exercises
  {
    id: 'high-knees',
    name: 'High Knees',
    category: 'cardio',
    equipment: ['bodyweight'],
    difficulty: 'beginner',
    instructions: [
      'Stand with feet hip-width apart',
      'Run in place lifting knees high',
      'Pump arms naturally',
      'Maintain quick pace'
    ],
    muscleGroups: ['legs', 'core']
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio',
    equipment: ['jump rope'],
    difficulty: 'intermediate',
    instructions: [
      'Hold rope handles at hip level',
      'Jump with both feet together',
      'Land softly on balls of feet',
      'Keep elbows close to body'
    ],
    muscleGroups: ['legs', 'shoulders', 'core']
  },
  {
    id: 'box-jumps',
    name: 'Box Jumps',
    category: 'cardio',
    equipment: ['plyometric box'],
    difficulty: 'intermediate',
    instructions: [
      'Stand in front of box',
      'Jump explosively onto box',
      'Land softly with both feet',
      'Step down carefully'
    ],
    muscleGroups: ['legs', 'glutes', 'core']
  },
  {
    id: 'bear-crawl',
    name: 'Bear Crawl',
    category: 'cardio',
    equipment: ['bodyweight'],
    difficulty: 'intermediate',
    instructions: [
      'Start on hands and feet, knees off ground',
      'Crawl forward moving opposite hand and foot',
      'Keep core tight and hips low',
      'Maintain steady rhythm'
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