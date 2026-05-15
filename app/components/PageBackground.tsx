"use client";

import CanvasBackground from "./CanvasBackground";

export default function PageBackground() {
  return (
    <div 
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[900px] -z-10 pointer-events-none overflow-hidden"
      style={{
        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
      }}
    >
      <CanvasBackground />
      {/* Side fades */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#050505] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#050505] to-transparent" />
    </div>
  );
}
