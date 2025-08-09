import { Workout, UserProgress, UserProfile } from '../types';

// Local storage keys
const KEYS = {
  USER_WORKOUTS: 'fitai_user_workouts',
  USER_PROGRESS: 'fitai_user_progress', 
  USER_PROFILE: 'fitai_user_profile',
  CURRENT_WORKOUT: 'fitai_current_workout',
  WORKOUT_HISTORY: 'fitai_workout_history'
} as const;

// Type-safe localStorage wrapper
class LocalStorageManager {
  private isClient = typeof window !== 'undefined';

  private safeGetItem(key: string): string | null {
    if (!this.isClient) return null;
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      console.warn(`Failed to get ${key} from localStorage:`, error);
      return null;
    }
  }

  private safeSetItem(key: string, value: string): void {
    if (!this.isClient) return;
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      console.warn(`Failed to set ${key} in localStorage:`, error);
    }
  }

  private safeRemoveItem(key: string): void {
    if (!this.isClient) return;
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove ${key} from localStorage:`, error);
    }
  }

  // User Workouts
  saveUserWorkouts(workouts: Workout[]): void {
    const data = JSON.stringify(workouts);
    this.safeSetItem(KEYS.USER_WORKOUTS, data);
  }

  getUserWorkouts(): Workout[] {
    const data = this.safeGetItem(KEYS.USER_WORKOUTS);
    if (!data) return [];
    
    try {
      const workouts = JSON.parse(data);
      // Convert date strings back to Date objects
      return workouts.map((workout: any) => ({
        ...workout,
        createdAt: new Date(workout.createdAt)
      }));
    } catch (error) {
      console.warn('Failed to parse user workouts:', error);
      return [];
    }
  }

  // Current Workout (in progress)
  saveCurrentWorkout(workout: Workout | null): void {
    if (workout === null) {
      this.safeRemoveItem(KEYS.CURRENT_WORKOUT);
      return;
    }
    
    const data = JSON.stringify(workout);
    this.safeSetItem(KEYS.CURRENT_WORKOUT, data);
  }

  getCurrentWorkout(): Workout | null {
    const data = this.safeGetItem(KEYS.CURRENT_WORKOUT);
    if (!data) return null;
    
    try {
      const workout = JSON.parse(data);
      return {
        ...workout,
        createdAt: new Date(workout.createdAt)
      };
    } catch (error) {
      console.warn('Failed to parse current workout:', error);
      return null;
    }
  }

  // User Progress
  saveUserProgress(progress: UserProgress[]): void {
    const data = JSON.stringify(progress);
    this.safeSetItem(KEYS.USER_PROGRESS, data);
  }

  getUserProgress(): UserProgress[] {
    const data = this.safeGetItem(KEYS.USER_PROGRESS);
    if (!data) return [];
    
    try {
      const progress = JSON.parse(data);
      // Convert date strings back to Date objects
      return progress.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
    } catch (error) {
      console.warn('Failed to parse user progress:', error);
      return [];
    }
  }

  addProgressEntry(entry: UserProgress): void {
    const currentProgress = this.getUserProgress();
    const updatedProgress = [...currentProgress, entry];
    this.saveUserProgress(updatedProgress);
  }

  // User Profile
  saveUserProfile(profile: UserProfile): void {
    const data = JSON.stringify(profile);
    this.safeSetItem(KEYS.USER_PROFILE, data);
  }

  getUserProfile(): UserProfile | null {
    const data = this.safeGetItem(KEYS.USER_PROFILE);
    if (!data) return null;
    
    try {
      return JSON.parse(data);
    } catch (error) {
      console.warn('Failed to parse user profile:', error);
      return null;
    }
  }

  // Workout History
  saveWorkoutHistory(history: UserProgress[]): void {
    const data = JSON.stringify(history);
    this.safeSetItem(KEYS.WORKOUT_HISTORY, data);
  }

  getWorkoutHistory(): UserProgress[] {
    const data = this.safeGetItem(KEYS.WORKOUT_HISTORY);
    if (!data) return [];
    
    try {
      const history = JSON.parse(data);
      return history.map((entry: any) => ({
        ...entry,
        date: new Date(entry.date)
      }));
    } catch (error) {
      console.warn('Failed to parse workout history:', error);
      return [];
    }
  }

  addWorkoutToHistory(workout: UserProgress): void {
    const currentHistory = this.getWorkoutHistory();
    const updatedHistory = [...currentHistory, workout];
    this.saveWorkoutHistory(updatedHistory);
  }

  // Statistics helpers
  getWorkoutStats() {
    const progress = this.getUserProgress();
    const history = this.getWorkoutHistory();
    
    const totalWorkouts = history.length;
    const totalDuration = history.reduce((sum, workout) => sum + workout.duration, 0);
    const currentStreak = this.calculateStreak(history);
    
    return {
      totalWorkouts,
      totalDuration: Math.round(totalDuration / 60), // Convert to hours
      currentStreak,
      progressEntries: progress.length
    };
  }

  private calculateStreak(history: UserProgress[]): number {
    if (history.length === 0) return 0;
    
    // Sort by date descending
    const sortedHistory = [...history].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    for (const workout of sortedHistory) {
      const workoutDate = new Date(workout.date);
      workoutDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((currentDate.getTime() - workoutDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff === streak + 1) {
        // Allow for one day gap (yesterday)
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }

  // Clear all data
  clearAllData(): void {
    Object.values(KEYS).forEach(key => {
      this.safeRemoveItem(key);
    });
  }

  // Export data for backup
  exportData() {
    return {
      workouts: this.getUserWorkouts(),
      progress: this.getUserProgress(),
      profile: this.getUserProfile(),
      history: this.getWorkoutHistory(),
      exportDate: new Date().toISOString()
    };
  }

  // Import data from backup
  importData(data: any): boolean {
    try {
      if (data.workouts) {
        this.saveUserWorkouts(data.workouts);
      }
      if (data.progress) {
        this.saveUserProgress(data.progress);
      }
      if (data.profile) {
        this.saveUserProfile(data.profile);
      }
      if (data.history) {
        this.saveWorkoutHistory(data.history);
      }
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }
}

// Create singleton instance
export const localStorageManager = new LocalStorageManager();

// React hooks for localStorage
export const useLocalStorage = () => {
  return {
    // Workouts
    saveWorkout: (workout: Workout) => {
      const currentWorkouts = localStorageManager.getUserWorkouts();
      const updatedWorkouts = [...currentWorkouts, workout];
      localStorageManager.saveUserWorkouts(updatedWorkouts);
    },
    
    getWorkouts: () => localStorageManager.getUserWorkouts(),
    
    deleteWorkout: (workoutId: string) => {
      const currentWorkouts = localStorageManager.getUserWorkouts();
      const updatedWorkouts = currentWorkouts.filter(w => w.id !== workoutId);
      localStorageManager.saveUserWorkouts(updatedWorkouts);
    },
    
    // Progress
    addProgress: (progress: UserProgress) => {
      localStorageManager.addProgressEntry(progress);
    },
    
    getProgress: () => localStorageManager.getUserProgress(),
    
    // Profile
    saveProfile: (profile: UserProfile) => {
      localStorageManager.saveUserProfile(profile);
    },
    
    getProfile: () => localStorageManager.getUserProfile(),
    
    // History
    addToHistory: (workout: UserProgress) => {
      localStorageManager.addWorkoutToHistory(workout);
    },
    
    getHistory: () => localStorageManager.getWorkoutHistory(),
    
    // Stats
    getStats: () => localStorageManager.getWorkoutStats(),
    
    // Current workout
    saveCurrentWorkout: (workout: Workout | null) => {
      localStorageManager.saveCurrentWorkout(workout);
    },
    
    getCurrentWorkout: () => localStorageManager.getCurrentWorkout(),
    
    // Utility
    clearAll: () => localStorageManager.clearAllData(),
    exportData: () => localStorageManager.exportData(),
    importData: (data: any) => localStorageManager.importData(data)
  };
};
