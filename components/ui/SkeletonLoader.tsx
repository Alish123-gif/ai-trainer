interface SkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const Skeleton = ({
  className = "",
  height = "h-4",
  width = "w-full",
}: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-muted rounded ${height} ${width} ${className}`}
    />
  );
};

export const SkeletonCard = () => {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton height="h-4" width="w-3/4" />
          <Skeleton height="h-3" width="w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton height="h-3" />
        <Skeleton height="h-3" width="w-5/6" />
        <Skeleton height="h-3" width="w-4/6" />
      </div>
    </div>
  );
};

export const SkeletonList = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export const SkeletonProfile = () => {
  return (
    <div className="border rounded-lg p-6">
      <div className="flex items-center gap-6">
        <Skeleton className="w-20 h-20 rounded-full" />
        <div className="flex-1 space-y-3">
          <Skeleton height="h-6" width="w-1/3" />
          <Skeleton height="h-4" width="w-1/2" />
          <div className="flex gap-2">
            <Skeleton height="h-8" width="w-16" />
            <Skeleton height="h-8" width="w-20" />
          </div>
        </div>
      </div>
    </div>
  );
};
