import { CalendarDays, MapPin, PackageSearch, Sparkles, UserPlus } from "lucide-react";
import { MarketingSection } from "./MarketingSection";

/** A real React/CSS preview of the dashboard, not a screenshot. Decorative, so it is hidden from assistive tech. */
export function DashboardPreview() {
  const tile = "rounded-xl border border-border bg-card p-3";
  return (
    <MarketingSection eyebrow="Your dashboard" title="Your whole campus at a glance.">
      <div aria-hidden className="relative rounded-3xl border border-border bg-sidebar p-3 shadow-2xl shadow-black/40 sm:p-5">
        <div className="mb-4 flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-hover" /><span className="size-2.5 rounded-full bg-hover" /><span className="size-2.5 rounded-full bg-hover" /></div>
        <p className="text-lg font-semibold">Good morning, Aarav.</p>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">{[PackageSearch, UserPlus, CalendarDays, Sparkles, MapPin, UserPlus].map((I, i) => <div key={i} className={`${tile} flex h-14 items-center justify-center`}><I className="size-5 text-primary-soft" /></div>)}</div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className={`${tile} md:col-span-2`}><p className="text-sm font-medium">Upcoming events</p><div className="mt-2 grid gap-2 sm:grid-cols-3">{["Hackathon", "Workshop", "Talk"].map((t) => <div key={t} className="rounded-lg bg-elevated p-3"><span className="text-xs text-secondary-soft">{t}</span><div className="mt-2 h-2 w-3/4 rounded bg-hover" /><div className="mt-1.5 h-2 w-1/2 rounded bg-hover" /></div>)}</div></div>
          <div className={tile}><p className="text-sm font-medium">Academic overview</p><p className="mt-2 text-2xl font-semibold">8.42</p><p className="text-xs text-subtle">Sample CGPA</p></div>
        </div>
      </div>
    </MarketingSection>
  );
}
