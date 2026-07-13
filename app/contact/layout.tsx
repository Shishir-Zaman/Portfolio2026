import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Shishir Zaman to start a branding, packaging, or design project. Reach out via WhatsApp or email \u2014 typically replies within 24 hours.",
  openGraph: {
    title: "Contact | Shishir Zaman",
    description:
      "Start a branding, packaging, or design project with Shishir Zaman. WhatsApp or email \u2014 replies within 24 hours.",
    url: "https://shishirzaman.vercel.app/contact",
  },
  alternates: {
    canonical: "https://shishirzaman.vercel.app/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
