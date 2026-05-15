"use client";

import { motion } from "framer-motion";
import { SERVICES } from "../data/content";
import PageBackground from "../components/PageBackground";

const ICONS: Record<string, React.ReactNode> = {
  brand: (
    <svg className="w-10 h-10 text-[var(--color-teal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
    </svg>
  ),
  packaging: (
    <svg className="w-10 h-10 text-[var(--color-teal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  graphics: (
    <svg className="w-10 h-10 text-[var(--color-teal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
      <line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" />
      <line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
    </svg>
  ),
  social: (
    <svg className="w-10 h-10 text-[var(--color-teal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  video: (
    <svg className="w-10 h-10 text-[var(--color-teal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  ),
  motion: (
    <svg className="w-10 h-10 text-[var(--color-teal-accent)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M5 3l14 9-14 9V3z" />
    </svg>
  ),
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col pt-10 pb-20 relative">
      <PageBackground />
      <motion.div 
        className="text-center mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/50 tracking-widest text-sm mb-4 uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">Services</span></p>
        <h1 className="text-5xl md:text-7xl font-syncopate font-bold uppercase mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">My Services</h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto font-sans">
          From a first logo to a complete brand system — I cover every visual touchpoint your brand needs to show up consistently and confidently.
        </p>
      </motion.div>

      <div className="flex flex-col gap-10">
        {SERVICES.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const isEven = index % 2 === 0;
  
  return (
    <motion.div 
      className={`glass rounded-[3rem] p-8 md:p-16 flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center group hover:border-white/15 transition-colors duration-500`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center mb-8 border border-[var(--color-teal-accent)]/20 shadow-[0_0_30px_rgba(0,245,255,0.1)] group-hover:shadow-[0_0_40px_rgba(0,245,255,0.2)] transition-shadow duration-500">
          {ICONS[service.icon] ?? ICONS.brand}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
        <p className="text-xs uppercase tracking-widest text-[var(--color-teal-accent)] mb-6 font-sans">{service.shortDesc}</p>
        <p className="text-lg text-white/70 leading-relaxed font-sans">
          {service.description}
        </p>
      </div>
      
      <div className="w-full md:w-1/2">
        <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8">
          <h3 className="text-xl font-bold mb-6 text-white/90">What&apos;s included:</h3>
          <ul className="flex flex-col gap-4">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-white/70 font-sans">
                <div className="w-2 h-2 rounded-full bg-[var(--color-teal-accent)] shadow-[0_0_8px_rgba(0,245,255,0.5)] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
