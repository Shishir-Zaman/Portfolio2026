import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Shishir Zaman — a visual and brand identity designer from Dhaka, Bangladesh, crafting logos, packaging, and digital experiences for clients worldwide.",
  openGraph: {
    title: "About | Shishir Zaman",
    description:
      "Visual and brand identity designer from Dhaka, Bangladesh — crafting visual identities, packaging, and digital experiences for clients worldwide.",
    url: "https://shishirzaman.vercel.app/about",
  },
  alternates: {
    canonical: "https://shishirzaman.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
