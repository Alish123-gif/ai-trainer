import { Plan } from "@/lib/types";
import { UserIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const PlanDetails = ({ plan }: { plan: Plan }) => {
  const markAsDone = () => {
    // Logic to mark the plan as done
    console.log("Plan marked as done");
  };
  return (
    <section className="bg-card/80 rounded-xl p-6 flex flex-col gap-2 border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold mb-3">Plan Details</h3>
        <Button variant="success" onClick={markAsDone}>
          Mark as Done
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-primary" />
          <span>
            Age: <b>{plan.age}</b>
          </span>
        </div>
        <div>
          <span>
            Height: <b>{plan.height}</b>
          </span>
        </div>
        <div>
          <span>
            Weight: <b>{plan.weight}</b>
          </span>
        </div>
        <div>
          <span>
            Level: <b>{plan.fitnessLevel}</b>
          </span>
        </div>
        <div>
          <span>
            Workout Days: <b>{plan.workoutDays}</b>
          </span>
        </div>
        <div>
          <span>
            Equipment: <b>{plan.equipmentAccess}</b>
          </span>
        </div>
        <div>
          <span>
            Diet: <b>{plan.dietaryRestrictions}</b>
          </span>
        </div>
        {plan.injuries && plan.injuries !== "None" && (
          <div>
            <span>
              Injuries: <b>{plan.injuries}</b>
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlanDetails;
