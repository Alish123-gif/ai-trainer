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
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
      <div className="flex items-center gap-3">
        <span className="text-4xl">
          {plan.fitnessGoal === "Weight Loss" ? (
            <FlameIcon />
          ) : plan.fitnessGoal === "Muscle Gain" ? (
            <DumbbellIcon />
          ) : (
            <CalendarIcon />
          )}
        </span>
        <div>
          <div className="text-3xl font-bold mb-1">{plan.name}</div>
          <div className="text-muted-foreground text-sm">
            {plan.fitnessGoal} &middot;{" "}
            {plan.createdAt
              ? new Date(Number(plan.createdAt)).toLocaleDateString()
              : "No date"}
          </div>
        </div>
        {plan.isActive ? (
          <Badge variant="success" className="ml-2 flex items-center gap-1">
            <CheckCircle2Icon className="w-4 h-4" /> Active
          </Badge>
        ) : (
          <Badge variant="destructive" className="ml-2 flex items-center gap-1">
            <XCircleIcon className="w-4 h-4" /> Inactive
          </Badge>
        )}
      </div>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={() => router.back()}>
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
