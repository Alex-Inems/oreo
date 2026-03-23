"use client";

import { useState, useEffect } from "react";
import { Save, Bell, Globe, Shield, Palette, CheckCircle, Loader2 } from "lucide-react";
import { subscribeSettings, updateSettings, DEFAULT_SETTINGS, SiteSettings } from "@/lib/settings";

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
}
const SECTIONS: Section[] = [
  { id: "general",       label: "General",        icon: Globe },
  { id: "notifications", label: "Notifications",  icon: Bell },
  { id: "security",      label: "Security",       icon: Shield },
  { id: "appearance",    label: "Appearance",     icon: Palette },
];

function InputRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-4 py-5 border-b border-white/5 last:border-0">
      <div className="sm:w-64 shrink-0">
        <p className="text-sm font-medium text-white">{label}</p>
        {sub && <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        value ? "bg-red-600" : "bg-zinc-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [active, setActive] = useState("general");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const unsub = subscribeSettings((data) => {
      setSettings(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const updateSetting = (key: keyof SiteSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await updateSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-red-600 animate-spin" />
        <p className="text-zinc-500 font-medium tracking-widest text-xs uppercase">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your site preferences and admin options.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className={`flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-lg ${
            saved 
              ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/40" 
              : "bg-red-600 hover:bg-red-500 text-white shadow-red-900/30 disabled:opacity-50"
          }`}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : (saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />)}
          {saving ? "Saving..." : (saved ? "Saved!" : "Save Changes")}
        </button>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto scrollbar-hide lg:w-48 shrink-0">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-left whitespace-nowrap transition-all ${
                active === id
                  ? "bg-red-600/15 text-red-400 border border-red-500/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Panel */}
        <div className="flex-1 bg-[#111] border border-white/6 rounded-xl px-4 sm:px-8 py-2">
          {/* ── General ── */}
          {active === "general" && (
            <>
              <InputRow label="Site Name" sub="Displayed in the browser tab and admin header.">
                <input
                  value={settings.siteName}
                  onChange={(e) => updateSetting("siteName", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Tagline" sub="Subtitle shown in the hero section.">
                <input
                  value={settings.tagline}
                  onChange={(e) => updateSetting("tagline", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Contact Email" sub="Public contact email for the support page.">
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => updateSetting("contactEmail", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Phone Number" sub="Shown in the footer and contact page.">
                <input
                  value={settings.phone}
                  onChange={(e) => updateSetting("phone", e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
            </>
          )}

          {/* ── Notifications ── */}
          {active === "notifications" && (
            <>
              <InputRow label="New Inquiry" sub="Get notified when a customer submits an inquiry.">
                <Toggle value={settings.emailNewInquiry} onChange={(v) => updateSetting("emailNewInquiry", v)} />
              </InputRow>
              <InputRow label="New Review" sub="Get notified when a customer submits a review.">
                <Toggle value={settings.emailNewReview} onChange={(v) => updateSetting("emailNewReview", v)} />
              </InputRow>
              <InputRow label="New User Registration" sub="Get notified when a new client account is created.">
                <Toggle value={settings.emailNewUser} onChange={(v) => updateSetting("emailNewUser", v)} />
              </InputRow>
              <InputRow label="Daily Digest" sub="Receive a daily summary email with key metrics.">
                <Toggle value={settings.emailDigest} onChange={(v) => updateSetting("emailDigest", v)} />
              </InputRow>
            </>
          )}

          {/* ── Security ── */}
          {active === "security" && (
            <>
              <InputRow label="Current Password" sub="Enter your current password to make changes.">
                <input
                  type="password"
                  value=""
                  onChange={() => {}}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="New Password">
                <input
                  type="password"
                  value=""
                  onChange={() => {}}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Two-Factor Authentication" sub="Add an extra layer of security to your account.">
                <Toggle value={settings.twoFactor} onChange={(v) => updateSetting("twoFactor", v)} />
              </InputRow>
            </>
          )}

          {/* ── Appearance ── */}
          {active === "appearance" && (
            <>
              <InputRow label="Accent Color" sub="Primary brand color used in buttons and highlights.">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.accentColor}
                    onChange={(e) => updateSetting("accentColor", e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
                  />
                  <span className="text-sm text-zinc-400 font-mono">{settings.accentColor}</span>
                </div>
              </InputRow>
              <InputRow label="Dark Mode" sub="Use dark theme across the admin panel.">
                <Toggle value={settings.darkMode} onChange={(v) => updateSetting("darkMode", v)} />
              </InputRow>
              <InputRow label="Show Sold Badge" sub="Display 'SOLD' overlay on sold vehicles in inventory.">
                <Toggle value={settings.showSoldBadge} onChange={(v) => updateSetting("showSoldBadge", v)} />
              </InputRow>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
