"use client";

import { useState } from "react";
import { Save, Plus, Trash2, CheckCircle2, GripVertical, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { BrandLogo } from "../../../../lib/db";

export default function BrandsClient({ initialLogos }: { initialLogos: BrandLogo[] }) {
  const [logos, setLogos] = useState<BrandLogo[]>(initialLogos);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logos),
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

  const addLogo = () => {
    setLogos([
      ...logos,
      {
        id: `brand-${Date.now()}`,
        name: "Brand Name",
        logoUrl: "",
        websiteUrl: "",
      },
    ]);
  };

  const updateLogo = (index: number, field: keyof BrandLogo, value: string) => {
    const updated = [...logos];
    updated[index] = { ...updated[index], [field]: value };
    setLogos(updated);
  };

  const removeLogo = (index: number) => {
    if (confirm("Remove this brand?")) {
      const updated = [...logos];
      updated.splice(index, 1);
      setLogos(updated);
    }
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...logos];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setDragIndex(index);
    setLogos(updated);
  };
  const handleDragEnd = () => setDragIndex(null);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-syncopate font-bold uppercase tracking-widest text-white">
            Brand Logos
          </h1>
          <p className="text-white/50 mt-1 text-sm">
            Manage the client brand logos shown in the pricing page carousel.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={addLogo}
            className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-sm"
          >
            <Plus size={16} /> Add Brand
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              success
                ? "bg-green-400 text-black"
                : "bg-[var(--color-teal-accent)] hover:bg-white text-black"
            }`}
          >
            {saving
              ? "Saving..."
              : success
              ? <><CheckCircle2 size={16} /> Saved</>
              : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      {logos.length > 0 && (
        <div className="mb-8 p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
          <p className="text-xs uppercase tracking-widest text-white/30 mb-4 font-bold">Preview</p>
          <div className="flex flex-wrap gap-3">
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex items-center justify-center px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] min-w-[100px] h-[52px]"
              >
                {logo.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.logoUrl}
                    alt={logo.name}
                    className="max-h-[32px] max-w-[100px] w-auto object-contain filter grayscale opacity-30"
                  />
                ) : (
                  <span className="font-syncopate font-bold text-[10px] uppercase tracking-widest text-white/25 whitespace-nowrap">
                    {logo.name || "Brand"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Brand Cards */}
      <div className="grid gap-4">
        {logos.length === 0 && (
          <div className="text-center py-16 text-white/30 border border-dashed border-white/10 rounded-2xl">
            <ImageIcon size={40} className="mx-auto mb-4 opacity-40" />
            <p>No brands yet. Click "Add Brand" to get started.</p>
          </div>
        )}

        {logos.map((logo, idx) => (
          <div
            key={logo.id}
            draggable
            onDragStart={() => handleDragStart(idx)}
            onDragOver={(e) => handleDragOver(e, idx)}
            onDragEnd={handleDragEnd}
            className={`bg-white/[0.04] border rounded-2xl p-5 relative transition-all ${
              dragIndex === idx ? "border-[var(--color-teal-accent)]/50 shadow-[0_0_20px_rgba(0,245,255,0.08)]" : "border-white/10"
            }`}
          >
            {/* Drag handle */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 cursor-grab active:cursor-grabbing hidden sm:block">
              <GripVertical size={18} />
            </div>

            {/* Delete */}
            <button
              onClick={() => removeLogo(idx)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-2 bg-red-400/10 hover:bg-red-400/20 rounded-lg transition-colors"
            >
              <Trash2 size={16} />
            </button>

            <div className="sm:pl-8 sm:pr-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={logo.name}
                  onChange={(e) => updateLogo(idx, "name", e.target.value)}
                  placeholder="e.g. Zalfii"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-teal-accent)] outline-none"
                />
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  <ImageIcon size={10} className="inline mr-1" />
                  Logo Image URL
                </label>
                <input
                  type="url"
                  value={logo.logoUrl}
                  onChange={(e) => updateLogo(idx, "logoUrl", e.target.value)}
                  placeholder="https://... (leave empty for text)"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-teal-accent)] outline-none"
                />
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold">
                  <LinkIcon size={10} className="inline mr-1" />
                  Website URL (optional)
                </label>
                <input
                  type="url"
                  value={logo.websiteUrl || ""}
                  onChange={(e) => updateLogo(idx, "websiteUrl", e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:border-[var(--color-teal-accent)] outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
