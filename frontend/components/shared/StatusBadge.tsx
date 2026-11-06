import { cn } from "@/lib/utils";
const tones = {
  neutral: "border-border bg-hover text-muted-foreground",
  brand: "border-primary/40 bg-primary/15 text-foreground",
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  error: "border-error/40 bg-error/10 text-error-soft",
  info: "border-accent/40 bg-accent/10 text-accent",
};
export type Tone = keyof typeof tones;
/** Badges always carry text so status is never conveyed by color alone. */
export function StatusBadge({ children, tone = "neutral", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", tones[tone], className)}>{children}</span>;
}
export const SampleBadge = () => <StatusBadge tone="neutral">Sample data</StatusBadge>;
