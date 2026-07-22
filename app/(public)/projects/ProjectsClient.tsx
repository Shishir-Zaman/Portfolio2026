"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CMSProject, CMSCategory } from "@/../lib/db";
import PageBackground from "@/components/PageBackground";

export default function ProjectsClient({ projects, categories }: { projects: CMSProject[], categories: CMSCategory[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.tags.includes(categories.find(c => c.id === activeCategory)?.name ?? ""));

  return (
    <div className="flex flex-col items-center pt-10 relative">
      <PageBackground />
      <motion.div 
        className="text-center mb-16 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-foreground-muted tracking-widest text-xs md:text-sm mb-4 uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">Projects</span></p>
        <h1 className="text-5xl md:text-7xl font-syncopate font-bold uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/90 to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">My Projects</h1>
        <p className="text-foreground-muted max-w-2xl mx-auto text-sm md:text-base font-sans leading-relaxed mb-12 px-4 md:px-0">
          A curated collection of visual identities, packaging systems, and digital experiences. Each project is a blend of strategic thinking and refined aesthetic execution.
        </p>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full transition-all duration-400 border text-[13px] font-sans backdrop-blur-xl ${
                activeCategory === cat.id
                  ? "bg-foreground text-background border-foreground shadow-[0_0_20px_var(--color-teal-accent-faint)]" 
                  : "bg-foreground/5 text-foreground/50 border-foreground/10 hover:border-foreground/30 hover:text-foreground hover:bg-foreground/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="w-full flex items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-syncopate font-bold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-foreground to-[var(--color-teal-accent)] drop-shadow-[0_0_10px_rgba(0,245,255,0.1)]">{activeCategory === "all" ? "All Work" : categories.find(c => c.id === activeCategory)?.name}</h2>
        <div className="w-2 h-2 rounded-full bg-[var(--color-teal-accent)] animate-pulse" />
        <span className="text-foreground-muted text-sm font-sans">{filteredProjects.length} projects</span>
      </div>

      <motion.div layout className="columns-1 md:columns-2 gap-6 lg:gap-8 w-full space-y-6 lg:space-y-8">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="break-inside-avoid">
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: CMSProject, index: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }}>
      <Link href={`/projects/${project.id}`} className="group block relative cursor-none transition-transform duration-500 hover:scale-[1.015]">
        {/* Teal glow behind card */}
        <div className="absolute -inset-4 bg-[var(--color-teal-accent)]/0 group-hover:bg-[var(--color-teal-accent)]/15 rounded-[3rem] blur-3xl transition-all duration-700 pointer-events-none -z-10" />

        {/* Card image */}
        <div className="relative rounded-2xl overflow-hidden border border-border-subtle shadow-[0_4px_40px_var(--color-border-color)]">
          <img
            src={project.image || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2340"}
            alt={`${project.title} — ${project.tags[0]} project by Shishir Zaman`}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading={index === 0 ? "eager" : "lazy"}
          />
          {/* Inner black gradient - keep it dark so white text remains readable over images */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
            <h3 className="text-lg md:text-xl font-syncopate font-bold uppercase tracking-tight text-white mb-1 leading-tight">{project.title}</h3>
            {/* Show category/tags if needed, or year as requested by UI */}
            <span className="text-white/80 text-xs font-sans uppercase tracking-widest">{project.tags[0]} DESIGN</span>
          </div>
        </div>

        {/* Tags — below the card */}
        <div className="flex flex-wrap gap-2 mt-4 px-1">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 text-[11px] font-medium rounded-md bg-foreground/5 border border-foreground/10 text-foreground-muted uppercase tracking-widest font-sans transition-colors hover:text-foreground hover:bg-foreground/10">{tag}</span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
