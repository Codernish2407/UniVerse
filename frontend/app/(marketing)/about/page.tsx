import type { Metadata } from "next";
import { APP_CONFIG } from "@/config/app";
import { FinalCta } from "@/components/marketing/FinalCta";
import { MarketingSection } from "@/components/marketing/MarketingSection";

export const metadata: Metadata = { title: "About" };
export default function AboutPage() {
  return (
    <div className="pt-16">
      <MarketingSection eyebrow="About" title="Built by a student, for students." intro={APP_CONFIG.tagline}>
        <div className="max-w-2xl space-y-4 text-muted-foreground sm:text-lg">
          <p>Student life is scattered across group chats, notice boards and half a dozen apps. UniVerse is an attempt to bring the everyday parts together: finding lost things, finding teammates and roommates, planning your semester, joining clubs and getting around campus.</p>
          <p>It starts with Lovely Professional University and is designed so other universities can be added through configuration rather than rewrites.</p>
          <p className="rounded-xl border border-border bg-card p-4 text-sm">{APP_CONFIG.disclaimer} Everything you see in this build is sample data stored in your browser. Features that need a real backend, such as messaging, notifications and verified campus data, are clearly labelled as future work.</p>
        </div>
      </MarketingSection>
      <FinalCta />
    </div>
  );
}
