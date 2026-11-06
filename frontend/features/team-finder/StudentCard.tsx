import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { surfaceHover } from "@/lib/ui";
import type { StudentProfile } from "@/types/domain";

const tone = { open: "success", limited: "warning", unavailable: "neutral" } as const;
const label = { open: "Open to teams", limited: "Limited time", unavailable: "Unavailable" } as const;

export function StudentCard({ s, saved, onToggleSave }: { s: StudentProfile; saved: boolean; onToggleSave: () => void }) {
  return (
    <div className={`${surfaceHover} relative`}>
      <Link href={`/team-finder/${s.id}`} className="flex flex-col gap-3 rounded-2xl p-4">
        <div className="flex items-center gap-3 pr-10"><UserAvatar name={s.name} className="size-11" /><div className="min-w-0"><p className="truncate font-medium">{s.name}</p><p className="truncate text-xs text-subtle">{s.course} · Class of {s.graduationYear}</p></div></div>
        <div className="flex flex-wrap gap-1.5">{s.skills.slice(0, 4).map((k) => <StatusBadge key={k}>{k}</StatusBadge>)}</div>
        <StatusBadge tone={tone[s.availability]} className="self-start">{label[s.availability]}</StatusBadge>
      </Link>
      <button type="button" onClick={onToggleSave} aria-pressed={saved} aria-label={saved ? `Unsave ${s.name}` : `Save ${s.name}`} className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-background/60">
        {saved ? <BookmarkCheck className="size-5 text-primary-soft" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}</button>
    </div>
  );
}
