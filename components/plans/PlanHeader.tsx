import {
  ArrowLeftIcon,
  CalendarIcon,
  CheckCircle2Icon,
  DumbbellIcon,
  FlameIcon,
  XCircleIcon,
} from "lucide-react";
import { Badge } from "../ui/badge";
import React from "react";
import { Button } from "../ui/button";
import PlanPDFGenerator from "../pdf/PlanPDFGenerator";
import { Plan } from "@/lib/types";

interface PlanHeaderProps {
  plan: Plan;
  setShowPDFPreview: (show: boolean) => void;
  showPDFPreview: boolean;
  router: {
    back: () => void;
  };
}

const PlanHeader = ({
  plan,
  setShowPDFPreview,
  showPDFPreview,
  router,
}: PlanHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 max-w-7xl mx-auto mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl md:text-4xl">
            {plan.fitnessGoal === "Weight Loss" ? (
              <FlameIcon />
            ) : plan.fitnessGoal === "Muscle Gain" ? (
              <DumbbellIcon />
            ) : (
              <CalendarIcon />
            )}
          </span>
          <div>
            <div className="text-2xl md:text-3xl font-bold mb-1">
              {plan.name}
            </div>
            <div className="text-muted-foreground text-sm">
              {plan.fitnessGoal} &middot;{" "}
              {plan.createdAt
                ? new Date(Number(plan.createdAt)).toLocaleDateString()
                : "No date"}
            </div>
          </div>
        </div>
        {plan.isActive ? (
          <Badge variant="success" className="flex items-center gap-1 w-fit">
            <CheckCircle2Icon className="w-4 h-4" /> Active
          </Badge>
        ) : (
          <Badge
            variant="destructive"
            className="flex items-center gap-1 w-fit"
          >
            <XCircleIcon className="w-4 h-4" /> Inactive
          </Badge>
        )}
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="w-full sm:w-auto"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
        <PlanPDFGenerator
          plan={plan}
          onPreviewClick={() => setShowPDFPreview(!showPDFPreview)}
        />
      </div>
    </div>
  );
};

export default PlanHeader;
