"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import CanvasBackground from "@/components/CanvasBackground";
import { SERVICES, PERSONAL_INFO } from "@/data/content";
import { CMSCategory, CMSProject, SiteSettings } from "../../lib/db";

const ROLES = [
  "Visual Designer",
  "UI/UX Designer",
  "Motion Designer",
  "Brand Identity Expert",
  "Social Media Designer",
  "Packaging Designer"
];

function RoleRotator() {
  const [index, setIndex] = useState(0);

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROLES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block w-[300px] h-[18px] md:h-[24px] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 text-transparent bg-clip-text bg-gradient-to-r from-foreground to-[var(--color-teal-accent)] font-bold text-center w-full text-[12px] md:text-sm"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function HomeClient({ categories, projects, siteSettings }: { categories: CMSCategory[], projects: CMSProject[], siteSettings: SiteSettings }) {
  // Use the admin-controlled featured project IDs
  const featuredProjects = siteSettings.featuredProjectIds
    .map(id => projects.find(p => p.id === id))
    .filter((p): p is CMSProject => p !== undefined);

  const homeCategories = categories.filter(c => c.showOnHomepage);

  return (
    <div className="flex flex-col gap-28 pb-10">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="min-h-[82vh] flex flex-col items-center justify-center text-center relative mt-4">

        {/* Canvas topology background */}
        <div 
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[100vw] h-[115%] -z-10"
          style={{
            maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent 100%)"
          }}
        >
          <CanvasBackground />
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>

        <motion.div
          className="text-foreground-muted font-medium uppercase tracking-[0.32em] text-[13px] md:text-sm mb-5 font-sans h-[24px] flex justify-center items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <RoleRotator />
        </motion.div>

        <motion.div
          className="relative inline-block mb-8"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.08 }}
        >
          {/* Blurred Glow layer */}
          <h1 className="absolute inset-0 text-[13.5vw] md:text-[7rem] lg:text-[9rem] leading-none font-light uppercase tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_right,var(--color-foreground),var(--color-foreground),var(--color-teal-accent),var(--color-foreground),var(--color-foreground))] bg-[length:250%_auto] animate-gradient-wave blur-[20px] md:blur-[25px] opacity-60 z-0">
            Shishir Zaman
          </h1>
          {/* Foreground text */}
          <h1 className="relative z-10 text-[13.5vw] md:text-[7rem] lg:text-[9rem] leading-none font-light uppercase tracking-tighter text-transparent bg-clip-text bg-[linear-gradient(to_right,var(--color-foreground),var(--color-foreground),var(--color-teal-accent),var(--color-foreground),var(--color-foreground))] bg-[length:250%_auto] animate-gradient-wave animate-fire-breath">
            Shishir Zaman
          </h1>
        </motion.div>

        <motion.p
          className="text-foreground-muted max-w-xl text-sm md:text-[17px] font-sans mb-10 leading-relaxed px-4 md:px-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          {PERSONAL_INFO.bio}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26 }}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-teal-accent)] text-background text-sm font-semibold hover:bg-[var(--color-teal-accent)]/90 hover:shadow-[0_0_28px_rgba(0,245,255,0.5)] transition-all duration-400"
          >
            Start a project
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-glass-bg backdrop-blur-xl border border-glass-border text-foreground-muted text-sm font-medium hover:bg-glass-bg hover:text-foreground transition-all duration-300"
          >
            View work
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 flex flex-col items-center gap-2 opacity-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <div className="w-5 h-8 border border-border-subtle rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-1 bg-foreground rounded-full"
              animate={{ y: [0, 10, 0], opacity: [1, 0.4, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── FEATURED PROJECTS ─────────────────────────────── */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-foreground-faint text-xs uppercase tracking-[0.25em] font-sans mb-2">Selected Work</p>
            <h2 className="text-3xl md:text-4xl font-syncopate font-bold uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-[var(--color-teal-accent)] drop-shadow-[0_0_10px_rgba(0,245,255,0.1)]">Featured Projects</h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest bg-glass-bg border border-border-color text-foreground-muted hover:text-foreground hover:bg-glass-bg transition-all duration-300"
          >
            All projects →
          </Link>
        </div>

        {/* 2� 2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {featuredProjects.map((project, index) => (
            <FeaturedCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* ── EXPLORE BY CATEGORY ─────────────────────────────── */}
      {homeCategories.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-foreground-faint text-xs uppercase tracking-[0.25em] font-sans mb-2">Capabilities</p>
              <h2 className="text-3xl md:text-4xl font-syncopate font-bold uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-[var(--color-teal-accent)] drop-shadow-[0_0_10px_rgba(0,245,255,0.1)]">Categories</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {homeCategories.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link
                  href={`/projects?category=${encodeURIComponent(cat.name)}`}
                  className="flex items-center justify-center text-center p-6 md:p-8 rounded-2xl glass border border-border-color hover:border-[var(--color-teal-accent)]/50 hover:bg-foreground-faint transition-all duration-300 group"
                >
                  <span className="font-syncopate font-bold text-sm md:text-base uppercase tracking-wider text-foreground-muted group-hover:text-foreground transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── SERVICES PREVIEW ──────────────────────────────── */}
      <section>
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-foreground-faint text-xs uppercase tracking-[0.25em] font-sans mb-2">What I do</p>
            <h2 className="text-3xl md:text-4xl font-syncopate font-bold uppercase tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-[var(--color-teal-accent)] drop-shadow-[0_0_10px_rgba(0,245,255,0.1)]">My Services</h2>
          </div>
          <Link
            href="/services"
            className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-medium uppercase tracking-widest bg-glass-bg border border-border-color text-foreground-muted hover:text-foreground hover:bg-glass-bg transition-all duration-300"
          >
            Learn more →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {SERVICES.slice(0, 3).map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Featured Project Card ──────────────────────────────────────
function FeaturedCard({ project, index }: { project: CMSProject, index: number }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="group flex flex-col relative cursor-none"
      >
        {/* Teal glow that bleeds behind the card */}
        <div className="absolute -inset-3 bg-[var(--color-teal-accent)]/0 group-hover:bg-[var(--color-teal-accent)]/8 rounded-[2.5rem] blur-2xl transition-all duration-700 pointer-events-none -z-10" />

        {/* Card image area */}
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-border-color shadow-[0_4px_40px_rgba(0,0,0,0.6)]">

          {/* Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Inner black gradient — ensures text is always legible */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background via-background to-transparent" />
          
          {/* Card content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 z-10">
            <h3 className="text-base md:text-xl font-syncopate font-bold uppercase tracking-tight text-foreground mb-0.5 md:mb-1 leading-tight">
              {project.title}
            </h3>
            <span className="text-foreground-muted text-[10px] md:text-xs font-sans uppercase tracking-widest">{project.tags[0]}</span>
          </div>
        </div>

        {/* Tags — Simplified on mobile */}
        <div className="flex flex-wrap gap-1.5 mt-3 px-1">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] md:text-[11px] font-medium rounded-md bg-foreground-faint border border-border-color text-foreground-muted uppercase tracking-widest font-sans"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3 px-1 text-foreground-muted text-[13px] font-sans leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </motion.article>
    </Link>
  );
}

// ── Service Card ───────────────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  brand: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  packaging: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  graphics: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>,
  social: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  video: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  motion: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 3l14 9-14 9V3z"/></svg>,
};

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="group relative p-7 rounded-2xl bg-glass-bg backdrop-blur-md border border-border-color hover:border-glass-border hover:bg-glass-bg transition-all duration-400 overflow-hidden"
    >
      {/* Teal glow on hover */}
      <div className="absolute inset-0 bg-[var(--color-teal-accent)]/0 group-hover:bg-[var(--color-teal-accent)]/[0.04] transition-colors duration-500 rounded-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="w-9 h-9 rounded-xl bg-foreground-faint border border-border-color flex items-center justify-center mb-5 text-[var(--color-teal-accent)] group-hover:shadow-[0_0_16px_rgba(0,245,255,0.2)] transition-shadow duration-400">
          {SERVICE_ICONS[service.icon]}
        </div>
        <h3 className="text-[15px] font-bold uppercase tracking-wide text-foreground mb-2">{service.title}</h3>
        <p className="text-foreground-muted text-[13px] leading-relaxed font-sans">{service.shortDesc}</p>
      </div>
    </motion.div>
  );
}
