"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Settings, User } from "lucide-react";
import { useAuth } from "@/features/auth/AuthProvider";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Popover } from "./Popover";

export function UserMenu() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  if (!user) return null;
  const item = "flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm hover:bg-hover";
  return (
    <Popover label="Account menu" trigger={<UserAvatar name={user.name} className="size-9" />}>
      {(close) => (
        <div>
          <div className="px-3 py-2"><p className="truncate text-sm font-medium">{user.name}</p><p className="truncate text-xs text-subtle">{user.course} · Demo account</p></div>
          <Link href="/profile" onClick={close} className={item}><User className="size-4" aria-hidden />Profile</Link>
          <Link href="/settings" onClick={close} className={item}><Settings className="size-4" aria-hidden />Settings</Link>
          <button className={item} onClick={async () => { close(); await signOut(); router.replace("/login"); }}><LogOut className="size-4" aria-hidden />Sign out</button>
        </div>
      )}
    </Popover>
  );
}
