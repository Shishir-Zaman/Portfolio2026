"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Folder, Image as ImageIcon, Tag, Settings, Home, User, Briefcase, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      { href: "/admin/pricing", label: "Pricing", icon: Tag }
    ]},
    { category: "System", links: [
      { href: "/admin/settings", label: "Site Settings & SEO", icon: Settings }
    ]}
  ];

  return (
    <>
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0a0a0a] border-b border-white/10 sticky top-0 z-50">
        <h2 className="text-lg font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)]">
          Admin
        </h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 z-50">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar (Desktop fixed, Mobile absolute overlay) */}
      <AnimatePresence>
        {(isOpen || isDesktop) && (
          <motion.aside 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`
              w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col
              fixed inset-y-0 left-0 z-40 md:static md:translate-x-0
              ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="p-6 hidden md:block">
              <h2 className="text-xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)]">
                Admin
              </h2>
            </div>
            
            <nav className="flex-1 px-4 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {navLinks.map((section, idx) => (
                <div key={idx}>
                  <div className="mb-6 text-xs font-bold tracking-[0.2em] text-white/30 uppercase px-4">{section.category}</div>
                  <div className="flex flex-col gap-1 mb-6">
                    {section.links.map((link) => (
                      <Link 
                        key={link.href} 
                        href={link.href} 
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-colors text-sm ${
                          pathname === link.href 
                            ? "bg-white/10 text-white" 
                            : "hover:bg-white/5 text-white/70 hover:text-white"
                        }`}
                      >
                        <link.icon size={18} />
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-white/10">
              <form action={signOutAction}>
                <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors text-white/70 text-left">
                  <LogOut size={20} />
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
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}
    </>
  );
}
