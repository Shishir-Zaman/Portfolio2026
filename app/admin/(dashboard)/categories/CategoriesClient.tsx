"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Trash2, Plus, Save } from "lucide-react";
import { CMSCategory } from "../../../../lib/db";

export default function CategoriesClient() {
  const [categories, setCategories] = useState<CMSCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categories),
      });
      if (!res.ok) alert("Failed to save");
      else alert("Saved successfully!");
    } catch (err) {
      alert("Error saving categories");
    } finally {
      setSaving(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newCats = [...categories];
    [newCats[index - 1], newCats[index]] = [newCats[index], newCats[index - 1]];
    setCategories(newCats);
  };

  const moveDown = (index: number) => {
    if (index === categories.length - 1) return;
    const newCats = [...categories];
    [newCats[index], newCats[index + 1]] = [newCats[index + 1], newCats[index]];
    setCategories(newCats);
  };

  const addCategory = () => {
    const id = `new-cat-${Date.now()}`;
    setCategories([...categories, { id, name: "New Category" }]);
  };

  const removeCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const updateCategory = (id: string, field: keyof CMSCategory, value: string) => {
    setCategories(categories.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };

  if (loading) return <div className="text-white/50 animate-pulse">Loading categories...</div>;

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <p className="text-sm text-white/50">Changes are not saved until you click Save.</p>
        <div className="flex gap-4">
          <button
            onClick={addCategory}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <Plus size={16} /> Add Category
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-teal-accent)] hover:bg-[var(--color-teal-accent)]/80 text-black rounded-xl transition-colors text-sm font-bold uppercase tracking-wider disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat, index) => (
          <div key={cat.id} className="glass p-4 md:p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-4 md:items-center relative group">
            
            <div className="flex flex-col gap-2">
              <button onClick={() => moveUp(index)} disabled={index === 0} className="text-white/30 hover:text-white disabled:opacity-20"><ArrowUp size={20}/></button>
              <button onClick={() => moveDown(index)} disabled={index === categories.length - 1} className="text-white/30 hover:text-white disabled:opacity-20"><ArrowDown size={20}/></button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/40 uppercase tracking-widest">ID / Slug</label>
                <input
                  type="text"
                  value={cat.id}
                  onChange={(e) => updateCategory(cat.id, "id", e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[var(--color-teal-accent)]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/40 uppercase tracking-widest">Display Name</label>
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => updateCategory(cat.id, "name", e.target.value)}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 focus:outline-none focus:border-[var(--color-teal-accent)]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-white/40 uppercase tracking-widest">Show on Home</label>
                <button
                  onClick={() => setCategories(categories.map(c => c.id === cat.id ? { ...c, showOnHomepage: !c.showOnHomepage } : c))}
                  className={`mt-1 py-2 px-4 rounded-xl text-xs font-bold tracking-widest uppercase transition-colors ${cat.showOnHomepage ? 'bg-[var(--color-teal-accent)] text-black' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  {cat.showOnHomepage ? 'Visible' : 'Hidden'}
                </button>
              </div>
            </div>

            <button onClick={() => removeCategory(cat.id)} className="p-3 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
