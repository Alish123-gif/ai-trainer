import { fitnessGoalOptions } from "@/constants";
import { PlanInput } from "@/lib/types";
import React from "react";

const FitnessGoal = ({
  form,
  setForm,
  handleChange,
}: {
  form: PlanInput;
  setForm: React.Dispatch<React.SetStateAction<PlanInput>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
}) => {
  return (
    <div className="col-span-2">
      <h1 className="block text-3xl font-semibold mb-4 text-primary">
        Fitness Goal
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {fitnessGoalOptions.map((opt) => (
          <button
            type="button"
            key={opt.value}
            className={`h-32 flex flex-col items-center justify-center px-4 py-2 rounded-xl border-2 transition-all text-2xl font-bold ${form.fitness_goal === opt.value ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-accent/30"}`}
            onMouseUp={() =>
              setForm((prev) => ({
                ...prev,
                fitness_goal: opt.value,
              }))
            }
          >
            <span>{opt.icon}</span>
            <span className="text-base font-medium mt-1">{opt.label}</span>
            {opt.value === "Custom" &&
              !["Weight Loss", "Muscle Gain", "General Fitness"].includes(
                form.fitness_goal
              ) && (
                <input
                  name="fitness_goal"
                  value={form.fitness_goal}
                  onChange={handleChange}
                  className="text-lg border-border border-b-2 bg-transparent focus:outline-none focus:border-primary my-2 w-[60%] text-center"
                  placeholder="e.g. Run a marathon"
                  required
                />
              )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FitnessGoal;
