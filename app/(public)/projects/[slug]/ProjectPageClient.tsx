"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { CMSProject } from "@/lib/db";
import PageBackground from "@/components/PageBackground";

export function ProjectPageClient({ project }: { project: CMSProject }) {
  return (
    <div className="min-h-screen pt-10 pb-20 flex flex-col gap-16 relative">
      <PageBackground />

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-foreground-muted text-sm font-sans"
      >
        <Link href="/projects" className="hover:text-foreground transition-colors">
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground uppercase tracking-wider">
          {project.title}
        </span>
      </motion.div>

      {/* Title + Tags */}
      <div className="flex flex-col gap-6">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-none text-foreground"
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
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-xs font-medium rounded-full bg-foreground/5 border border-foreground/10 text-[var(--color-teal-accent)] tracking-widest uppercase font-sans"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Hero Image */}
      <motion.div
        className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[2rem] overflow-hidden relative border border-border-color shadow-[0_0_60px_var(--color-border-color)]"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
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

          {project.description ? (
            <p className="text-lg text-foreground font-sans leading-relaxed">
              {project.description}
            </p>
          ) : (
            <p className="text-lg text-foreground-muted font-sans leading-relaxed italic">
              Project description coming soon — add a description field in the admin panel.
            </p>
          )}

          <p className="text-lg text-foreground font-sans leading-relaxed">
            Every element of this project was crafted with intention — from
            initial concept to final delivery. I applied a strategic design
            approach rooted in brand clarity, visual consistency, and audience
            resonance.
          </p>

          {/* Structured Case Study Gallery Groups */}
          {project.galleryGroups && project.galleryGroups.length > 0 && (
            <div className="flex flex-col gap-16 mt-8">
              {project.galleryGroups.map((group, i) => (
                <div key={i} className="flex flex-col gap-6">
                  {group.title && (
                    <h3 className="text-xl font-bold uppercase tracking-widest text-foreground border-b border-border-subtle pb-4">
                      {group.title}
                    </h3>
                  )}
                  {group.images.length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {group.images.map((src, j) => (
                        <div key={j} className="w-full rounded-[1.5rem] overflow-hidden border border-border-subtle shadow-[0_0_40px_var(--color-border-color)] bg-background-secondary relative">
                          <img
                            src={src}
                            alt={`${group.title} image ${j + 1}`}
                            loading="lazy"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 border border-dashed border-border-subtle rounded-2xl flex items-center justify-center text-foreground-muted text-sm italic font-sans">
                      Images for {group.title} will be added soon.
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Fallback Uncategorized Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (!project.galleryGroups || project.galleryGroups.length === 0) && (
            <div className="flex flex-col gap-6 mt-8">
              {project.gallery.map((src, i) => (
                <div
                  key={i}
                  className="w-full rounded-[1.5rem] overflow-hidden border border-border-subtle shadow-[0_0_40px_var(--color-border-color)] bg-background-secondary relative"
                >
                  <img
                    src={src}
                    alt={`${project.title} — detail image ${i + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Side Info Panel */}
        <motion.div
          className="md:col-span-4 flex flex-col gap-0 rounded-[2rem] bg-glass-bg backdrop-blur-md border border-glass-border overflow-hidden h-fit"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { label: "Client", value: project.client || "Confidential" },
            { label: "Role", value: "Visual Designer" },
            { label: "Deliverables", value: project.tags.join(", ") },
            { label: "Year", value: project.year ?? "2024" },
          ].map((item, i) => (
            <div key={i} className="p-6 border-b border-border-color last:border-0">
              <h3 className="text-foreground-muted text-xs font-sans uppercase tracking-[0.2em] mb-2">
                {item.label}
              </h3>
              <p className="text-foreground font-medium text-sm uppercase tracking-wider font-sans">
                {item.value}
              </p>
            </div>
          ))}

          {/* Social / Web Links */}
          {(project.websiteUrl || project.instagramHandle || project.facebookUrl) && (
            <div className="p-6 border-b border-border-color flex flex-col gap-3">
              <h3 className="text-foreground-muted text-xs font-sans uppercase tracking-[0.2em] mb-1">
                Client Links
              </h3>
              {project.websiteUrl && (
                <a href={project.websiteUrl} target="_blank" rel="noreferrer" className="text-[var(--color-teal-accent)] text-sm font-bold uppercase tracking-widest hover:underline">
                  Visit Website ↗
                </a>
              )}
              {project.instagramHandle && (
                <a href={`https://instagram.com/${project.instagramHandle.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-foreground text-sm font-bold uppercase tracking-widest hover:text-[var(--color-teal-accent)] transition-colors">
                  IG: {project.instagramHandle}
                </a>
              )}
              {project.facebookUrl && (
                <a href={project.facebookUrl} target="_blank" rel="noreferrer" className="text-foreground text-sm font-bold uppercase tracking-widest hover:text-[var(--color-teal-accent)] transition-colors">
                  Facebook ↗
                </a>
              )}
            </div>
          )}

          <div className="p-6">
            <Link
              href="/contact"
              className="block w-full text-center py-3 rounded-xl bg-[var(--color-teal-accent)] text-white dark:text-black font-bold text-sm uppercase tracking-widest hover:bg-[var(--color-teal-accent)]/90 transition-colors duration-300"
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
          className="inline-flex items-center gap-3 text-foreground-muted hover:text-foreground transition-colors text-sm font-sans uppercase tracking-widest"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          All Projects
        </Link>
      </motion.div>
    </div>
  );
}
