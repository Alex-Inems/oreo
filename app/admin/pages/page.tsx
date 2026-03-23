"use client";

import { useState, useEffect } from "react";
import { subscribePages, addPage, updatePage, deletePage, CustomPage } from "@/lib/pages";
import { Plus, Trash2, Pencil, ExternalLink, Globe, LayoutTemplate, X, Save, Edit3, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AdminPagesPage() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<CustomPage> | null>(null);

  useEffect(() => {
    const unsub = subscribePages((data) => {
      setPages(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing?.title || !editing?.slug) return;
    if (editing.id) await updatePage(editing.id, editing);
    else await addPage(editing);
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm("Are you sure? This cannot be undone.")) return;
    await deletePage(id);
  };

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Custom Pages</h1>
          <p className="text-zinc-500 text-sm mt-1">Create and manage dynamic pages for your website.</p>
        </div>
        <button
          onClick={() => setEditing({ title: "", slug: "", content: "" })}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-red-900/30"
        >
          <Plus className="w-4 h-4" />
          Add New Page
        </button>
      </div>

      {/* Pages List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        </div>
      ) : pages.length === 0 ? (
        <div className="text-center py-20 bg-[#111] rounded-xl border border-white/5">
          <p className="text-zinc-500">No custom pages created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((p) => (
            <div key={p.id} className="bg-[#111] border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all flex flex-col items-start shadow-xl">
               <div className="flex items-center gap-3 w-full border-b border-white/5 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-red-600/10 flex items-center justify-center text-red-500 border border-red-500/20">
                     <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                     <h3 className="text-lg font-bold text-white truncate">{p.title}</h3>
                     <a href={`/${p.slug}`} target="_blank" rel="noreferrer" className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 mt-0.5 truncate transition-colors">
                        <Globe className="w-3 h-3" /> /{p.slug}
                     </a>
                  </div>
               </div>
               <p className="text-xs text-zinc-500 line-clamp-3 w-full mb-6 italic">{p.content.substring(0,100)}...</p>
               <div className="mt-auto flex w-full gap-2">
                  <button onClick={() => setEditing(p)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-semibold text-white transition-all">
                     <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => remove(p.id!)} className="w-10 h-10 flex items-center justify-center bg-red-600/10 hover:bg-red-600/20 rounded-lg text-red-500 transition-all">
                     <Trash2 className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditing(null)} />
          <div className="relative bg-[#0d0d0d] border border-white/10 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[95vh] animate-in slide-in-from-bottom-4 duration-300">
             
             <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Edit3 className="w-5 h-5 text-red-500" />
                   <h2 className="text-xl font-bold tracking-tight text-white">{editing.id ? "Edit Page" : "Create Page"}</h2>
                </div>
                <button onClick={() => setEditing(null)} className="text-zinc-500 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
             </div>

             <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Page Title</label>
                      <input 
                         required
                         value={editing.title} 
                         onChange={(e) => setEditing({...editing, title: e.target.value})} 
                         className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" 
                         placeholder="e.g. Terms of Service" 
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">URL Slug</label>
                      <input 
                         required
                         value={editing.slug} 
                         onChange={(e) => setEditing({...editing, slug: e.target.value})} 
                         className="w-full bg-[#111] border border-white/5 rounded-xl px-4 py-3 text-white text-sm outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500" 
                         placeholder="e.g. terms-of-service" 
                      />
                      <p className="text-[10px] text-zinc-600">This will be your URL: cars26.com/<b>{editing.slug || "terms-of-service"}</b></p>
                   </div>
                </div>

                <div className="space-y-2 flex-1 flex flex-col h-full min-h-[300px]">
                   <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Page Content (HTML supported)</label>
                   <textarea 
                      value={editing.content} 
                      onChange={(e) => setEditing({...editing, content: e.target.value})} 
                      className="w-full flex-1 bg-[#111] border border-white/5 rounded-xl px-4 py-4 text-white text-sm outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 font-mono resize-none leading-relaxed min-h-[400px]" 
                      placeholder="<h1>Write your HTML content here...</h1>" 
                   />
                </div>
             </form>

             <div className="px-8 py-5 border-t border-white/5 flex gap-4 justify-end bg-black/40 rounded-b-2xl">
                <button onClick={() => setEditing(null)} className="px-6 py-2.5 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all shadow-lg shadow-red-900/30">
                   <Save className="w-4 h-4" /> {editing.id ? "Update Page" : "Publish Page"}
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
