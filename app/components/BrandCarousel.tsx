"use client";

import { BrandLogo } from "@/lib/db";

interface BrandCarouselProps {
  logos: BrandLogo[];
  title?: string;
}

export default function BrandCarousel({ logos, title = "Brands I've Worked With" }: BrandCarouselProps) {
  // Filter only logos that have a URL
  const validLogos = logos.filter((l) => l.logoUrl && l.logoUrl.trim() !== "");

  // Always show name-only logos for those without URLs too
  const allLogos = logos;

  if (allLogos.length === 0) return null;

  // Duplicate for seamless infinite scroll
  const doubled = [...allLogos, ...allLogos];

  const speed = Math.max(20, allLogos.length * 5);

  return (
    <section className="w-full py-10 md:py-16 border-t border-white/[0.06] mt-6">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <p className="text-foreground-faint text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans mb-2">
          Trusted by
        </p>
        <h2 className="text-lg md:text-2xl font-syncopate font-bold uppercase tracking-tight text-foreground/40">
          {title}
        </h2>
      </div>

      {/* Carousel Track */}
      <div
        className="marquee-container relative overflow-hidden w-full"
        style={{ maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)" }}
      >
        <div
          className="flex gap-8 md:gap-16 items-center animate-marquee w-max"
          style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
        >
          {doubled.map((logo, idx) => (
            <BrandLogoItem key={`${logo.id}-${idx}`} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandLogoItem({ logo }: { logo: BrandLogo }) {
  const content = (
    <div className="flex-shrink-0 flex items-center justify-center px-6 md:px-10 py-3 md:py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300 min-w-[120px] md:min-w-[160px] h-[64px] md:h-[80px] group">
      {logo.logoUrl ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={logo.logoUrl}
          alt={logo.name}
          loading="lazy"
          decoding="async"
          className="max-h-[36px] md:max-h-[44px] max-w-[120px] md:max-w-[140px] w-auto object-contain filter grayscale opacity-30 group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-500"
        />
      ) : (
        <span className="font-syncopate font-bold text-xs md:text-sm uppercase tracking-widest text-white/25 group-hover:text-white/50 transition-colors duration-300 whitespace-nowrap">
          {logo.name}
        </span>
      )}
    </div>
  );

  if (logo.websiteUrl) {
    return (
      <a
        href={logo.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        title={logo.name}
        className="block"
      >
        {content}
      </a>
    );
  }

  return content;
}
