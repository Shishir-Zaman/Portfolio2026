<div align="center">
  <img src="https://res.cloudinary.com/dw10neaqr/image/upload/q_auto/f_auto/v1778827490/488040104_18497993173009231_5541388673102813421_n_g73g8w.jpg" width="120" height="120" alt="Shishir Zaman Logo" style="border-radius: 50%; object-fit: cover; margin-bottom: 20px;">
  <h1>Shishir Zaman — Visual & Brand Designer</h1>
  <p>
    A premium, high-performance portfolio and custom CMS built for <b>Shishir Zaman</b>. <br />
    Showcasing visual identities, packaging designs, and brand stories.
  </p>
  <p>
    <a href="https://shishirzaman.vercel.app"><strong>View Live Website</strong></a> ·
    <a href="https://www.behance.net/asifzaman51905"><strong>Behance</strong></a>
  </p>
</div>

<br />

## ✦ Overview

This is a bespoke web application engineered to serve as both a high-end public portfolio and a secure, personalized content management system (CMS). Designed with a focus on modern aesthetics, micro-interactions, and premium typography, the platform enables dynamic curation of creative work without writing code.

### Key Features
- **Cinematic UI/UX:** Built with Tailwind CSS v4 and Framer Motion, featuring glassmorphism, dynamic scrolling, and a custom cursor.
- **Secure Custom CMS:** A dedicated `/admin` dashboard allowing instant updates to projects, categories, and pricing plans.
- **Optimized Media Delivery:** Seamless integration with Cloudinary for automated image optimization, responsive scaling, and next-gen format delivery (WebP/AVIF).
- **Edge Performance:** Built on Next.js 14 App Router and Upstash Redis for ultra-low latency data retrieval.
- **Authentication:** Protected admin routes utilizing NextAuth.js (v5) with secure credential hashing.

---

## ✦ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 14 (App Router), React |
| **Styling & Animation** | Tailwind CSS v4, Framer Motion |
| **Database** | Upstash Redis (Vercel KV) |
| **Authentication** | Auth.js (NextAuth v5), bcryptjs |
| **Media Hosting** | Cloudinary |
| **Deployment** | Vercel |

---

## ✦ Local Development

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm
- Cloudinary Account
- Upstash / Vercel KV Database

### 2. Environment Setup
Create a `.env.local` file in the root directory and populate it with the required secrets:

```env
# NextAuth Configuration
AUTH_SECRET="generate_with_openssl_rand_hex_32"

# Admin Dashboard Access
ADMIN_PASSWORD_HASH="your_bcrypt_hashed_password"

# Cloudinary Integration
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Upstash Redis Database
KV_REST_API_URL="your_redis_url"
KV_REST_API_TOKEN="your_redis_token"
```

### 3. Installation & Execution
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ✦ Project Structure

```text
├── app/
│   ├── (public)/         # Public-facing portfolio pages
│   ├── admin/            # Secure CMS dashboard
│   ├── api/              # API endpoints for data & cloudinary sigs
│   ├── components/       # Reusable UI elements (Navbar, Cards, etc.)
│   └── data/             # Static configurations & fallback data
├── lib/                  # Utilities (Database client, Cloudinary utils)
├── public/               # Static assets & icons
└── ...                   # Config files (Tailwind, Next.js, Auth)
```

---

## ✦ Security Highlights
- **Edge Authentication:** Middleware operates on the Edge Runtime to block unauthorized access to the `/admin` panel instantly.
- **Secured API Endpoints:** Write operations to the CMS and Cloudinary signature generation endpoints require valid active sessions.
- **Environment Isolation:** Internal notes, prompts, and temporary files have been permanently stripped from Git history via a strict `.gitignore` policy.

---

<div align="center">
  <p><i>Designed and Engineered by Shishir Zaman.</i></p>
</div>
