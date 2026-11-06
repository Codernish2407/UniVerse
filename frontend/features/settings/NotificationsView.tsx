"use client";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import { useAsync } from "@/hooks/useAsync";
import { notifications } from "@/services";
import { formatDateTime } from "@/lib/format";
import { surface } from "@/lib/ui";

export function NotificationsView() {
  const { data, loading, reload } = useAsync(() => notifications.list(), []);
  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title="Notifications" description="Sample notifications for the demo." actions={<Button variant="outline" size="lg" disabled={!data?.some((n) => !n.read)} onClick={async () => { await notifications.markAllRead(); reload(); }}>Mark all read</Button>} />
      {loading && <LoadingSkeleton count={3} className="sm:grid-cols-1 lg:grid-cols-1" />}
      {data && (data.length === 0 ? <EmptyState icon={Bell} title="You're all caught up" /> :
        <ul className="space-y-2">{data.map((n) => (
          <li key={n.id}><Link href={n.href ?? "/dashboard"} onClick={() => notifications.markRead(n.id)} className={`${surface} block p-4 hover:bg-hover`}>
            <p className="flex items-center gap-2 text-sm font-medium">{!n.read && <span className="size-2 rounded-full bg-primary" aria-label="Unread" />}{n.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p><p className="mt-1 text-xs text-subtle">{formatDateTime(n.at)}</p></Link></li>))}</ul>)}
    </PageContainer>
  );
}
