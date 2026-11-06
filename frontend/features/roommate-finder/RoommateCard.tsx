import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { rupees } from "@/lib/format";
import { surfaceHover } from "@/lib/ui";
import type { RoommateListing } from "@/types/domain";

export function RoommateCard({ r, score, saved, onToggleSave }: { r: RoommateListing; score?: number; saved: boolean; onToggleSave: () => void }) {
  return (
    <div className={`${surfaceHover} relative`}>
      <Link href={`/roommate-finder/${r.id}`} className="flex flex-col gap-3 rounded-2xl p-4">
        <div className="flex items-center gap-3 pr-10"><UserAvatar name={r.displayName} className="size-11" /><div className="min-w-0"><p className="truncate font-medium">{r.displayName}</p><p className="truncate text-xs text-subtle">{r.course} · {r.accommodation}</p></div></div>
        <p className="text-sm">{rupees(r.budgetMin)}–{rupees(r.budgetMax)} <span className="text-subtle">per month</span></p>
        <div className="flex flex-wrap gap-1.5"><StatusBadge>{r.sleep}</StatusBadge><StatusBadge>{r.study}</StatusBadge><StatusBadge>{r.sharing} room</StatusBadge></div>
        <div className="flex items-center justify-between">{r.available ? <StatusBadge tone="success">Looking now</StatusBadge> : <StatusBadge>Not looking</StatusBadge>}
          {score !== undefined && <span className="text-sm"><span className="font-semibold">{score}%</span> <span className="text-subtle">match</span></span>}</div>
      </Link>
      <button type="button" onClick={onToggleSave} aria-pressed={saved} aria-label={saved ? `Unsave ${r.displayName}` : `Save ${r.displayName}`} className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-background/60">
        {saved ? <BookmarkCheck className="size-5 text-primary-soft" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}</button>
    </div>
  );
}
