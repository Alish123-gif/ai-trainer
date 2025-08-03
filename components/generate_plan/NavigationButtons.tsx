import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NavigationButtons = ({
  currentStep,
  handlePrev,
  handleNext,
  loading,
  formNotComplete,
}: {
  currentStep: number;
  handlePrev: () => void;
  handleNext: () => void;
  loading: boolean;
  formNotComplete: () => boolean;
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentStep === 1}
        className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
          currentStep === 1
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        Back
      </button>

      {currentStep < 4 && (
        <button
          type="button"
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
      {currentStep === 4 && (
        <button
          type="submit"
          disabled={loading || formNotComplete()}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
            loading || formNotComplete()
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {loading ? "Generating..." : "Generate Program"}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
