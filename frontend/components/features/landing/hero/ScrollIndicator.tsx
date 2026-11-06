"use client";

import { motion, useReducedMotion } from "motion/react";

export default function ScrollIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
      <span className="text-[11px] font-medium text-white/30">
        Scroll
      </span>
      <div className="relative h-9 w-px overflow-hidden bg-white/[0.12]">
        <motion.div
          className="absolute left-0 top-0 h-3 w-px bg-white/60 shadow-[0_0_6px_rgba(255,255,255,0.4)]"
          animate={reduceMotion ? { opacity: 0.5 } : { y: [0, 24, 0] }}
          transition={reduceMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
