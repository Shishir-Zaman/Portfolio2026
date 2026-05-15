"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

// ── 3D cursor-following logo with glassmorphism liquid effect ──
function Logo3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, proximity: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      // Distance from center — normalised 0-1 (closer = 1)
      const dist      = Math.sqrt(dx * dx + dy * dy);
      const maxDist   = 320;
      const proximity = Math.max(0, 1 - dist / maxDist);

      // 3D tilt — max ±18deg, scales with proximity
      const rotX = -(dy / 180) * 18 * proximity;
      const rotY =  (dx / 180) * 18 * proximity;

      setTilt({ x: rotX, y: rotY, proximity });
    };

    const onLeave = () => setTilt({ x: 0, y: 0, proximity: 0 });

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const glassOpacity  = 0.04 + tilt.proximity * 0.12;
  const glowIntensity = tilt.proximity;
  const shimmerX      = 50 + tilt.y * 3;
  const shimmerY      = 50 + tilt.x * 3;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center gap-6 select-none"
      style={{ perspective: "900px" }}
    >
      {/* 3D-tilting logo card */}
      <div
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${tilt.proximity * 24}px)`,
          transition: tilt.proximity > 0 ? "transform 0.08s ease-out" : "transform 0.6s ease-out",
          willChange: "transform",
        }}
        className="relative"
      >
        {/* Liquid glass shell — glows and shimmers on tilt */}
        <div
          className="absolute -inset-10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(ellipse at ${shimmerX}% ${shimmerY}%, rgba(0,245,255,${0.08 + glowIntensity * 0.22}) 0%, rgba(61,173,177,${0.04 + glowIntensity * 0.10}) 40%, transparent 70%)`,
          }}
        />

        {/* Frosted glass ring that morphs with tilt */}
        <div
          className="absolute -inset-6 rounded-full pointer-events-none border transition-all duration-150"
          style={{
            backdropFilter: `blur(${4 + tilt.proximity * 12}px)`,
            background: `radial-gradient(ellipse at ${shimmerX}% ${shimmerY}%, rgba(255,255,255,${glassOpacity}) 0%, rgba(0,245,255,${glassOpacity * 0.4}) 50%, transparent 80%)`,
            borderColor: `rgba(255,255,255,${0.04 + tilt.proximity * 0.1})`,
            boxShadow: `0 0 ${30 + tilt.proximity * 60}px rgba(0,245,255,${0.05 + tilt.proximity * 0.15}), inset 0 1px 0 rgba(255,255,255,${0.04 + tilt.proximity * 0.08})`,
          }}
        />

        {/* The Logo mark itself */}
        <Logo
          className="relative z-10 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          style={{
            width:  "160px",
            height: "160px",
            color: `rgba(255,255,255,${0.88 + tilt.proximity * 0.12})`,
            filter: `drop-shadow(0 0 ${8 + tilt.proximity * 32}px rgba(0,245,255,${0.15 + tilt.proximity * 0.45}))`,
          }}
        />
      </div>
    </div>
  );
}

// ── Go To Top Button ────────────────────────────────────────────
const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      className="absolute right-0 bottom-0 md:bottom-2 flex items-center justify-center w-[50px] h-[50px] rounded-full border border-white/20 bg-black/50 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:scale-105"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

// ── Footer ──────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center text-center mt-24 relative pb-16">

      {/* ── 3D Logo hero section — no box, open canvas ─────── */}
      <div className="relative w-full flex flex-col items-center gap-0 mb-12 py-16">
        {/* Ambient floor glow */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.05)_0%,transparent_65%)] pointer-events-none" />

        <Logo3D />
      </div>

      {/* ── CTA text ────────────────────────────────────────── */}
      <h2 className="text-4xl md:text-[56px] font-syncopate font-bold mb-4 z-10 relative leading-tight tracking-tight uppercase bg-clip-text text-transparent bg-[linear-gradient(to_right,white,rgba(255,255,255,0.7),white)] animate-gradient-wave drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        Ready to bring your <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-teal-accent)] drop-shadow-[0_0_20px_rgba(0,245,255,0.4)]">project to life?</span>
      </h2>
      <p className="text-[15px] md:text-[17px] text-white/90 font-sans mb-12 z-10 relative max-w-2xl leading-relaxed">
        Tell me about your ideas and desires, let's discuss them and work together!
      </p>

      <div className="flex flex-col items-center gap-16 relative z-10 w-full">
        <Link
          href="/contact#contact-form"
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#005555]/80 border border-[var(--color-teal-accent)]/80 text-white font-medium text-[15px] hover:bg-[#007777] hover:shadow-[0_0_40px_rgba(0,245,255,0.4)] transition-all duration-400"
        >
          Start a project
        </Link>

        {/* Bottom row: copyright & scroll to top */}
        <div className="w-full max-w-[1560px] mx-auto mt-16 relative flex justify-center items-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-white text-[15px] font-sans font-medium">© 2026 Shishir Zaman.</p>
            <Link href="/legal" className="text-white text-[14px] font-sans hover:text-[var(--color-teal-accent)] transition-colors">Legal Notices</Link>
          </div>
          
          <ScrollToTop />
        </div>
      </div>
    </footer>
  );
}
