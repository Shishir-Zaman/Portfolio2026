"use client";

import { useState, useEffect } from "react";
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Edit3, X } from "lucide-react";
import { CMSProject, CMSCategory } from "../../../../lib/db";
import CloudinaryUpload from "./CloudinaryUpload";

export default function ProjectsClient({ availableCategories }: { availableCategories: CMSCategory[] }) {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // New state for draft edits
  const [tempProject, setTempProject] = useState<CMSProject | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projects),
      });
      if (!res.ok) alert("Failed to save");
      else alert("Saved successfully!");
    } catch (err) {
      alert("Error saving projects");
    } finally {
      setSaving(false);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newProj = [...projects];
    [newProj[index - 1], newProj[index]] = [newProj[index], newProj[index - 1]];
    setProjects(newProj);
  };

  const moveDown = (index: number) => {
    if (index === projects.length - 1) return;
    const newProj = [...projects];
    [newProj[index], newProj[index + 1]] = [newProj[index + 1], newProj[index]];
    setProjects(newProj);
  };

  const addProject = () => {
    const id = `new-project-${Date.now()}`;
    const newProject: CMSProject = {
      id,
      slug: id,
      title: "New Project",
      tags: [],
      image: "",
      gallery: [],
      description: "",
      year: new Date().getFullYear().toString(),
    };
    setProjects([...projects, newProject]);
    setEditingId(id);
    setTempProject(newProject);
  };

  const removeProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== id));
      if (editingId === id) {
        setEditingId(null);
        setTempProject(null);
      }
    }
  };

  const updateTempProject = (updates: Partial<CMSProject>) => {
    if (tempProject) {
      setTempProject({ ...tempProject, ...updates });
    }
  };

  const toggleTempTag = (tag: string) => {
    if (!tempProject) return;
    const newTags = tempProject.tags.includes(tag)
      ? tempProject.tags.filter((t) => t !== tag)
      : [...tempProject.tags, tag];
    updateTempProject({ tags: newTags });
  };

  // ── Gallery Groups Helpers ──
  const addGalleryGroup = () => {
    if (!tempProject) return;
    const newGroups = [...(tempProject.galleryGroups || []), { title: "New Section", images: [] }];
    updateTempProject({ galleryGroups: newGroups });
  };

  const updateGalleryGroupTitle = (index: number, title: string) => {
    if (!tempProject || !tempProject.galleryGroups) return;
    const newGroups = [...tempProject.galleryGroups];
    newGroups[index].title = title;
    updateTempProject({ galleryGroups: newGroups });
  };

  const removeGalleryGroup = (index: number) => {
    if (!tempProject || !tempProject.galleryGroups) return;
    const newGroups = [...tempProject.galleryGroups];
    newGroups.splice(index, 1);
    updateTempProject({ galleryGroups: newGroups });
  };

  const addImageToGroup = (groupIndex: number, url: string) => {
    if (!tempProject || !tempProject.galleryGroups) return;
    const newGroups = [...tempProject.galleryGroups];
    newGroups[groupIndex].images.push(url);
    updateTempProject({ galleryGroups: newGroups });
  };

  const removeImageFromGroup = (groupIndex: number, imageIndex: number) => {
    if (!tempProject || !tempProject.galleryGroups) return;
    const newGroups = [...tempProject.galleryGroups];
    newGroups[groupIndex].images.splice(imageIndex, 1);
    updateTempProject({ galleryGroups: newGroups });
  };

  const openEditor = (project: CMSProject) => {
    setTempProject({ ...project });
    setEditingId(project.id);
  };

  const closeEditor = () => {
    setTempProject(null);
    setEditingId(null);
  };

  const saveEditor = () => {
    if (tempProject) {
      setProjects(projects.map((p) => (p.id === tempProject.id ? tempProject : p)));
    }
    closeEditor();
  };

  if (loading) return <div className="text-white/50 animate-pulse">Loading projects...</div>;

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <p className="text-sm text-white/50">Changes are not saved until you click Save.</p>
        <div className="flex gap-4">
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <Plus size={16} /> Add Project
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-teal-accent)] hover:bg-[var(--color-teal-accent)]/80 text-black rounded-xl transition-colors text-sm font-bold uppercase tracking-wider disabled:opacity-50"
          >
            <Save size={16} /> {saving ? "Saving..." : "Save All"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={project.id} className="glass rounded-3xl border border-white/10 overflow-hidden flex flex-col relative group">
            
            {/* Image Preview */}
            <div className="w-full aspect-[4/3] bg-black/50 relative border-b border-white/10">
              {project.image ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
              )}
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <button onClick={() => openEditor(project)} className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                   <Edit3 size={20} />
                 </button>
                 <button onClick={() => removeProject(project.id)} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
                   <Trash2 size={20} />
                 </button>
              </div>

              {/* Order buttons */}
              <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => moveUp(index)} disabled={index === 0} className="p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black disabled:opacity-30"><ArrowUp size={16}/></button>
                <button onClick={() => moveDown(index)} disabled={index === projects.length - 1} className="p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white hover:bg-black disabled:opacity-30"><ArrowDown size={16}/></button>
              </div>
            </div>

            <div className="p-6 flex flex-col gap-2">
              <h3 className="text-xl font-bold uppercase tracking-wide truncate">{project.title}</h3>
              <p className="text-white/50 text-sm">{project.tags.join(", ") || "No tags"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {editingId && tempProject && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-[var(--color-teal-accent)]">Edit Project</h2>
              <button onClick={closeEditor} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest">Project Title</label>
                  <input type="text" value={tempProject.title} onChange={(e) => updateTempProject({ title: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest">URL Slug</label>
                  <input type="text" value={tempProject.slug || tempProject.id} onChange={(e) => updateTempProject({ slug: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest">Year</label>
                  <input type="text" value={tempProject.year || ""} onChange={(e) => updateTempProject({ year: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest">Categories</label>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {availableCategories.map(cat => (
                      <button
                        key={cat.name}
                        onClick={() => toggleTempTag(cat.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase border transition-colors ${tempProject.tags.includes(cat.name) ? 'bg-[var(--color-teal-accent)]/20 border-[var(--color-teal-accent)] text-[var(--color-teal-accent)]' : 'bg-transparent border-white/20 text-white/50 hover:border-white/40'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-white/40 uppercase tracking-widest">Description</label>
                <textarea rows={4} value={tempProject.description || ""} onChange={(e) => updateTempProject({ description: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none resize-none" />
              </div>

              {/* Case Study Details */}
              <div className="border-t border-white/10 pt-8 flex flex-col gap-6">
                <h3 className="text-lg font-bold uppercase tracking-widest text-white/70">Client & Case Study Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Client Name</label>
                    <input type="text" value={tempProject.client || ""} onChange={(e) => updateTempProject({ client: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Website URL</label>
                    <input type="text" value={tempProject.websiteUrl || ""} onChange={(e) => updateTempProject({ websiteUrl: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Instagram Handle (@)</label>
                    <input type="text" value={tempProject.instagramHandle || ""} onChange={(e) => updateTempProject({ instagramHandle: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest">Facebook URL</label>
                    <input type="text" value={tempProject.facebookUrl || ""} onChange={(e) => updateTempProject({ facebookUrl: e.target.value })} className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-[var(--color-teal-accent)] outline-none" />
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-col gap-6">
                 <h3 className="text-lg font-bold uppercase tracking-widest text-white/70">Media</h3>
                 
                 <CloudinaryUpload 
                    label="Cover Image (Thumbnail & Hero)" 
                    value={tempProject.image} 
                    onChange={(url) => updateTempProject({ image: url })} 
                 />

                 <div className="flex flex-col gap-2">
                   <label className="text-xs text-white/40 uppercase tracking-widest flex justify-between">
                      <span>Project Gallery</span>
                      <span className="text-white/20">{tempProject.gallery?.length || 0} images</span>
                   </label>
                   
                   <div className="columns-2 md:columns-3 gap-4 mb-2 space-y-4">
                      {tempProject.gallery?.map((img, i) => (
                         <div key={i} className="relative rounded-xl overflow-hidden group border border-white/10 break-inside-avoid">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={img} alt="gallery" className="w-full h-auto object-cover" />
                            <button onClick={() => {
                                const newGal = [...(tempProject.gallery || [])];
                                newGal.splice(i, 1);
                                updateTempProject({ gallery: newGal });
                            }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                               <X size={16} />
                            </button>
                         </div>
                      ))}
                   </div>
                   
                   <CloudinaryUpload 
                      label="Add to Default Gallery" 
                      value=""
                      onChange={(url) => {
                         updateTempProject({ gallery: [...(tempProject.gallery || []), url] });
                      }} 
                   />
                 </div>

                 {/* Gallery Groups */}
                 <div className="flex flex-col gap-4 mt-4 border-t border-white/10 pt-6">
                    <div className="flex justify-between items-center">
                      <label className="text-xs text-white/40 uppercase tracking-widest">Structured Gallery Sections</label>
                      <button onClick={addGalleryGroup} className="flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-xs uppercase tracking-wider transition-colors">
                        <Plus size={14} /> Add Section
                      </button>
                    </div>

                    {tempProject.galleryGroups?.map((group, groupIndex) => (
                      <div key={groupIndex} className="bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col gap-4">
                        <div className="flex gap-4 items-start">
                          <div className="flex-1 flex flex-col gap-2">
                            <label className="text-[10px] text-white/40 uppercase tracking-widest">Section Title</label>
                            <input 
                              type="text" 
                              value={group.title} 
                              onChange={(e) => updateGalleryGroupTitle(groupIndex, e.target.value)} 
                              className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-[var(--color-teal-accent)] outline-none" 
                            />
                          </div>
                          <button onClick={() => removeGalleryGroup(groupIndex)} className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg mt-6 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex flex-col gap-2 mt-2">
                          <div className="columns-2 md:columns-3 gap-4 mb-2 space-y-4">
                            {group.images.map((img, i) => (
                               <div key={i} className="relative rounded-xl overflow-hidden group border border-white/10 break-inside-avoid">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={img} alt="gallery" className="w-full h-auto object-cover" />
                                  <button onClick={() => removeImageFromGroup(groupIndex, i)} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                     <X size={16} />
                                  </button>
                               </div>
                            ))}
                          </div>
                          
                          <CloudinaryUpload 
                            label="Add Image to Section" 
                            value=""
                            onChange={(url) => addImageToGroup(groupIndex, url)} 
                          />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-white/10 bg-black/50 flex justify-end gap-4">
              <button onClick={closeEditor} className="px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button onClick={saveEditor} className="px-6 py-3 rounded-xl bg-[var(--color-teal-accent)] text-black font-bold uppercase tracking-widest text-sm hover:bg-[var(--color-teal-accent)]/80 transition-colors">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
