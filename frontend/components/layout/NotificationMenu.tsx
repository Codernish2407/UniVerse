"use client";
import Link from "next/link";
import { Bell } from "lucide-react";
import { notifications } from "@/services";
import { useAsync } from "@/hooks/useAsync";
import { formatDateTime } from "@/lib/format";
import { Popover } from "./Popover";

export function NotificationMenu() {
  const { data, reload } = useAsync(() => notifications.list(), []);
  const unread = data?.filter((n) => !n.read).length ?? 0;
  return (
    <Popover label={unread ? `Notifications, ${unread} unread` : "Notifications"} trigger={<span className="relative"><Bell className="size-5" aria-hidden />{unread > 0 && <span className="absolute -top-1 -right-1 size-2.5 rounded-full bg-primary ring-2 ring-background" />}</span>}>
      {(close) => (
        <div>
          <div className="flex items-center justify-between px-2 py-1.5"><p className="text-sm font-medium">Notifications</p>
            {unread > 0 && <button className="text-xs text-primary-soft hover:underline" onClick={async () => { await notifications.markAllRead(); await reload(); }}>Mark all read</button>}</div>
          <ul className="max-h-72 overflow-y-auto">
            {(data ?? []).slice(0, 5).map((n) => (
              <li key={n.id}><Link href={n.href ?? "/notifications"} onClick={async () => { await notifications.markRead(n.id); close(); }} className="block rounded-xl px-2 py-2 hover:bg-hover">
                <p className="flex items-center gap-2 text-sm">{!n.read && <span className="size-1.5 rounded-full bg-primary" aria-label="Unread" />}{n.title}</p>
                <p className="text-xs text-subtle">{formatDateTime(n.at)}</p></Link></li>
            ))}
          </ul>
          <Link href="/notifications" onClick={close} className="mt-1 block rounded-xl px-2 py-2 text-center text-sm text-primary-soft hover:bg-hover">See all notifications</Link>
        </div>
      )}
    </Popover>
  );
}
