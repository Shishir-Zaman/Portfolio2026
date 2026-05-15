import type { Metadata } from "next";
import { Inter, Syne, Syncopate } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shishir Zaman | Visual & Brand Designer",
  description: "Portfolio of Shishir Zaman — Graphics, Brand Identity, Packaging, Social Media & Motion Designer based in Bangladesh.",
  keywords: ["graphic designer", "brand identity", "packaging design", "social media design", "motion graphics", "visual designer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${syne.variable} ${syncopate.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
