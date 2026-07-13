"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, GripVertical, CheckCircle2 } from "lucide-react";
import { CMSPricingPackage } from "../../../../lib/db";

export default function PricingClient({ availableProjects = [] }: { availableProjects?: { id: string, title: string }[] }) {
  const [packages, setPackages] = useState<CMSPricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/pricing")
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(packages)
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const addPackage = () => {
    setPackages([
      ...packages,
      {
        id: `pkg-${Date.now()}`,
        name: "New Package",
        price: "৳ 0",
        target: "Target audience description",
        features: ["Feature 1"],
        isPopular: false
      }
    ]);
  };

  const updatePackage = (index: number, field: keyof CMSPricingPackage, value: any) => {
    const newPkgs = [...packages];
    newPkgs[index] = { ...newPkgs[index], [field]: value };
    setPackages(newPkgs);
  };

  const updateFeature = (pkgIndex: number, featureIndex: number, value: string) => {
    const newPkgs = [...packages];
    newPkgs[pkgIndex].features[featureIndex] = value;
    setPackages(newPkgs);
  };

  const addFeature = (pkgIndex: number) => {
    const newPkgs = [...packages];
    newPkgs[pkgIndex].features.push("New feature");
    setPackages(newPkgs);
  };

  const removeFeature = (pkgIndex: number, featureIndex: number) => {
    const newPkgs = [...packages];
    newPkgs[pkgIndex].features.splice(featureIndex, 1);
    setPackages(newPkgs);
  };

  const toggleProject = (pkgIndex: number, projectId: string) => {
    const newPkgs = [...packages];
    const pkg = newPkgs[pkgIndex];
    const currentProjects = pkg.exampleProjects || [];
    if (currentProjects.includes(projectId)) {
      pkg.exampleProjects = currentProjects.filter(id => id !== projectId);
    } else {
      pkg.exampleProjects = [...currentProjects, projectId];
    }
    setPackages(newPkgs);
  };

  const removePackage = (index: number) => {
    if (confirm("Delete this package?")) {
      const newPkgs = [...packages];
      newPkgs.splice(index, 1);
      setPackages(newPkgs);
    }
  };

  if (loading) return <div className="text-white/50">Loading pricing...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-syncopate font-bold uppercase tracking-widest text-white">Pricing Plans</h1>
          <p className="text-white/50 mt-2">Manage your service packages and features.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={addPackage} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
            <Plus size={18} /> Add Plan
          </button>
          <button 
            onClick={handleSave} 
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-black font-medium ${success ? "bg-green-400" : "bg-[var(--color-teal-accent)] hover:bg-white"}`}
          >
            {saving ? "Saving..." : success ? <><CheckCircle2 size={18}/> Saved</> : <><Save size={18}/> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {packages.map((pkg, pIndex) => (
          <div key={pkg.id} className={`bg-white/5 border rounded-xl p-6 relative ${pkg.isPopular ? 'border-[var(--color-teal-accent)] shadow-[0_0_15px_rgba(0,245,255,0.1)]' : 'border-white/10'}`}>
            <button onClick={() => removePackage(pIndex)} className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-2 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors">
              <Trash2 size={18} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Plan Name</label>
                <input 
                  type="text" 
                  value={pkg.name} 
                  onChange={(e) => updatePackage(pIndex, "name", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Price</label>
                <input 
                  type="text" 
                  value={pkg.price} 
                  onChange={(e) => updatePackage(pIndex, "price", e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Target Audience / Description</label>
              <textarea 
                value={pkg.target} 
                onChange={(e) => updatePackage(pIndex, "target", e.target.value)}
                rows={2}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:border-[var(--color-teal-accent)] outline-none resize-none"
              />
            </div>

            <div className="mb-6 flex items-center gap-3">
              <input 
                type="checkbox" 
                id={`popular-${pkg.id}`}
                checked={pkg.isPopular || false} 
                onChange={(e) => updatePackage(pIndex, "isPopular", e.target.checked)}
                className="w-5 h-5 accent-[var(--color-teal-accent)]"
              />
              <label htmlFor={`popular-${pkg.id}`} className="text-white/80">Highlight as "Best Value" (Pro Plan)</label>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs uppercase tracking-widest text-white/50">Features Included</label>
                <button onClick={() => addFeature(pIndex)} className="text-xs text-[var(--color-teal-accent)] hover:text-white flex items-center gap-1">
                  <Plus size={14}/> Add Feature
                </button>
              </div>
              <div className="space-y-3">
                {pkg.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-3 group">
                    <GripVertical size={16} className="text-white/20 cursor-move" />
                    <input 
                      type="text" 
                      value={feature} 
                      onChange={(e) => updateFeature(pIndex, fIndex, e.target.value)}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-white/30 outline-none"
                    />
                    <button onClick={() => removeFeature(pIndex, fIndex)} className="text-white/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-6">
              <label className="block text-xs uppercase tracking-widest text-white/50 mb-3">Example Projects (Included in this package)</label>
              <div className="flex flex-wrap gap-2">
                {availableProjects.map(project => {
                  const isSelected = (pkg.exampleProjects || []).includes(project.id);
                  return (
                    <button
                      key={project.id}
                      onClick={() => toggleProject(pIndex, project.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase border transition-colors ${isSelected ? 'bg-[var(--color-teal-accent)]/20 border-[var(--color-teal-accent)] text-[var(--color-teal-accent)]' : 'bg-transparent border-white/20 text-white/50 hover:border-white/40'}`}
                    >
                      {project.title}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

// Reusing X icon locally
function X(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
