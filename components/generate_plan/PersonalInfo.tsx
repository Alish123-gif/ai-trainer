import { PlanInput } from "@/lib/types";
import React from "react";
import { Info } from "lucide-react";

const PersonalInfo = ({
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
  validationErrors?: Record<string, string>;
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
        <div className="flex items-center gap-2 mb-2">
          <label className="text-lg font-semibold">Age</label>
          <Tooltip content="Must be between 16 and 100 years old">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <input
          name="age"
          type="number"
          min="16"
          max="100"
          placeholder="e.g. 25"
          value={form.age}
          onChange={handleChange}
          className="w-full border-2 rounded-lg px-4 py-3 text-lg bg-card/80 focus:border-primary focus:outline-none transition-colors"
          required
        />
        {validationErrors?.age && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.age}</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-lg font-semibold">Height</label>
          <Tooltip content="Enter in any format: 5'8, 172cm, 1.72m">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <input
          name="height"
          value={form.height}
          onChange={handleChange}
          className="w-full border-2 rounded-lg px-4 py-3 text-lg bg-card/80 focus:border-primary focus:outline-none transition-colors"
          placeholder="e.g. 5'8 or 172cm"
          required
        />
        {validationErrors?.height && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.height}</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="text-lg font-semibold">Weight</label>
          <Tooltip content="Enter in any format: 150lbs, 70kg">
            <Info className="w-4 h-4 text-muted-foreground cursor-help" />
          </Tooltip>
        </div>
        <input
          name="weight"
          value={form.weight}
          onChange={handleChange}
          className="w-full border-2 rounded-lg px-4 py-3 text-lg bg-card/80 focus:border-primary focus:outline-none transition-colors"
          placeholder="e.g. 150lbs or 70kg"
          required
        />
        {validationErrors?.weight && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.weight}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
