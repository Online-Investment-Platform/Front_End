import cn from "@/utils/cn";

interface LoadingSpinnerProps {
  className?: string;
}
export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex h-64 items-center justify-center", className)}>
      <div className="loadingSpinner" />
    </div>
  );
}
