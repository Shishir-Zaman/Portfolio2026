"use client";

import { useState } from "react";
import { Save, Loader2, Plus, X, GripVertical, ChevronUp, ChevronDown } from "lucide-react";
import { CMSService } from "@/lib/db";

export default function ServicesSettingsClient({ initialData }: { initialData: CMSService[] }) {
  const [services, setServices] = useState<CMSService[]>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });

      if (!res.ok) throw new Error("Failed to save");
      setMessage("Services saved successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage("Error saving services.");
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    const newService: CMSService = {
      id: `service-${Date.now()}`,
      title: "New Service",
      shortDesc: "Short summary",
      description: "Full description...",
      features: ["Feature 1"],
      icon: "brand",
    };
    setServices([...services, newService]);
  };

  const removeService = (index: number) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const updateService = (index: number, field: keyof CMSService, value: any) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const updateFeature = (sIndex: number, fIndex: number, value: string) => {
    const newServices = [...services];
    newServices[sIndex].features[fIndex] = value;
    setServices(newServices);
  };

  const addFeature = (sIndex: number) => {
    const newServices = [...services];
    newServices[sIndex].features.push("New feature");
    setServices(newServices);
  };

  const removeFeature = (sIndex: number, fIndex: number) => {
    const newServices = [...services];
    newServices[sIndex].features.splice(fIndex, 1);
    setServices(newServices);
  };

  const moveService = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === services.length - 1) return;
    
    const newServices = [...services];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const temp = newServices[index];
    newServices[index] = newServices[targetIndex];
    newServices[targetIndex] = temp;
    setServices(newServices);
  };

  return (
    <div className="space-y-6 pb-24">
      <div className="flex justify-between items-center bg-[#111] border border-white/10 rounded-2xl p-6">
        <p className="text-white/70 text-sm">You have {services.length} services configured.</p>
        <button 
          onClick={addService}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-bold tracking-wider uppercase"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {services.map((service, sIndex) => (
        <div key={service.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8 relative group">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity">
              <button disabled={sIndex === 0} onClick={() => moveService(sIndex, 'up')} className="text-white/30 hover:text-white disabled:opacity-30"><ChevronUp size={20}/></button>
              <button disabled={sIndex === services.length - 1} onClick={() => moveService(sIndex, 'down')} className="text-white/30 hover:text-white disabled:opacity-30"><ChevronDown size={20}/></button>
            </div>
            <button 
              onClick={() => removeService(sIndex)}
              className="w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2">
            
            {/* Left Col */}
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Service ID (URL slug)</label>
                <input 
                  type="text" 
                  value={service.id} 
                  onChange={(e) => updateService(sIndex, "id", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--color-teal-accent)] outline-none font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Title</label>
                <input 
                  type="text" 
                  value={service.title} 
                  onChange={(e) => updateService(sIndex, "title", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--color-teal-accent)] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Short Description (Cards)</label>
                <input 
                  type="text" 
                  value={service.shortDesc} 
                  onChange={(e) => updateService(sIndex, "shortDesc", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--color-teal-accent)] outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Full Description</label>
                <textarea 
                  value={service.description} 
                  onChange={(e) => updateService(sIndex, "description", e.target.value)}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--color-teal-accent)] outline-none resize-none text-sm"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Icon ID</label>
                <select
                  value={service.icon}
                  onChange={(e) => updateService(sIndex, "icon", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:border-[var(--color-teal-accent)] outline-none"
                >
                  <option value="brand">Brand / Star</option>
                  <option value="packaging">Packaging / Box</option>
                  <option value="graphics">Graphics / Pen Tool</option>
                  <option value="social">Social Media / Heart</option>
                  <option value="video">Video Editing / Play</option>
                  <option value="motion">Motion / Layers</option>
                </select>
              </div>
            </div>

            {/* Right Col */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs uppercase tracking-widest text-white/50">Features / Capabilities</label>
                <button onClick={() => addFeature(sIndex)} className="text-xs text-[var(--color-teal-accent)] hover:text-white flex items-center gap-1">
                  <Plus size={14}/> Add Feature
                </button>
              </div>
              <div className="space-y-3">
                {service.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3 group/feat">
                    <GripVertical size={16} className="text-white/20 cursor-move" />
                    <input 
                      type="text" 
                      value={feature} 
                      onChange={(e) => updateFeature(sIndex, fIndex, e.target.value)}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-white/30 outline-none"
                    />
                    <button 
                      onClick={() => removeFeature(sIndex, fIndex)} 
                      className="text-white/20 hover:text-red-400 opacity-0 group-[.group\/feat]:opacity-100 transition-all"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      ))}

      {/* Floating Save Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-8 py-4 bg-[var(--color-teal-accent)] text-black rounded-full font-bold uppercase tracking-wider text-sm hover:scale-105 transition-all shadow-[0_10px_40px_rgba(0,245,255,0.3)] disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          {saving ? "Saving..." : "Save All Services"}
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
