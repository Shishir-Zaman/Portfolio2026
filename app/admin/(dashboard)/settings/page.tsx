import { getSiteSettings, getProjects } from "../../../../lib/db";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  const projects = await getProjects();
  
  return (
    <div className="flex flex-col gap-8 font-sans">
      <header>
        <h1 className="text-3xl font-bold font-syncopate uppercase tracking-widest mb-2">Site Settings</h1>
        <p className="text-white/50">Manage homepage featured projects, navigation, and social links.</p>
      </header>
      <SettingsClient initialSettings={settings} projects={projects} />
    </div>
  );
}
