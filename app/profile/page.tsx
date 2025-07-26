"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

import { Plan } from "@/lib/types";
import { useToastContext } from "@/components/ui/ToastProvider";
import { LoadingCard } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { PlanManagement } from "@/components/plans/PlanManagement";

const ProfilePage = () => {
  const { user, isLoaded } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const toast = useToastContext();

  const fetchPlans = () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);
    fetch(`/api/plans/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setPlans(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load plans");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchPlans();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isLoaded]);

  // Show loading state while Clerk is loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <LoadingCard text="Loading authentication..." />
        </div>
      </div>
    );
  }

  // Action handlers
  const handleReactivate = async (planId: string) => {
    setActionLoading(planId);
    try {
      const res = await fetch("/api/plans/reactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      if (res.ok) {
        toast.success("Plan Reactivated", "Your plan is now active");
        fetchPlans();
      } else {
        toast.error("Failed to Reactivate", "Please try again");
      }
    } catch {
      toast.error("Network Error", "Please check your connection");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (planId: string) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;
    setActionLoading(planId);
    try {
      const res = await fetch("/api/plans/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      if (res.ok) {
        toast.success("Plan Deleted", "Plan has been removed");
        fetchPlans();
      } else {
        toast.error("Failed to Delete", "Please try again");
      }
    } catch {
      toast.error("Network Error", "Please check your connection");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDuplicate = async (planId: string) => {
    setActionLoading(planId);
    try {
      const res = await fetch("/api/plans/duplicate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      if (res.ok) {
        toast.success("Plan Duplicated", "A copy has been created");
        fetchPlans();
      } else {
        toast.error("Failed to Duplicate", "Please try again");
      }
    } catch {
      toast.error("Network Error", "Please check your connection");
    } finally {
      setActionLoading(null);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <LoadingCard text="Loading your profile..." />
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <ErrorMessage
            title="Failed to Load Profile"
            message={error}
            onRetry={fetchPlans}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Profile Header */}
        <ProfileHeader onProfileUpdate={fetchPlans} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Management - Takes 2/3 of the space */}
          <div className="lg:col-span-2">
            <PlanManagement
              plans={plans}
              onPlanAction={async (action, planId) => {
                switch (action) {
                  case "reactivate":
                    await handleReactivate(planId);
                    break;
                  case "duplicate":
                    await handleDuplicate(planId);
                    break;
                  case "delete":
                    await handleDelete(planId);
                    break;
                }
              }}
              isLoading={loading}
              actionLoading={actionLoading}
            />
          </div>

          {/* Account Settings - Takes 1/3 of the space */}
          <div className="lg:col-span-1">
            <AccountSettings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
