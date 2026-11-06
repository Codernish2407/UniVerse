import { cn } from "@/lib/utils";
export function Skeleton({ className }: { className?: string }) { return <div aria-hidden className={cn("animate-pulse rounded-xl bg-hover/70", className)} />; }
export function LoadingSkeleton({ count = 6, className }: { count?: number; className?: string }) {
  return (
    <div role="status" aria-label="Loading" className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => <Skeleton key={i} className="h-40" />)}
      <span className="sr-only">Loading…</span>
    </div>
  );
}
