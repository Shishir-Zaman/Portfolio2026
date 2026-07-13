import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design services by Shishir Zaman: brand identity, logo design, packaging, social media design, motion graphics, and video editing — based in Bangladesh, serving clients globally.",
  openGraph: {
    title: "Services | Shishir Zaman",
    description:
      "Brand identity, packaging, social media design, motion graphics and video editing by Shishir Zaman \u2014 Bangladesh-based, working worldwide.",
    url: "https://shishirzaman.vercel.app/services",
  },
  alternates: {
    canonical: "https://shishirzaman.vercel.app/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
