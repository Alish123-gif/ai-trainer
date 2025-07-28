"use client";

import PlanForm from "@/components/generate_plan/PlanForm";
import SummaryPreview from "@/components/generate_plan/SummaryPreview";
import { PlanInput } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { ChangeEvent, FormEvent, useState } from "react";

const GenerateProgramPage = () => {
  const { user } = useUser();

  // Form state
  const [form, setForm] = useState<PlanInput>({
    fitness_goal: "Weight Loss",
    height: "",
    weight: "",
    age: "",
    workout_days: "3",
    injuries: "None",
    fitness_level: "Beginner",
    equipment_access: "Bodyweight",
    dietary_restrictions: "None",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Generate plans
      const res = await fetch("/api/generate-program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          user_id: user?.id,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to generate plans");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground overflow-hidden pb-6 pt-24">
      <div className="container mx-auto px-4 h-full max-w-6xl">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-mono mb-2">
            <span>Generate Your </span>
            <span className="text-primary uppercase">Fitness Program</span>
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Create your personalized plan in seconds. Fill out the form and get
            a tailored workout & diet instantly!
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* FORM */}
          <PlanForm
            form={form}
            setForm={setForm}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            error={error}
            loading={loading}
          />
          {/* LIVE SUMMARY CARD */}
          <SummaryPreview form={form} />
        </div>
      </div>
    </div>
  );
};
export default GenerateProgramPage;
