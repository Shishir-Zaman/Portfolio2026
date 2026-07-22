import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse the complete portfolio of Shishir Zaman. Brand identity systems, logo design, packaging, social media, and motion graphics projects from Dhaka, Bangladesh.",
  openGraph: {
    title: "Projects | Shishir Zaman",
    description:
      "A curated collection of visual identities, packaging systems, and digital experiences by Shishir Zaman.",
    url: "https://shishirzaman.vercel.app/projects",
  },
  alternates: {
    canonical: "https://shishirzaman.vercel.app/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
