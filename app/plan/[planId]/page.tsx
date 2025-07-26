"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LoaderIcon,
  ArrowLeftIcon,
  DumbbellIcon,
  SaladIcon,
  CalendarIcon,
  UserIcon,
  FlameIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
import { Plan } from "@/lib/types";
import PlanPDFGenerator from "@/components/pdf/PlanPDFGenerator";
import { PDFViewer } from "@react-pdf/renderer";
import PlanPDFDocument from "@/components/pdf/PlanPDFDocument";

export default function PlanDetailsPage() {
  const router = useRouter();
  const { planId } = useParams() as { planId: string };
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());
  const [showPDFPreview, setShowPDFPreview] = useState(false);

  useEffect(() => {
    if (!planId) return;
    setLoading(true);
    fetch(`/api/plans/${planId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          setPlan(data);
          console.log(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load plan");
        setLoading(false);
      });
  }, [planId]);

  const toggleDay = (day: string) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(day)) {
        newSet.delete(day);
      } else {
        newSet.add(day);
      }
      return newSet;
    });
  };

  const expandAll = () => {
    if (plan?.workoutPlan.exercises) {
      setExpandedDays(new Set(plan.workoutPlan.exercises.map((ex) => ex.day)));
    }
  };

  const collapseAll = () => {
    setExpandedDays(new Set());
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoaderIcon className="w-8 h-8 animate-spin mb-2" />
        <div>Loading plan...</div>
      </div>
    );
  }
  if (error || !plan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-2">{error || "Plan not found."}</div>
        <Button onClick={() => router.back()}>
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Header */}
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
              <Badge
                variant="destructive"
                className="ml-2 flex items-center gap-1"
              >
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

        {/* Plan Meta */}
        {showPDFPreview ? (
          /* PDF Preview Section */
          <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
            <PDFViewer width="100%" height="100%">
              <PlanPDFDocument plan={plan} />
            </PDFViewer>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowPDFPreview(false)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        ) : (
          <>
            <section className="bg-card/80 rounded-xl p-6 flex flex-col gap-2 border">
              <h3 className="text-lg font-semibold mb-3">Plan Details</h3>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Workout Plan Section */}
              <section className="bg-card/80 rounded-xl p-6 border h-fit">
                <div className="flex items-center gap-2 mb-4">
                  <DumbbellIcon className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Workout Plan</h2>
                </div>
                <div className="mb-3 flex items-center justify-between">
                  <Badge variant="outline" className="text-sm">
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
                          className="w-full p-4 flex items-center justify-between hover:bg-accent/30 transition-colors"
                        >
                          <h3 className="font-semibold text-lg text-primary">
                            {exercise.day}
                          </h3>
                          {isExpanded ? (
                            <ChevronDownIcon className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
                          )}
                        </button>
                        {isExpanded && (
                          <div className="px-4 pb-4 space-y-3 mt-2">
                            {exercise.routines.map((routine, j) => (
                              <div
                                key={j}
                                className="flex justify-between items-center py-2 px-3 bg-card rounded-md border"
                              >
                                <span className="font-medium">
                                  {routine.name}
                                </span>
                                <Badge
                                  variant="secondary"
                                  className="font-mono"
                                >
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

              {/* Diet Plan Section */}
              <section className="bg-card/80 rounded-xl p-6 border h-fit">
                <div className="flex items-center gap-2 mb-4">
                  <SaladIcon className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-bold">Diet Plan</h2>
                </div>
                <div className="mb-3">
                  <Badge variant="outline" className="text-sm">
                    {plan.dietPlan.title}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Badge variant="outline" className="text-center">
                    <FlameIcon className="w-3 h-3 mr-1" />
                    {plan.dietPlan.dailyCalories} cal
                  </Badge>
                  <Badge variant="outline" className="text-center">
                    Protein: {plan.dietPlan.macros.protein}
                  </Badge>
                  <Badge variant="outline" className="text-center">
                    Carbs: {plan.dietPlan.macros.carbs}
                  </Badge>
                  <Badge variant="outline" className="text-center">
                    Fats: {plan.dietPlan.macros.fats}
                  </Badge>
                </div>
                <div className="space-y-4">
                  {plan.dietPlan.meals.map((meal, i) => (
                    <div
                      key={i}
                      className="border rounded-lg p-4 bg-background/50"
                    >
                      <h3 className="font-semibold text-lg mb-3 text-primary">
                        {meal.name}
                      </h3>
                      <div className="space-y-2">
                        {meal.foods.map((food, j) => (
                          <div
                            key={j}
                            className="flex items-center py-1 px-2 bg-card rounded-md"
                          >
                            <span className="text-primary mr-2">•</span>
                            <span className="text-sm">{food}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
