import { 
  Category, Project, PricingPackage, NavLink, Social,
  PROJECTS, PROJECT_CATEGORIES, PRICING_PACKAGES, NAV_LINKS, PERSONAL_INFO
} from "../app/data/content";

// ─── CMS Types ────────────────────────────────────────────────
export type CMSCategory = Category;
export type CMSProject = Project;
export type CMSPricingPackage = PricingPackage;

export type SiteSettings = {
  navLinks: NavLink[];
  socials: Social[];
  featuredProjectIds: string[];
};

class RedisClient {
  private url: string;
  private token: string;

  constructor({ url, token }: { url: string; token: string }) {
    this.url = url;
    this.token = token;
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const res = await fetch(`${this.url}/get/${key}`, {
        headers: { Authorization: `Bearer ${this.token}` },
        cache: 'no-store'
      });
      if (!res.ok) return null;
      const json = await res.json();
      if (!json.result) return null;
      return typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
    } catch (e) {
      console.error('Redis get error', e);
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      const res = await fetch(`${this.url}/set/${key}`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(value),
      });
      if (!res.ok) throw new Error("Failed to set redis key");
    } catch (e) {
      console.error('Redis set error', e);
    }
  }
}

const getRedisClient = () => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      return new RedisClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
    }
    console.warn("Redis credentials missing. CMS will not work properly.");
    return null;
  }

  return new RedisClient({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
};

const redis = getRedisClient();

// ─── Categories ───────────────────────────────────────────────
export async function getCategories(): Promise<CMSCategory[]> {
  if (!redis) return PROJECT_CATEGORIES;
  const categories = await redis.get<CMSCategory[]>("portfolio:categories");
  return categories && categories.length > 0 ? categories : PROJECT_CATEGORIES;
}

export async function saveCategories(categories: CMSCategory[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:categories", categories);
}

// ─── Projects ─────────────────────────────────────────────────
export async function getProjects(): Promise<CMSProject[]> {
  if (!redis) return PROJECTS;
  const projects = await redis.get<CMSProject[]>("portfolio:projects");
  return projects && projects.length > 0 ? projects : PROJECTS;
}

export async function saveProjects(projects: CMSProject[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:projects", projects);
}

// ─── Pricing ──────────────────────────────────────────────────
export async function getPricingPackages(): Promise<CMSPricingPackage[]> {
  if (!redis) return PRICING_PACKAGES;
  const packages = await redis.get<CMSPricingPackage[]>("portfolio:pricing");
  return packages && packages.length > 0 ? packages : PRICING_PACKAGES;
}

export async function savePricingPackages(packages: CMSPricingPackage[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:pricing", packages);
}

// ─── Site Settings (nav links, socials, featured project IDs) ──
const DEFAULT_SETTINGS: SiteSettings = {
  navLinks: NAV_LINKS,
  socials: PERSONAL_INFO.socials as Social[],
  featuredProjectIds: PROJECTS.filter(p => p.isFeatured).map(p => p.id),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!redis) return DEFAULT_SETTINGS;
  const settings = await redis.get<SiteSettings>("portfolio:site-settings");
  if (!settings) return DEFAULT_SETTINGS;
  // Merge with defaults so any new fields added in code still appear
  return {
    navLinks: settings.navLinks ?? DEFAULT_SETTINGS.navLinks,
    socials: settings.socials ?? DEFAULT_SETTINGS.socials,
    featuredProjectIds: settings.featuredProjectIds ?? DEFAULT_SETTINGS.featuredProjectIds,
  };
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:site-settings", settings);
}

// ─── SEO & Tracking Settings ───────────────────────────────────
export type SeoSettings = {
  // SEO
  siteTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  ogImageUrl?: string;
  // Tracking
  gtmId?: string;        // Google Tag Manager ID e.g. GTM-XXXXXXX
  gaId?: string;         // Google Analytics 4 ID e.g. G-XXXXXXXXXX
  fbPixelId?: string;    // Facebook Pixel ID
  customHeadScripts?: string; // Raw HTML injected into <head>
};

const DEFAULT_SEO_SETTINGS: SeoSettings = {};

export async function getSeoSettings(): Promise<SeoSettings> {
  if (!redis) return DEFAULT_SEO_SETTINGS;
  const settings = await redis.get<SeoSettings>("portfolio:seo-settings");
  return settings ?? DEFAULT_SEO_SETTINGS;
}

export async function saveSeoSettings(settings: SeoSettings): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:seo-settings", settings);
}

// ─── CMS Additions for Full Headless Control ──────────────────

export type Stat = { number: string; label: string; };

export type PersonalInfoType = {
  name: string;
  title: string;
  tagline: string;
  headline: string;
  bio: string;
  bioExtended: string[];
  location: string;
  availableWorldwide: boolean;
  email: string;
  phone: string;
  resumeUrl: string;
  profileImage: string;
  socials: Social[];
  stats: Stat[];
  tools: string[];
};

export async function getPersonalInfo(): Promise<PersonalInfoType> {
  if (!redis) return PERSONAL_INFO as PersonalInfoType;
  const info = await redis.get<PersonalInfoType>("portfolio:personal-info");
  return info ?? (PERSONAL_INFO as PersonalInfoType);
}

export async function savePersonalInfo(info: PersonalInfoType): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:personal-info", info);
}

export type CMSService = {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  features: string[];
  icon: string;
};

export async function getServices(): Promise<CMSService[]> {
  if (!redis) return require('../app/data/content').SERVICES;
  const services = await redis.get<CMSService[]>("portfolio:services");
  return services && services.length > 0 ? services : require('../app/data/content').SERVICES;
}

export async function saveServices(services: CMSService[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:services", services);
}

export type HomePageSettings = {
  heroTagline?: string;
  heroHeadline?: string;
  heroName?: string;
  heroRoles?: string[];
  heroSubheadline?: string;
  contactText?: string;
  
  cta1Text?: string;
  cta1Link?: string;
  cta2Text?: string;
  cta2Link?: string;
  
  featuredProjectsTitle?: string;
  categoriesTitle?: string;
};

export async function getHomePageSettings(): Promise<HomePageSettings> {
  if (!redis) return {};
  const settings = await redis.get<HomePageSettings>("portfolio:home-page");
  return settings ?? {};
}

export async function saveHomePageSettings(settings: HomePageSettings): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:home-page", settings);
}

// ─── Brand Logos (Client Carousel) ────────────────────────────
export type BrandLogo = {
  id: string;
  name: string;
  logoUrl: string;       // URL to logo image (or SVG data URI)
  websiteUrl?: string;   // Optional external link
};

const DEFAULT_BRAND_LOGOS: BrandLogo[] = [
  {
    id: "zalfii",
    name: "Zalfii",
    logoUrl: "https://zalfii.com/wp-content/uploads/2024/01/ZALFII-LOGO.png",
    websiteUrl: "https://zalfii.com/"
  },
  {
    id: "mainul",
    name: "Mainul Lifestyle",
    logoUrl: "https://www.mai-nul.com/wp-content/uploads/2024/01/mainul-logo.png",
    websiteUrl: "https://www.mai-nul.com/"
  },
  {
    id: "tech-o",
    name: "Tech-O",
    logoUrl: "",
    websiteUrl: ""
  },
  {
    id: "bandy",
    name: "Bandy",
    logoUrl: "",
    websiteUrl: ""
  },
];

export async function getBrandLogos(): Promise<BrandLogo[]> {
  if (!redis) return DEFAULT_BRAND_LOGOS;
  const logos = await redis.get<BrandLogo[]>("portfolio:brand-logos");
  return logos && logos.length > 0 ? logos : DEFAULT_BRAND_LOGOS;
}

export async function saveBrandLogos(logos: BrandLogo[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:brand-logos", logos);
}
