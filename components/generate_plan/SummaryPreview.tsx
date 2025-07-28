import { fitnessGoalOptions } from "@/constants";
import { PlanInput } from "@/lib/types";
import React from "react";

const SummaryPreview = ({ form }: { form: PlanInput }) => {
  return (
    <div className="flex-1 min-w-[320px] max-w-md mx-auto md:mx-0 bg-card/80 border rounded-2xl p-6 shadow-md sticky top-32">
      <h2 className="text-xl font-bold mb-4 text-primary">Summary Preview</h2>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">
          {fitnessGoalOptions.find((f) => f.value === form.fitness_goal)?.icon}
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
        <span className="font-mono">Workout Days:</span> {form.workout_days}
      </div>
      <div className="mb-1">
        <span className="font-mono">Level:</span> {form.fitness_level}
      </div>
      <div className="mb-1">
        <span className="font-mono">Injuries:</span> {form.injuries}
      </div>
      <div className="mb-1">
        <span className="font-mono">Equipment:</span> {form.equipment_access}
      </div>
      <div className="mb-1">
        <span className="font-mono">Diet:</span> {form.dietary_restrictions}
      </div>
    </div>
  );
};

export default SummaryPreview;
