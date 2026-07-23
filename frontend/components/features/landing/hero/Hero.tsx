"use client";

import { motion, useReducedMotion } from "motion/react";
import CosmicBackground from "./CosmicBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

// The seven systems UniVerse connects. Order is intentional: it starts and ends
// with the two things a student checks daily (Attendance, Timetable) — the ring
// itself is documentation of what "one universe" means, not decoration.
const NODES = [
  "Attendance",
  "Timetable",
  "Notes",
  "Assistant",
  "Events",
  "Clubs",
  "Placements",
];

const ORBIT_RADIUS = 38; // percent of container
const ORBIT_DURATION = 140; // seconds — deliberately slow; motion should feel like it's always been there

function EcosystemOrbit() {
  const reduceMotion = useReducedMotion();

  const points = NODES.map((label, i) => {
    const angle = (i / NODES.length) * 2 * Math.PI - Math.PI / 2; // start at top, clockwise
    const x = 50 + ORBIT_RADIUS * Math.cos(angle);
    const y = 50 + ORBIT_RADIUS * Math.sin(angle);
    return { label, x, y };
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
    <div className="relative mx-auto aspect-square w-[300px] sm:w-[380px] lg:w-[460px]">
      {/* Fixed center emblem — does not rotate. Everything orbits it, it anchors everything. */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] blur-[70px]"
          style={{ background: "radial-gradient(circle, #7C5CFF 0%, transparent 70%)" }}
        />
        <motion.div
          animate={reduceMotion ? undefined : { scale: [1, 1.025, 1] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex h-24 w-24 flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-[#0F172A] sm:h-28 sm:w-28"
        >
          <span className="font-serif text-2xl italic text-white sm:text-3xl">U</span>
          <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-white/40">
            Verse
          </span>
        </motion.div>
      </div>

      {/* Rotating system: hairline ring + spokes (SVG) and upright labels (HTML), locked together */}
      <motion.div className="absolute inset-0" style={{ transformOrigin: "50% 50%" }} {...ringMotion}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <circle
            cx="50"
            cy="50"
            r={ORBIT_RADIUS}
            fill="none"
            stroke="rgba(167,139,250,0.16)"
            strokeWidth="0.15"
          />
          {points.map((p) => (
            <line
              key={p.label}
              x1="50"
              y1="50"
              x2={p.x}
              y2={p.y}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="0.12"
            />
          ))}
        </svg>

        {points.map((p) => (
          <div
            key={p.label}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <motion.div style={{ transformOrigin: "50% 50%" }} {...counterMotion}>
              <span className="inline-flex whitespace-nowrap rounded-full border border-white/[0.08] bg-[#0F172A]/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-white/55 backdrop-blur-sm sm:text-xs">
                {p.label}
              </span>
            </motion.div>
          </div>
        ))}
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
