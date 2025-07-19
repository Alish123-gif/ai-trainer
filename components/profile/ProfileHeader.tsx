"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  EditIcon,
  SaveIcon,
  XIcon,
  CameraIcon,
  UserIcon,
  MailIcon,
  CalendarIcon,
} from "lucide-react";
import { useToastContext } from "@/components/ui/ToastProvider";

interface ProfileHeaderProps {
  onProfileUpdate?: () => void;
}

export const ProfileHeader = ({ onProfileUpdate }: ProfileHeaderProps) => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || "",
  });
  const toast = useToastContext();

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      await user.update({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
      });

      toast.success(
        "Profile Updated",
        "Your profile has been saved successfully"
      );
      setIsEditing(false);
      onProfileUpdate?.();
    } catch {
      toast.error(
        "Update Failed",
        "Failed to update profile. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      username: user?.username || "",
    });
    setIsEditing(false);
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;

    setIsLoading(true);
    try {
      await user.setProfileImage({ file });
      toast.success(
        "Profile Picture Updated",
        "Your profile picture has been updated"
      );
      onProfileUpdate?.();
    } catch {
      toast.error(
        "Upload Failed",
        "Failed to update profile picture. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getFullName = () => {
    const firstName = user?.firstName || "";
    const lastName = user?.lastName || "";
    return `${firstName} ${lastName}`.trim() || "User";
  };

  return (
    <Card className="p-6">
      <div className="flex items-start gap-6">
        {/* Profile Picture Section */}
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={user?.imageUrl} alt={getFullName()} />
            <AvatarFallback className="text-lg font-semibold">
              {getInitials()}
            </AvatarFallback>
          </Avatar>

          {isEditing && (
            <div className="absolute -bottom-2 -right-2">
              <label htmlFor="profile-image" className="cursor-pointer">
                <Button
                  size="icon"
                  variant="secondary"
                  className="w-8 h-8 rounded-full"
                  disabled={isLoading}
                >
                  <CameraIcon className="w-4 h-4" />
                </Button>
              </label>
              <input
                id="profile-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </div>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="flex-1 space-y-4">
          {isEditing ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    First Name
                  </label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    placeholder="First name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Name
                  </label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    placeholder="Last name"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Username
                </label>
                <Input
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  placeholder="Username"
                  className="mt-1"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="gap-2"
                >
                  <SaveIcon className="w-4 h-4" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <XIcon className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{getFullName()}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <UserIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      @{user?.username || "username"}
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <EditIcon className="w-4 h-4" />
                  Edit Profile
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {user?.emailAddresses?.[0]?.emailAddress}
                </span>
                <Badge variant="secondary">Verified</Badge>
              </div>

              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Member since{" "}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Unknown"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
