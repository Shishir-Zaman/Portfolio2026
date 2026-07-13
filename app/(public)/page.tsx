import HomeClient from "./HomeClient";
import { getCategories, getProjects, CMSProject, CMSCategory } from "../../lib/db";

export default async function HomePage() {
  const categories = await getCategories();
  const projects = await getProjects();
  
  return <HomeClient categories={categories} projects={projects} />;
}
