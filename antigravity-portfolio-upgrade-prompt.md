# Portfolio Website Upgrade — Master Prompt for Antigravity

**Project:** shishirzaman.vercel.app (Next.js, deployed on Vercel)
**Owner:** Shishir Zaman — Visual & Brand Designer, based in Bangladesh
**Goal of this document:** Feed this whole file (or section by section) into Antigravity as instructions. It's organized into phases so you can do them one at a time and actually understand what changed at each step.

---

## 0. GROUND RULES FOR THE AI AGENT (paste this first, always)

```
You are working on my Next.js portfolio site deployed on Vercel. Before making any
change:
1. Explain in plain English what you're about to do and why, BEFORE writing code.
2. After making a change, write a short changelog entry in a file called
   CHANGELOG.md at the project root, in this format:
   ## [YYYY-MM-DD] Short title
   - What changed
   - Why it changed
   - Any new environment variables, packages, or manual steps I need to take
3. Never delete or overwrite existing project data/images without asking first.
4. Keep changes in small, isolated commits/PRs — one feature per commit — so I can
   review and roll back easily.
5. After each phase, give me a short "What you need to do manually" checklist
   (e.g. env vars to add in Vercel dashboard, accounts to create, DNS changes).
6. Do not introduce a new database, framework, or hosting provider without
   explaining the trade-off first — I want to approve major architecture decisions.
```

Keep `CHANGELOG.md` forever. It becomes your record of "what changed and why" so you're never lost when you come back to the project in three months.

---

## 1. SEO OPTIMIZATION

```
Audit and fix SEO across the entire Next.js site:

1. Replace the single global meta title/description with per-page metadata using
   Next.js's generateMetadata() (App Router) or Head (Pages Router — tell me which
   one this project uses first).
   - Home: focus keywords — brand identity designer Bangladesh, logo designer,
     packaging design, visual designer Dhaka.
   - /projects: dynamic per-category description.
   - /projects/[slug]: unique title + description per project, pulled from that
     project's data (e.g. "TECH-O CRM Branding — Brand Identity Case Study by
     Shishir Zaman").
   - /services, /about, /contact: unique, keyword-relevant descriptions.

2. Add Open Graph and Twitter Card meta tags site-wide, with a unique OG image per
   project (use the project's cover image). Add a fallback default OG image for
   pages without one.

3. Generate a sitemap.xml automatically (next-sitemap or Next.js's built-in
   app/sitemap.ts) that includes all static pages and all dynamic project pages,
   and rebuilds automatically when a new project is added.

4. Add a robots.txt allowing all crawlers and pointing to the sitemap.

5. Add JSON-LD structured data:
   - Person / ProfessionalService schema on the homepage (name, job title,
     location: Bangladesh, sameAs: [social links]).
   - CreativeWork schema on each project page.

6. Add canonical URLs on every page to avoid duplicate content issues from any
   trailing-slash or query-param variants.

7. Check and fix heading hierarchy (one H1 per page, logical H2/H3 nesting) —
   audit current pages for this.

8. Add descriptive, keyword-rich alt text fields to every project image (this
   should be a required field in the new dashboard we'll build in Phase 3 —
   don't let me upload an image without alt text).

9. Set up Google Search Console and submit the sitemap (give me the exact
   manual steps since this requires my Google account).

After this phase, give me a before/after summary of what metadata existed vs.
what exists now for at least 3 sample pages.
```

---

## 2. PERFORMANCE & IMAGE LOADING OPTIMIZATION

```
Audit and optimize site performance, especially image loading speed:

1. Confirm all images use next/image (not raw <img> tags) so Next.js handles
   responsive sizing, lazy loading, and format negotiation automatically. Fix any
   instance that isn't.

2. Set explicit width/height (or fill with a sized parent) on every image to
   prevent layout shift (CLS).

3. Add priority={true} only to the hero/above-the-fold image on each page —
   everything else should lazy-load.

4. Configure next.config.js image settings: enable AVIF/WebP output formats,
   and set a sensible deviceSizes/imageSizes array matching this portfolio's
   actual layout breakpoints (don't use the defaults blindly — check the CSS
   grid/column widths first).

5. Once the image hosting migration (Phase 4) is done, configure the Next.js
   image loader to point to that provider so images are optimized at the CDN
   edge, not just by Next.js at build/request time.

6. Add proper HTTP caching headers for static assets via vercel.json or
   next.config.js — long max-age + immutable for hashed static assets.

7. Run a Lighthouse audit (mobile + desktop) on Home, Projects, and one project
   detail page. Report the scores (Performance, SEO, Accessibility, Best
   Practices) before and after your changes, and list what specifically moved
   the needle.

8. Check for render-blocking fonts/scripts — if using Google Fonts, self-host
   via next/font instead of a <link> tag to avoid the extra DNS/round-trip.

9. Audit bundle size (next build output) and flag any unused/heavy dependency.

Report Lighthouse scores in your summary so I can see the actual improvement.
```

