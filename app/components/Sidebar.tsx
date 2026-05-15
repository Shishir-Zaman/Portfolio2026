"use client";

import Link from "next/link";
import { PERSONAL_INFO } from "../data/content";

export default function Sidebar() {
  const socials = PERSONAL_INFO.socials;

  return (
    <aside
      className="fixed left-8 2xl:left-[72px] z-40 hidden 2xl:flex flex-col items-center gap-4"
      style={{ top: "50%", transform: "translateY(-50%)" }}
    >
      {/* Top fade line */}
      <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/[0.12] mb-0.5" />

      {socials.map((social, index) => (
        <Link
          key={social.label}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          title={social.label}
          className={[
            "group relative flex items-center justify-center",
            "w-[64px] h-[64px] rounded-full",
            "bg-[#0a0a0a]/50 backdrop-blur-2xl",
            "border border-white/[0.12]",
            "shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]",
            "text-white",
            "hover:bg-white/80 hover:backdrop-blur-3xl hover:border-white",
            "hover:text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.7),inset_0_1px_0_rgba(255,255,255,0.8)]",
            "transition-all duration-400 ease-out hover:scale-110",
          ].join(" ")}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none" />
          <div 
            className="relative z-10 flex items-center justify-center"
            style={{ 
              transform: `scale(${(social.size || 24) / 24})`
            }}
            dangerouslySetInnerHTML={{ __html: social.iconSvg }} 
          />
        </Link>
      ))}

      {/* Bottom fade line */}
      <div className="w-px h-12 bg-gradient-to-b from-white/[0.12] to-transparent mt-0.5" />
    </aside>
  );
}
