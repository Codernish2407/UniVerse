"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { inputCls } from "./FormField";

export function TagInput({ id, label, value, onChange, placeholder }: { id: string; label: string; value: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  const [draft, setDraft] = useState("");
  const add = () => { const t = draft.trim(); if (t && !value.some((v) => v.toLowerCase() === t.toLowerCase())) onChange([...value, t]); setDraft(""); };
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input id={id} aria-label={label} value={draft} placeholder={placeholder} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} className={inputCls} />
        <button type="button" onClick={add} className="h-11 rounded-xl border border-border px-4 text-sm hover:bg-hover">Add</button>
      </div>
      {value.length > 0 && <ul className="flex flex-wrap gap-1.5">{value.map((v) => <li key={v} className="flex items-center gap-1 rounded-full border border-border bg-hover py-1 pr-1 pl-3 text-sm">{v}<button type="button" aria-label={`Remove ${v}`} onClick={() => onChange(value.filter((x) => x !== v))} className="flex size-6 items-center justify-center rounded-full hover:bg-border"><X className="size-3.5" aria-hidden /></button></li>)}</ul>}
    </div>
  );
}
