"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-background/75 backdrop-blur-2xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}

        <Link
          href="/"
          className="flex items-center transition-opacity duration-200 hover:opacity-90"
        >
          <Image
            src="/logo/UniverseLogoHorizontal.png"
            alt="UniVerse"
            width={180}
            height={48}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop */}

        <nav className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/65 transition-all duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}

          <a
            href="https://github.com/Codernish2407/UniVerse"
            target="_blank"
            rel="noreferrer"
            className="text-white/65 transition-all duration-200 hover:text-white"
            aria-label="GitHub Repository"
          >
            <ExternalLink className="size-[18px]" />
          </a>
        </nav>

        {/* CTA */}

        <div className="hidden md:block">
          <a
            href="#get-started"
            className="inline-flex items-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-2.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(108,99,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_45px_rgba(108,99,255,0.45)]"
          >
            Get Started
          </a>
        </div>

        {/* Mobile Button */}

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          className="text-white md:hidden"
          aria-label={mobileOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileOpen ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>

        {/* Mobile Menu */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-x-4 top-[88px] rounded-2xl border border-white/10 bg-[#0F1633]/95 p-6 backdrop-blur-2xl md:hidden"
            >
              <nav className="flex flex-col gap-5">
                {NAV_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium text-white/80 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}

                <a
                  href="https://github.com/Codernish2407/UniVerse"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-base font-medium text-white/80 hover:text-white"
                >
                  <ExternalLink className="size-4" />
                  GitHub
                </a>

                <a
                  href="#get-started"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex justify-center rounded-full bg-gradient-to-r from-primary via-secondary to-accent px-6 py-3 text-sm font-semibold text-white"
                >
                  Get Started
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}