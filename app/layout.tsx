import type { Metadata } from "next";
import { Inter, Syne, Syncopate } from "next/font/google";
import "./globals.css";
import { getSeoSettings } from "../lib/db";
import Script from "next/script";

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
    "Portfolio of Shishir Zaman. Brand Identity, Packaging, Social Media and Motion Designer based in Dhaka, Bangladesh. Available worldwide.",
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
    siteName: "Shishir Zaman. Visual and Brand Designer",
    title: "Shishir Zaman | Visual and Brand Designer",
    description:
      "Brand identity, packaging, social media and motion design by Shishir Zaman. Based in Dhaka, Bangladesh, working worldwide.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Shishir Zaman | Visual and Brand Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shishir Zaman | Visual and Brand Designer",
    description:
      "Brand identity, packaging, social media and motion design by Shishir Zaman. Based in Dhaka, Bangladesh, working worldwide.",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seoSettings = await getSeoSettings();
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
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Tag Manager */}
        {seoSettings.gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${seoSettings.gtmId}');`,
            }}
          />
        )}
        {/* Google Analytics (GA4) — only if no GTM */}
        {seoSettings.gaId && !seoSettings.gtmId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${seoSettings.gaId}`}
              strategy="afterInteractive"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${seoSettings.gaId}');`,
              }}
            />
          </>
        )}
        {/* Facebook Pixel */}
        {seoSettings.fbPixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${seoSettings.fbPixelId}');fbq('track','PageView');`,
            }}
          />
        )}
        {/* Custom head scripts */}
        {seoSettings.customHeadScripts && (
          <div dangerouslySetInnerHTML={{ __html: seoSettings.customHeadScripts }} />
        )}
      </head>
      <body
        className={`${inter.variable} ${syne.variable} ${syncopate.variable} antialiased`}
      >
        {/* GTM noscript fallback */}
        {seoSettings.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${seoSettings.gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
