"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Car, Lock, Mail, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const router = useRouter();

  const [email, setEmail] = useState("admin@cars26.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await login(email, password);
    setLoading(false);
    if (res.success) {
      router.replace("/admin");
    } else {
      setError(res.error ?? "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-[#111] border border-white/8 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          {/* Header */}
          <div className="px-10 pt-10 pb-8 border-b border-white/5 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-red-600/15 ring-1 ring-red-500/30 mb-5">
              <Car className="w-7 h-7 text-red-500" />
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Admin Access</h1>
            <p className="text-zinc-500 text-sm mt-1">oreo Cars26 · Back Office</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-10 py-8 space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/3 border border-white/8 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="admin@cars26.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-white/3 border border-white/8 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              id="admin-login-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Sign In to Admin
                </>
              )}
            </button>

            {/* Hint */}
            <p className="text-center text-xs text-zinc-600 pt-1">
              Demo credentials: <span className="text-zinc-400">admin@cars26.com</span> /{" "}
              <span className="text-zinc-400">oreo2025</span>
            </p>
          </form>
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-xs text-zinc-600">
          <a href="/" className="hover:text-zinc-400 transition-colors">
            ← Back to public site
          </a>
        </p>
      </div>
    </div>
  );
}
