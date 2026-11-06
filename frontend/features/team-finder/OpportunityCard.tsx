import Link from "next/link";
import { Users } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { surfaceHover } from "@/lib/ui";
import type { TeamOpportunity } from "@/types/domain";

export function OpportunityCard({ t }: { t: TeamOpportunity }) {
  return (
    <Link href={`/team-finder/${t.id}`} className={`${surfaceHover} flex h-full flex-col gap-3 p-4`}>
      <div className="flex flex-wrap gap-2"><StatusBadge tone="brand">{t.category}</StatusBadge>{t.status === "closed" && <StatusBadge>Closed</StatusBadge>}</div>
      <h3 className="font-medium">{t.title}</h3>
      <p className="line-clamp-2 text-sm text-muted-foreground">{t.description}</p>
      <div className="flex flex-wrap gap-1.5">{t.skills.map((k) => <StatusBadge key={k}>{k}</StatusBadge>)}</div>
      <p className="mt-auto flex items-center gap-1.5 text-xs text-subtle"><Users className="size-3.5" aria-hidden />Team of {t.teamSize} · {t.mode} · by {t.ownerName}</p>
    </Link>
  );
}
