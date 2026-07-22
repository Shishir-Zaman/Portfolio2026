"use client";

import { useState } from "react";
import { Save, Loader2, Plus, X, GripVertical } from "lucide-react";
import { PersonalInfoType } from "@/lib/db";
import CloudinaryUpload from "../projects/CloudinaryUpload";

export default function AboutSettingsClient({ initialData }: { initialData: PersonalInfoType }) {
  const [data, setData] = useState<PersonalInfoType>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/personal-info", {
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

  const updateField = (field: keyof PersonalInfoType, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateBioExtended = (index: number, value: string) => {
    const newBio = [...data.bioExtended];
    newBio[index] = value;
    updateField("bioExtended", newBio);
  };

  const updateStat = (index: number, field: "number" | "label", value: string) => {
    const newStats = [...data.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    updateField("stats", newStats);
  };

  const updateTool = (index: number, value: string) => {
    const newTools = [...data.tools];
    newTools[index] = value;
    updateField("tools", newTools);
  };

  return (
    <div className="space-y-8 pb-20">
      
      {/* ── Basic Info ── */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Basic Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Name</label>
            <input 
              type="text" 
              value={data.name || ""}
              onChange={(e) => updateField("name", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Title</label>
            <input 
              type="text" 
              value={data.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Profile Image</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {data.profileImage && (
              <img src={data.profileImage} alt="Profile" className="w-24 h-24 object-cover rounded-xl border border-white/10 shadow-lg" />
            )}
            <div className="flex-1 w-full">
              <CloudinaryUpload 
                value={data.profileImage || ""}
                onChange={(url) => updateField("profileImage", url)}
              />
              <input 
                type="text" 
                value={data.profileImage || ""}
                onChange={(e) => updateField("profileImage", e.target.value)}
                placeholder="Or paste an image URL"
                className="w-full mt-2 bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Biography ── */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Biography (About Page)</h2>
        
        <div className="space-y-4">
          {data.bioExtended.map((paragraph, index) => (
            <div key={index} className="flex items-start gap-3 group">
              <GripVertical size={16} className="text-white/20 mt-3 cursor-move" />
              <textarea 
                value={paragraph} 
                onChange={(e) => updateBioExtended(index, e.target.value)}
                rows={3}
                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-white/30 outline-none resize-none"
              />
              <button 
                onClick={() => {
                  const newBio = [...data.bioExtended];
                  newBio.splice(index, 1);
                  updateField("bioExtended", newBio);
                }} 
                className="text-white/20 hover:text-red-400 mt-2 opacity-0 group-hover:opacity-100 transition-all"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <button 
            onClick={() => updateField("bioExtended", [...data.bioExtended, ""])} 
            className="text-xs text-[var(--color-teal-accent)] hover:text-white flex items-center gap-1 ml-7 mt-2"
          >
            <Plus size={14}/> Add Paragraph
          </button>
        </div>
      </div>

      {/* ── Contact Info ── */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Contact Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Location</label>
            <input 
              type="text" 
              value={data.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Email Address</label>
            <input 
              type="email" 
              value={data.email || ""}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Phone Number</label>
            <input 
              type="text" 
              value={data.phone || ""}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
            />
          </div>
          <div className="flex items-center gap-3 pt-6">
            <input 
              type="checkbox" 
              id="worldwide"
              checked={data.availableWorldwide || false} 
              onChange={(e) => updateField("availableWorldwide", e.target.checked)}
              className="w-5 h-5 accent-[var(--color-teal-accent)]"
            />
            <label htmlFor="worldwide" className="text-white/80">Available Worldwide</label>
          </div>
        </div>
      </div>

      {/* ── Stats & Tools ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Statistics</h2>
          <div className="space-y-4">
            {data.stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <GripVertical size={16} className="text-white/20 cursor-move" />
                <input 
                  type="text" 
                  value={stat.number} 
                  onChange={(e) => updateStat(index, "number", e.target.value)}
                  placeholder="e.g. 05+"
                  className="w-24 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none"
                />
                <input 
                  type="text" 
                  value={stat.label} 
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                  placeholder="Label"
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-white/30 outline-none"
                />
                <button 
                  onClick={() => {
                    const newStats = [...data.stats];
                    newStats.splice(index, 1);
                    updateField("stats", newStats);
                  }} 
                  className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => updateField("stats", [...data.stats, { number: "", label: "" }])} 
              className="text-xs text-[var(--color-teal-accent)] hover:text-white flex items-center gap-1 ml-7 mt-2"
            >
              <Plus size={14}/> Add Stat
            </button>
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-white mb-6 border-b border-white/10 pb-4">Software & Tools</h2>
          <div className="space-y-3">
            {data.tools.map((tool, index) => (
              <div key={index} className="flex items-center gap-3 group">
                <GripVertical size={16} className="text-white/20 cursor-move" />
                <input 
                  type="text" 
                  value={tool} 
                  onChange={(e) => updateTool(index, e.target.value)}
                  className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-white/30 outline-none"
                />
                <button 
                  onClick={() => {
                    const newTools = [...data.tools];
                    newTools.splice(index, 1);
                    updateField("tools", newTools);
                  }} 
                  className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button 
              onClick={() => updateField("tools", [...data.tools, ""])} 
              className="text-xs text-[var(--color-teal-accent)] hover:text-white flex items-center gap-1 ml-7 mt-2"
            >
              <Plus size={14}/> Add Tool
            </button>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-[var(--color-teal-accent)] text-black rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all shadow-[0_10px_40px_rgba(0,245,255,0.3)] disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? "Saving..." : "Save All Changes"}
        </button>
        {message && (
          <div className={`absolute -top-10 right-0 whitespace-nowrap text-sm font-bold ${message.includes("Error") ? "text-red-400" : "text-[var(--color-teal-accent)]"}`}>
            {message}
          </div>
        )}
      </div>

    </div>
  );
}