---

## 3. ADMIN DASHBOARD — DRAG & DROP CONTENT MANAGEMENT

This is the core of what you asked for: a private portal where you can manage categories and projects without touching code.

```
Build a private admin dashboard at /admin (not linked anywhere in public
navigation, protected by authentication) with the following capabilities:

AUTH:
- Use NextAuth.js (Auth.js) with a simple credentials provider (email + password,
  just for me — single user) OR a magic-link email login. Recommend the simpler
  option and explain the trade-off. Store the password hash, never plaintext.
- Redirect any unauthenticated visit to /admin to a login page.

DATA MODEL:
- Categories: id, name, slug, display order, cover image (used as the filter
  thumbnail on /projects).
- Projects/Items: id, title, category (or multiple categories, since some of my
  work like "Bandy" spans Packaging + Social Media), cover image, gallery images
  (multiple), short description, tools used, date, slug, published (draft/live
  toggle), display order.
- Use [recommend the simplest option for my scale: a hosted Postgres like
  Neon or Supabase (free tier), or even a simple JSON/SQLite approach if that's
  genuinely sufficient for a few dozen projects — explain which you're choosing
  and why before building it].

DASHBOARD UI:
- A left sidebar: Categories | Projects | Pricing | Settings.
- Categories page:
  - List existing categories as cards.
  - "Add category" — name + cover image, auto-generates a slug.
  - Drag-to-reorder categories (this controls the order they appear as filters
    on /projects).
  - Edit / delete with a confirmation step before delete.
- Projects page:
  - Grid of all projects with thumbnail, title, category tag, published status.
  - "Add project" form: title, category picker (multi-select), description,
    tools used, cover image upload, gallery image upload (multiple).
  - DRAG-AND-DROP UPLOAD ZONE: a dropzone component (use react-dropzone) where I
    can drag multiple images at once. Show upload progress per image.
  - Drag-to-reorder gallery images within a project, and drag-to-reorder
    projects within a category (controls display order on the public site).
  - Draft/Publish toggle so I can prep a project before it goes live.
  - Delete project with confirmation, and cascade-delete its images from
    storage too (don't leave orphaned files).
- Every create/edit/delete action should show a success/error toast and should
  reflect on the live public site within seconds (use ISR revalidation or
  on-demand revalidation via Next.js's revalidatePath, not a full redeploy).

DESIGN:
- Match the dashboard's visual language to the main site's aesthetic (dark/
  minimal, same font system) — it should feel like part of the same product,
  not a bolted-on generic admin template.
- Fully responsive so I can manage it from my phone if needed.

After building this, give me a step-by-step walkthrough (with screenshots if
possible) of how to add my first new category and upload my first project.
```

---

## 4. IMAGE HOSTING & AUTO-OPTIMIZATION PIPELINE

This is the piece that removes your manual "upload somewhere, paste link" workflow.

