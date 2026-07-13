import { getCategories, getProjects } from "../../../lib/db";
import Link from "next/link";
import { Folder, Image as ImageIcon } from "lucide-react";

export default async function AdminDashboard() {
  const categories = await getCategories();
  const projects = await getProjects();

  return (
    <div className="flex flex-col gap-8 font-sans">
      <header>
        <h1 className="text-3xl font-bold font-syncopate uppercase tracking-widest mb-2">Overview</h1>
        <p className="text-white/50">Welcome to your portfolio content management system.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/projects" className="glass p-8 rounded-3xl border border-white/10 hover:border-[var(--color-teal-accent)]/50 transition-colors group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-teal-accent)]/10 flex items-center justify-center">
              <ImageIcon className="text-[var(--color-teal-accent)]" size={24} />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest group-hover:text-[var(--color-teal-accent)] transition-colors">Projects</h2>
          </div>
          <p className="text-4xl font-bold font-syncopate">{projects.length}</p>
          <p className="text-white/50 mt-2 text-sm uppercase tracking-widest">Total Projects</p>
        </Link>

        <Link href="/admin/categories" className="glass p-8 rounded-3xl border border-white/10 hover:border-[var(--color-teal-accent)]/50 transition-colors group">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-teal-accent)]/10 flex items-center justify-center">
              <Folder className="text-[var(--color-teal-accent)]" size={24} />
            </div>
            <h2 className="text-2xl font-bold uppercase tracking-widest group-hover:text-[var(--color-teal-accent)] transition-colors">Categories</h2>
          </div>
          <p className="text-4xl font-bold font-syncopate">{categories.length}</p>
          <p className="text-white/50 mt-2 text-sm uppercase tracking-widest">Total Categories</p>
        </Link>
      </div>
    </div>
  );
}
