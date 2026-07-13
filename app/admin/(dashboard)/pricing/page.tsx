import PricingClient from "./PricingClient";

export const metadata = {
  title: "Manage Pricing | Admin Dashboard",
};

import { getProjects } from "../../../../lib/db";

export default async function PricingPage() {
  const projects = await getProjects();
  return <PricingClient availableProjects={projects.map(p => ({ id: p.id, title: p.title }))} />;
}
