import Link from "next/link";
import type { FeatureMeta } from "@/constants/features";
import { cn } from "@/lib/utils";

export function FeatureCard({ feature }: { feature: FeatureMeta }) {
  const Icon = feature.icon;
  return (
    <Link href={feature.href} className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-colors hover:bg-hover">
      <span className={cn("flex size-10 items-center justify-center rounded-xl", feature.ai ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary-soft")}><Icon className="size-5" aria-hidden /></span>
      <div><h3 className="font-medium">{feature.title}</h3><p className="mt-1 text-sm text-muted-foreground">{feature.summary}</p></div>
    </Link>
  );
}
