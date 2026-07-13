import { Redis } from "@upstash/redis";
import { Category, Project, PricingPackage, PROJECTS, PROJECT_CATEGORIES, PRICING_PACKAGES } from "../app/data/content";

// Define the exact types for the CMS
export type CMSCategory = Category;
export type CMSProject = Project;
export type CMSPricingPackage = PricingPackage;

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

export async function getCategories(): Promise<CMSCategory[]> {
  if (!redis) return PROJECT_CATEGORIES;
  const categories = await redis.get<CMSCategory[]>("portfolio:categories");
  return categories && categories.length > 0 ? categories : PROJECT_CATEGORIES;
}

export async function saveCategories(categories: CMSCategory[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:categories", categories);
}

export async function getProjects(): Promise<CMSProject[]> {
  if (!redis) return PROJECTS;
  const projects = await redis.get<CMSProject[]>("portfolio:projects");
  return projects && projects.length > 0 ? projects : PROJECTS;
}

export async function saveProjects(projects: CMSProject[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:projects", projects);
}

export async function getPricingPackages(): Promise<CMSPricingPackage[]> {
  if (!redis) return PRICING_PACKAGES;
  const packages = await redis.get<CMSPricingPackage[]>("portfolio:pricing");
  return packages && packages.length > 0 ? packages : PRICING_PACKAGES;
}

export async function savePricingPackages(packages: CMSPricingPackage[]): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set("portfolio:pricing", packages);
}
