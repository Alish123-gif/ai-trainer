"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoaderIcon, ArrowLeftIcon } from "lucide-react";
import { Plan } from "@/lib/types";
import { PDFViewer } from "@react-pdf/renderer";
import PlanPDFDocument from "@/components/pdf/PlanPDFDocument";
import PlanHeader from "@/components/plans/PlanHeader";
import PlanDetails from "@/components/plans/PlanDetails";
import WorkoutPlan from "@/components/plans/WorkoutPlan";
import DietPlan from "@/components/plans/DietPlan";

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
        <PlanHeader
          plan={plan}
          setShowPDFPreview={setShowPDFPreview}
          showPDFPreview={showPDFPreview}
          router={router}
        />

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
            <PlanDetails plan={plan} />

            {/* Workout and Diet Plans */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <WorkoutPlan
                plan={plan}
                expandAll={expandAll}
                collapseAll={collapseAll}
                expandedDays={expandedDays}
                toggleDay={toggleDay}
              />

              {/* Diet Plan Section */}
              <DietPlan plan={plan} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
