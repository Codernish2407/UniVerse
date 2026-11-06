import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Styled native select: fully accessible and works well on mobile. */
export function Select({ label, value, onChange, options, className }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full appearance-none rounded-xl border border-input bg-elevated pr-9 pl-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40">
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-subtle" aria-hidden />
    </div>
  );
}
