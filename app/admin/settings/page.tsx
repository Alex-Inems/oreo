"use client";

import { useState } from "react";
import { Save, Bell, Globe, Shield, Palette, CheckCircle } from "lucide-react";

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

  // General
  const [siteName, setSiteName] = useState("Velocity Cars26");
  const [tagline, setTagline] = useState("Performance & Luxury — Redefined");
  const [contactEmail, setContactEmail] = useState("contact@cars26.com");
  const [phone, setPhone] = useState("+1 (800) 555-0100");

  // Notifications
  const [emailNewInquiry, setEmailNewInquiry] = useState(true);
  const [emailNewReview, setEmailNewReview] = useState(true);
  const [emailNewUser, setEmailNewUser] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);

  // Security
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  // Appearance
  const [accentColor, setAccentColor] = useState("#dc2626");
  const [darkMode, setDarkMode] = useState(true);
  const [showSoldBadge, setShowSoldBadge] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
          <p className="text-zinc-500 text-sm mt-1">Manage your site preferences and admin options.</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-red-900/30"
        >
          {saved ? <CheckCircle className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Sidebar tabs */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:w-48 shrink-0">
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
        <div className="flex-1 bg-[#111] border border-white/6 rounded-xl px-8 py-2">
          {/* ── General ── */}
          {active === "general" && (
            <>
              <InputRow label="Site Name" sub="Displayed in the browser tab and admin header.">
                <input
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Tagline" sub="Subtitle shown in the hero section.">
                <input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Contact Email" sub="Public contact email for the support page.">
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Phone Number" sub="Shown in the footer and contact page.">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
            </>
          )}

          {/* ── Notifications ── */}
          {active === "notifications" && (
            <>
              <InputRow label="New Inquiry" sub="Get notified when a customer submits an inquiry.">
                <Toggle value={emailNewInquiry} onChange={setEmailNewInquiry} />
              </InputRow>
              <InputRow label="New Review" sub="Get notified when a customer submits a review.">
                <Toggle value={emailNewReview} onChange={setEmailNewReview} />
              </InputRow>
              <InputRow label="New User Registration" sub="Get notified when a new client account is created.">
                <Toggle value={emailNewUser} onChange={setEmailNewUser} />
              </InputRow>
              <InputRow label="Daily Digest" sub="Receive a daily summary email with key metrics.">
                <Toggle value={emailDigest} onChange={setEmailDigest} />
              </InputRow>
            </>
          )}

          {/* ── Security ── */}
          {active === "security" && (
            <>
              <InputRow label="Current Password" sub="Enter your current password to make changes.">
                <input
                  type="password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="New Password">
                <input
                  type="password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Confirm Password">
                <input
                  type="password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                />
              </InputRow>
              <InputRow label="Two-Factor Authentication" sub="Add an extra layer of security to your account.">
                <Toggle value={twoFactor} onChange={setTwoFactor} />
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
                    value={accentColor}
                    onChange={(e) => setAccentColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
                  />
                  <span className="text-sm text-zinc-400 font-mono">{accentColor}</span>
                </div>
              </InputRow>
              <InputRow label="Dark Mode" sub="Use dark theme across the admin panel.">
                <Toggle value={darkMode} onChange={setDarkMode} />
              </InputRow>
              <InputRow label="Show Sold Badge" sub="Display 'SOLD' overlay on sold vehicles in inventory.">
                <Toggle value={showSoldBadge} onChange={setShowSoldBadge} />
              </InputRow>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
