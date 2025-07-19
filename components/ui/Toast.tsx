import { useEffect, useState } from "react";
import {
  XIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toast, ToastType } from "@/hooks/useToast";

interface ToastProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

const getToastIcon = (type: ToastType) => {
  switch (type) {
    case "success":
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    case "error":
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    case "warning":
      return <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />;
    case "info":
      return <InfoIcon className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
};

const getToastStyles = (type: ToastType) => {
  switch (type) {
    case "success":
      return "border-green-200 bg-green-50 text-green-800";
    case "error":
      return "border-red-200 bg-red-50 text-red-800";
    case "warning":
      return "border-yellow-200 bg-yellow-50 text-yellow-800";
    case "info":
      return "border-blue-200 bg-blue-50 text-blue-800";
    default:
      return "border-gray-200 bg-gray-50 text-gray-800";
  }
};

export const ToastComponent = ({ toast, onRemove }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => {
      onRemove(toast.id);
    }, 200); // Wait for exit animation
  };

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-sm w-full
        border rounded-lg shadow-lg p-4
        transition-all duration-200 ease-in-out
        ${getToastStyles(toast.type)}
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
      `}
    >
      <div className="flex items-start gap-3">
        {getToastIcon(toast.type)}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm">{toast.title}</div>
          {toast.message && (
            <div className="text-xs mt-1 opacity-90">{toast.message}</div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="h-6 w-6 p-0 opacity-70 hover:opacity-100"
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export const ToastContainer = ({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};
