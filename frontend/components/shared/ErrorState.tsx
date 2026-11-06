import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ErrorState({ message = "Something went wrong.", onRetry }: { message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="flex flex-col items-center rounded-2xl border border-error/30 bg-error/5 px-6 py-10 text-center">
      <AlertTriangle className="mb-3 size-6 text-error-soft" aria-hidden />
      <p className="text-sm">{message}</p>
      {onRetry && <Button variant="outline" className="mt-4" onClick={onRetry}>Try again</Button>}
    </div>
  );
}
