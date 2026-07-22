import { getHomePageSettings } from "@/lib/db";
import HomeSettingsClient from "./HomeSettingsClient";

export default async function AdminHomeSettingsPage() {
  const settings = await getHomePageSettings();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-syncopate font-bold uppercase tracking-widest text-white mb-2">Home Page Settings</h1>
        <p className="text-white/50 text-sm">Manage the hero section and primary text on your home page.</p>
      </div>
      
      <HomeSettingsClient initialData={settings} />
    </div>
  );
}
