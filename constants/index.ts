export const fitnessGoalOptions = [
  { label: "Weight Loss", value: "Weight Loss", icon: "🔥" },
  { label: "Muscle Gain", value: "Muscle Gain", icon: "💪" },
  { label: "General Fitness", value: "General Fitness", icon: "🏃" },
  { label: "Custom", value: "Custom", icon: "🛠️" },
];

export const fitnessLevelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

export const USER_PROGRAMS = [
  {
    id: 101,
    firstName: "Lucas",
    profilePic: "https://randomuser.me/api/portraits/men/31.jpg",
    fitnessGoal: "Marathon Training",
    height: "6'1\"",
    weight: "180 lbs",
    age: 29,
    workoutDays: 6,
    injuries: "Mild shin splints",
    fitnessLevel: "Advanced",
    equipmentAccess: "Outdoor & treadmill",
    dietaryRestrictions: "Gluten-free",
    workoutPlan: {
      title: "12-Week Marathon Prep",
      weeklySchedule: [
        { day: "Monday", focus: "Long Run", duration: "90 min" },
        { day: "Tuesday", focus: "Interval Training", duration: "60 min" },
        { day: "Wednesday", focus: "Cross Training", duration: "45 min" },
        { day: "Thursday", focus: "Tempo Run", duration: "70 min" },
        { day: "Friday", focus: "Rest", duration: "-" },
        { day: "Saturday", focus: "Hill Sprints", duration: "50 min" },
        { day: "Sunday", focus: "Recovery Jog", duration: "40 min" },
      ],
      description:
        "A comprehensive running program designed to build endurance, speed, and recovery for marathon success. Includes cross-training and rest for injury prevention.",
    },
    dietPlan: {
      title: "Endurance Fuel Plan (Gluten-Free)",
      dailyCalories: "3,000 calories",
      macros: { protein: "20%", carbs: "60%", fats: "20%" },
      mealExamples: [
        { meal: "Breakfast", example: "Rice porridge with eggs and fruit" },
        {
          meal: "Lunch",
          example: "Grilled chicken, quinoa, and steamed broccoli",
        },
        { meal: "Dinner", example: "Salmon, sweet potato, and green beans" },
        {
          meal: "Snacks",
          example: "Nut butter rice cakes, banana, protein shake",
        },
      ],
      description:
        "High-carb, gluten-free meal plan to support long-distance running and recovery. Focuses on easy-to-digest foods and optimal hydration.",
    },
  },
  {
    id: 102,
    firstName: "Priya",
    profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
    fitnessGoal: "Postpartum Strength",
    height: "5'5\"",
    weight: "140 lbs",
    age: 33,
    workoutDays: 4,
    injuries: "Diastasis recti recovery",
    fitnessLevel: "Beginner",
    equipmentAccess: "Resistance bands, yoga mat",
    dietaryRestrictions: "Nut-free",
    workoutPlan: {
      title: "Gentle Core & Strength Rebuild",
      weeklySchedule: [
        { day: "Monday", focus: "Core Rehab", duration: "30 min" },
        { day: "Wednesday", focus: "Full Body Strength", duration: "35 min" },
        { day: "Friday", focus: "Mobility & Stretching", duration: "25 min" },
        { day: "Sunday", focus: "Low Impact Cardio", duration: "30 min" },
      ],
      description:
        "A safe, progressive program for new mothers focusing on core stability, gentle strength, and mobility. Designed to support postpartum recovery and energy levels.",
    },
    dietPlan: {
      title: "Balanced Postpartum Nutrition (Nut-Free)",
      dailyCalories: "2,200 calories",
      macros: { protein: "25%", carbs: "50%", fats: "25%" },
      mealExamples: [
        {
          meal: "Breakfast",
          example: "Oatmeal with berries and sunflower seeds",
        },
        { meal: "Lunch", example: "Turkey wrap with spinach and hummus" },
        { meal: "Dinner", example: "Grilled fish, brown rice, and carrots" },
        {
          meal: "Snacks",
          example: "Greek yogurt, apple slices, veggie sticks",
        },
      ],
      description:
        "Nut-free, nutrient-dense meals to support healing, energy, and breastfeeding. Emphasizes whole foods and gentle digestion.",
    },
  },
  {
    id: 103,
    firstName: "Mateo",
    profilePic: "https://randomuser.me/api/portraits/men/85.jpg",
    fitnessGoal: "Functional Mobility",
    height: "5'9\"",
    weight: "155 lbs",
    age: 41,
    workoutDays: 5,
    injuries: "Old ankle sprain",
    fitnessLevel: "Intermediate",
    equipmentAccess: "Bodyweight, kettlebell",
    dietaryRestrictions: "Vegan",
    workoutPlan: {
      title: "Dynamic Mobility & Strength",
      weeklySchedule: [
        { day: "Monday", focus: "Mobility Drills", duration: "40 min" },
        { day: "Tuesday", focus: "Kettlebell Strength", duration: "45 min" },
        { day: "Wednesday", focus: "Yoga & Balance", duration: "35 min" },
        { day: "Friday", focus: "HIIT & Core", duration: "30 min" },
        { day: "Saturday", focus: "Active Recovery", duration: "30 min" },
      ],
      description:
        "A program for adults seeking to improve joint health, flexibility, and functional strength. Combines mobility, strength, and balance work for all-around fitness.",
    },
    dietPlan: {
      title: "Plant-Based Performance Plan",
      dailyCalories: "2,400 calories",
      macros: { protein: "20%", carbs: "55%", fats: "25%" },
      mealExamples: [
        {
          meal: "Breakfast",
          example: "Tofu scramble with spinach and peppers",
        },
        { meal: "Lunch", example: "Lentil stew with brown rice" },
        {
          meal: "Dinner",
          example: "Chickpea pasta with tomato sauce and kale",
        },
        {
          meal: "Snacks",
          example: "Fruit smoothie, roasted chickpeas, granola bar",
        },
      ],
      description:
        "Vegan meal plan focused on plant-based protein, complex carbs, and healthy fats to fuel mobility and recovery.",
    },
  },
];
