"use client";
import Link from "next/link";
import { Code, Briefcase, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { PageContainer } from "@/components/shared/PageContainer";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { useAuth } from "@/features/auth/AuthProvider";
import { UNIVERSITIES } from "@/constants/universities";
import { surface } from "@/lib/ui";
import { profileCompleteness } from "./completeness";

export function ProfileView() {
  const { user } = useAuth();
  if (!user) return null;
  const c = profileCompleteness(user);
  const uni = UNIVERSITIES.find((u) => u.id === user.universityId);
  const links = [{ href: user.github, icon: Code, label: "GitHub" }, { href: user.linkedin, icon: Briefcase, label: "LinkedIn" }, { href: user.portfolio, icon: Globe, label: "Portfolio" }].filter((l) => l.href);
  return (
    <PageContainer className="max-w-3xl">
      <PageHeader title="Your profile" description="This profile is reused in Team Finder and across UniVerse." actions={<Link href="/profile/edit" className={buttonVariants({ size: "lg" })}>Edit profile</Link>} />
      <div className={`${surface} space-y-5 p-5`}>
        <div className="flex items-center gap-4"><UserAvatar name={user.name} className="size-16 text-xl" /><div><p className="text-lg font-semibold">{user.name}</p><p className="text-sm text-muted-foreground">{user.course} · {uni?.shortName ?? user.universityId} · Class of {user.graduationYear}</p></div></div>
        <div><div className="mb-1.5 flex justify-between text-sm"><span className="font-medium">Profile completeness</span><span>{c.percent}%</span></div>
          <div role="progressbar" aria-valuenow={c.percent} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completeness" className="h-2 overflow-hidden rounded-full bg-hover"><div className="h-full rounded-full bg-primary" style={{ width: `${c.percent}%` }} /></div>
          {c.missing.length > 0 && <p className="mt-1.5 text-xs text-subtle">Add: {c.missing.join(", ")}</p>}</div>
        {user.bio && <p className="text-sm text-muted-foreground sm:text-base">{user.bio}</p>}
        <div><h2 className="mb-2 text-sm font-semibold">Skills</h2>{user.skills.length ? <div className="flex flex-wrap gap-1.5">{user.skills.map((s) => <StatusBadge key={s} tone="brand">{s}</StatusBadge>)}</div> : <p className="text-sm text-subtle">No skills added yet.</p>}</div>
        <div><h2 className="mb-2 text-sm font-semibold">Interests</h2>{user.interests.length ? <div className="flex flex-wrap gap-1.5">{user.interests.map((s) => <StatusBadge key={s}>{s}</StatusBadge>)}</div> : <p className="text-sm text-subtle">No interests added yet.</p>}</div>
        <p className="text-sm"><span className="text-subtle">Collaboration availability: </span><span className="font-medium">{user.availability === "open" ? "Open to teams" : user.availability === "limited" ? "Limited time" : "Unavailable"}</span></p>
        {links.length > 0 && <div className="flex flex-wrap gap-2">{links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}><l.icon aria-hidden />{l.label}</a>)}</div>}
      </div>
    </PageContainer>
  );
}
