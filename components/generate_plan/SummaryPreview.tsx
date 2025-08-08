import { fitnessGoalOptions } from "@/constants";
import { PlanInput } from "@/lib/types";
import React from "react";

const SummaryPreview = ({ form }: { form: PlanInput }) => {
  return (
    <div className="w-full lg:flex-1 lg:min-w-[320px] lg:max-w-md mx-auto lg:mx-0 bg-card/80 border rounded-2xl p-4 md:p-6 shadow-md lg:sticky lg:top-32">
      <h2 className="text-lg md:text-xl font-bold mb-4 text-primary">
        Summary Preview
      </h2>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl md:text-3xl">
          {fitnessGoalOptions.find((f) => f.value === form.fitness_goal)?.icon}
        </span>
        <span className="text-base md:text-lg font-semibold">
          {form.fitness_goal}
        </span>
      </div>
      <div className="space-y-2 text-sm md:text-base">
        <div className="flex justify-between">
          <span className="font-mono">Age:</span>
          <span>{form.age || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Height:</span>
          <span>{form.height || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Weight:</span>
          <span>{form.weight || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Gender:</span>
          <span>{form.gender || "-"}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Workout Days:</span>
          <span>{form.workout_days}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Level:</span>
          <span>{form.fitness_level}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Injuries:</span>
          <span>{form.injuries}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Equipment:</span>
          <span>{form.equipment_access}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-mono">Diet:</span>
          <span>{form.dietary_restrictions}</span>
        </div>
      </div>
    </div>
  );
};

export default SummaryPreview;
