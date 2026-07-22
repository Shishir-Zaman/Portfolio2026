import { getCategories, getProjects, getPricingPackages, getServices, getBrandLogos } from "../../../lib/db";
import Link from "next/link";
import { Folder, Image as ImageIcon, Tag, Briefcase, Award, ArrowRight, LayoutDashboard } from "lucide-react";

export default async function AdminDashboard() {
  const [categories, projects, packages, services, brands] = await Promise.all([
    getCategories(),
    getProjects(),
    getPricingPackages(),
    getServices(),
    getBrandLogos(),
  ]);

  const stats = [
    {
      label: "Projects",
      value: projects.length,
      icon: ImageIcon,
      href: "/admin/projects",
      desc: "Total portfolio projects",
      color: "from-[var(--color-teal-accent)]/20 to-transparent",
      iconColor: "text-[var(--color-teal-accent)]",
      glowColor: "hover:shadow-[0_0_30px_rgba(0,245,255,0.08)]",
    },
    {
      label: "Categories",
      value: categories.length,
      icon: Folder,
      href: "/admin/categories",
      desc: "Project filter categories",
      color: "from-violet-500/10 to-transparent",
      iconColor: "text-violet-400",
      glowColor: "hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
    },
    {
      label: "Services",
      value: services.length,
      icon: Briefcase,
      href: "/admin/services",
      desc: "Service offerings",
      color: "from-blue-500/10 to-transparent",
      iconColor: "text-blue-400",
      glowColor: "hover:shadow-[0_0_30px_rgba(59,130,246,0.08)]",
    },
    {
      label: "Pricing Plans",
      value: packages.length,
      icon: Tag,
      href: "/admin/pricing",
      desc: "Active pricing packages",
      color: "from-amber-500/10 to-transparent",
      iconColor: "text-amber-400",
      glowColor: "hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",
    },
    {
      label: "Brand Logos",
      value: brands.length,
      icon: Award,
      href: "/admin/brands",
      desc: "Client brand carousel",
      color: "from-pink-500/10 to-transparent",
      iconColor: "text-pink-400",
      glowColor: "hover:shadow-[0_0_30px_rgba(236,72,153,0.08)]",
    },
  ];

  const quickLinks = [
    { label: "Edit Home Page", href: "/admin/home", icon: LayoutDashboard },
    { label: "Manage Projects", href: "/admin/projects", icon: ImageIcon },
    { label: "Update Pricing", href: "/admin/pricing", icon: Tag },
    { label: "Edit About & Contact", href: "/admin/about", icon: Folder },
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-10 font-sans">
      {/* Header */}
      <header>
        <p className="text-[var(--color-teal-accent)] text-xs uppercase tracking-[0.3em] font-bold mb-2">
          Admin Dashboard
        </p>
        <h1 className="text-2xl sm:text-3xl font-syncopate font-bold uppercase tracking-widest text-white mb-2">
          Overview
        </h1>
        <p className="text-white/40 text-sm">
          Welcome back. Manage your portfolio content, pricing, and settings from here.
        </p>
      </header>

      {/* Stats Grid */}
      <section>
        <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-4">
          Content Summary
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className={`group relative rounded-2xl p-5 bg-gradient-to-br ${stat.color} border border-white/[0.07] hover:border-white/20 transition-all duration-300 ${stat.glowColor} overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-9 h-9 rounded-xl bg-white/[0.06] flex items-center justify-center ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon size={18} />
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300" />
              </div>
              <p className="text-3xl sm:text-4xl font-syncopate font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-[11px] font-bold text-white/70 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-[10px] text-white/30 mt-0.5 hidden sm:block">
                {stat.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:border-[var(--color-teal-accent)]/40 hover:bg-[var(--color-teal-accent)]/[0.05] transition-all duration-300"
            >
              <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-white/40 group-hover:text-[var(--color-teal-accent)] transition-colors">
                <link.icon size={16} />
              </div>
              <span className="text-sm text-white/60 group-hover:text-white/90 transition-colors font-medium">
                {link.label}
              </span>
              <ArrowRight size={14} className="ml-auto text-white/20 group-hover:text-[var(--color-teal-accent)] group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      {projects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-bold">
              Recent Projects
            </h2>
            <Link href="/admin/projects" className="text-[10px] text-[var(--color-teal-accent)]/60 hover:text-[var(--color-teal-accent)] uppercase tracking-widest transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.slice(0, 6).map((project) => (
              <Link
                key={project.id}
                href={`/admin/projects`}
                className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/20 transition-all duration-200 overflow-hidden"
              >
                {project.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-12 h-12 rounded-lg object-cover shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
                    <ImageIcon size={18} className="text-white/20" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white/80 truncate uppercase tracking-wide">
                    {project.title}
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5 truncate">
                    {project.tags?.[0] ?? "—"}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
