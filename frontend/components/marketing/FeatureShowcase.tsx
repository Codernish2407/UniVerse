import { FEATURES } from "@/constants/features";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { MarketingSection } from "./MarketingSection";

export function FeatureShowcase() {
  return (
    <MarketingSection id="features" eyebrow="Eight modules" title="Everything a student needs, in one universe." intro="Each module shares one profile, one design language and one set of saved items, so what you find in one place helps in the next.">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{FEATURES.map((f) => <li key={f.id}><FeatureCard feature={f} /></li>)}</ul>
    </MarketingSection>
  );
}
