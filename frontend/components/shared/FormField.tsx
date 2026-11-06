import { cn } from "@/lib/utils";

export const inputCls = "h-11 w-full rounded-xl border border-input bg-elevated px-3 text-sm outline-none placeholder:text-subtle focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 aria-[invalid=true]:border-error";

/** Label + control + accessible error. Pass the control as children and wire id/aria via the render prop. */
export function FormField({ id, label, error, hint, children, className }: { id: string; label: string; error?: string; hint?: string; children: (p: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode; className?: string }) {
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      {children({ id, "aria-invalid": !!error, "aria-describedby": describedBy })}
      {error ? <p id={`${id}-err`} role="alert" className="text-xs text-error-soft">{error}</p> : hint ? <p id={`${id}-hint`} className="text-xs text-subtle">{hint}</p> : null}
    </div>
  );
}
