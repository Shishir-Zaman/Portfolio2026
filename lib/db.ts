import { Redis } from "@upstash/redis";
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

// ─── Redis Client ─────────────────────────────────────────────
const getRedisClient = () => {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      return new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
    }
    console.warn("Redis credentials missing. CMS will not work properly.");
    return null;
  }

  return new Redis({
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