```
Recommended: Cloudinary (free tier is sufficient at this scale).

Set up the following:

1. Create a Cloudinary account and connect it via environment variables
   (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) — tell me
   exactly where to find these and how to add them in Vercel's project settings.

2. In the /admin dashboard's dropzone (Phase 3), wire uploads directly to
   Cloudinary using a signed upload preset, so images go: my computer → dropzone
   → Cloudinary → optimized URL saved to the database. No manual hosting step,
   ever again.

3. On upload, automatically:
   - Convert to WebP/AVIF where supported.
   - Compress without visible quality loss (Cloudinary's q_auto).
   - Generate a folder structure that mirrors my categories (e.g.
     /portfolio/logos/, /portfolio/carousels/, /portfolio/prints/,
     /portfolio/mockups/) so it also stays organized on Cloudinary's side if I
     ever need to browse it directly.
   - Generate a few preset responsive sizes (thumbnail, medium, full) so the
     right size loads on the right device.

4. Delete-on-delete: when I delete a project or image in the dashboard, also
   delete the corresponding asset from Cloudinary so I don't quietly accumulate
   storage/bandwidth usage I'm not using.

5. Configure Next.js's image component to use Cloudinary's loader so
   optimization happens at their CDN edge.

Alternative if I'd rather not add a third-party account: use Vercel Blob
storage + the `sharp` library to compress/convert images server-side on upload.
This keeps everything inside Vercel but means I lose Cloudinary's automatic
on-the-fly transformations (e.g. serving different sizes per device) unless I
build that logic myself. Explain this trade-off to me in one paragraph before
you start, then proceed with my choice.
```

---

## 5. PRICING PAGE

```
Add a /pricing page (or a "Pricing" section on /services):

1. Structure pricing in clear packages relevant to my services (e.g. Logo
   Design, Brand Identity Package, Packaging Design, Social Media Design Pack,
   Motion Graphics) — ask me for my actual package tiers and price points before
   writing copy, don't invent numbers.

2. Show prices in BDT (৳) as primary, since I'm based in Bangladesh, but also
   note "custom quotes for international clients" since some of my work (TECH-O,
   Bandy) reads as international/agency work — don't box myself into a fixed USD
   rate publicly.

3. Add a clear disclaimer line: "Final pricing depends on project scope — reach
   out for an accurate quote," so pricing reads as a starting-point guide, not a
   rigid invoice.

4. Each pricing card should end in a call-to-action that goes straight to
   /contact or opens WhatsApp (see Phase 6) — pricing should always lead to
   contact, not a dead end.

5. Make this section editable from the dashboard too (Phase 3's Settings page),
   so I can update prices without a code change later.
```

---

## 6. CONTACT — KEEP IT SIMPLE (EMAIL + WHATSAPP ONLY)

```
Since clients only need to reach me via email or WhatsApp (no contact-form
backend/database needed), do the following:

1. On /contact, provide:
   - A "Start a project" button that opens a pre-filled WhatsApp chat via a
     click-to-chat link: https://wa.me/<my-number>?text=<url-encoded default
     message like "Hi Shishir, I'd like to discuss a [logo/branding/packaging]
     project.">
   - A mailto: link with a pre-filled subject line, e.g.
     mailto:me@email.com?subject=Project%20Inquiry
   - Both should be large, obvious buttons — not just small icons — since this
     is the site's main conversion point.

2. If I still want a contact form for people who don't use WhatsApp, keep it
   lightweight: use a free service like Formspree or Web3Forms so there's no
   backend/database to maintain, and have it email me directly.

3. Add my WhatsApp number and email as JSON-LD contactPoint in the Person
   schema from Phase 1, so it's crawlable and can appear in search results.
```

---

## 7. SUGGESTED ORDER OF OPERATIONS

1. **Phase 1 (SEO)** — low risk, immediate value, do first.
2. **Phase 2 (Performance)** — pairs naturally with Phase 1, same files.
3. **Phase 4 (Image hosting)** — set this up *before* Phase 3, since the
   dashboard's upload feature depends on it.
4. **Phase 3 (Dashboard)** — the biggest piece of work; do this once hosting is ready.
5. **Phase 5 (Pricing)** and **Phase 6 (Contact)** — quick, can be done anytime,
   good to slot in while waiting on dashboard testing.

Tackle these as separate conversations with Antigravity if the tool struggles with all of it at once — smaller scoped prompts generally produce more reliable code than one giant request.

---

## 8. HOW TO TRACK PROGRESS

- Keep `CHANGELOG.md` updated after every phase (see Section 0).
- After each phase, ask Antigravity directly: *"Summarize everything you changed in this phase in plain English, and list anything I need to do manually."*
- Before starting the next phase, ask: *"Show me the current state of CHANGELOG.md so I can confirm what's already done."*
- Once a phase is live, spot-check it yourself: view source for SEO tags, run Lighthouse for performance, and actually try uploading a test image through the dashboard before trusting it with real client work.
