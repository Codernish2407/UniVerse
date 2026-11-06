"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { StudentProfile } from "@/types/domain";
import { auth, profiles } from "@/services";

interface AuthState {
  user: StudentProfile | null;
  loading: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (patch: Partial<StudentProfile>) => Promise<void>;
}
const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => { setUser(await auth.getSession()); setLoading(false); }, []);
  useEffect(() => {
    let live = true;
    void auth.getSession().then((u) => { if (live) { setUser(u); setLoading(false); } });
    return () => { live = false; };
  }, []);

  const value = useMemo<AuthState>(() => ({
    user, loading, refresh,
    signOut: async () => { await auth.signOut(); setUser(null); },
    updateProfile: async (patch) => setUser(await profiles.updateMe(patch)),
  }), [user, loading, refresh]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used inside AuthProvider");
  return v;
}
