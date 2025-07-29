import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const workoutPlanSchema = v.object({
  schedule: v.array(v.string()),
  exercises: v.array(
    v.object({
      day: v.string(),
      routines: v.array(
        v.object({
          name: v.string(),
          sets: v.number(),
          reps: v.number(),
        })
      ),
    })
  ),
});

export const dietPlanSchema = v.object({
  title: v.string(),
  dailyCalories: v.number(),
  macros: v.object({
    protein: v.string(),
    carbs: v.string(),
    fats: v.string(),
  }),
  meals: v.array(
    v.object({
      name: v.string(),
      foods: v.array(v.string()),
    })
  ),
});

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  plans: defineTable({
    name: v.string(),
    userId: v.id("users"),
    firstName: v.string(),
    profilePic: v.string(),
    fitnessGoal: v.string(),
    height: v.string(),
    weight: v.string(),
    age: v.number(),
    workoutDays: v.number(),
    injuries: v.string(),
    fitnessLevel: v.string(),
    equipmentAccess: v.string(),
    dietaryRestrictions: v.string(),
    isActive: v.boolean(),
    workoutPlan: workoutPlanSchema,
    dietPlan: dietPlanSchema,
    createdAt: v.number(),
    success: v.optional(v.boolean()),
  }).index("by_user", ["userId"]),
});
