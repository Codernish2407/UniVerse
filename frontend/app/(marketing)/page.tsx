import Hero from "@/components/features/landing/hero/Hero";
import { IntroStrip } from "@/components/marketing/IntroStrip";
import { FeatureShowcase } from "@/components/marketing/FeatureShowcase";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Benefits } from "@/components/marketing/Benefits";
import { NovaIntro } from "@/components/marketing/NovaIntro";
import { CampusSpotlight } from "@/components/marketing/CampusSpotlight";
import { DashboardPreview } from "@/components/marketing/DashboardPreview";
import { FinalCta } from "@/components/marketing/FinalCta";

export default function HomePage() {
  return (<><Hero /><IntroStrip /><FeatureShowcase /><HowItWorks /><Benefits /><NovaIntro /><CampusSpotlight /><DashboardPreview /><FinalCta /></>);
}
