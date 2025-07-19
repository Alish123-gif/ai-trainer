"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldIcon,
  BellIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  KeyIcon,
  TrashIcon,
  DownloadIcon,
  MailIcon,
} from "lucide-react";
import { useToastContext } from "@/components/ui/ToastProvider";

export const AccountSettings = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const toast = useToastContext();

  const handleExportData = async () => {
    setIsLoading("export");
    try {
      // TODO: Implement data export functionality
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success(
        "Data Exported",
        "Your data has been exported successfully"
      );
    } catch {
      toast.error("Export Failed", "Failed to export data. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    setIsLoading("delete");
    try {
      // TODO: Implement account deletion
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Account Deleted", "Your account has been deleted");
    } catch {
      toast.error(
        "Deletion Failed",
        "Failed to delete account. Please try again."
      );
    } finally {
      setIsLoading(null);
    }
  };

  const getAccountStatus = () => {
    if (user?.emailAddresses?.[0]?.verification?.status === "verified") {
      return {
        status: "verified",
        label: "Verified",
        color: "bg-green-100 text-green-800",
      };
    }
    return {
      status: "unverified",
      label: "Unverified",
      color: "bg-yellow-100 text-yellow-800",
    };
  };

  const accountStatus = getAccountStatus();

  return (
    <div className="space-y-6">
      {/* Security Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <ShieldIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Security</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <MailIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Email Address</div>
                <div className="text-sm text-muted-foreground">
                  {user?.emailAddresses?.[0]?.emailAddress}
                </div>
              </div>
            </div>
            <Badge className={accountStatus.color}>{accountStatus.label}</Badge>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <LockIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-muted-foreground">
                  Last changed recently
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <KeyIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <EyeIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Privacy</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <BellIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">
                  Receive updates about your plans
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Configure
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Data Privacy</div>
                <div className="text-sm text-muted-foreground">
                  Control how your data is used
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Data Management Section */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <DownloadIcon className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Data Management</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-3">
              <DownloadIcon className="w-4 h-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Export Data</div>
                <div className="text-sm text-muted-foreground">
                  Download all your data and plans
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportData}
              disabled={isLoading === "export"}
            >
              {isLoading === "export" ? "Exporting..." : "Export"}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg border-red-200 bg-red-50">
            <div className="flex items-center gap-3">
              <TrashIcon className="w-4 h-4 text-red-500" />
              <div>
                <div className="font-medium text-red-800">Delete Account</div>
                <div className="text-sm text-red-600">
                  Permanently delete your account and all data
                </div>
              </div>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteAccount}
              disabled={isLoading === "delete"}
            >
              {isLoading === "delete" ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
