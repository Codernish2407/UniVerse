"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ScrollIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/30">
        Scroll
      </span>
      <div className="relative h-9 w-px overflow-hidden bg-white/10">
        <motion.div
          className="absolute left-0 top-0 h-3 w-px bg-white/50"
          animate={reduceMotion ? { opacity: 0.5 } : { y: [0, 24, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
