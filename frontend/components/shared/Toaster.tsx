"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, Info, XCircle } from "lucide-react";

type Tone = "success" | "error" | "info";
interface T { id: number; text: string; tone: Tone }
const Ctx = createContext<{ toast: (text: string, tone?: Tone) => void }>({ toast: () => {} });
export const useToast = () => useContext(Ctx);

export function Toaster({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<T[]>([]);
  const toast = useCallback((text: string, tone: Tone = "success") => {
    const id = Date.now() + Math.random();
    setItems((x) => [...x, { id, text, tone }]);
    setTimeout(() => setItems((x) => x.filter((i) => i.id !== id)), 3800);
  }, []);
  const Icon = { success: CheckCircle2, error: XCircle, info: Info };
  const color = { success: "text-success", error: "text-error-soft", info: "text-accent" };
  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-20 z-[100] flex flex-col items-center gap-2 px-4 lg:bottom-6">
        {items.map((i) => { const I = Icon[i.tone]; return (
          <div key={i.id} className="pointer-events-auto flex max-w-sm items-center gap-3 rounded-xl border border-border bg-elevated px-4 py-3 text-sm shadow-xl shadow-black/40">
            <I className={`size-4 shrink-0 ${color[i.tone]}`} aria-hidden /> <span>{i.text}</span>
          </div>); })}
      </div>
    </Ctx.Provider>
  );
}
