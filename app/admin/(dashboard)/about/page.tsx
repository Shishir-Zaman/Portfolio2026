import { getPersonalInfo } from "@/lib/db";
import AboutSettingsClient from "./AboutSettingsClient";

export default async function AdminAboutSettingsPage() {
  const info = await getPersonalInfo();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-syncopate font-bold uppercase tracking-widest text-white mb-2">About & Contact Info</h1>
        <p className="text-white/50 text-sm">Manage your personal information, bio, statistics, tools, and contact details.</p>
      </div>
      
      <AboutSettingsClient initialData={info} />
    </div>
  );
}
