import { getPricingPackages, getProjects, getBrandLogos } from "@/lib/db";
import PricingClientUI from "./PricingClientUI";
import PageBackground from "@/components/PageBackground";

// This page uses ISR. It builds once, and when the admin updates pricing,
// revalidatePath('/pricing') will clear the cache and regenerate this page.
export const revalidate = 3600; // also revalidate every hour just in case

export default async function PricingPage() {
  const packages = await getPricingPackages();
  const projects = await getProjects();
  const brandLogos = await getBrandLogos();

  return (
    <div className="flex flex-col items-center pt-10 relative min-h-screen">
      <PageBackground />
      <PricingClientUI packages={packages} projects={projects} brandLogos={brandLogos} />
    </div>
  );
}

