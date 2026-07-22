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
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Hero Name</label>
          <input 
            type="text" 
            value={data.heroName || ""}
            onChange={(e) => setData({ ...data, heroName: e.target.value })}
            placeholder="e.g. Shishir Zaman"
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
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Hero Roles (Comma separated)</label>
          <input 
            type="text" 
            value={(data.heroRoles || []).join(", ")}
            onChange={(e) => setData({ ...data, heroRoles: e.target.value.split(",").map(r => r.trim()).filter(Boolean) })}
            placeholder="e.g. Visual Designer, UI/UX Designer, Motion Designer"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-white/10 pt-6 mt-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">CTA 1 Text</label>
            <input 
              type="text" 
              value={data.cta1Text || ""}
              onChange={(e) => setData({ ...data, cta1Text: e.target.value })}
              placeholder="Start a project"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">CTA 1 Link</label>
            <input 
              type="text" 
              value={data.cta1Link || ""}
              onChange={(e) => setData({ ...data, cta1Link: e.target.value })}
              placeholder="/contact"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">CTA 2 Text</label>
            <input 
              type="text" 
              value={data.cta2Text || ""}
              onChange={(e) => setData({ ...data, cta2Text: e.target.value })}
              placeholder="View work"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">CTA 2 Link</label>
            <input 
              type="text" 
              value={data.cta2Link || ""}
              onChange={(e) => setData({ ...data, cta2Link: e.target.value })}
              placeholder="/projects"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
            />
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 mt-6 space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Featured Projects Title</label>
            <input 
              type="text" 
              value={data.featuredProjectsTitle || ""}
              onChange={(e) => setData({ ...data, featuredProjectsTitle: e.target.value })}
              placeholder="e.g. Featured Projects"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Categories Title</label>
            <input 
              type="text" 
              value={data.categoriesTitle || ""}
              onChange={(e) => setData({ ...data, categoriesTitle: e.target.value })}
              placeholder="e.g. Categories"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none transition-colors"
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
