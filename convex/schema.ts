import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
  }).index("by_clerk_id", ["clerkId"]),

  programs: defineTable({
    userId: v.id("users"),
    title: v.string(),
    workoutPlan: v.object({
      schedule: v.array(v.string()),
      days: v.array(
        v.object({
          day: v.string(),
          exercises: v.array(
            v.object({
              name: v.string(),
              sets: v.number(),
              reps: v.number(),
              description: v.optional(v.string()),
            })
          ),
        })
      ),
    }),
  }).index("by_user", ["userId"]),

  dietPlan: defineTable({
    userId: v.id("users"),
    title: v.string(),
    dailyCalories: v.number(),
    meals: v.array(
      v.object({
        name: v.string(),
        calories: v.number(),
        foodItems: v.array(v.string()),
      })
    ),
    isActive: v.boolean(),
  })
    .index("by_user", ["userId"])
    .index("by_is_active", ["isActive"]),
});
