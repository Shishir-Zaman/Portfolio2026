import { Redis } from "@upstash/redis";
import { Category, Project, PROJECTS, PROJECT_CATEGORIES } from "../app/data/content";

// Define the exact types for the CMS
export type CMSCategory = Category;
export type CMSProject = Project;

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
