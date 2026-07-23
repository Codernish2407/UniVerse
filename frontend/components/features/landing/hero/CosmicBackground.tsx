export default function CosmicBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#060B1A]">
      {/* Base surface: near-black, almost flat — depth comes from one contained light source, not a full-bleed gradient wash */}
      <div className="absolute inset-0 bg-[#060B1A]" />

      {/* Single soft ambient light, anchored top-right, tightly contained so it reads as material lighting, not an "AI glow" */}
      <div
        className="absolute -right-[10%] -top-[15%] h-[560px] w-[560px] rounded-full opacity-[0.10] blur-[140px]"
        style={{ background: "radial-gradient(circle, #7C5CFF 0%, transparent 70%)" }}
      />

      {/* Faint horizon lift so the bottom of the section doesn't read as pure void */}
      <div
        className="absolute inset-x-0 bottom-0 h-[40%] opacity-60"
        style={{ background: "linear-gradient(to top, #0F172A 0%, transparent 100%)" }}
      />

      {/* Subtle film grain for material texture — extremely low opacity, this is the only "effect" doing decorative work */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-overlay">
        <filter id="uv-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#uv-grain)" />
      </svg>

      {/* Hairline top border to give the section a precise, designed edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
    </div>
  );
}
