import { PlanInput } from "@/lib/types";
import React from "react";
import { Info } from "lucide-react";

const NutritionPreferences = ({
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
          <h3 className="text-lg font-semibold">Dietary Restrictions</h3>
          <Tooltip content="Include allergies, intolerances, or dietary choices (vegan, keto, etc.)">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <textarea
          name="dietary_restrictions"
          value={form.dietary_restrictions}
          onChange={handleChange}
          placeholder="e.g., Vegetarian, No dairy, Gluten-free, etc."
          className="w-full border-2 rounded-lg px-3 py-2 text-lg bg-card/80 focus:border-primary focus:outline-none min-h-[100px]"
        />
        {validationErrors.dietary_restrictions && (
          <p className="text-red-500 text-sm mt-1">
            {validationErrors.dietary_restrictions}
          </p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold">Injuries (Optional)</h3>
          <Tooltip content="List any current injuries or physical limitations so we can adapt exercises accordingly">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <textarea
          name="injuries"
          value={form.injuries}
          onChange={handleChange}
          placeholder="e.g., Lower back pain, Knee injury, etc."
          className="w-full border-2 rounded-lg px-3 py-2 text-lg bg-card/80 focus:border-primary focus:outline-none min-h-[100px]"
        />
      </div>
    </div>
  );
};

export default NutritionPreferences;
