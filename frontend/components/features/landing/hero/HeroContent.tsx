"use client";

import { motion, type Variants } from "motion/react";
import { GraduationCap } from "lucide-react";
import { APP_CONFIG } from "@/config/app";
import CTAButtons from "./CTAButtons";

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } };
const item: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } };

export default function HeroContent() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="flex max-w-xl flex-col items-start text-left">
      <motion.div variants={item} className="mb-7 inline-flex items-center gap-2 rounded-full border border-border bg-elevated/60 px-3.5 py-1.5 text-[13px] font-medium text-muted-foreground">
        <GraduationCap className="size-4 text-secondary-soft" aria-hidden />
        Independent, student-built project
      </motion.div>
      <motion.h1 variants={item} className="text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.2rem]">
        The Operating System for <span className="text-secondary-soft">Student Life.</span>
      </motion.h1>
      <motion.p variants={item} className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
        {APP_CONFIG.description}{" "}
        Lost &amp; found, teammates, roommates, an AI guide, CGPA tools, clubs, events and campus navigation, in one place.
      </motion.p>
      <motion.div variants={item} className="mt-9 w-full sm:w-auto"><CTAButtons /></motion.div>
    </motion.div>
  );
}
