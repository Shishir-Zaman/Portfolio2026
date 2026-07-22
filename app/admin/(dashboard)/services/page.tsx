import { getServices } from "@/lib/db";
import ServicesSettingsClient from "./ServicesSettingsClient";

export default async function AdminServicesSettingsPage() {
  const services = await getServices();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-syncopate font-bold uppercase tracking-widest text-white mb-2">Services</h1>
        <p className="text-white/50 text-sm">Manage the services you offer, including descriptions and features.</p>
      </div>
      
      <ServicesSettingsClient initialData={services} />
    </div>
  );
}
