"use client";

import { useState } from "react";
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Search, Tag, BarChart2, Code2, Star } from "lucide-react";
import { SiteSettings, CMSProject, SeoSettings } from "../../../../lib/db";
import { NavLink, Social } from "../../../data/content";

type Tab = "featured" | "nav" | "social" | "seo";

export default function SettingsClient({
  initialSettings,
  projects,
  initialSeoSettings,
}: {
  initialSettings: SiteSettings;
  projects: CMSProject[];
  initialSeoSettings: SeoSettings;
}) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(initialSeoSettings);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("featured");
  const [saveStatus, setSaveStatus] = useState<"idle" | "ok" | "err">("idle");

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      // Save site settings
      const r1 = await fetch("/api/site-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      // Save SEO settings
      const r2 = await fetch("/api/seo-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoSettings),
      });
      if (!r1.ok || !r2.ok) throw new Error("Failed to save");
      setSaveStatus("ok");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch {
      setSaveStatus("err");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setSaving(false);
    }
  };

  // ── Featured Projects Helpers ──
  const toggleFeaturedProject = (id: string) => {
    setSettings((prev) => {
      const newIds = prev.featuredProjectIds.includes(id)
        ? prev.featuredProjectIds.filter((pid) => pid !== id)
        : [...prev.featuredProjectIds, id];
      return { ...prev, featuredProjectIds: newIds };
    });
  };

  const moveFeaturedProject = (index: number, direction: "up" | "down") => {
    setSettings((prev) => {
      const newIds = [...prev.featuredProjectIds];
      if (direction === "up" && index > 0) [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
      else if (direction === "down" && index < newIds.length - 1) [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
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
  const addNavLink = () => setSettings((prev) => ({ ...prev, navLinks: [...prev.navLinks, { name: "New Link", path: "/" }] }));
  const removeNavLink = (index: number) => setSettings((prev) => ({ ...prev, navLinks: prev.navLinks.filter((_, i) => i !== index) }));
  const moveNavLink = (index: number, direction: "up" | "down") => {
    setSettings((prev) => {
      const newLinks = [...prev.navLinks];
      if (direction === "up" && index > 0) [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
      else if (direction === "down" && index < newLinks.length - 1) [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
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
  const addSocialLink = () => setSettings((prev) => ({ ...prev, socials: [...prev.socials, { label: "New Social", url: "https://", iconSvg: "<svg></svg>", size: 36 }] }));
  const removeSocialLink = (index: number) => setSettings((prev) => ({ ...prev, socials: prev.socials.filter((_, i) => i !== index) }));
  const moveSocialLink = (index: number, direction: "up" | "down") => {
    setSettings((prev) => {
      const newSocials = [...prev.socials];
      if (direction === "up" && index > 0) [newSocials[index - 1], newSocials[index]] = [newSocials[index], newSocials[index - 1]];
      else if (direction === "down" && index < newSocials.length - 1) [newSocials[index], newSocials[index + 1]] = [newSocials[index + 1], newSocials[index]];
      return { ...prev, socials: newSocials };
    });
  };

  // ── SEO Helpers ──
  const updateSeo = (field: keyof SeoSettings, value: string) => setSeoSettings((prev) => ({ ...prev, [field]: value }));

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "featured", label: "Featured", icon: <Star size={14} /> },
    { id: "nav", label: "Navigation", icon: <Tag size={14} /> },
    { id: "social", label: "Socials", icon: <BarChart2 size={14} /> },
    { id: "seo", label: "SEO & Tracking", icon: <Search size={14} /> },
  ];

  const inputCls = "bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[var(--color-teal-accent)] w-full transition-colors";
  const labelCls = "text-[11px] uppercase tracking-widest text-white/40 mb-1 block";
  const sectionHeadingCls = "text-base font-bold uppercase tracking-widest text-[var(--color-teal-accent)] flex items-center gap-2 mb-1";

  return (
    <div className="flex flex-col gap-6 font-sans">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="flex flex-wrap gap-2 bg-black/40 p-1 rounded-xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === tab.id ? "bg-white/10 text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center gap-2 px-6 py-2 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider disabled:opacity-50 ${
            saveStatus === "ok"
              ? "bg-green-500 text-black"
              : saveStatus === "err"
              ? "bg-red-500 text-white"
              : "bg-[var(--color-teal-accent)] hover:bg-[var(--color-teal-accent)]/80 text-black"
          }`}
        >
          <Save size={16} />
          {saving ? "Saving..." : saveStatus === "ok" ? "Saved!" : saveStatus === "err" ? "Error" : "Save All"}
        </button>
      </div>

      <div className="glass p-6 md:p-8 rounded-3xl border border-white/10">

        {/* ── FEATURED PROJECTS TAB ── */}
        {activeTab === "featured" && (
          <div className="flex flex-col gap-8">
            <div>
              <h3 className={sectionHeadingCls}><Star size={16} /> Featured Projects on Homepage</h3>
              <p className="text-white/50 text-sm mb-6">Select and reorder the projects that appear in the Featured Projects section on the homepage.</p>

              <div className="flex flex-col gap-3 mb-8">
                {settings.featuredProjectIds.map((id, index) => {
                  const proj = projects.find((p) => p.id === id);
                  if (!proj) return null;
                  return (
                    <div key={id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/10">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => moveFeaturedProject(index, "up")} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowUp size={14} /></button>
                        <button onClick={() => moveFeaturedProject(index, "down")} disabled={index === settings.featuredProjectIds.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowDown size={14} /></button>
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

              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Available Projects</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.filter((p) => !settings.featuredProjectIds.includes(p.id)).map((proj) => (
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
              <h3 className={sectionHeadingCls}><Tag size={16} /> Navigation Links</h3>
              <p className="text-white/50 text-sm mb-6">Manage the main menu links in the top navbar.</p>
            </div>
            <div className="flex flex-col gap-4">
              {settings.navLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex flex-col gap-1">
                    <button onClick={() => moveNavLink(index, "up")} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowUp size={14} /></button>
                    <button onClick={() => moveNavLink(index, "down")} disabled={index === settings.navLinks.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowDown size={14} /></button>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Label</label>
                      <input type="text" value={link.name} onChange={(e) => updateNavLink(index, "name", e.target.value)} className={inputCls} />
                    </div>
                    <div>
                      <label className={labelCls}>URL Path</label>
                      <input type="text" value={link.path} onChange={(e) => updateNavLink(index, "path", e.target.value)} className={inputCls} />
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
              <h3 className={sectionHeadingCls}><BarChart2 size={16} /> Social Links</h3>
              <p className="text-white/50 text-sm mb-6">Manage your social media presence across the site.</p>
            </div>
            <div className="flex flex-col gap-6">
              {settings.socials.map((social, index) => (
                <div key={index} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="flex flex-col gap-1 mt-2">
                    <button onClick={() => moveSocialLink(index, "up")} disabled={index === 0} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowUp size={14} /></button>
                    <button onClick={() => moveSocialLink(index, "down")} disabled={index === settings.socials.length - 1} className="p-1 hover:bg-white/10 rounded disabled:opacity-30"><ArrowDown size={14} /></button>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelCls}>Platform Name</label>
                        <input type="text" value={social.label} onChange={(e) => updateSocialLink(index, "label", e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className={labelCls}>URL</label>
                        <input type="text" value={social.url} onChange={(e) => updateSocialLink(index, "url", e.target.value)} className={inputCls} />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>SVG Icon Code</label>
                      <textarea
                        rows={3}
                        value={social.iconSvg}
                        onChange={(e) => updateSocialLink(index, "iconSvg", e.target.value)}
                        className={`${inputCls} font-mono text-xs resize-none`}
                        placeholder="<svg>...</svg>"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className="w-12 h-12 bg-black/50 rounded-xl border border-white/10 flex items-center justify-center text-white/80"
                      dangerouslySetInnerHTML={{ __html: social.iconSvg.replace(/width=".*?"/g, 'width="100%"').replace(/height=".*?"/g, 'height="100%"') }}
                    />
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

        {/* ── SEO & TRACKING TAB ── */}
        {activeTab === "seo" && (
          <div className="flex flex-col gap-10">
            
            {/* SEO Section */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className={sectionHeadingCls}><Search size={16} /> Search Engine Optimization</h3>
                <p className="text-white/50 text-sm mb-6">Override the default site metadata. Leave blank to use the built-in defaults from code.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelCls}>Site Title Override</label>
                  <input
                    type="text"
                    value={seoSettings.siteTitle ?? ""}
                    onChange={(e) => updateSeo("siteTitle", e.target.value)}
                    placeholder="Shishir Zaman | Visual and Brand Designer"
                    className={inputCls}
                  />
                  <p className="text-white/25 text-[11px] mt-1">Appears in browser tab and search results</p>
                </div>
                <div>
                  <label className={labelCls}>Canonical URL</label>
                  <input
                    type="text"
                    value={seoSettings.canonicalUrl ?? ""}
                    onChange={(e) => updateSeo("canonicalUrl", e.target.value)}
                    placeholder="https://shishirzaman.vercel.app"
                    className={inputCls}
                  />
                  <p className="text-white/25 text-[11px] mt-1">Your primary domain, helps avoid duplicate content</p>
                </div>
              </div>

              <div>
                <label className={labelCls}>Meta Description</label>
                <textarea
                  rows={3}
                  value={seoSettings.metaDescription ?? ""}
                  onChange={(e) => updateSeo("metaDescription", e.target.value)}
                  placeholder="Portfolio of Shishir Zaman. Brand Identity, Packaging and Motion Designer based in Dhaka, Bangladesh."
                  className={`${inputCls} resize-none`}
                />
                <p className="text-white/25 text-[11px] mt-1">Shown in search results. Ideal length: 140-160 characters ({(seoSettings.metaDescription ?? "").length}/160)</p>
              </div>

              <div>
                <label className={labelCls}>Meta Keywords</label>
                <input
                  type="text"
                  value={seoSettings.metaKeywords ?? ""}
                  onChange={(e) => updateSeo("metaKeywords", e.target.value)}
                  placeholder="graphic designer bangladesh, brand identity designer dhaka, logo design"
                  className={inputCls}
                />
                <p className="text-white/25 text-[11px] mt-1">Comma-separated keywords</p>
              </div>

              <div>
                <label className={labelCls}>Open Graph / Social Share Image URL</label>
                <input
                  type="text"
                  value={seoSettings.ogImageUrl ?? ""}
                  onChange={(e) => updateSeo("ogImageUrl", e.target.value)}
                  placeholder="https://yourdomain.com/og-image.jpg (1200x630px recommended)"
                  className={inputCls}
                />
                <p className="text-white/25 text-[11px] mt-1">Shown when your link is shared on Facebook, Twitter, WhatsApp etc.</p>
              </div>
            </div>

            <div className="border-t border-white/8 pt-8 flex flex-col gap-6">
              <div>
                <h3 className={sectionHeadingCls}><BarChart2 size={16} /> Analytics and Tracking</h3>
                <p className="text-white/50 text-sm mb-6">Enter your tracking IDs. Scripts are injected automatically into the page head. Leave blank to disable.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className={labelCls}>Google Tag Manager ID</label>
                  <input
                    type="text"
                    value={seoSettings.gtmId ?? ""}
                    onChange={(e) => updateSeo("gtmId", e.target.value)}
                    placeholder="GTM-XXXXXXX"
                    className={inputCls}
                  />
                  <p className="text-white/25 text-[11px] mt-1">Recommended: manages all other tags from GTM dashboard. If set, GA4 below is ignored.</p>
                </div>
                <div>
                  <label className={labelCls}>Google Analytics 4 ID</label>
                  <input
                    type="text"
                    value={seoSettings.gaId ?? ""}
                    onChange={(e) => updateSeo("gaId", e.target.value)}
                    placeholder="G-XXXXXXXXXX"
                    className={inputCls}
                  />
                  <p className="text-white/25 text-[11px] mt-1">Direct GA4 integration. Only active if GTM ID is empty.</p>
                </div>
                <div>
                  <label className={labelCls}>Facebook Pixel ID</label>
                  <input
                    type="text"
                    value={seoSettings.fbPixelId ?? ""}
                    onChange={(e) => updateSeo("fbPixelId", e.target.value)}
                    placeholder="123456789012345"
                    className={inputCls}
                  />
                  <p className="text-white/25 text-[11px] mt-1">For Meta Ads retargeting and conversion tracking.</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/8 pt-8 flex flex-col gap-4">
              <div>
                <h3 className={sectionHeadingCls}><Code2 size={16} /> Custom Head Scripts</h3>
                <p className="text-white/50 text-sm mb-2">Paste any raw HTML snippet to be injected into the page head. Use for Hotjar, Microsoft Clarity, Crisp chat, or any other third-party tool.</p>
                <p className="text-yellow-400/60 text-[11px] mb-4">Only paste trusted code here. This is injected directly as raw HTML.</p>
              </div>
              <textarea
                rows={8}
                value={seoSettings.customHeadScripts ?? ""}
                onChange={(e) => updateSeo("customHeadScripts", e.target.value)}
                placeholder={`<!-- Example: Hotjar -->\n<script>\n  (function(h,o,t,j,a,r){\n    h.hj=h.hj||function(){...};\n  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');\n</script>`}
                className={`${inputCls} font-mono text-xs resize-y`}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
