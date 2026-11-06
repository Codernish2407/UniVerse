import { cn } from "@/lib/utils";

/** Row of toggle chips (single-select). Horizontally scrollable on small screens. */
export function ChipGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
      {options.map((o) => (
        <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)}
          className={cn("h-9 shrink-0 rounded-full border px-3.5 text-sm transition-colors",
            value === o ? "border-primary bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:bg-hover hover:text-foreground")}>
          {o}
        </button>
      ))}
    </div>
  );
}

export function FilterBar({ children }: { children: React.ReactNode }) {
  return <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-border bg-elevated p-3 sm:p-4">{children}</div>;
}
