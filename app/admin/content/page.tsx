"use client";

import { useState, useEffect } from "react";
import { getSiteContent, updateSiteContent, SiteContent, DEFAULT_CONTENT } from "@/lib/cms";
import { 
  Save, RefreshCcw, Eye, Layout, Type, 
  Mail, Phone, Info, Loader2, CheckCircle2 
} from "lucide-react";

export default function ContentManager() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function init() {
      const data = await getSiteContent();
      setContent(data);
      setLoading(false);
    }
    init();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await updateSiteContent(content);
    setSaving(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const updateField = (section: keyof SiteContent, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: typeof prev[section] === "object" 
        ? { ...(prev[section] as any), [field]: value }
        : value
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        <p className="text-zinc-500 font-medium tracking-widest text-xs uppercase">Initializing CMS...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-white/5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 italic">Site Content Manager</h1>
          <p className="text-zinc-500 text-sm">Control every headline, paragraph, and contact method on your website from here.</p>
        </div>
        <div className="flex items-center gap-3">
          <a 
            href="/" 
            target="_blank" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-white/10 transition-all uppercase tracking-widest"
          >
            <Eye className="w-4 h-4" />
            Live Site
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              success 
                ? "bg-emerald-600 text-white shadow-emerald-900/40" 
                : "bg-red-600 hover:bg-red-500 text-white shadow-red-900/40 disabled:opacity-50"
            }`}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : (success ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
            {saving ? "Publishing..." : (success ? "Published!" : "Publish Changes")}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section: Hero */}
          <section className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <Layout className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white tracking-widest uppercase italic">Hero Presence</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Main Heading</label>
                <input 
                  value={content.hero.title}
                  onChange={(e) => updateField("hero", "title", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-700"
                  placeholder="e.g. REDEFINE THE EXTRAORDINARY"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Sub-Headline</label>
                <input 
                  value={content.hero.subtitle}
                  onChange={(e) => updateField("hero", "subtitle", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-700 font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Call to Action (Button Text)</label>
                <input 
                  value={content.hero.cta}
                  onChange={(e) => updateField("hero", "cta", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-700"
                />
              </div>
            </div>
          </section>

          {/* Section: Mission */}
          <section className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <Type className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-bold text-white tracking-widest uppercase italic">Mission Statement</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Heading</label>
                <input 
                  value={content.mission.heading}
                  onChange={(e) => updateField("mission", "heading", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-white focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Description Paragraph</label>
                <textarea 
                  value={content.mission.text}
                  onChange={(e) => updateField("mission", "text", e.target.value)}
                  rows={4}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl px-5 py-4 text-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all resize-none leading-relaxed"
                />
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar: Global Config */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-zinc-900/60 border border-white/5 rounded-3xl p-6 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Info className="w-5 h-5 text-red-500" />
              <h2 className="text-sm font-bold text-white tracking-widest uppercase">Global Info</h2>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Site Email
                </label>
                <input 
                  value={content.contact_email}
                  onChange={(e) => updateField("contact_email", "", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Phone className="w-3 h-3" /> Phone Number
                </label>
                <input 
                  value={content.contact_phone}
                  onChange={(e) => updateField("contact_phone", "", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-2">
                  <RefreshCcw className="w-3 h-3" /> Footer Tagline
                </label>
                <input 
                  value={content.footer_tagline}
                  onChange={(e) => updateField("footer_tagline", "", e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white transition-all"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-red-600/5 border border-red-900/20 mt-4">
              <p className="text-[10px] text-red-400 font-medium leading-relaxed">
                ℹ️ Changes saved here will immediately update the live website. Ensure spellings are correct before publishing.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
