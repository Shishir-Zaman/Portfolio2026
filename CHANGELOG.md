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

## [2026-07-13] Phase 5 — Dynamic Pricing Page

### What changed
- `app/data/content.ts`: Added `PricingPackage` type and `PRICING_PACKAGES` fallback data with BDT prices.
- `lib/db.ts`: Added `getPricingPackages` and `savePricingPackages` connecting to Upstash Redis.
- `app/api/pricing/route.ts` **[NEW]**: API route to get/save pricing packages, protected by auth.
- `app/admin/(dashboard)/pricing/page.tsx` **[NEW]**: Admin page for managing pricing.
- `app/admin/(dashboard)/pricing/PricingClient.tsx` **[NEW]**: Client UI allowing dynamic add/edit/reorder/delete of plans and features.
- `app/components/Navbar.tsx`: Added "Pricing" to the public navigation.
- `app/pricing/layout.tsx` **[NEW]**: SEO metadata for the public Pricing page.
- `app/pricing/page.tsx` **[NEW]**: Server component fetching pricing from Redis.
- `app/pricing/PricingClientUI.tsx` **[NEW]**: Client component mapping the data into glassmorphism cards with Framer Motion animations and "Best Value" highlighting.

### Manual steps required
- None. Navigate to `/admin/pricing` to edit plans live.

---

## [2026-07-13] Phase 3 — Admin Dashboard CMS

### What changed
- `package.json`: Added `next-auth@5.0.0-beta.20`, `bcryptjs`, `@types/bcryptjs`, `@upstash/redis`, `react-dropzone`, `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`.
- `auth.config.ts` **[NEW]**: Edge-safe NextAuth v5 config (no Node.js deps). Used by middleware.
- `auth.ts` **[NEW]**: Full NextAuth v5 config with bcrypt credential provider. Used by API routes and Server Components only.
- `middleware.ts` **[NEW]**: Protects all `/admin/*` routes. Imports only from `auth.config.ts` to stay Edge-compatible.
- `app/api/auth/[...nextauth]/route.ts` **[NEW]**: NextAuth handler route.
- `app/api/categories/route.ts` **[NEW]**: GET/POST API for categories with auth guard and `revalidatePath()`.
- `app/api/projects/route.ts` **[NEW]**: GET/POST API for projects with auth guard and `revalidatePath()`.
- `app/api/cloudinary/sign/route.ts` **[NEW]**: Returns a signed Cloudinary upload signature + apiKey + cloudName (no public env vars needed).
- `lib/db.ts` **[NEW]**: Upstash Redis data layer with fallback to hardcoded `content.ts` data when Redis is unconfigured.
- `app/admin/login/page.tsx` **[NEW]**: Branded login page with password field.
- `app/admin/(dashboard)/layout.tsx` **[NEW]**: Full-screen admin shell with sidebar nav and sign-out server action.
- `app/admin/(dashboard)/page.tsx` **[NEW]**: Dashboard overview showing project/category counts.
- `app/admin/(dashboard)/categories/page.tsx` **[NEW]**: Categories management page.
- `app/admin/(dashboard)/categories/CategoriesClient.tsx` **[NEW]**: Client component — add, edit, reorder, delete categories.
- `app/admin/(dashboard)/projects/page.tsx` **[NEW]**: Projects management page.
- `app/admin/(dashboard)/projects/ProjectsClient.tsx` **[NEW]**: Client component — grid view, edit modal, reorder, delete projects.
- `app/admin/(dashboard)/projects/CloudinaryUpload.tsx` **[NEW]**: Drag-and-drop image uploader using signed Cloudinary requests.
- `app/data/content.ts`: Added exported `Category` and `Project` TypeScript types. Updated `PROJECT_CATEGORIES` from `string[]` to `Category[]` (object array with `id` and `name`).
- `app/projects/page.tsx`: Updated category filter to use the new `Category` object shape.
- `next.config.ts`: Removed broken `loader: "custom"` — was causing all images to fail. Cloudinary URLs are self-optimising via `f_auto/q_auto` in the URL.
- `.env.local` **[NEW]**: Local dev environment template with all required variable keys.

### Manual steps required
1. **Generate admin password hash** — see setup guide below.
2. **Add env vars to Vercel** — `AUTH_SECRET`, `ADMIN_PASSWORD_HASH`, `CLOUDINARY_*`, `UPSTASH_REDIS_REST_*`.
3. Run `npm install` in the project root to install new packages.
4. Deploy to Vercel — all admin routes at `/admin` are live and protected.

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
