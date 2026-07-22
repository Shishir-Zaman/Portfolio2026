import type { Metadata } from "next";
import { getProjects, getCategories } from "@/lib/db";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Shishir Zaman",
  description: "A curated collection of visual identities, packaging systems, and digital experiences by Shishir Zaman.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const categories = await getCategories();

  return <ProjectsClient projects={projects} categories={categories} />;
}
