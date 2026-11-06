import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** Prominent campus-navigation entry. The mini map is decorative CSS, not real campus data. */
export function CampusNavCard() {
  return (
    <Link href="/campus-navigation" className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-hover sm:min-h-44">
      <svg aria-hidden viewBox="0 0 200 120" className="absolute -top-2 -right-4 h-36 w-56 text-primary-soft/30">
        <circle cx="130" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="130" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
        <path d="M30 100 Q80 90 110 62 T170 36" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
        <circle cx="30" cy="100" r="4" fill="currentColor" /><circle cx="170" cy="36" r="4" className="fill-accent" />
      </svg>
      <div className="relative"><h2 className="text-base font-semibold">Find your way around campus</h2>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">Search blocks, libraries, hostels and food outlets, and preview routes. Sample layout until verified campus data is added.</p></div>
      <span className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-soft">Open campus navigation <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden /></span>
    </Link>
  );
}
