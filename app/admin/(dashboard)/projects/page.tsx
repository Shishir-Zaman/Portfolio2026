import ProjectsClient from "./ProjectsClient";
import { getCategories } from "../../../../lib/db";

export const metadata = {
  title: "Projects CMS | Shishir Zaman",
};

export default async function ProjectsPage() {
  const categories = await getCategories();
  
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syncopate uppercase tracking-widest mb-2">Projects</h1>
          <p className="text-white/50">Manage your portfolio projects, images, and details.</p>
        </div>
      </header>

      <ProjectsClient availableCategories={categories} />
    </div>
  );
}
