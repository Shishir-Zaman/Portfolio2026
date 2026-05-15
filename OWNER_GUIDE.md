# 🚀 Owner's Guide & Deployment Manual
**Portfolio: Shishir Zaman (2026)**

Welcome to your new premium portfolio! This document explains how your website works, where your data is stored, how to update it, and how to launch it live to the world.

---

## 📂 1. How the Database Works (Where is my data?)
This website is built with **Next.js**, designed for maximum speed and security. 
**There is NO external database (like SQL or MongoDB).** 

Instead, to keep your website lightning fast and unhackable, **all of your information is stored in a single "Source of Truth" file.** 

Whenever you want to update your portfolio, you only ever need to edit this ONE file:
👉 **`app/data/content.ts`**

### What can you change in `content.ts`?
- **`PERSONAL_INFO`**: Your Name, Email, Phone, Location, Bios, Stats (Years of experience, Projects completed), Tools & Software list, and all your Social Media links.
- **`FEATURED_PROJECTS`** & **`PROJECTS`**: The projects you want to display. You can change their `title`, `description`, `tags`, and `image`. 
  - **Adding multiple pictures to a project:** You can add a `gallery` property to any project with a list of image URLs. When a client clicks on that project, the website will automatically load and stack all those pictures beautifully in order!
  *Example:*
  ```javascript
  {
    id: "luxe-packaging",
    title: "LUXE PRODUCT PACKAGING",
    tags: ["Packaging Design", "Print Design"],
    image: "/main-image.jpg",
    description: "This was a luxurious packaging project...",
    gallery: [
      "/extra-picture-1.jpg", 
      "/extra-picture-2.jpg", 
      "/extra-picture-3.jpg"
    ]
  }
  ```
- **`SERVICES`**: Your offered services, including descriptions, delivery times, and included features.

**How to update images:**
1. Put your new images inside the `public/` folder.
2. In `content.ts`, update the image path (e.g., `image: "/my-new-image.jpg"`).

---

## ✉️ 2. How the Contact Form Works
You do not need an external email server or paid database service to receive messages!
When a client fills out the "Book an Appointment" form on the `/contact` page and clicks submit:
1. **WhatsApp:** It automatically opens WhatsApp (Mobile or Web) with a pre-filled message containing the client's Name, Email, Service requested, and Message, sending it directly to your number (`+880 1869 511 046`).
2. **Email:** It simultaneously opens the client's default email app with a pre-filled draft addressed to `asif.zaman539070@gmail.com`.

---

## 🌐 3. How to Make the Website Live (Free Hosting)
To forward this website to your clients, you need to deploy it. The best, fastest, and free way to deploy a Next.js app is using **Vercel**.

### Step 1: Push your code to GitHub
1. Create a free account at [GitHub](https://github.com/).
2. Download [GitHub Desktop](https://desktop.github.com/) (easiest method) or use VS Code's Source Control.
3. Commit all your files and publish/push them to a new **Private** repository on your GitHub account.

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and sign up using your GitHub account.
2. Click **"Add New Project"**.
3. Vercel will show a list of your GitHub repositories. Find your portfolio repository and click **"Import"**.
4. You don't need to change any settings. Just click **"Deploy"**.
5. Wait 1-2 minutes. Vercel will build your site and give you a live URL (e.g., `shishir-zaman-portfolio.vercel.app`).

### Step 3: Add a Custom Domain (Optional)
If you buy a domain name (like `shishirzaman.com`) from Namecheap or GoDaddy:
1. Go to your project on Vercel.
2. Click **Settings** > **Domains**.
3. Type in your custom domain and Vercel will give you the DNS records to copy-paste into your domain provider's settings.

---

## 🛠 4. Local Development Commands
If you want to view your website on your own computer before updating the live version:

1. Open a terminal inside your `portfolio-app` folder.
2. Run `npm run dev`
3. Open your browser to `http://localhost:3000`

Whenever you push new code to your GitHub repository, **Vercel will automatically detect the changes and update your live website instantly.** No manual uploads needed!
