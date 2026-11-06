import { Layers, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { MarketingSection } from "./MarketingSection";
const ITEMS = [
  { i: Layers, t: "Connected by design", d: "Events link to teams, teams to profiles, venues to the campus map." },
  { i: ShieldCheck, t: "Privacy-aware", d: "No public phone numbers or room numbers. Honest labels on every sample." },
  { i: Smartphone, t: "Built for phones first", d: "Bottom navigation, big touch targets and layouts designed for small screens." },
  { i: Wrench, t: "Honest about its limits", d: "Demo data is labelled, and nothing pretends to message real people yet." },
];
export function Benefits() {
  return (
    <MarketingSection eyebrow="Why UniVerse" title="Designed around how students actually use campus.">
      <ul className="grid gap-4 sm:grid-cols-2">{ITEMS.map((b) => <li key={b.t} className="flex gap-4 rounded-2xl border border-border bg-card p-5"><b.i className="mt-0.5 size-5 shrink-0 text-secondary-soft" aria-hidden /><div><h3 className="font-medium">{b.t}</h3><p className="mt-1 text-sm text-muted-foreground">{b.d}</p></div></li>)}</ul>
    </MarketingSection>
  );
}
