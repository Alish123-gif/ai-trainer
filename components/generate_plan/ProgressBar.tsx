import React from "react";

const ProgressBar = ({
  steps,
  currentStep,
}: {
  steps: Array<{
    id: number;
    title: string;
    description: string;
    fields: string[];
  }>;
  currentStep: number;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center mb-4">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-1">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-muted-foreground">
          {steps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );
};

export default ProgressBar;
