import type { Metadata } from "next";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { NovaIntro } from "@/components/marketing/NovaIntro";
import { CampusSpotlight } from "@/components/marketing/CampusSpotlight";
import { FinalCta } from "@/components/marketing/FinalCta";

export const metadata: Metadata = { title: "Features" };
export default function FeaturesPage() {
  return (<div className="pt-16"><FeatureShowcase /><HowItWorks /><NovaIntro /><CampusSpotlight /><FinalCta /></div>);
}
