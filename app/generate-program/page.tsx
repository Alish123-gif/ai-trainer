"use client";

import { useUser } from "@clerk/nextjs";
import { ChangeEvent, FormEvent, useState } from "react";

const fitnessGoalOptions = [
  { label: "Weight Loss", value: "Weight Loss", icon: "🔥" },
  { label: "Muscle Gain", value: "Muscle Gain", icon: "💪" },
  { label: "General Fitness", value: "General Fitness", icon: "🏃" },
];

const fitnessLevelOptions = [
  { label: "Beginner", value: "Beginner" },
  { label: "Intermediate", value: "Intermediate" },
  { label: "Advanced", value: "Advanced" },
];

const GenerateProgramPage = () => {
  const { user } = useUser();

  // Form state
  const [form, setForm] = useState({
    fitness_goal: "Weight Loss",
    height: "",
    weight: "",
    age: "",
    workout_days: "3",
    injuries: "None",
    fitness_level: "Beginner",
    equipment_access: "Bodyweight",
    dietary_restrictions: "None",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Generate plans
      const res = await fetch("/api/generate-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user_id: user?.id,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate plans");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono mb-2">
            <span>Generate Your </span>
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Create your personalized plan in seconds. Fill out the form and get
            a tailored workout & diet instantly!
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* FORM */}
          <form
            className="flex-1 bg-card/90 border rounded-2xl p-8 shadow-lg mb-8 md:mb-0"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fitness Goal with Icon */}
              <div className="col-span-2">
                <label className="block text-lg font-semibold mb-2">
                  Fitness Goal
                </label>
                <div className="flex gap-4">
                  {fitnessGoalOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.value}
                      className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl border-2 transition-all text-2xl font-bold ${form.fitness_goal === opt.value ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-accent/30"}`}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, fitnessGoal: opt.value }))
                      }
                    >
                      <span>{opt.icon}</span>
                      <span className="text-base font-medium mt-1">
                        {opt.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Age */}
              <div>
                <label className="block text-base font-medium mb-1">Age</label>
                <input
                  name="age"
                  type="number"
                  min="10"
                  max="100"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg"
                  required
                />
              </div>
              {/* Height */}
              <div>
                <label className="block text-base font-medium mb-1">
                  Height
                </label>
                <input
                  name="height"
                  value={form.height}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg"
                  placeholder={"e.g. 5'8\" or 172cm"}
                  required
                />
              </div>
              {/* Weight */}
              <div>
                <label className="block text-base font-medium mb-1">
                  Weight
                </label>
                <input
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg"
                  placeholder="e.g. 150 lbs or 68kg"
                  required
                />
              </div>
              {/* Workout Days Slider */}
              <div>
                <label className="block text-base font-medium mb-1">
                  Workout Days/Week
                </label>
                <input
                  name="workout_days"
                  type="range"
                  min="1"
                  max="7"
                  value={form.workout_days}
                  onChange={handleChange}
                  className="w-full accent-primary"
                />
                <div className="text-center text-lg mt-1 font-mono">
                  {form.workout_days} days
                </div>
              </div>
              {/* Fitness Level */}
              <div>
                <label className="block text-base font-medium mb-1">
                  Fitness Level
                </label>
                <select
                  name="fitness_level"
                  value={form.fitness_level}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg bg-card/80"
                >
                  {fitnessLevelOptions.map((opt) => (
                    <option key={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              {/* Injuries */}
              <div className="md:col-span-2">
                <label className="block text-base font-medium mb-1">
                  Injuries
                </label>
                <input
                  name="injuries"
                  value={form.injuries}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg"
                  placeholder="None or details"
                />
              </div>
              {/* Equipment Access */}
              <div className="md:col-span-2">
                <label className="block text-base font-medium mb-1">
                  Equipment Access
                </label>
                <input
                  name="equipmentAccess"
                  value={form.equipment_access}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg"
                  placeholder="e.g. Dumbbells, Gym, None"
                />
              </div>
              {/* Dietary Restrictions */}
              <div className="md:col-span-2">
                <label className="block text-base font-medium mb-1">
                  Dietary Restrictions
                </label>
                <input
                  name="dietaryRestrictions"
                  value={form.dietary_restrictions}
                  onChange={handleChange}
                  className="w-full border-2 rounded-lg px-3 py-2 text-lg"
                  placeholder="None, Vegan, etc."
                />
              </div>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            <button
              type="submit"
              className="mt-8 w-full bg-primary text-white py-3 rounded-xl text-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Plan"}
            </button>
          </form>
          {/* LIVE SUMMARY CARD */}
          <div className="flex-1 min-w-[320px] max-w-md mx-auto md:mx-0 bg-card/80 border rounded-2xl p-6 shadow-md sticky top-32">
            <h2 className="text-xl font-bold mb-4 text-primary">
              Summary Preview
            </h2>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">
                {
                  fitnessGoalOptions.find((f) => f.value === form.fitness_goal)
                    ?.icon
                }
              </span>
              <span className="text-lg font-semibold">{form.fitness_goal}</span>
            </div>
            <div className="mb-1">
              <span className="font-mono">Age:</span> {form.age || "-"}
            </div>
            <div className="mb-1">
              <span className="font-mono">Height:</span> {form.height || "-"}
            </div>
            <div className="mb-1">
              <span className="font-mono">Weight:</span> {form.weight || "-"}
            </div>
            <div className="mb-1">
              <span className="font-mono">Workout Days:</span>{" "}
              {form.workout_days}
            </div>
            <div className="mb-1">
              <span className="font-mono">Level:</span> {form.fitness_level}
            </div>
            <div className="mb-1">
              <span className="font-mono">Injuries:</span> {form.injuries}
            </div>
            <div className="mb-1">
              <span className="font-mono">Equipment:</span>{" "}
              {form.equipment_access}
            </div>
            <div className="mb-1">
              <span className="font-mono">Diet:</span>{" "}
              {form.dietary_restrictions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GenerateProgramPage;
