import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Folder, Image as ImageIcon, Tag, Settings, Home, User, Briefcase } from "lucide-react";

export const metadata = {
  title: "Admin Dashboard | Shishir Zaman",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0a] border-r border-white/10 flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-[var(--color-teal-accent)]">
            Admin
          </h2>
        </div>
        
        <nav className="flex-1 px-4 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="mb-6 text-xs font-bold tracking-[0.2em] text-white/30 uppercase px-4">Overview</div>
          <div className="flex flex-col gap-1 mb-6">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          </div>

          <div className="mb-6 text-xs font-bold tracking-[0.2em] text-white/30 uppercase px-4">Content</div>
          <div className="flex flex-col gap-1 mb-6">
            <Link href="/admin/home" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <Home size={18} />
              Home Page
            </Link>
            <Link href="/admin/about" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <User size={18} />
              About & Contact
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <Briefcase size={18} />
              Services
            </Link>
          </div>

          <div className="mb-6 text-xs font-bold tracking-[0.2em] text-white/30 uppercase px-4">Portfolio</div>
          <div className="flex flex-col gap-1 mb-6">
            <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <ImageIcon size={18} />
              Projects
            </Link>
            <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <Folder size={18} />
              Categories
            </Link>
          </div>

          <div className="mb-6 text-xs font-bold tracking-[0.2em] text-white/30 uppercase px-4">Sales</div>
          <div className="flex flex-col gap-1 mb-6">
            <Link href="/admin/pricing" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <Tag size={18} />
              Pricing
            </Link>
          </div>

          <div className="mb-6 text-xs font-bold tracking-[0.2em] text-white/30 uppercase px-4">System</div>
          <div className="flex flex-col gap-1 mb-6">
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white text-sm">
              <Settings size={18} />
              Site Settings & SEO
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10">
          <form
            action={async () => {
              "use server";
              const { signOut } = await import("../../../auth");
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-colors text-white/70 text-left">
              <LogOut size={20} />
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black p-8 md:p-12">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
