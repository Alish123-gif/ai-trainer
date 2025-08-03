import { PlanInput } from "@/lib/types";
import React from "react";
import FitnessGoal from "./FitnessGoal";
import { Info } from "lucide-react";

const GoalsSection = ({
  form,
  setForm,
  handleChange,
  validationErrors,
}: {
  form: PlanInput;
  setForm: React.Dispatch<React.SetStateAction<PlanInput>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  validationErrors: Record<string, string>;
}) => {
  const Tooltip = ({
    content,
    children,
  }: {
    content: string;
    children: React.ReactNode;
  }) => (
    <div className="relative group inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {content}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Fitness Goal</h3>
          <Tooltip content="Choose your primary fitness objective">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <FitnessGoal
          form={form}
          setForm={setForm}
          handleChange={handleChange}
        />
        {validationErrors.fitness_goal && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.fitness_goal}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Fitness Level</h3>
          <Tooltip content="Beginner: New to exercise • Intermediate: 6+ months experience • Advanced: 2+ years experience">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <select
          name="fitness_level"
          value={form.fitness_level}
          onChange={handleChange}
          className="w-full border-2 rounded-lg px-3 py-2 text-lg bg-card/80 focus:border-primary focus:outline-none"
        >
          <option value="">Select your level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        {validationErrors.fitness_level && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.fitness_level}
          </p>
        )}
      </div>
    </div>
  );
};

export default GoalsSection;
