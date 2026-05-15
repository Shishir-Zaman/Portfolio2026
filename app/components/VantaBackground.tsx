"use client";

import { useEffect, useRef } from "react";

// ─── VantaBackground ──────────────────────────────────────────
// All heavy imports happen inside useEffect so nothing ever
// touches `window` during server-side rendering.
// ─────────────────────────────────────────────────────────────
export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || effectRef.current) return;

    let cancelled = false;

    // 1) Load p5 → inject as window.p5 (Vanta topology requires this)
    // 2) Load vanta topology
    // 3) Initialize
    (async () => {
      try {
        const p5Module = await import("p5");
        if (cancelled) return;
        (window as any).p5 = p5Module.default;

        await import("vanta/dist/vanta.topology.min");
        if (cancelled) return;

        if (el && !effectRef.current && (window as any).VANTA?.TOPOLOGY) {
          effectRef.current = (window as any).VANTA.TOPOLOGY({
            el,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200,
            minWidth: 200,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0x3dadb1,
            backgroundColor: 0x000000,
          });
        }
      } catch (err) {
        console.warn("VantaBackground: failed to load", err);
      }
    })();

    return () => {
      cancelled = true;
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 pointer-events-auto"
    />
  );
}
