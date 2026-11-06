
"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function CosmicBackground() {
  const stars = Array.from({ length: 18 });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#0B1023]"
    >
      {/* Deep cinematic base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              #0D1328 0%,
              #0B1023 42%,
              #0B1023 100%
            )
          `,
        }}
      />

      {/* Atmospheric blue light */}
      <div
        className="absolute -right-[18%] -top-[24%] h-[1200px] w-[1200px] rounded-full blur-[220px]"
        style={{
          background:
            "radial-gradient(circle, rgba(48,92,180,.20) 0%, rgba(48,92,180,.08) 42%, transparent 74%)",
        }}
      />

      {/* Soft ambient around orbit */}
      <div
        className="absolute left-[68%] top-[42%] h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,225,150,.04), rgba(46,72,138,.06), transparent 72%)",
        }}
      />

    <Image
  src="/logo/planet-glow.png"
  alt=""
  width={1536}
  height={1200}
  priority
  className="
    absolute
    -left-[180px]
    -bottom-[150px]
    w-[1150px]
    h-auto
    z-0
    pointer-events-none
    select-none
  "
  style={{
    opacity: 1.1,
  }}
/>

      {/* Tiny stars */}
      {stars.map((_, i) => {
        const left = (i * 59) % 100;
        const top = (i * 31) % 78;
        const size = (i % 2) + 1;
        const delay = (i * 9) / 10;

        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity: 0.20,
            }}
            animate={{
              opacity: [0.05, 0.18, 0.05],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay,
            }}
          />
        );
      })}
            {/* Cinematic vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 50% 42%,
              transparent 36%,
              rgba(0,0,0,.82) 100%
            )
          `,
        }}
      />


      {/* Film grain */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.02] mix-blend-overlay"
      >
        <filter id="uv-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>

        <rect
          width="100%"
          height="100%"
          filter="url(#uv-grain)"
        />
      </svg>

      {/* Hairline top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.05]" />
    </div>
  );
}