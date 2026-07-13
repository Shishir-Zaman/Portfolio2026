## [2026-07-13] Phase 1 — SEO Optimization

### What changed
- `app/layout.tsx`: Added `metadataBase`, title template (`%s | Shishir Zaman`), full Open Graph and Twitter Card defaults, `robots` directives, canonical URL, and `alternates`. Added JSON-LD `Person` + `ProfessionalService` schema in `<head>` (visible to all crawlers on every page).
- `app/projects/layout.tsx` (**NEW**): Route-level Server Component exporting unique metadata for `/projects`.
- `app/about/layout.tsx` (**NEW**): Unique metadata for `/about`.
- `app/services/layout.tsx` (**NEW**): Unique metadata for `/services`.
- `app/contact/layout.tsx` (**NEW**): Unique metadata for `/contact`.
- `app/projects/[slug]/page.tsx`: Converted from `"use client"` to a Server Component. Added `generateStaticParams()` (static generation of all project slugs) and `generateMetadata()` (per-project title, description, OG image = project cover, Twitter Card, canonical URL). Added `CreativeWork` JSON-LD per project page.
- `app/projects/[slug]/ProjectPageClient.tsx` (**NEW**): All the animated UI extracted into a client component (identical rendering, zero visual change).
- `app/sitemap.ts` (**NEW**): Auto-generates `/sitemap.xml` including all static pages + all project slugs. Self-updates on every deploy when `PROJECTS` data changes.
- `app/robots.ts` (**NEW**): Generates `/robots.txt` allowing all crawlers, pointing to sitemap, blocking `/admin/` from indexing.

### Why it changed
Per the upgrade prompt Phase 1 — improve organic search discovery for brand identity, logo design, packaging design, and visual designer searches in Bangladesh and globally.

### Manual steps required
1. **Create an OG default image**: Create a `1200×630` jpg at `public/og-default.jpg` — this is the fallback image shown in link previews on WhatsApp, Twitter, LinkedIn, etc. for pages that don't have a project cover. Suggest using your best project cover or a branded graphic with your name.
2. **Submit sitemap to Google Search Console**: See manual checklist below.
3. No new packages or environment variables required for this phase.

---

## [2026-07-13] Phase 2 — Performance & Image Loading

### What changed
- `next.config.ts`: Configured image optimization — AVIF + WebP output formats, `deviceSizes` and `imageSizes` arrays matched to the portfolio's 7xl container and 2-column grid, `remotePatterns` for Unsplash and Cloudinary domains.
- `app/projects/page.tsx`: Replaced raw `<img>` with `next/image` (`fill` layout, proper `sizes` attribute for 2-col grid, `priority={true}` on first card only, lazy loading on the rest, descriptive alt text).
- `app/projects/[slug]/ProjectPageClient.tsx`: Hero image and gallery images replaced with `next/image` (`fill`, `priority` on hero, `lazy` on gallery, descriptive alt text per image).

### Why it changed
Raw `<img>` tags bypass Next.js image optimization entirely — no AVIF/WebP conversion, no responsive srcsets, no lazy loading. Replacing with `next/image` eliminates layout shift (CLS), reduces bandwidth by ~30–70% via format negotiation, and improves LCP for the hero image.

### Manual steps required
- None. Changes take effect on next deploy.
- Run Lighthouse after deploying to compare scores.

---

## [2026-07-13] Phase 6 — Contact Enhancements

### What changed
- `app/contact/page.tsx`: Replaced the small text-based contact info list with two large, high-visibility CTA buttons: "Start a Project" (opens WhatsApp with a pre-filled message) and "Email Me" (opens default mail client).
- `app/contact/page.tsx`: Updated the contact form to point natively to a Formspree endpoint instead of manually opening WhatsApp/Email in JavaScript.

### Why it changed
To increase conversion rates by making the primary contact methods (WhatsApp and Email) large, unmistakable, and frictionless. The form is now truly a backup contact method that won't require a backend database to run.

### Manual steps required
- **Formspree Setup**: If you want the contact form to work, create a free account at [formspree.io](https://formspree.io), create a new form, and copy your unique Form ID. Open `app/contact/page.tsx` and replace `YOUR_FORM_ID` in the `<form action="...">` tag with your actual ID.

---

## [2026-07-13] Phase 4 — Cloudinary Image Hosting

### What changed
- `package.json`: Added `cloudinary` SDK dependency.
- `lib/cloudinary.ts`: Created server-side SDK client.
- `app/api/cloudinary/sign/route.ts`: Created signed upload API endpoint for the future Admin Dashboard.
- `lib/cloudinary-loader.ts`: Created custom next/image loader for Cloudinary.
- `next.config.ts`: Configured Next.js to use the custom Cloudinary loader.

### Why it changed
To enable a seamless, direct-to-CDN drag-and-drop upload experience in the admin dashboard (Phase 3). Using a custom image loader offloads image optimization from Vercel to Cloudinary's edge, preserving Vercel usage limits and enabling dynamic transformations on the fly.

### Manual steps required
- **Cloudinary Setup**:
  1. Create a free account at [cloudinary.com](https://cloudinary.com).
  2. Go to your Cloudinary Dashboard and find your "Cloud Name", "API Key", and "API Secret".
  3. In Vercel (or your local `.env.local`), add these environment variables:
     - `CLOUDINARY_CLOUD_NAME=your_cloud_name`
     - `CLOUDINARY_API_KEY=your_api_key`
     - `CLOUDINARY_API_SECRET=your_api_secret`
- **Important Note**: Until the environment variables are set and images are uploaded to Cloudinary, Next.js will fall back to returning original URLs for placeholder Unsplash images.
