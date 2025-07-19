import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage = ({
  title = "Something went wrong",
  message = "An error occurred while loading the data.",
  onRetry,
  className = "",
}: ErrorMessageProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center ${className}`}
    >
      <AlertTriangleIcon className="w-12 h-12 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCwIcon className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export const ErrorCard = ({
  title = "Error",
  message = "Failed to load data",
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-6">
      <div className="flex items-start gap-3">
        <AlertTriangleIcon className="w-5 h-5 text-red-500 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-red-800 mb-1">{title}</h3>
          <p className="text-red-700 text-sm mb-3">{message}</p>
          {onRetry && (
            <Button
              onClick={onRetry}
              size="sm"
              variant="outline"
              className="gap-2"
            >
              <RefreshCwIcon className="w-4 h-4" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
};
