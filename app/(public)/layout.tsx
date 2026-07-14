import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Sidebar />
      
      <main className="relative z-10 w-full min-h-screen pt-[90px] px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Footer />
      </div>
      <SpeedInsights />
    </>
  );
}
