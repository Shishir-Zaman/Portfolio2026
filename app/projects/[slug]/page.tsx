"use client";

import { FEATURED_PROJECTS, PROJECTS } from "../../data/content";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import PageBackground from "../../components/PageBackground";

// Merge both lists; featured has `description`, all have `image`, `tags`, `title`
const ALL_PROJECTS = PROJECTS;

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = ALL_PROJECTS.find(p => p.id === slug);

  if (!project) return notFound();

  return (
    <div className="min-h-screen pt-10 pb-20 flex flex-col gap-16 relative">
      <PageBackground />
      
      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-white/40 text-sm font-sans"
      >
        <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
        <span>/</span>
        <span className="text-white/70 uppercase tracking-wider">{project.title}</span>
      </motion.div>

      {/* Title + Tags */}
      <div className="flex flex-col gap-6">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {project.title}
        </motion.h1>
        
        <motion.div 
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-2 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-[var(--color-teal-accent)] tracking-widest uppercase font-sans">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div 
        className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden relative border border-white/8 shadow-[0_0_60px_rgba(0,0,0,0.8)]"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </motion.div>

      {/* Project Detail */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <motion.div 
          className="md:col-span-8 flex flex-col gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-[var(--color-teal-accent)]">
            About this Project
          </h2>

          {/* 
            ──────────────────────────────────────────────────────────────
            TO CUSTOMIZE THIS PAGE:
            Add a `description` and `details` field to this project
            in app/data/content.ts. The content will appear here automatically.
            ──────────────────────────────────────────────────────────────
          */}
          {project.description ? (
            <p className="text-lg text-white/70 font-sans leading-relaxed">{project.description}</p>
          ) : (
            <p className="text-lg text-white/40 font-sans leading-relaxed italic">
              Project description coming soon — add a `description` field in content.ts.
            </p>
          )}

          <p className="text-lg text-white/70 font-sans leading-relaxed">
            Every element of this project was crafted with intention — from initial concept to final delivery. 
            I applied a strategic design approach rooted in brand clarity, visual consistency, and audience resonance.
          </p>

          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="flex flex-col gap-6 mt-8">
              {project.gallery.map((src, i) => (
                <div key={i} className="w-full rounded-[2rem] overflow-hidden border border-white/8 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#050505]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${project.title} detail ${i + 1}`} loading="lazy" className="w-full h-auto object-cover" />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Side Info Panel */}
        <motion.div 
          className="md:col-span-4 flex flex-col gap-0 rounded-[2rem] bg-white/[0.02] backdrop-blur-md border border-white/10 overflow-hidden h-fit"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { label: "Role", value: "Visual Designer" },
            { label: "Deliverables", value: project.tags.join(", ") },
            { label: "Year", value: project.year ?? "2024" },
            { label: "Status", value: "Completed" },
          ].map((item, i) => (
            <div key={i} className="p-6 border-b border-white/8 last:border-0">
              <h3 className="text-white/40 text-xs font-sans uppercase tracking-[0.2em] mb-2">{item.label}</h3>
              <p className="text-white font-medium text-sm uppercase tracking-wider font-sans">{item.value}</p>
            </div>
          ))}

          <div className="p-6">
            <Link
              href="/contact"
              className="block w-full text-center py-3 rounded-xl bg-[var(--color-teal-accent)] text-black font-bold text-sm uppercase tracking-widest hover:bg-[var(--color-teal-accent)]/90 transition-colors duration-300"
            >
              Start a similar project
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Back nav */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-colors text-sm font-sans uppercase tracking-widest"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          All Projects
        </Link>
      </motion.div>
    </div>
  );
}
