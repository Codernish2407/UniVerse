"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/shared/BrandMark";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "About", href: "/about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-300", scrolled || open ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent")}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <BrandMark />
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => <Link key={l.href} href={l.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">{l.label}</Link>)}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost" })}>Login</Link>
          <Link href="/signup" className={cn(buttonVariants(), "rounded-full px-5")}>Get Started</Link>
        </div>
        <button type="button" onClick={() => setOpen((o) => !o)} className="flex size-11 items-center justify-center rounded-full md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Mobile" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} className="flex flex-col gap-1 border-t border-border px-4 pt-3 pb-5 md:hidden">
            {NAV_LINKS.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex h-12 items-center rounded-xl px-3 text-base hover:bg-hover">{l.label}</Link>)}
            <Link href="/login" onClick={() => setOpen(false)} className="flex h-12 items-center rounded-xl px-3 text-base hover:bg-hover">Login</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className={cn(buttonVariants({ size: "lg" }), "mt-2")}>Get Started</Link>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
