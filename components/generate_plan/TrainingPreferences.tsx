import { PlanInput } from "@/lib/types";
import React from "react";
import { Info } from "lucide-react";

const TrainingPreferences = ({
  form,
  handleChange,
  validationErrors,
}: {
  form: PlanInput;
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
          <h3 className="text-lg font-semibold">Workout Days per Week</h3>
          <Tooltip content="How many days per week can you commit to working out?">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
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

      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Equipment Access</h3>
          <Tooltip content="Bodyweight: No equipment • Minimal: Bands, dumbbells • Home Gym: Multiple weights • Full Gym: Commercial gym access">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <select
          name="equipment_access"
          value={form.equipment_access}
          onChange={handleChange}
          className="w-full border-2 rounded-lg px-3 py-2 text-lg bg-card/80 focus:border-primary focus:outline-none"
        >
          <option value="Bodyweight Only">Bodyweight Only</option>
          <option value="Minimal Equipment">Minimal Equipment</option>
          <option value="Home Gym">Home Gym</option>
          <option value="Full Gym">Full Gym</option>
        </select>
        {validationErrors.equipment_access && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.equipment_access}
          </p>
        )}
      </div>
    </div>
  );
};

export default TrainingPreferences;
