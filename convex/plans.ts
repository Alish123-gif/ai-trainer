import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { workoutPlanSchema, dietPlanSchema } from "./schema";

export const createPlan = mutation({
  args: {
    name: v.string(),
    userId: v.id("users"),
    fitnessGoal: v.string(),
    height: v.string(),
    weight: v.string(),
    gender: v.string(),
    age: v.number(),
    workoutDays: v.number(),
    injuries: v.string(),
    fitnessLevel: v.string(),
    equipmentAccess: v.string(),
    dietaryRestrictions: v.string(),
    workoutPlan: workoutPlanSchema,
    dietPlan: dietPlanSchema,
    isActive: v.boolean(),
    success: v.boolean(),
  },
  handler: async (ctx, args) => {
    // Deactivate all active plans for this user
    const userPlans = await ctx.db
      .query("plans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
    for (const plan of userPlans) {
      if (plan.isActive) {
        await ctx.db.patch(plan._id, { isActive: false });
      }
    }
    // Insert the new plan with createdAt
    return await ctx.db.insert("plans", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const getPlansByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("plans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const reactivatePlan = mutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    // Get the plan to reactivate
    const plan = await ctx.db.get(args.planId);
    if (!plan) throw new Error("Plan not found");
    // Deactivate all user's plans
    const userPlans = await ctx.db
      .query("plans")
      .withIndex("by_user", (q) => q.eq("userId", plan.userId))
      .collect();
    for (const p of userPlans) {
      await ctx.db.patch(p._id, { isActive: false });
    }
    // Activate the selected plan
    await ctx.db.patch(args.planId, { isActive: true });
    return true;
  },
});

export const deletePlan = mutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.planId);
    return true;
  },
});

export const duplicatePlan = mutation({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    const plan = await ctx.db.get(args.planId);
    if (!plan) throw new Error("Plan not found");
    // Remove _id and isActive, set new name and createdAt
    const { ...planData } = plan;
    const newPlan = {
      ...planData,
      name: `${plan.name} (Copy)`,
      isActive: false,
      createdAt: Date.now(),
    };
    const newPlanId = await ctx.db.insert("plans", newPlan);
    return newPlanId;
  },
});

export const getPlanById = query({
  args: { planId: v.id("plans") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.planId);
  },
});
