"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import {
  Home,
  CalendarDays,
  Users,
  MapPin,
  Calculator,
  UserPlus,
  Sparkles,
  PackageSearch,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CosmicBackground from "./CosmicBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

// The real modules of the UniVerse ecosystem, arranged clockwise from the top.
// Only "AI Assistant" carries an accent — it's the one place a highlight
// color is earned rather than decorative.
const NODES = [
  { label: "Roommate Finder", sub: "Match with your vibe", icon: Home, tone: "default" as const },
  { label: "Events", sub: "Never miss a moment", icon: CalendarDays, tone: "default" as const },
  { label: "Clubs", sub: "Find your people", icon: Users, tone: "default" as const },
  { label: "Campus Navigation", sub: "Find your way", icon: MapPin, tone: "default" as const },
  { label: "Team Finder", sub: "Build your squad", icon: UserPlus, tone: "default" as const },
  { label: "CGPA Calculator", sub: "Track your grades", icon: Calculator, tone: "default" as const },
  { label: "AI Assistant", sub: "Ask anything, anytime", icon: Sparkles, tone: "ai" as const },
  { label: "Lost & Found", sub: "Get it back, fast", icon: PackageSearch, tone: "default" as const },
];

const ORBIT_RADIUS = 42; // percent of container
const ORBIT_DURATION = 150; // seconds — slow enough to feel ambient, never like a spinner

function EcosystemOrbit() {
  const reduceMotion = useReducedMotion();

  const points = NODES.map((node, i) => {
    const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2; // start at top, clockwise
    const x = 50 + ORBIT_RADIUS * Math.cos(angle);
    const y = 50 + ORBIT_RADIUS * Math.sin(angle);
    return { ...node, x, y };
  });

  const ringMotion = reduceMotion
    ? {}
    : {
        animate: { rotate: 360 },
        transition: { duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" as const },
      };

  const counterMotion = reduceMotion
    ? {}
    : {
        animate: { rotate: -360 },
        transition: { duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" as const },
      };

  return (
    <div className="relative mx-auto aspect-square w-[340px] sm:w-[440px] lg:w-[540px]">
      {/* Fixed center emblem — your actual logo, not a generated mark */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.16] blur-[75px]"
          style={{ background: "radial-gradient(circle, #6C63FF 0%, transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[55px]"
          style={{ background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)" }}
        />
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.015, 1] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-32 w-32 items-center justify-center rounded-[26px] border border-[#8B5CF6]/[0.42] bg-[#12192E] shadow-[inset_0_1px_0_rgba(255,255,255,0.09),0_0_18px_rgba(139,92,246,0.22),0_0_42px_-8px_rgba(139,92,246,0.32),0_24px_60px_-20px_rgba(0,0,0,0.75)] sm:h-36 sm:w-36"
        >
          <Image
            src="/logo/UniverseLogoOrbit.png"
            alt="UniVerse"
            width={108}
            height={108}
            className="h-36 w-36 object-contain sm:h-[8.3rem] sm:w-[8.3rem]"
          />
        </motion.div>
      </div>

      {/* Rotating ring: hairline circle plus two static accent nodes for rhythm,
          and upright module cards, all locked together */}
      <motion.div className="absolute inset-0" style={{ transformOrigin: "50% 50%" }} {...ringMotion}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <circle
            cx="50"
            cy="50"
            r={ORBIT_RADIUS}
            fill="none"
            stroke="rgba(255,255,255,0.11)"
            strokeWidth="0.15"
          />
          {/* Radial connector lines */}
          {points.map((p) => (
            <line
              key={`line-${p.label}`}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.12"
              strokeLinecap="round"
            />
          ))}
          {/* Ambient lights between modules */}
          {NODES.map((_, i) => ((i + 0.5) / NODES.length) * 360 - 90).map(
            (degree, i) => {
              const angle = (degree * Math.PI) / 180;
              const x = 50 + ORBIT_RADIUS * Math.cos(angle);
              const y = 50 + ORBIT_RADIUS * Math.sin(angle);
              const isGold = i % 2 === 0;

              return (
                <motion.circle
                  key={`ambient-${degree}`}
                  cx={x}
                  cy={y}
                  r="0.75"
                  fill={isGold ? "#8B5CF6" : "#06B6D4"}
                  animate={{
                    opacity: [0.45, 1, 0.45],
                    r: [0.6, 0.85, 0.6],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.35,
                  }}
                  style={{
                    filter: `drop-shadow(0 0 3px ${
                      isGold
                        ? "rgba(196,170,255,1)"
                        : "rgba(80,210,235,1)"
                    }) drop-shadow(0 0 7px ${
                      isGold
                        ? "rgba(139,92,246,0.65)"
                        : "rgba(6,182,212,0.65)"
                    })`,
                  }}
                />
              );
            }
          )}
        </svg>

        {points.map((p) => {
          const Icon = p.icon;
          const isAI = p.tone === "ai";
          return (
            <div
              key={p.label}
              className="absolute"
              style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <motion.div
                style={{ transformOrigin: "50% 50%" }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                {...counterMotion}
              >
                <div
                  className={cn(
                    "flex items-center gap-2.5 whitespace-nowrap rounded-2xl border px-3.5 py-2.5 backdrop-blur-md transition-colors duration-200",
                    isAI
                      ? "border-[#06B6D4]/30 bg-[#12192E]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_32px_-8px_rgba(6,182,212,0.45),0_14px_30px_-16px_rgba(0,0,0,0.8)]"
                      :"border-[#8B5CF6]/[0.16] bg-[#12192E]/95 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_22px_rgba(139,92,246,0.28),0_14px_30px_-16px_rgba(0,0,0,0.8)]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
                      isAI
                        ? "border-[#06B6D4]/30 bg-[#06B6D4]/10"
                        : "border-white/10 bg-white/[0.05]"
                    )}
                  >
                    <Icon
                      className={cn("h-4 w-4", isAI ? "text-[#67E8F9]" : "text-white/70")}
                      strokeWidth={2}
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-[12.5px] font-semibold leading-tight text-white/90">
                      {p.label}
                    </span>
                    <span className="text-[10.5px] leading-tight text-white/40">
                      {p.sub}
                    </span>
                  </span>
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-6 py-32 sm:px-10 lg:px-16">
      <CosmicBackground />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <HeroContent />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex items-center justify-center"
        >
          <EcosystemOrbit />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}