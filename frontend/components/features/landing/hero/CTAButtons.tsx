"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function CTAButtons() {
  return (
    <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
      <motion.a
        href="#get-started"
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group inline-flex items-center gap-2 rounded-full bg-[#7C5CFF] px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset] transition-colors duration-200 hover:bg-[#8A6DFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B1A]"
      >
        Get started
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2} />
      </motion.a>

      <a
        href="#how-it-works"
        className="inline-flex items-center gap-1.5 px-1 py-3.5 text-[15px] font-medium text-white/60 underline decoration-white/20 underline-offset-4 transition-colors duration-200 hover:text-white/90 hover:decoration-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060B1A] rounded-sm"
      >
        See how it works
      </a>
    </div>
  );
}
