"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PricingPackage, Project } from "../data/content";

export default function PricingClientUI({ packages, projects }: { packages: PricingPackage[], projects?: Project[] }) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 70, damping: 15 } }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 xl:px-12 pb-24">
      <motion.div 
        className="text-center mb-16 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-white/50 tracking-widest text-xs md:text-sm mb-4 uppercase">Home &gt; <span className="text-[var(--color-teal-accent)]">Pricing</span></p>
        <h1 className="text-5xl md:text-7xl font-syncopate font-bold uppercase mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-[var(--color-teal-accent)] drop-shadow-[0_0_15px_rgba(0,245,255,0.15)]">Investment</h1>
        <p className="text-white/60 max-w-2xl mx-auto text-sm md:text-base font-sans leading-relaxed">
          Transparent pricing for high-quality design work. Whether you are a startup needing a visual mark, or an established brand looking for a full takeover, there is a package for you.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
      >
        {packages.map((pkg) => (
          <motion.div key={pkg.id} variants={item} className="h-full">
            <div className={`relative h-full flex flex-col rounded-3xl p-8 lg:p-10 transition-all duration-500 backdrop-blur-3xl ${
              pkg.isPopular 
                ? "bg-[var(--color-teal-accent)]/5 border border-[var(--color-teal-accent)]/50 shadow-[0_0_40px_rgba(0,245,255,0.15),inset_0_1px_0_rgba(255,255,255,0.2)] md:-translate-y-4" 
                : "bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05]"
            }`}>
              
              {pkg.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[var(--color-teal-accent)] text-black text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(0,245,255,0.4)]">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-xl md:text-2xl font-syncopate font-bold text-white uppercase tracking-wide mb-2">{pkg.name}</h3>
                <p className="text-white/50 text-sm font-sans h-10">{pkg.target}</p>
              </div>

              <div className="mb-8">
                <div className="text-4xl md:text-5xl font-syncopate font-bold text-white tracking-tighter">
                  {pkg.price}
                </div>
                <div className="text-[var(--color-teal-accent)] text-xs uppercase tracking-widest mt-2 font-bold">BDT</div>
              </div>

              <div className="flex-1">
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80 font-sans">
                      <div className={`mt-0.5 rounded-full p-0.5 ${pkg.isPopular ? 'bg-[var(--color-teal-accent)] text-black' : 'bg-white/10 text-white'}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {pkg.exampleProjects && pkg.exampleProjects.length > 0 && projects && (
                  <div className="mb-8 pt-6 border-t border-white/10">
                    <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4 font-bold">Example Projects</h4>
                    <div className="flex flex-col gap-3">
                      {pkg.exampleProjects.map(id => {
                        const project = projects.find(p => p.id === id);
                        if (!project) return null;
                        return (
                          <Link key={id} href={`/projects/${project.id}`} className="group flex items-center gap-3 p-2 -m-2 rounded-xl hover:bg-white/5 transition-colors">
                            <div className="w-12 h-12 rounded-lg bg-black/50 overflow-hidden shrink-0 border border-white/10 group-hover:border-[var(--color-teal-accent)]/50 transition-colors">
                              {project.image ? (
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-white/5" />
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold text-white group-hover:text-[var(--color-teal-accent)] transition-colors line-clamp-1">{project.title}</div>
                              <div className="text-[10px] text-white/50 uppercase tracking-wider">{project.tags[0] || "Project"}</div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                href={`/contact?package=${pkg.id}`}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  pkg.isPopular
                    ? "bg-[var(--color-teal-accent)] text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                    : "bg-white/10 text-white hover:bg-white hover:text-black"
                }`}
              >
                Select Plan
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
