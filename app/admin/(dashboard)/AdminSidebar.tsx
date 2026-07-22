"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, LogOut, Folder, Image as ImageIcon, Tag,
  Settings, Home, User, Briefcase, Menu, X, Award, ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

export default function AdminSidebar({ signOutAction }: { signOutAction: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeSidebar = () => setIsOpen(false);

  const navLinks = [
    { category: "Overview", links: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard }
    ]},
    { category: "Content", links: [
      { href: "/admin/home", label: "Home Page", icon: Home },
      { href: "/admin/about", label: "About & Contact", icon: User },
      { href: "/admin/services", label: "Services", icon: Briefcase }
    ]},
    { category: "Portfolio", links: [
      { href: "/admin/projects", label: "Projects", icon: ImageIcon },
      { href: "/admin/categories", label: "Categories", icon: Folder }
    ]},
    { category: "Sales", links: [
      { href: "/admin/pricing", label: "Pricing", icon: Tag },
      { href: "/admin/brands", label: "Brand Logos", icon: Award }
    ]},
    { category: "System", links: [
      { href: "/admin/settings", label: "Site Settings & SEO", icon: Settings }
    ]}
  ];

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#080808] border-b border-white/[0.08] sticky top-0 z-50">
        {/* Logo + Admin label */}
        <div className="flex items-center gap-3">
          <div className="text-[var(--color-teal-accent)]">
            <Logo className="w-8 h-8" />
          </div>
          <span className="text-sm font-syncopate font-bold tracking-widest uppercase text-white/80">
            Admin
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 rounded-xl hover:bg-white/10 transition-colors z-50"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar (Desktop fixed, Mobile overlay) */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.28 }}
            className="w-64 bg-[#080808] border-r border-white/[0.08] flex flex-col fixed inset-y-0 left-0 z-40 md:static md:translate-x-0"
          >
            {/* Sidebar Header — Desktop only */}
            <div className="hidden md:flex flex-col gap-0 p-5 border-b border-white/[0.06]">
              {/* Link back to main website */}
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group mb-4"
                title="View main website"
              >
                <div className="text-[var(--color-teal-accent)] drop-shadow-[0_0_8px_rgba(0,245,255,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(0,245,255,0.7)] transition-all duration-300">
                  <Logo className="w-9 h-9" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-syncopate font-bold tracking-widest uppercase text-white/90 group-hover:text-[var(--color-teal-accent)] transition-colors leading-none">
                    Shishir Zaman
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5 flex items-center gap-1">
                    View site <ExternalLink size={9} />
                  </p>
                </div>
              </Link>
              {/* Admin badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--color-teal-accent)]/10 border border-[var(--color-teal-accent)]/20 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-teal-accent)] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-teal-accent)]/80">
                  Content Manager
                </span>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] space-y-5">
              {navLinks.map((section, idx) => (
                <div key={idx}>
                  <div className="mb-2 text-[9px] font-bold tracking-[0.25em] text-white/25 uppercase px-3">
                    {section.category}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    {section.links.map((link) => {
                      const active = isActive(link.href);
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={closeSidebar}
                          className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium ${
                            active
                              ? "bg-[var(--color-teal-accent)]/[0.12] text-[var(--color-teal-accent)] shadow-[inset_0_0_0_1px_rgba(0,245,255,0.2)]"
                              : "text-white/50 hover:bg-white/[0.06] hover:text-white/90"
                          }`}
                        >
                          {/* Active indicator bar */}
                          {active && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[var(--color-teal-accent)] rounded-full shadow-[0_0_8px_rgba(0,245,255,0.8)]" />
                          )}
                          <link.icon
                            size={16}
                            className={active ? "text-[var(--color-teal-accent)]" : "text-white/30"}
                          />
                          <span className={active ? "font-semibold" : ""}>{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-3 border-t border-white/[0.06] space-y-1">
              {/* View Site link on mobile sidebar */}
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-white/[0.06] transition-colors text-white/40 hover:text-white/80 text-sm"
              >
                <ExternalLink size={16} />
                View Main Site
              </Link>
              <form action={signOutAction}>
                <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-white/40 text-left text-sm">
                  <LogOut size={16} />
                  Sign Out
                </button>
              </form>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Backdrop */}
      {isOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/70 z-30 md:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
