"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PROJECTS, PROJECT_CATEGORIES } from "../data/content";
import PageBackground from "../components/PageBackground";


export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(activeCategory));

  return (
    <div className="flex flex-col items-center pt-10 relative">
      <PageBackground />
      <motion.div 
        className="text-center mb-16 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/50 tracking-widest text-sm mb-4 uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">Projects</span></p>
        <h1 className="text-5xl md:text-7xl font-syncopate font-bold uppercase mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">My Projects</h1>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full transition-all duration-300 border text-sm font-sans ${
                activeCategory === cat 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-white/60 border-white/15 hover:border-white/40 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="w-full flex items-center gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-syncopate font-bold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)] drop-shadow-[0_0_10px_rgba(0,245,255,0.1)]">{activeCategory === "All" ? "All Work" : activeCategory}</h2>
        <div className="w-2 h-2 rounded-full bg-[var(--color-teal-accent)] animate-pulse" />
        <span className="text-white/40 text-sm font-sans">{filteredProjects.length} projects</span>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0], index: number }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }}>
      <Link href={`/projects/${project.id}`} className="group block relative cursor-none">
        {/* Teal glow behind card */}
        <div className="absolute -inset-3 bg-[var(--color-teal-accent)]/0 group-hover:bg-[var(--color-teal-accent)]/8 rounded-[2.5rem] blur-2xl transition-all duration-700 pointer-events-none -z-10" />

        {/* Card image */}
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/[0.07] shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
          {/* Inner black gradient */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
            <h3 className="text-lg md:text-xl font-syncopate font-bold uppercase tracking-tight text-white mb-1 leading-tight">{project.title}</h3>
            {/* Show category/tags if needed, or year as requested by UI */}
            <span className="text-white/60 text-xs font-sans uppercase tracking-widest">{project.tags[0]} DESIGN</span>
          </div>
        </div>

        {/* Tags — below the card */}
        <div className="flex flex-wrap gap-2 mt-4 px-1">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-1.5 text-[11px] font-medium rounded-md bg-white/[0.03] border border-white/[0.06] text-white/50 uppercase tracking-widest font-sans transition-colors hover:text-white hover:bg-white/[0.06]">{tag}</span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
