"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { SiteSettings, CMSProject } from "../../../../lib/db";
import { NavLink, Social } from "../../../data/content";

export default function SettingsClient({ initialSettings, projects }: { initialSettings: SiteSettings, projects: CMSProject[] }) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"featured" | "nav" | "social">("featured");

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) throw new Error("Failed to save");
      alert("Settings saved successfully!");
    } catch (err) {
      alert("Error saving settings");
    } finally {
      setSaving(false);
    }
  };

  // ── Featured Projects Helpers ──
  const toggleFeaturedProject = (id: string) => {
    setSettings((prev) => {
      const newIds = prev.featuredProjectIds.includes(id)
        ? prev.featuredProjectIds.filter(pid => pid !== id)
        : [...prev.featuredProjectIds, id];
      return { ...prev, featuredProjectIds: newIds };
    });
  };

  const moveFeaturedProject = (index: number, direction: "up" | "down") => {
    setSettings((prev) => {
      const newIds = [...prev.featuredProjectIds];
      if (direction === "up" && index > 0) {
        [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
      } else if (direction === "down" && index < newIds.length - 1) {
        [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
      }
      return { ...prev, featuredProjectIds: newIds };
    });
  };

  // ── Nav Links Helpers ──
  const updateNavLink = (index: number, field: keyof NavLink, value: string) => {
    setSettings((prev) => {
      const newLinks = [...prev.navLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, navLinks: newLinks };
    });
  };

  const addNavLink = () => {
    setSettings((prev) => ({
      ...prev,
      navLinks: [...prev.navLinks, { name: "New Link", path: "/" }]
    }));
  };

  const removeNavLink = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      navLinks: prev.navLinks.filter((_, i) => i !== index)
    }));
  };

  const moveNavLink = (index: number, direction: "up" | "down") => {
    setSettings((prev) => {
      const newLinks = [...prev.navLinks];
      if (direction === "up" && index > 0) {
        [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
      } else if (direction === "down" && index < newLinks.length - 1) {
        [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
      }
      return { ...prev, navLinks: newLinks };
    });
  };

  // ── Social Links Helpers ──
  const updateSocialLink = (index: number, field: keyof Social, value: string | number) => {
    setSettings((prev) => {
      const newSocials = [...prev.socials];
      newSocials[index] = { ...newSocials[index], [field]: value };
      return { ...prev, socials: newSocials };
    });
  };

  const addSocialLink = () => {
    setSettings((prev) => ({
      ...prev,
      socials: [...prev.socials, { label: "New Social", url: "https://", iconSvg: '<svg></svg>', size: 36 }]
    }));
  };

  const removeSocialLink = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index)
    }));
  };

  const moveSocialLink = (index: number, direction: "up" | "down") => {
    setSettings((prev) => {
      const newSocials = [...prev.socials];
      if (direction === "up" && index > 0) {
        [newSocials[index - 1], newSocials[index]] = [newSocials[index], newSocials[index - 1]];
      } else if (direction === "down" && index < newSocials.length - 1) {
        [newSocials[index], newSocials[index + 1]] = [newSocials[index + 1], newSocials[index]];
      }
      return { ...prev, socials: newSocials };
    });
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex gap-2 bg-black/40 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("featured")}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "featured" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
          >
            Featured Projects
          </button>
          <button 
            onClick={() => setActiveTab("nav")}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "nav" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
          >
            Navigation
          </button>
          <button 
            onClick={() => setActiveTab("social")}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === "social" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
          >
            Socials
          </button>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-[var(--color-teal-accent)] hover:bg-[var(--color-teal-accent)]/80 text-black rounded-xl transition-colors text-sm font-bold uppercase tracking-wider disabled:opacity-50"
        >
          <Save size={16} /> {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="glass p-6 md:p-8 rounded-3xl border border-white/10">
        
        {/* ── FEATURED PROJECTS TAB ── */}
        {activeTab === "featured" && (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--color-teal-accent)] mb-2">Featured Projects on Homepage</h3>
              <p className="text-white/50 text-sm mb-6">Select and reorder the projects that appear in the 'Featured Projects' section on the homepage.</p>
              
              <div className="flex flex-col gap-3 mb-8">
                {settings.featuredProjectIds.map((id, index) => {
                  const proj = projects.find(p => p.id === id);
                  if (!proj) return null;
                  return (
                    <div key={id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => moveFeaturedProject(index, "up")} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowUp size={14}/></button>
                        <button onClick={() => moveFeaturedProject(index, "down")} disabled={index === settings.featuredProjectIds.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowDown size={14}/></button>
                      </div>
                      <div className="w-12 h-12 bg-black/50 rounded-lg overflow-hidden shrink-0">
                        {proj.image && <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm uppercase tracking-wider">{proj.title}</h4>
                      </div>
                      <button onClick={() => toggleFeaturedProject(id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <h4 className="text-sm font-bold uppercase tracking-widest text-white/50 mb-4">Available Projects</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.filter(p => !settings.featuredProjectIds.includes(p.id)).map(proj => (
                  <div key={proj.id} className="flex items-center gap-3 bg-black/40 p-3 rounded-xl border border-white/5">
                    <div className="w-10 h-10 bg-black/50 rounded-lg overflow-hidden shrink-0">
                      {proj.image && <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />}
                    </div>
                    <div className="flex-1 truncate">
                      <h4 className="font-bold text-xs uppercase tracking-wider truncate">{proj.title}</h4>
                    </div>
                    <button onClick={() => toggleFeaturedProject(proj.id)} className="p-1.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── NAV LINKS TAB ── */}
        {activeTab === "nav" && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--color-teal-accent)] mb-2">Navigation Links</h3>
              <p className="text-white/50 text-sm mb-6">Manage the main menu links in the top navbar.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {settings.navLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveNavLink(index, "up")} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowUp size={14}/></button>
                    <button onClick={() => moveNavLink(index, "down")} disabled={index === settings.navLinks.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowDown size={14}/></button>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-white/40">Label</label>
                      <input 
                        type="text" 
                        value={link.name} 
                        onChange={(e) => updateNavLink(index, "name", e.target.value)} 
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-teal-accent)]" 
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-white/40">URL Path</label>
                      <input 
                        type="text" 
                        value={link.path} 
                        onChange={(e) => updateNavLink(index, "path", e.target.value)} 
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-teal-accent)]" 
                      />
                    </div>
                  </div>
                  <button onClick={() => removeNavLink(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg mt-5">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <button onClick={addNavLink} className="self-start flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors text-sm uppercase tracking-wider">
              <Plus size={16} /> Add Link
            </button>
          </div>
        )}

        {/* ── SOCIAL LINKS TAB ── */}
        {activeTab === "social" && (
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-[var(--color-teal-accent)] mb-2">Social Links</h3>
              <p className="text-white/50 text-sm mb-6">Manage your social media presence across the site.</p>
            </div>
            
            <div className="flex flex-col gap-6">
              {settings.socials.map((social, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex flex-col gap-1 mt-2">
                    <button onClick={() => moveSocialLink(index, "up")} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowUp size={14}/></button>
                    <button onClick={() => moveSocialLink(index, "down")} disabled={index === settings.socials.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowDown size={14}/></button>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs uppercase tracking-widest text-white/40">Platform Name</label>
                        <input 
                          type="text" 
                          value={social.label} 
                          onChange={(e) => updateSocialLink(index, "label", e.target.value)} 
                          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-teal-accent)]" 
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs uppercase tracking-widest text-white/40">URL</label>
                        <input 
                          type="text" 
                          value={social.url} 
                          onChange={(e) => updateSocialLink(index, "url", e.target.value)} 
                          className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[var(--color-teal-accent)]" 
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <label className="text-xs uppercase tracking-widest text-white/40">SVG Icon Code</label>
                      <textarea 
                        rows={3}
                        value={social.iconSvg} 
                        onChange={(e) => updateSocialLink(index, "iconSvg", e.target.value)} 
                        className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono outline-none focus:border-[var(--color-teal-accent)] resize-none" 
                        placeholder="<svg>...</svg>"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-black/50 rounded-xl border border-white/10 flex items-center justify-center text-white/80"
                         dangerouslySetInnerHTML={{ __html: social.iconSvg.replace(/width=".*?"/g, 'width="100%"').replace(/height=".*?"/g, 'height="100%"') }}>
                    </div>
                    <button onClick={() => removeSocialLink(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={addSocialLink} className="self-start flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-colors text-sm uppercase tracking-wider">
              <Plus size={16} /> Add Social Link
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
