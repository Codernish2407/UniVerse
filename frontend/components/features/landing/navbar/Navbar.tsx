"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 8);
  });

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
  <div className="text-xl font-bold text-white">
    UniVerse
  </div>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com/Codernish2407/UniVerse"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 transition-colors hover:text-white"
            aria-label="GitHub"
          >
            <ExternalLink className="size-[18px]" />
          </a>
        </nav>

        <div className="hidden md:block">
          <a
            href="#get-started"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="text-white/80 md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full border-b border-border bg-card/95 px-6 py-6 backdrop-blur-xl md:hidden"
            >
              <nav className="flex flex-col gap-5">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-white/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="https://github.com/Codernish2407/UniVerse"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-base font-medium text-white/80 transition-colors hover:text-white"
                >
                  <ExternalLink className="size-4" />
                  GitHub
                </a>
              </nav>

              <a
                href="#get-started"
                onClick={() => setMobileOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Get Started
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
