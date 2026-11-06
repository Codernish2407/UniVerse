"use client";
import { ReactNode } from "react";
import { ArrowRight, Check, Info, Plus, Search, X } from "lucide-react";

export function PageHeading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action && <div className="heading-action">{action}</div>}</div>;
}
export function Button({ children, variant = "primary", onClick, href, type = "button", disabled = false, className = "" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; onClick?: () => void; href?: string; type?: "button" | "submit"; disabled?: boolean; className?: string }) {
  const cls = `button button-${variant} ${className}`;
  if (href) return <a className={cls} href={href}>{children}<ArrowRight size={16}/></a>;
  return <button className={cls} type={type} onClick={onClick} disabled={disabled}>{children}</button>;
}
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`card ${className}`}>{children}</div>; }
export function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "violet" | "cyan" | "green" | "amber" }) { return <span className={`badge badge-${tone}`}>{children}</span>; }
export function Avatar({ initials, size = "md" }: { initials: string; size?: "sm" | "md" | "lg" }) { return <span className={`avatar avatar-${size}`}>{initials}</span>; }
export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) { return <div className="empty-state"><div className="empty-orbit"><Info size={22}/></div><h3>{title}</h3><p>{description}</p>{action}</div>; }
export function Toast({ message, onClose }: { message: string; onClose: () => void }) { if (!message) return null; return <div className="toast" role="status"><Check size={16}/><span>{message}</span><button onClick={onClose} aria-label="Dismiss notification"><X size={15}/></button></div>; }
export function SearchField({ value, onChange, placeholder = "Search anything..." }: { value: string; onChange: (v: string) => void; placeholder?: string }) { return <label className="search-field"><Search size={17}/><input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}/><kbd>⌘ K</kbd></label>; }
export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) { return <div className="section-title"><h2>{title}</h2>{action}</div>; }
export function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) { return <label className="field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>; }
export function Dialog({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: ReactNode }) { if (!open) return null; return <div className="dialog-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section className="dialog" role="dialog" aria-modal="true" aria-label={title}><div className="dialog-head"><h2>{title}</h2><button className="icon-button" onClick={onClose} aria-label="Close"><X size={18}/></button></div>{children}</section></div>; }
export function InlineLink({ href, children }: { href: string; children: ReactNode }) { return <a className="inline-link" href={href}>{children}<ArrowRight size={14}/></a>; }
export function Tag({ children }: { children: ReactNode }) { return <span className="tag">{children}</span>; }
export function Divider() { return <div className="divider"/>; }
export function IconButton({ children, label, onClick }: { children: ReactNode; label: string; onClick?: () => void }) { return <button className="icon-button" aria-label={label} onClick={onClick}>{children}</button>; }
export function Notice({ children }: { children: ReactNode }) { return <div className="notice"><Info size={17}/><div>{children}</div></div>; }
export function Metric({ label, value, detail }: { label: string; value: string; detail?: string }) { return <div className="metric"><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>; }
export function Progress({ value }: { value: number }) { return <div className="progress-track"><span style={{ width: `${Math.max(0, Math.min(100, value))}%` }}/></div>; }
export function AddIcon() { return <Plus size={16}/>; }
