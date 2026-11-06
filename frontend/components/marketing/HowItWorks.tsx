import { MarketingSection } from "./MarketingSection";
const STEPS = [
  { n: "1", t: "Create your profile", d: "Add your course, skills and interests once. Team Finder and the rest of UniVerse reuse it." },
  { n: "2", t: "Discover what's around you", d: "Browse events and clubs, find teammates, or check whether someone found your lost item." },
  { n: "3", t: "Connect the dots", d: "Save an event, find a team for it, then locate the venue on the campus map, all in one flow." },
];
export function HowItWorks() {
  return (
    <MarketingSection id="how-it-works" eyebrow="How it works" title="One flow, not eight apps.">
      <ol className="grid gap-4 md:grid-cols-3">{STEPS.map((s) => (
        <li key={s.n} className="rounded-2xl border border-border bg-card p-6"><span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary-soft" aria-hidden>{s.n}</span><h3 className="mt-4 font-medium">{s.t}</h3><p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p></li>))}</ol>
    </MarketingSection>
  );
}
