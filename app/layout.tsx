import type { Metadata } from "next";
import { Inter, Syne, Syncopate } from "next/font/google";
import "./globals.css";

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

const BASE_URL = "https://shishirzaman.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Shishir Zaman | Visual & Brand Designer",
    template: "%s | Shishir Zaman",
  },
  description:
    "Portfolio of Shishir Zaman — Brand Identity, Packaging, Social Media & Motion Designer based in Dhaka, Bangladesh. Available worldwide.",
  keywords: [
    "graphic designer Bangladesh",
    "brand identity designer Dhaka",
    "logo designer Bangladesh",
    "packaging design",
    "social media design",
    "motion graphics",
    "visual designer",
    "brand designer Dhaka",
  ],
  authors: [{ name: "Shishir Zaman", url: BASE_URL }],
  creator: "Shishir Zaman",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Shishir Zaman — Visual & Brand Designer",
    title: "Shishir Zaman | Visual & Brand Designer",
    description:
      "Brand identity, packaging, social media & motion design by Shishir Zaman — based in Dhaka, Bangladesh, working worldwide.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Shishir Zaman — Visual & Brand Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shishir Zaman | Visual & Brand Designer",
    description:
      "Brand identity, packaging, social media & motion design by Shishir Zaman — based in Dhaka, Bangladesh, working worldwide.",
    images: ["/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${BASE_URL}/#person`,
        name: "Shishir Zaman",
        url: BASE_URL,
        jobTitle: "Visual & Brand Designer",
        description:
          "Brand identity, packaging, social media & motion designer based in Dhaka, Bangladesh, working with clients worldwide.",
        image: "https://res.cloudinary.com/dw10neaqr/image/upload/q_auto/f_auto/v1778827490/488040104_18497993173009231_5541388673102813421_n_g73g8w.jpg",
        email: "asif.zaman539070@gmail.com",
        telephone: "+8801869511046",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
        sameAs: [
          "https://www.behance.net/asifzaman51905",
          "https://www.instagram.com/shishir_z/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+8801869511046",
          contactType: "customer service",
          availableLanguage: ["English", "Bengali"],
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${BASE_URL}/#service`,
        name: "Shishir Zaman Design Studio",
        url: BASE_URL,
        image: `${BASE_URL}/og-default.jpg`,
        description:
          "Professional brand identity, packaging, social media and motion design services based in Dhaka, Bangladesh.",
        priceRange: "৳৳",
        areaServed: "Worldwide",
        serviceType: [
          "Brand Identity Design",
          "Logo Design",
          "Packaging Design",
          "Social Media Design",
          "Motion Graphics",
        ],
        founder: { "@id": `${BASE_URL}/#person` },
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${syne.variable} ${syncopate.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
