import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, LogOut, Folder, Image as ImageIcon, Tag, Settings } from "lucide-react";

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
        
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white">
            <Folder size={20} />
            Categories
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white">
            <ImageIcon size={20} />
            Projects
          </Link>
          <Link href="/admin/pricing" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white">
            <Tag size={20} />
            Pricing
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-white/70 hover:text-white">
            <Settings size={20} />
            Settings
          </Link>
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
