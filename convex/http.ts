import { httpRouter } from "convex/server";
import { api } from "./_generated/api";
import { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { httpAction } from "./_generated/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { WorkoutPlanInput, DietPlanInput } from "@/lib/types";

const http = httpRouter();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
http.route({
  path: "/clerk",
  method: "POST",
  handler: httpAction(async (ctx, req) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET as string;
    if (!webhookSecret) {
      throw new Error("CLERK_WEBHOOK_SECRET is not set");
    }
    const svix_id = req.headers.get("svix-id");
    const svix_timestamp = req.headers.get("svix-timestamp");
    const svix_signature = req.headers.get("svix-signature");
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing svix headers", { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(webhookSecret);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error(err);
      return new Response("Error verifying webhook", { status: 400 });
    }

    if (evt.type === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name } =
        evt.data;
      try {
        await ctx.runMutation(api.users.syncUser, {
          clerkId: id,
          name: `${first_name} ${last_name}`,
          email: email_addresses[0].email_address,
          imageUrl: image_url,
        });
      } catch (err) {
        console.error(err);
        return new Response("Error creating user", { status: 500 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  }),
});

// validate and fix workout plan to ensure it has proper numeric types
function validateWorkoutPlan(plan: WorkoutPlanInput): WorkoutPlanInput {
  // Ensure schedule is an array of strings
  const schedule = Array.isArray(plan.schedule)
    ? plan.schedule.map((day) => String(day))
    : [];

  // Validate and convert exercises
  const exercises = Array.isArray(plan.exercises)
    ? plan.exercises.map((exercise) => ({
        day: String(exercise.day),
        routines: Array.isArray(exercise.routines)
          ? exercise.routines.map((routine) => ({
              name: String(routine.name),
              sets:
                typeof routine.sets === "number"
                  ? routine.sets
                  : parseInt(String(routine.sets)) || 1,
              reps:
                typeof routine.reps === "number"
                  ? routine.reps
                  : parseInt(String(routine.reps)) || 10,
            }))
          : [],
      }))
    : [];

  return {
    schedule,
    exercises,
  };
}

// validate diet plan to ensure it strictly follows schema
function validateDietPlan(plan: DietPlanInput): DietPlanInput {
  // Ensure title is a string
  const title = String(plan.title || "Fitness Plan");

  // Ensure dailyCalories is a number
  const dailyCalories =
    typeof plan.dailyCalories === "number"
      ? plan.dailyCalories
      : parseFloat(String(plan.dailyCalories)) || 2000;

  // Validate and convert macros
  const macros = {
    protein: String(plan.macros?.protein || "25%"),
    carbs: String(plan.macros?.carbs || "45%"),
    fats: String(plan.macros?.fats || "30%"),
  };

  // Validate and convert meals
  const meals = Array.isArray(plan.meals)
    ? plan.meals.map((meal) => ({
        name: String(meal.name),
        foods: Array.isArray(meal.foods)
          ? meal.foods.map((food) => String(food))
          : [],
      }))
    : [];

  return {
    title,
    dailyCalories,
    macros,
    meals,
  };
}

http.route({
  path: "/generate-program",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const payload = await request.json();

      const {
        user_id,
        age,
        height,
        weight,
        gender,
        injuries,
        workout_days,
        fitness_goal,
        fitness_level,
        equipment_access,
        dietary_restrictions,
      } = payload;

      console.log("Payload is here:", payload);

      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash-001",
        generationConfig: {
          temperature: 0.4, // lower temperature for more predictable outputs
          topP: 0.9,
          responseMimeType: "application/json",
        },
      });

      const workoutPrompt = `You are an experienced fitness coach creating a personalized workout plan based on:
      Age: ${age}
      Height: ${height}
      Weight: ${weight}
      Gender: ${gender}
      Injuries or limitations: ${injuries}
      Available days for workout: ${workout_days}
      Fitness goal: ${fitness_goal}
      Fitness level: ${fitness_level}
      Equipment access: ${equipment_access}
      
      As a professional coach:
      - Consider muscle group splits to avoid overtraining the same muscles on consecutive days
      - Design exercises that match the fitness level and account for any injuries and the gender of the user
      - Structure the workouts to specifically target the user's fitness goal
      
      CRITICAL SCHEMA INSTRUCTIONS:
      - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
      - "sets" and "reps" MUST ALWAYS be NUMBERS, never strings
      - For example: "sets": 3, "reps": 10
      - Do NOT use text like "reps": "As many as possible" or "reps": "To failure"
      - Instead use specific numbers like "reps": 12 or "reps": 15
      - For cardio, use "sets": 1, "reps": 1 or another appropriate number
      - NEVER include strings for numerical fields
      - NEVER add extra fields not shown in the example below
      
      Return a JSON object with this EXACT structure:
      {
        "schedule": ["Monday", "Wednesday", "Friday"],
        "exercises": [
          {
            "day": "Monday",
            "routines": [
              {
                "name": "Exercise Name",
                "sets": 3,
                "reps": 10
              }
            ]
          }
        ]
      }
      
      DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

      const workoutResult = await model.generateContent(workoutPrompt);
      const workoutPlanText = workoutResult.response.text();

      // VALIDATE THE INPUT COMING FROM AI
      let workoutPlan = JSON.parse(workoutPlanText);
      workoutPlan = validateWorkoutPlan(workoutPlan);

      const dietPrompt = `You are an experienced nutrition coach creating a personalized diet plan based on:
        Age: ${age}
        Height: ${height}
        Weight: ${weight}
        Gender: ${gender}
        Fitness goal: ${fitness_goal}
        Dietary restrictions: ${dietary_restrictions}
        
        As a professional nutrition coach:
        - Calculate appropriate daily calorie intake based on the person's stats and goals
        - Create a balanced meal plan with proper macronutrient distribution
        - Include a variety of nutrient-dense foods while respecting dietary restrictions
        - Consider meal timing around workouts for optimal performance and recovery
        
        CRITICAL SCHEMA INSTRUCTIONS:
        - Your output MUST contain ONLY the fields specified below, NO ADDITIONAL FIELDS
        - "dailyCalories" MUST be a NUMBER, not a string
        - "title" should be the fitness goal (e.g., "Weight Loss", "Muscle Gain", "General Fitness")
        - "macros" should include protein, carbs, and fats as strings with percentages or grams
        - ONLY include the EXACT fields shown in the example below
        - Each meal should include ONLY a "name" and "foods" array

        Return a JSON object with this EXACT structure and no other fields:
        {
          "title": "Weight Loss",
          "dailyCalories": 2000,
          "macros": {
            "protein": "30% (150g)",
            "carbs": "40% (200g)",
            "fats": "30% (67g)"
          },
          "meals": [
            {
              "name": "Breakfast",
              "foods": ["Oatmeal with berries", "Greek yogurt", "Black coffee"]
            },
            {
              "name": "Lunch",
              "foods": ["Grilled chicken salad", "Whole grain bread", "Water"]
            }
          ]
        }
        
        DO NOT add any fields that are not in this example. Your response must be a valid JSON object with no additional text.`;

      const dietResult = await model.generateContent(dietPrompt);
      const dietPlanText = dietResult.response.text();

      // VALIDATE THE INPUT COMING FROM AI
      let dietPlan = JSON.parse(dietPlanText);
      dietPlan = validateDietPlan(dietPlan);

      // Look up the user by Clerk ID to get their Convex user ID
      let user;
      try {
        user = await ctx.runQuery(api.users.getUser, { clerkId: user_id });
      } catch (error) {
        console.error("Error looking up user:", error);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Error looking up user. Please try again.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      if (!user) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "User not found. Please sign in again.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // save to our DB: CONVEX
      const planId = await ctx.runMutation(api.plans.createPlan, {
        name: `${fitness_goal} Plan - ${new Date().toLocaleDateString()}`,
        userId: user._id,
        fitnessGoal: fitness_goal,
        height: height || "",
        weight: weight || "",
        gender: gender || "",
        age: typeof age === "number" ? age : parseInt(String(age)) || 0,
        workoutDays:
          typeof workout_days === "number"
            ? workout_days
            : parseInt(String(workout_days)) || 0,
        injuries: injuries || "",
        fitnessLevel: fitness_level || "",
        equipmentAccess: equipment_access || "",
        dietaryRestrictions: dietary_restrictions || "",
        workoutPlan,
        dietPlan,
        isActive: true,
        success: false,
      });

      return new Response(
        JSON.stringify({
          success: true,
          data: {
            planId,
            workoutPlan,
            dietPlan,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error generating fitness plan:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }),
});

export default http;
