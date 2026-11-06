import Link from "next/link";
import { Bookmark, BookmarkCheck, Calendar, MapPin } from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate } from "@/lib/format";
import { surfaceHover } from "@/lib/ui";
import type { LostFoundItem } from "@/types/domain";

export function ItemCard({ item, saved, onToggleSave }: { item: LostFoundItem; saved: boolean; onToggleSave: () => void }) {
  return (
    <div className={`${surfaceHover} relative flex flex-col`}>
      <Link href={`/lost-found/${item.id}`} className="flex flex-1 flex-col gap-3 rounded-2xl p-4">
        {item.imageDataUrl && <img src={item.imageDataUrl} alt="" className="h-36 w-full rounded-xl object-cover" />}
        <div className="flex flex-wrap items-center gap-2 pr-10">
          <StatusBadge tone={item.kind === "lost" ? "warning" : "success"}>{item.kind === "lost" ? "Lost" : "Found"}</StatusBadge>
          {item.status === "closed" && <StatusBadge>Closed</StatusBadge>}
          <StatusBadge>{item.category}</StatusBadge>
        </div>
        <h3 className="font-medium">{item.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-1 text-xs text-subtle"><span className="flex items-center gap-1"><MapPin className="size-3" aria-hidden />{item.location}</span><span className="flex items-center gap-1"><Calendar className="size-3" aria-hidden />{formatDate(item.date)}</span></p>
      </Link>
      <button type="button" onClick={onToggleSave} aria-pressed={saved} aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`} className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-background/60 hover:text-foreground">
        {saved ? <BookmarkCheck className="size-5 text-primary-soft" aria-hidden /> : <Bookmark className="size-5" aria-hidden />}
      </button>
    </div>
  );
}
