import { ChevronDownIcon, ChevronRightIcon, DumbbellIcon } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Plan } from "@/lib/types";

type Props = {
  plan: Plan;
  expandAll: () => void;
  collapseAll: () => void;
  expandedDays: Set<string>;
  toggleDay: (day: string) => void;
};

const WorkoutPlan = ({
  plan,
  expandAll,
  collapseAll,
  expandedDays,
  toggleDay,
}: Props) => {
  return (
    <section className="bg-card/80 rounded-xl p-4 md:p-6 border h-fit">
      <div className="flex items-center gap-2 mb-4">
        <DumbbellIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        <h2 className="text-lg md:text-xl font-bold">Workout Plan</h2>
      </div>
      <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <Badge variant="outline" className="text-sm w-fit">
          Schedule: {plan.workoutPlan.schedule.join(", ")}
        </Badge>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={expandAll}
            className="text-xs"
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            className="text-xs"
          >
            Collapse All
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {plan.workoutPlan.exercises.map((exercise, i) => {
          const isExpanded = expandedDays.has(exercise.day);
          return (
            <div
              key={i}
              className="border rounded-lg bg-background/50 overflow-hidden"
            >
              <button
                onClick={() => toggleDay(exercise.day)}
                className="w-full p-3 md:p-4 flex items-center justify-between hover:bg-accent/30 transition-colors"
              >
                <h3 className="font-semibold text-base md:text-lg text-primary">
                  {exercise.day}
                </h3>
                {isExpanded ? (
                  <ChevronDownIcon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                ) : (
                  <ChevronRightIcon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
                )}
              </button>
              {isExpanded && (
                <div className="px-3 md:px-4 pb-3 md:pb-4 space-y-3 mt-2">
                  {exercise.routines.map((routine, j) => (
                    <div
                      key={j}
                      className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 px-3 bg-card rounded-md border gap-2"
                    >
                      <span className="font-medium text-sm md:text-base">
                        {routine.name}
                      </span>
                      <Badge variant="secondary" className="font-mono w-fit">
                        {routine.sets} × {routine.reps}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkoutPlan;
