import HomeClient from "./HomeClient";
import { getCategories, getProjects, getSiteSettings } from "../../lib/db";

export default async function HomePage() {
  const categories = await getCategories();
  const projects = await getProjects();
  const siteSettings = await getSiteSettings();
  
  return <HomeClient categories={categories} projects={projects} siteSettings={siteSettings} />;
}
