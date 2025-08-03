"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  SearchIcon,
  PlusIcon,
  CalendarIcon,
  TargetIcon,
  TrendingUpIcon,
  ClockIcon,
  CheckCircleIcon,
  CopyIcon,
  TrashIcon,
  EyeIcon,
} from "lucide-react";
import { Plan } from "@/lib/types";
import { useToastContext } from "@/components/ui/ToastProvider";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { NoPlansEmptyState } from "@/components/ui/EmptyState";

interface PlanManagementProps {
  plans: Plan[];
  onPlanAction: (action: string, planId: string) => Promise<void>;
  isLoading?: boolean;
  actionLoading?: string | null;
}

export const PlanManagement = ({
  plans,
  onPlanAction,
  isLoading = false,
  actionLoading = null,
}: PlanManagementProps) => {
  const router = useRouter();
  const toast = useToastContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive"
  >("all");

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.fitnessGoal.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && plan.isActive) ||
      (filterStatus === "inactive" && !plan.isActive);
    return matchesSearch && matchesFilter;
  });

  const activePlans = plans.filter((p) => p.isActive);
  const successPlans = plans.filter((p) => p.success);
  const decidedPlans = plans.filter((p) => p.success || !p.isActive);
  const inactivePlans = plans.filter((p) => !p.isActive);

  const getPlanIcon = (goal: string) => {
    switch (goal) {
      case "Weight Loss":
        return "🔥";
      case "Muscle Gain":
        return "💪";
      case "Endurance":
        return "🏃";
      case "Strength":
        return "🏋️";
      default:
        return "📋";
    }
  };

  const getPlanStatus = (plan: Plan) => {
    if (plan.isActive) {
      return { label: "Active", color: "bg-green-100 text-green-800" };
    }
    return { label: "Inactive", color: "bg-gray-100 text-gray-800" };
  };

  const handlePlanAction = async (action: string, planId: string) => {
    try {
      await onPlanAction(action, planId);
    } catch {
      toast.error("Action Failed", "Please try again");
    }
  };

  const handleViewDetails = (planId: string) => {
    router.push(`/plan/${planId}`);
  };

  const handleCreatePlan = () => {
    router.push("/generate-program");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" text="Loading plans..." />
      </div>
    );
  }

  if (plans.length === 0) {
    return <NoPlansEmptyState onCreatePlan={handleCreatePlan} />;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header with Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-blue-100 rounded-lg">
              <TargetIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {plans.length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Total Plans
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {activePlans.length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Active Plans
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-gray-100 rounded-lg">
              <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {inactivePlans.length}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Inactive Plans
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="p-1.5 md:p-2 bg-purple-100 rounded-lg">
              <TrendingUpIcon className="w-4 h-4 md:w-5 md:h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-lg md:text-2xl font-bold">
                {plans.length > 0
                  ? Math.round(
                      (successPlans.length / decidedPlans.length) * 100
                    )
                  : 0}
                %
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                Success Rate
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-3 md:p-4">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button
              onClick={handleCreatePlan}
              className="gap-2 w-full sm:w-auto"
            >
              <PlusIcon className="w-4 h-4" />
              Create Plan
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All ({plans.length})
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("active")}
            >
              Active ({activePlans.length})
            </Button>
            <Button
              variant={filterStatus === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("inactive")}
            >
              Inactive ({inactivePlans.length})
            </Button>
          </div>
        </div>
      </Card>

      {/* Plans List */}
      <div className="space-y-3 md:space-y-4">
        {filteredPlans.length === 0 ? (
          <Card className="p-6 md:p-8 text-center">
            <div className="text-muted-foreground">
              No plans match your search criteria.
            </div>
          </Card>
        ) : (
          filteredPlans.map((plan) => {
            const status = getPlanStatus(plan);
            return (
              <Card
                key={plan._id}
                className="p-4 md:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex items-start gap-3 md:gap-4 flex-1">
                    <div className="text-2xl md:text-3xl">
                      {getPlanIcon(plan.fitnessGoal)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                        <h3 className="text-base md:text-lg font-semibold truncate">
                          {plan.name}
                        </h3>
                        <Badge className={status.color}>{status.label}</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <TargetIcon className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{plan.fitnessGoal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{plan.workoutDays} days/week</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUpIcon className="w-3 h-3 md:w-4 md:h-4" />
                          <span>Level: {plan.fitnessLevel}</span>
                        </div>
                      </div>

                      {plan.createdAt && (
                        <div className="text-xs text-muted-foreground mt-2">
                          Created{" "}
                          {new Date(
                            Number(plan.createdAt)
                          ).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-start ml-4 lg:justify-end gap-2">
                    {!plan.isActive && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handlePlanAction("reactivate", plan._id)}
                        disabled={actionLoading === plan._id}
                        title="Reactivate"
                      >
                        {actionLoading === plan._id ? (
                          <LoadingSpinner size="sm" />
                        ) : (
                          <CheckCircleIcon className="w-4 h-4" />
                        )}
                      </Button>
                    )}

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handlePlanAction("duplicate", plan._id)}
                      disabled={actionLoading === plan._id}
                      title="Duplicate"
                    >
                      {actionLoading === plan._id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <CopyIcon className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleViewDetails(plan._id)}
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handlePlanAction("delete", plan._id)}
                      disabled={actionLoading === plan._id}
                      title="Delete"
                    >
                      {actionLoading === plan._id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <TrashIcon className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
