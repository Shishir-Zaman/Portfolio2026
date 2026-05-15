"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PERSONAL_INFO } from "../data/content";
import PageBackground from "../components/PageBackground";

const PROFESSION_LIST = [
  "Brand Identity Designer",
  "Packaging Specialist",
  "Visual Design Artist",
  "Social Media Strategist",
  "Motion Graphics Expert",
  "Video Creative"
];

function ProfessionLoop({ className, delay = 2500 }: { className?: string, delay?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PROFESSION_LIST.length);
    }, delay);
    return () => clearInterval(timer);
  }, [delay]);

  return (
    <div className={`h-[1.2em] overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={PROFESSION_LIST[index]}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="block whitespace-nowrap"
        >
          {PROFESSION_LIST[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] } },
};
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

export default function AboutPage() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className="relative flex flex-col gap-24 py-10">
      <PageBackground />

      {/* ── CSS Grain texture overlay ────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "120px 120px",
        }}
      />

      {/* ── PAGE HEADER ──────────────────────────────────────── */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="relative flex flex-col items-center text-center">
        <motion.div variants={fadeUp} className="mb-4">
          <p className="text-white/50 tracking-widest text-sm uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">About</span></p>
        </motion.div>
        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-syncopate font-bold uppercase tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)] text-center">
          About Me
        </motion.h1>
        {isMounted && (
          <motion.div variants={fadeUp} className="mt-6">
            <ProfessionLoop className="text-[var(--color-teal-accent)] font-medium uppercase tracking-[0.25em] text-xs md:text-sm font-sans" />
          </motion.div>
        )}
        <motion.div variants={fadeUp} className="h-px w-[120px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
      </motion.div>

      {/* ── MAIN GRID ────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

        {/* ── LEFT PHOTO COLUMN ──── */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Ambient teal glow */}
          <div className="absolute -inset-10 bg-[var(--color-teal-accent)]/[0.08] blur-3xl rounded-full -z-10 pointer-events-none" />

          {/* Photo card */}
          <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/[0.07] shadow-[0_0_80px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.04)]">
            {/* Specular sheen */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent z-10 pointer-events-none" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PERSONAL_INFO.profileImage}
              alt={`${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover scale-[1.02] grayscale-[0.25] hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent z-10" />
            {/* Name badge inside photo */}
            <div className="absolute bottom-7 left-7 z-20">
              {isMounted ? (
                <ProfessionLoop className="text-white/35 text-[11px] uppercase tracking-[0.3em] font-sans" />
              ) : (
                <span className="text-white/35 text-[11px] uppercase tracking-[0.3em] font-sans block h-[1.2em]">Visual & Brand Designer</span>
              )}
              <h2 className="text-2xl font-bold text-white">{PERSONAL_INFO.name}</h2>
            </div>
          </div>

          {/* Floating stats card */}
          <motion.div
            className="absolute -bottom-6 -right-3 lg:-right-7 z-30"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div
              className="backdrop-blur-2xl rounded-2xl p-5 border border-white/[0.10] shadow-[0_8px_48px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)]"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.7) 100%)" }}
            >
              <div className="flex gap-7">
                {PERSONAL_INFO.stats.slice(0, 2).map((s) => (
                  <div key={s.label} className="flex flex-col items-center gap-1">
                    <span className="text-[26px] font-bold text-white leading-none">{s.number}</span>
                    <span className="text-white/35 text-[10px] uppercase tracking-widest font-sans text-center max-w-[64px] leading-tight">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating location badge */}
          <motion.div
            className="absolute -top-3 -left-3 z-30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="backdrop-blur-xl rounded-xl px-4 py-2 border border-white/[0.09] shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex items-center gap-2"
              style={{ background: "rgba(0,0,0,0.65)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal-accent)] shadow-[0_0_8px_rgba(0,245,255,0.9)] animate-pulse" />
              <span className="text-white/55 text-[11px] uppercase tracking-[0.2em] font-sans">{PERSONAL_INFO.location}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT TEXT COLUMN ──── */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-9 lg:pt-2"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Pull quote */}
          <blockquote className="relative p-8 rounded-2xl border border-white/[0.12] bg-[#0a0a0a]/50 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] mb-4">
            <motion.p variants={fadeUp} className="text-xl md:text-[28px] font-light text-white/90 max-w-4xl leading-relaxed mt-4 mb-4 flex flex-wrap items-baseline gap-x-3">
              I craft designs that don&apos;t just look beautiful, but strategically elevate your brand. I am a
              {isMounted && (
                <ProfessionLoop className="text-[var(--color-teal-accent)] font-medium font-syncopate tracking-wider drop-shadow-[0_0_10px_rgba(0,245,255,0.4)]" />
              )}
            </motion.p>
          </blockquote>

          {/* Bio */}
          <div className="flex flex-col gap-5">
            {PERSONAL_INFO.bioExtended.map((p, i) => (
              <p key={i} className="text-white/50 font-sans text-[15px] leading-[1.9]">{p}</p>
            ))}
          </div>

          {/* Tools glass panel */}
          <div
            className="relative rounded-3xl border border-white/[0.12] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(0,245,255,0.02) 100%)" }}
          >
            <div className="absolute inset-0 backdrop-blur-3xl pointer-events-none" />
            <div className="relative z-10 p-8">
              <p className="text-[var(--color-teal-accent)] text-[11px] uppercase tracking-[0.3em] font-sans mb-5 font-bold">Tools & Software</p>
              <div className="flex flex-wrap gap-3">
                {PERSONAL_INFO.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-5 py-2.5 rounded-full text-[13px] font-medium tracking-wide bg-black/40 border border-white/[0.1] text-white/80 hover:border-[var(--color-teal-accent)] hover:text-[var(--color-teal-accent)] hover:bg-[var(--color-teal-accent)]/10 hover:shadow-[0_0_20px_rgba(0,245,255,0.2)] transition-all duration-400 ease-out"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[var(--color-teal-accent)] text-black text-sm font-bold hover:bg-[var(--color-teal-accent)]/90 hover:shadow-[0_0_30px_rgba(0,245,255,0.45)] transition-all duration-300"
            >
              Let&apos;s work together
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <a
              href={PERSONAL_INFO.resumeUrl}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium bg-white/[0.04] backdrop-blur-md border border-white/[0.09] text-white/55 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Resume
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ROW ────────────────────────────────────────── */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PERSONAL_INFO.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group relative rounded-3xl overflow-hidden border border-white/[0.12] p-8 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]"
            style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.7) 100%)" }}
          >
            <div className="absolute inset-0 backdrop-blur-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-[var(--color-teal-accent)]/0 group-hover:bg-[var(--color-teal-accent)]/[0.06] transition-colors duration-500 pointer-events-none" />
            <div className="relative z-10">
              <span className="text-5xl md:text-6xl font-syncopate font-bold text-white block mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:text-[var(--color-teal-accent)] group-hover:drop-shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all duration-500">{stat.number}</span>
              <span className="text-white/50 text-[12px] uppercase tracking-[0.3em] font-sans font-medium">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── SOCIALS ──────────────────────────────────────────── */}
      <motion.section
        className="flex flex-col items-center gap-5 pb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-px bg-white/12" />
          <span className="text-white/20 text-[11px] uppercase tracking-[0.35em] font-sans">Find me on</span>
          <div className="w-10 h-px bg-white/12" />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {PERSONAL_INFO.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-[13px] font-medium bg-[#0a0a0a]/50 backdrop-blur-2xl border border-white/[0.12] text-white/50 hover:text-black hover:border-white hover:bg-white/80 hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] capitalize font-sans transition-all duration-400 ease-out hover:scale-105 flex items-center gap-2 group"
            >
              <div
                className="w-4 h-4 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity"
                dangerouslySetInnerHTML={{ __html: social.iconSvg.replace(/width=".*?"/g, 'width="100%"').replace(/height=".*?"/g, 'height="100%"') }}
              />
              {social.label}
            </a>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
