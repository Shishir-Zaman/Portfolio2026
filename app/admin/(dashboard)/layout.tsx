import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | Shishir Zaman",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  const signOutAction = async () => {
    "use server";
    const { signOut } = await import("../../../auth");
    await signOut({ redirectTo: "/admin/login" });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col md:flex-row overflow-hidden font-sans">
      <AdminSidebar signOutAction={signOutAction} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-black p-4 md:p-8 lg:p-12 relative z-0">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
