"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { Skeleton } from "@/components/shared/LoadingSkeleton";
import { useToast } from "@/components/shared/Toaster";
import { useAuth } from "@/features/auth/AuthProvider";
import { demo, preferences } from "@/services";
import { surface } from "@/lib/ui";
import type { Preferences } from "@/types/domain";

function Toggle({ label, desc, checked, onChange }: { label: string; desc?: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 py-2">
      <span><span className="block text-sm font-medium">{label}</span>{desc && <span className="block text-xs text-subtle">{desc}</span>}</span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 shrink-0 accent-primary" />
    </label>
  );
}
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => <section className={`${surface} p-5`}><h2 className="mb-1 text-base font-semibold">{title}</h2><div className="divide-y divide-border">{children}</div></section>;

export function SettingsView() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [p, setP] = useState<Preferences | null>(null);
  const [confirm, setConfirm] = useState<"reset" | "logout" | null>(null);
  useEffect(() => { void preferences.get().then(setP); }, []);
  if (!p || !user) return <PageContainer><Skeleton className="h-96" /></PageContainer>;
  const save = async (next: Preferences) => { setP(next); await preferences.set(next); document.documentElement.dataset.reduceMotion = String(next.appearance.reduceMotion); toast("Preference saved"); };
  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title="Settings" description="Preferences are saved on this device only." />
      <div className="space-y-5">
        <Section title="Account"><div className="py-2 text-sm"><p className="font-medium">{user.name}</p><p className="text-subtle">{user.email || "No email set"} · Demo account</p></div>
          <div className="flex flex-wrap gap-2 py-3"><Button variant="outline" onClick={() => router.push("/profile/edit")}>Edit profile</Button><Button variant="outline" onClick={() => setConfirm("logout")}>Sign out</Button></div></Section>
        <Section title="Notifications">
          <Toggle label="Event reminders" checked={p.notifications.events} onChange={(v) => save({ ...p, notifications: { ...p.notifications, events: v } })} />
          <Toggle label="Team requests" checked={p.notifications.teamRequests} onChange={(v) => save({ ...p, notifications: { ...p.notifications, teamRequests: v } })} />
          <Toggle label="Lost & found matches" checked={p.notifications.lostFound} onChange={(v) => save({ ...p, notifications: { ...p.notifications, lostFound: v } })} />
          <Toggle label="Product updates" checked={p.notifications.product} onChange={(v) => save({ ...p, notifications: { ...p.notifications, product: v } })} />
          <p className="py-2 text-xs text-subtle">No notifications are sent in demo mode. These preferences are stored for the future backend.</p></Section>
        <Section title="Privacy">
          <Toggle label="Show my profile in Team Finder" checked={p.privacy.showProfileInTeamFinder} onChange={(v) => save({ ...p, privacy: { ...p.privacy, showProfileInTeamFinder: v } })} />
          <Toggle label="Show my course on my profile" checked={p.privacy.showCourse} onChange={(v) => save({ ...p, privacy: { ...p.privacy, showCourse: v } })} /></Section>
        <Section title="Appearance"><Toggle label="Reduce motion" desc="UniVerse also follows your device's reduced-motion setting." checked={p.appearance.reduceMotion} onChange={(v) => save({ ...p, appearance: { reduceMotion: v } })} />
          <p className="py-2 text-xs text-subtle">UniVerse uses its dark cosmic theme. A light theme isn&apos;t available yet.</p></Section>
        <Section title="Demo data"><p className="py-2 text-sm text-muted-foreground">Removes everything you created or saved (listings, applications, saved items, CGPA, chats, preferences) and signs you out.</p><div className="py-3"><Button variant="destructive" onClick={() => setConfirm("reset")}>Reset demo data</Button></div></Section>
      </div>
      <ConfirmationDialog open={confirm === "logout"} onOpenChange={(o) => !o && setConfirm(null)} title="Sign out?" description="You can sign back in with the demo account at any time." confirmLabel="Sign out" onConfirm={async () => { await signOut(); router.replace("/login"); }} />
      <ConfirmationDialog open={confirm === "reset"} onOpenChange={(o) => !o && setConfirm(null)} title="Reset all demo data?" description="This can't be undone. Sample data will be restored to its original state." confirmLabel="Reset everything" destructive onConfirm={async () => { await demo.reset(); await signOut(); router.replace("/login"); }} />
    </PageContainer>
  );
}
