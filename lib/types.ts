// Plan-related types used across the application

// Workout Plan Types
export interface WorkoutRoutine {
  name: string;
  sets: number;
  reps: number;
}

export interface WorkoutExercise {
  day: string;
  routines: WorkoutRoutine[];
}

export interface WorkoutPlan {
  schedule: string[];
  exercises: WorkoutExercise[];
}

// Diet Plan Types
export interface DietMeal {
  name: string;
  foods: string[];
}

export interface DietPlan {
  title: string;
  dailyCalories: number;
  macros: { protein: string; carbs: string; fats: string };
  meals: DietMeal[];
}

// Main Plan Type
export interface Plan {
  _id: string;
  name: string;
  fitnessGoal: string;
  height: string;
  weight: string;
  age: number;
  workoutDays: number;
  injuries: string;
  fitnessLevel: string;
  equipmentAccess: string;
  dietaryRestrictions: string;
  isActive: boolean;
  workoutPlan: WorkoutPlan;
  dietPlan: DietPlan;
  createdAt?: string;
  success?: boolean;
}

export interface PlanInput {
  fitness_goal: string;
  age: string;
  height: string;
  weight: string;
  workout_days: string;
  injuries: string;
  fitness_level: string;
  equipment_access: string;
  dietary_restrictions: string;
}

// Input types for API calls
export interface WorkoutPlanInput {
  schedule: string[];
  exercises: WorkoutExercise[];
}

export interface DietPlanInput {
  title: string;
  dailyCalories: number;
  macros: { protein: string; carbs: string; fats: string };
  meals: DietMeal[];
}
