import CategoriesClient from "./CategoriesClient";

export const metadata = {
  title: "Categories CMS | Shishir Zaman",
};

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syncopate uppercase tracking-widest mb-2">Categories</h1>
          <p className="text-white/50">Manage your project categories and filter tags.</p>
        </div>
      </header>

      <CategoriesClient />
    </div>
  );
}
