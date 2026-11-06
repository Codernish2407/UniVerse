import Link from "next/link";
import { MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { MarketingSection } from "./MarketingSection";

export function CampusSpotlight() {
  return (
    <MarketingSection id="campus" eyebrow="Campus Navigation" title="Never wander a big campus again.">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="relative aspect-[10/7] overflow-hidden rounded-2xl border border-border bg-elevated" aria-hidden>
          <svg viewBox="0 0 100 70" className="size-full"><g stroke="#293149" strokeWidth=".2">{Array.from({ length: 9 }, (_, i) => <line key={`v${i}`} x1={(i + 1) * 10} y1="0" x2={(i + 1) * 10} y2="70" />)}{Array.from({ length: 6 }, (_, i) => <line key={`h${i}`} x1="0" y1={(i + 1) * 10} x2="100" y2={(i + 1) * 10} />)}</g>
            <path d="M12 52 Q35 48 48 34 T84 18" fill="none" stroke="#06B6D4" strokeWidth=".7" strokeDasharray="2 2" />
            {[[12, 52], [32, 24], [58, 44], [84, 18], [70, 56]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.2" fill={i === 3 ? "#06B6D4" : "#6C63FF"} />)}</svg>
          <span className="absolute bottom-3 left-3 rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">Illustration of the sample map</span>
        </div>
        <div><p className="text-muted-foreground sm:text-lg">Search blocks, libraries, hostels and food outlets, filter by category, save places and preview routes. New students and visitors can find their way without asking around.</p>
          <p className="mt-3 flex gap-2 rounded-xl border border-warning/30 bg-warning/5 p-3 text-sm"><MapPin className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />The map uses a clearly labelled sample layout. Real routing will arrive when verified campus data is connected.</p>
          <Link href="/signup" className={`${buttonVariants({ variant: "outline", size: "lg" })} mt-6`}>Explore the sample map</Link></div>
      </div>
    </MarketingSection>
  );
}
