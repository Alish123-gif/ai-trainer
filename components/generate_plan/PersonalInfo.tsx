import { PlanInput } from "@/lib/types";
import React from "react";

const PersonalInfo = ({
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
        Personal Information
      </h1>
      <div className="flex flex-col gap-6">
        <div>
          <label className="block text-base font-medium mb-1">Age</label>
          <input
            name="age"
            placeholder="e.g. 25"
            value={form.age}
            onChange={handleChange}
            className="w-full border-2 rounded-lg px-3 py-2 text-lg"
            required
          />
        </div>
        {/* Height */}
        <div>
          <label className="block text-base font-medium mb-1">Height</label>
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
          <label className="block text-base font-medium mb-1">Weight</label>
          <input
            name="weight"
            value={form.weight}
            onChange={handleChange}
            className="w-full border-2 rounded-lg px-3 py-2 text-lg"
            placeholder="e.g. 150 lbs or 68kg"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
