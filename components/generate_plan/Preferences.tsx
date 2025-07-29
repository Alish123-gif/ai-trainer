import { fitnessLevelOptions } from "@/constants";
import { PlanInput } from "@/lib/types";
import React from "react";

const Preferences = ({
  form,
  handleChange,
}: {
  form: PlanInput;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}) => {
  return (
    <div className="col-span-2">
      <h1 className="block text-3xl font-semibold mb-4 text-primary">
        Preferences
      </h1>
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
        <label className="block text-base font-medium mb-1">Injuries</label>
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
          name="equipment_access"
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
          name="dietary_restrictions"
          value={form.dietary_restrictions}
          onChange={handleChange}
          className="w-full border-2 rounded-lg px-3 py-2 text-lg"
          placeholder="None, Vegan, etc."
        />
      </div>
    </div>
  );
};

export default Preferences;
