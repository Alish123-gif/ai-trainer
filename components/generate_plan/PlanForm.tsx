import { PlanInput } from "@/lib/types";
import React from "react";
import PersonalInfo from "./PersonalInfo";
import GoalsSection from "./GoalsSection";
import TrainingPreferences from "./TrainingPreferences";
import NutritionPreferences from "./NutritionPreferences";
import ProgressBar from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";

const PlanForm = ({
  form,
  setForm,
  handleChange,
  handleSubmit,
  error,
  loading,
  currentStep,
  setCurrentStep,
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
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Navigation functions separate from form submission
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string>
  >({});

  const steps = [
    {
      id: 1,
      title: "Your Goals",
      description: "What are you trying to achieve?",
      fields: ["fitness_goal", "fitness_level"],
    },
    {
      id: 2,
      title: "Your Details",
      description: "Tell us about yourself",
      fields: ["age", "height", "weight", "injuries"],
    },
    {
      id: 3,
      title: "Training Preferences",
      description: "How will you train?",
      fields: ["workout_days", "equipment_access"],
    },
    {
      id: 4,
      title: "Nutrition",
      description: "Nutrition preferences",
      fields: ["dietary_restrictions"],
    },
  ];

  // Validation functions
  const validateStep = (stepNumber: number) => {
    const errors: Record<string, string> = {};
    const step = steps[stepNumber - 1];

    step.fields.forEach((field) => {
      if (!form[field as keyof PlanInput]) {
        errors[field] = "This field is required";
      }

      // Custom validations
      if (field === "age" && form.age) {
        const age = parseInt(form.age);
        if (age < 16 || age > 100) {
          errors.age = "Age must be between 16 and 100";
        }
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isStepValid = (stepNumber: number) => {
    const step = steps[stepNumber - 1];
    return step.fields.every((field) => form[field as keyof PlanInput]);
  };

  const formNotComplete = () => {
    return !steps.every((step) => isStepValid(step.id));
  };

  // Remove duplicate functions - we already have handleNext and handlePrev above

  return (
    <form
      className="flex-1 bg-card/90 border rounded-2xl p-4 md:p-8 shadow-lg mb-8 lg:mb-0 w-full"
      onSubmit={(e) => {
        e.preventDefault();
        if (currentStep === 4) {
          handleSubmit(e);
        }
      }}
    >
      {/* Progress Bar */}
      <ProgressBar steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <div className="min-h-[350px] md:min-h-[400px]">
        {currentStep === 1 && (
          <GoalsSection
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        )}

        {currentStep === 2 && (
          <PersonalInfo
            form={form}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        )}

        {currentStep === 3 && (
          <TrainingPreferences
            form={form}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        )}

        {currentStep === 4 && (
          <NutritionPreferences
            form={form}
            handleChange={handleChange}
            validationErrors={validationErrors}
          />
        )}
      </div>

      {/* Navigation Buttons */}
      <NavigationButtons
        currentStep={currentStep}
        handlePrev={handlePrev}
        handleNext={handleNext}
        loading={loading}
        formNotComplete={formNotComplete}
      />

      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}
    </form>
  );
};

export default PlanForm;
