import { PlanInput } from "@/lib/types";
import React from "react";
import FitnessGoal from "./FitnessGoal";
import PersonalInfo from "./PersonalInfo";
import Preferences from "./Preferences";

const PlanForm = ({
  form,
  setForm,
  handleChange,
  handleSubmit,
  error,
  loading,
}: {
  form: PlanInput;
  setForm: React.Dispatch<React.SetStateAction<PlanInput>>;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading: boolean;
}) => {
  const [page, setPage] = React.useState(1);

  const formNotComplete = () => {
    return (
      !form.fitness_goal ||
      !form.height ||
      !form.weight ||
      !form.age ||
      !form.workout_days ||
      !form.fitness_level ||
      !form.equipment_access ||
      !form.dietary_restrictions
    );
  };

  return (
    <form
      className="flex-1 bg-card/90 border rounded-2xl p-8 shadow-lg mb-8 md:mb-0"
      onSubmit={handleSubmit}
    >
      <div className="">
        {/* Fitness Goal with Icon */}
        {page === 1 && (
          <div className="mb-6">
            <FitnessGoal
              form={form}
              setForm={setForm}
              handleChange={handleChange}
            />
          </div>
        )}

        {/* Personal Info */}
        {page === 2 && (
          <div className="mb-6">
            <PersonalInfo form={form} handleChange={handleChange} />
          </div>
        )}

        {/* Preferences */}
        {page === 3 && (
          <div className="mb-6">
            <Preferences form={form} handleChange={handleChange} />
          </div>
        )}
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          className="bg-secondary text-white py-2 px-4 rounded-lg"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-primary text-white py-2 px-4 rounded-lg"
          onClick={() => setPage((prev) => Math.min(prev + 1, 3))}
        >
          Next
        </button>
      </div>

      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        className="mt-8 w-full bg-primary text-white py-3 rounded-xl text-xl font-bold shadow-lg hover:bg-primary/90 transition-all"
        disabled={loading && !formNotComplete()}
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>
    </form>
  );
};

export default PlanForm;
