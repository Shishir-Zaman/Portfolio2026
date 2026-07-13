import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Output formats: prefer AVIF (smallest), fall back to WebP
    formats: ["image/avif", "image/webp"],

    // Device widths matching the portfolio layout:
    // max-w-7xl (1280px) container, 2-col grid at md (768px)
    deviceSizes: [640, 768, 1024, 1280, 1536],

    // Image sizes for fill/responsive images inside grid columns
    imageSizes: [64, 128, 256, 384, 512, 640],

    // Allow images from these external domains
    remotePatterns: [
      {
        // Unsplash — used in placeholder project images
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Cloudinary — used for profile image + project uploads
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // NOTE: No custom loader — Cloudinary URLs already use f_auto/q_auto
    // transforms embedded in the URL by the upload component itself.
  },
};

export default nextConfig;

