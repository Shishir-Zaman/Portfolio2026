"use client";

import { useState } from "react";
import { Save, Loader2 } from "lucide-react";
import { HomePageSettings } from "@/lib/db";

export default function HomeSettingsClient({ initialData }: { initialData: HomePageSettings }) {
  const [data, setData] = useState<HomePageSettings>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/home-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");
      setMessage("Settings saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Error saving settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="space-y-6">
        
        <div>
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Hero Tagline</label>
          <input 
            type="text" 
            value={data.heroTagline || ""}
            onChange={(e) => setData({ ...data, heroTagline: e.target.value })}
            placeholder="e.g. PORTFOLIO V2"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Hero Headline</label>
          <input 
            type="text" 
            value={data.heroHeadline || ""}
            onChange={(e) => setData({ ...data, heroHeadline: e.target.value })}
            placeholder="e.g. VISUAL & BRAND DESIGNER"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Hero Sub-headline (Bio)</label>
          <textarea 
            value={data.heroSubheadline || ""}
            onChange={(e) => setData({ ...data, heroSubheadline: e.target.value })}
            rows={3}
            placeholder="I craft visual identities..."
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none resize-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Footer Contact Text</label>
          <textarea 
            value={data.contactText || ""}
            onChange={(e) => setData({ ...data, contactText: e.target.value })}
            rows={2}
            placeholder="Have a project in mind?"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none resize-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--color-teal-accent)] text-black rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
          
          {message && (
            <span className={`text-sm ${message.includes("Error") ? "text-red-400" : "text-[var(--color-teal-accent)]"}`}>
              {message}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
