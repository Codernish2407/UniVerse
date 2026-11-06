"use client";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Lightweight popover: closes on outside click and Escape, returns focus to the trigger. */
export function Popover({ trigger, label, children, align = "right", panelClassName }: { trigger: React.ReactNode; label: string; children: (close: () => void) => React.ReactNode; align?: "left" | "right"; panelClassName?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("mousedown", onDown); document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button ref={btn} type="button" aria-label={label} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}
        className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-hover hover:text-foreground">{trigger}</button>
      {open && <div id={id} className={cn("absolute top-12 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-popover p-2 shadow-2xl shadow-black/50", align === "right" ? "right-0" : "left-0", panelClassName)}>{children(() => setOpen(false))}</div>}
    </div>
  );
}
