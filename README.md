# Shishir Zaman — Portfolio

Personal portfolio and design showcase for Shishir Zaman, Visual & Brand Designer based in Dhaka, Bangladesh.

**Live:** [shishirzaman.vercel.app](https://shishirzaman.vercel.app)

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS v4
- **CMS:** Custom admin dashboard backed by Upstash Redis
- **Auth:** Auth.js v5 (NextAuth) with bcrypt password hashing
- **Image Hosting:** Cloudinary
- **Deployment:** Vercel

## Environment Variables

All secrets are managed through Vercel's environment variables. Copy `.env.example` (if provided) for local development — never commit `.env.local`.

Required variables:
- `AUTH_SECRET` — NextAuth secret (generate with `openssl rand -hex 32`)
- `ADMIN_PASSWORD_HASH` — bcrypt hash of the admin password
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — Upstash Redis credentials
