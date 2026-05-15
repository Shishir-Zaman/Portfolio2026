"use client";

import { useEffect, useRef } from "react";

/**
 * CanvasBackground v2 — optimised topology animation.
 * 
 * Changes from v1:
 * - Fewer but brighter lines (18 vs 24) — more visible, less CPU
 * - Higher base alpha + wider alpha range — lines pop more
 * - Stronger mouse interaction wave
 * - Occasional bright accent line near mouse for visual interest
 * - Step size 6 (was 5) — slightly fewer vertices, faster draw
 * - t increment 0.006 — slightly slower for smoother feel
 */
export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef  = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // DPR-aware resize — cap at 1.5 to avoid 4K overdraw
    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);
    const resize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width  = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Passive mouse — no layout thrash
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: (touch.clientX - rect.left) / rect.width,
          y: (touch.clientY - rect.top)  / rect.height,
        };
      }
    };
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    let t = 0;

    const draw = () => {
      const w  = canvas.offsetWidth;
      const h  = canvas.offsetHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      const LINES = 28;   // more lines for richer topology
      const STEP  = 5;    // finer vertices

      for (let i = 0; i < LINES; i++) {
        const yBase = (h / LINES) * i + h / (LINES * 2);
        const ny    = yBase / h;
        const distY = Math.abs(ny - my);

        // Stronger mouse boost
        const mouseBoost = Math.max(0, 0.25 - distY * 0.4);
        // More visible breathing
        const breathe    = (Math.sin(i * 0.5 + t * 0.3) + 1) * 0.04;
        const alpha      = 0.07 + breathe + mouseBoost;

        ctx.beginPath();
        ctx.moveTo(0, yBase);

        for (let x = 0; x <= w; x += STEP) {
          const nx = x / w;
          const wave =
            Math.sin(nx * 3.5 + t * 0.4)           * 55 +
            Math.sin(nx * 7.0 - t * 0.3 + i * 0.4) * 30 +
            Math.sin(nx * 12  + t * 0.6 + i * 0.2) * 15 +
            // Much stronger Mouse ripple
            Math.sin((nx - mx) * 6 + t * 1.5) * (1 - Math.min(1, distY * 1.5)) * 40;
          ctx.lineTo(x, yBase + wave);
        }

        ctx.strokeStyle = `rgba(61,173,177,${Math.min(alpha, 0.4).toFixed(3)})`;
        ctx.lineWidth   = distY < 0.15 ? 1.5 : 1.0; // thicker near mouse
        ctx.stroke();
      }

      t += 0.012;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", onMove);
      // @ts-ignore
      window.removeEventListener("touchmove", onTouchMove);
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute inset-0"
      aria-hidden="true"
    />
  );
}
