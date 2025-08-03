import { FlameIcon, SaladIcon } from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { Plan } from "@/lib/types";

const DietPlan = ({ plan }: { plan: Plan }) => {
  return (
    <section className="bg-card/80 rounded-xl p-4 md:p-6 border h-fit">
      <div className="flex items-center gap-2 mb-4">
        <SaladIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        <h2 className="text-lg md:text-xl font-bold">Diet Plan</h2>
      </div>
      <div className="mb-3">
        <Badge variant="outline" className="text-sm">
          {plan.dietPlan.title}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Badge variant="outline" className="text-center text-xs md:text-sm">
          <FlameIcon className="w-3 h-3 mr-1" />
          {plan.dietPlan.dailyCalories} cal
        </Badge>
        <Badge variant="outline" className="text-center text-xs md:text-sm">
          Protein: {plan.dietPlan.macros.protein}
        </Badge>
        <Badge variant="outline" className="text-center text-xs md:text-sm">
          Carbs: {plan.dietPlan.macros.carbs}
        </Badge>
        <Badge variant="outline" className="text-center text-xs md:text-sm">
          Fats: {plan.dietPlan.macros.fats}
        </Badge>
      </div>
      <div className="space-y-3 md:space-y-4">
        {plan.dietPlan.meals.map((meal, i) => (
          <div
            key={i}
            className="border rounded-lg p-3 md:p-4 bg-background/50"
          >
            <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primary">
              {meal.name}
            </h3>
            <div className="space-y-2">
              {meal.foods.map((food, j) => (
                <div
                  key={j}
                  className="flex items-center py-1 px-2 bg-card rounded-md"
                >
                  <span className="text-primary mr-2">•</span>
                  <span className="text-xs md:text-sm">{food}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DietPlan;
