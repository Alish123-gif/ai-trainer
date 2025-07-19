import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "secondary";
  };
  className?: string;
}

export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant={action.variant || "default"}>
          {action.label}
        </Button>
      )}
    </div>
  );
};

export const EmptyStateCard = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <Card className="p-8">
      <EmptyState
        icon={icon}
        title={title}
        description={description}
        action={action}
      />
    </Card>
  );
};

// Predefined empty states
export const NoPlansEmptyState = ({
  onCreatePlan,
}: {
  onCreatePlan: () => void;
}) => {
  return (
    <EmptyState
      icon="📋"
      title="No Plans Yet"
      description="Create your first fitness plan to get started on your journey."
      action={{
        label: "Create Plan",
        onClick: onCreatePlan,
        variant: "default",
      }}
    />
  );
};

export const NoHistoryEmptyState = () => {
  return (
    <EmptyState
      icon="📚"
      title="No Plan History"
      description="Your previous plans will appear here once you create and complete them."
    />
  );
};

export const NoResultsEmptyState = ({
  onClearFilters,
}: {
  onClearFilters?: () => void;
}) => {
  return (
    <EmptyState
      icon="🔍"
      title="No Results Found"
      description="Try adjusting your search criteria or filters to find what you're looking for."
      action={
        onClearFilters
          ? {
              label: "Clear Filters",
              onClick: onClearFilters,
              variant: "outline",
            }
          : undefined
      }
    />
  );
};
