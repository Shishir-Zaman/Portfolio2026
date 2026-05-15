"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import Logo from "./Logo";
import { PERSONAL_INFO } from "../data/content";

const navLinks = [
  { name: "Projects", path: "/projects" },
  { name: "Services", path: "/services" },
  { name: "About",    path: "/about" },
  { name: "Contact",  path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Nav remains sticky without hiding
  useMotionValueEvent(scrollY, "change", (latest) => {
    // We intentionally removed the hiding logic based on user request.
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[60]"
      >
        {/* ── DESKTOP NAVBAR (Expanded) ────────────────────── */}
        <div className="hidden md:flex max-w-[1560px] mx-auto items-center h-[100px] px-8 lg:px-16 xl:px-20 pt-6">
          {/* Column 1: Logo - Takes equal space to balance CTA */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="group flex items-center justify-center" aria-label="Home">
              <div className="text-white transition-all duration-500 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_22px_rgba(255,255,255,0.7)]">
                <Logo className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px]" />
              </div>
            </Link>
          </div>

          {/* Column 2: Nav pill — ABSOLUTE CENTERED */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <nav className="flex items-center rounded-full py-2 px-3 bg-[#0a0a0a]/50 backdrop-blur-3xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
              {navLinks.map((link) => {
                const isActive = pathname === link.path || (link.path === "/projects" && pathname.startsWith("/projects"));
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`relative px-5 lg:px-9 py-3.5 text-[14px] lg:text-[16px] font-medium rounded-full tracking-wide transition-all duration-300 whitespace-nowrap ${
                      isActive 
                        ? "text-white bg-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" 
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Column 3: CTA - Takes equal space to balance Logo */}
          <div className="flex-1 hidden lg:flex items-center justify-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 xl:px-10 py-[14px] xl:py-[16px] rounded-full text-[14px] xl:text-[16px] font-medium tracking-wide bg-white/[0.08] backdrop-blur-3xl border border-white/[0.2] shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] text-white hover:bg-[var(--color-teal-accent)]/[0.15] hover:border-[var(--color-teal-accent)]/50 hover:text-[var(--color-teal-accent)] hover:shadow-[0_0_30px_rgba(0,245,255,0.3),inset_0_1px_0_rgba(0,245,255,0.2)] transition-all duration-400 ease-out hover:scale-105 whitespace-nowrap"
            >
              Start a project
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── MOBILE NAVBAR (Larger pill) ─────────── */}
        <div className="md:hidden flex justify-center pt-5 px-4 pointer-events-none">
          <div className="pointer-events-auto flex items-center justify-between w-full max-w-[440px] h-[68px] px-6 bg-[#080808]/90 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            <Link href="/" className="text-white hover:text-[var(--color-teal-accent)] transition-colors" onClick={() => setIsMenuOpen(false)}>
              <Logo className="w-10 h-10" />
            </Link>
            
            <span className="text-white/30 text-sm tracking-[0.25em] uppercase font-sans hidden xs:block">
              Menu
            </span>

            <button
              aria-label="Toggle menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col items-end gap-[6px] w-10 h-10 justify-center relative z-[70] cursor-pointer"
            >
              <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "w-7 rotate-45 translate-y-[8px]" : "w-5"}`} />
              <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "w-0 opacity-0" : "w-7"}`} />
              <span className={`h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "w-7 -rotate-45 -translate-y-[8px]" : "w-4"}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU OVERLAY ──────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] bg-black/90 flex flex-col items-center justify-center pt-20 px-6"
          >
            <nav className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-4xl font-syne font-bold uppercase tracking-widest text-white/80 hover:text-[var(--color-teal-accent)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-teal-accent)] text-black font-bold uppercase tracking-widest text-sm hover:bg-white hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all"
                >
                  Start a project
                </Link>
              </motion.div>

              {/* Social Links in Mobile Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.1 }}
                className="mt-12 flex flex-wrap justify-center gap-6"
              >
                {PERSONAL_INFO.socials.map((social) => (
                  <Link
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 transition-all active:scale-95"
                    title={social.label}
                  >
                    <div 
                      className="w-5 h-5 flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: social.iconSvg.replace(/width=".*?"/g, 'width="100%"').replace(/height=".*?"/g, 'height="100%"') }}
                    />
                  </Link>
                ))}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
