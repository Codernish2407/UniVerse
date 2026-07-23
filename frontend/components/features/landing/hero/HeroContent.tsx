"use client";

import { motion, type Variants } from "motion/react";
import { Fraunces } from "next/font/google";
import CTAButtons from "./CTAButtons";

// Serif display face used only for the headline — deliberate pairing against the
// project's body sans so the type itself carries the "premium, timeless" brief,
// rather than relying on effects. Loaded locally so no other files need to change.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex max-w-xl flex-col items-start text-left"
    >
      {/* Badge */}
      <motion.div
        variants={item}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-white/60"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#A78BFA]" />
        Built for university life
      </motion.div>

      {/* Headline */}
      <motion.h1
        variants={item}
        className={`${fraunces.className} text-[2.75rem] leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]`}
      >
        One <span className="italic text-white/90">universe.</span>
        <br />
        Every part of student life.
      </motion.h1>

      {/* Supporting copy */}
      <motion.p
        variants={item}
        className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-white/50 sm:text-lg"
      >
        Attendance, timetable, notes, events, clubs, and placements — connected
        in one system built for how students actually live.
      </motion.p>

      {/* CTAs */}
      <motion.div variants={item} className="mt-10">
        <CTAButtons />
      </motion.div>
    </motion.div>
  );
}
