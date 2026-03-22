"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import {
    X, Car, Lock, Mail, ArrowRight, Loader2,
    AlertCircle, LogOut, User, ChromeIcon, CheckCircle, MailCheck, RefreshCw,
} from "lucide-react";
import { useAuth } from "./AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Mode = "login" | "register" | "verify-pending" | "verify-expired" | "logged-in";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const { user, isAuthenticated, logout } = useAuth();

    const [mode, setMode]         = useState<Mode>("login");
    const [name, setName]         = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [confirmPw, setConfirmPw] = useState("");
    const [loading, setLoading]   = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [error, setError]       = useState("");
    const [resending, setResending] = useState(false);
    const [resendDone, setResendDone] = useState(false);

    // Auto-switch to logged-in view
    useEffect(() => {
        if (isAuthenticated && isOpen) setMode("logged-in");
    }, [isAuthenticated, isOpen]);

    // Reset on close
    useEffect(() => {
        if (!isOpen) {
            const t = setTimeout(() => {
                if (!isAuthenticated) setMode("login");
                setName(""); setEmail(""); setPassword(""); setConfirmPw("");
                setError(""); setLoading(false); setGoogleLoading(false);
                setResendDone(false);
            }, 250);
            return () => clearTimeout(t);
        }
    }, [isOpen, isAuthenticated]);

    // Body scroll lock
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    const clearError = () => setError("");

    // ── Google sign-in ─────────────────────────────────────────────────────────
    const handleGoogle = async () => {
        setGoogleLoading(true);
        await signIn("google", { callbackUrl: "/" });
        // Page will redirect — setGoogleLoading stays true
    };

    // ── Credentials sign-in ────────────────────────────────────────────────────
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();
        if (!email.trim() || !password) { setError("Please fill in all fields."); return; }

        setLoading(true);
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });
        setLoading(false);

        if (!res?.ok) {
            const msg = res?.error ?? "Login failed.";
            if (msg === "EMAIL_NOT_VERIFIED") {
                setMode("verify-pending");
            } else {
                setError("Invalid email or password.");
            }
            return;
        }

        onClose();
    };

    // ── Register ───────────────────────────────────────────────────────────────
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        clearError();

        if (!name.trim() || !email.trim() || !password) { setError("All fields are required."); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
        if (password !== confirmPw) { setError("Passwords do not match."); return; }

        setLoading(true);
        const res = await fetch("/api/auth/register", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ name: name.trim(), email: email.trim(), password }),
        });
        const data = await res.json();
        setLoading(false);

        if (!res.ok) { setError(data.error ?? "Registration failed."); return; }

        setMode("verify-pending");
    };

    // ── Resend verification ────────────────────────────────────────────────────
    const handleResend = async () => {
        setResending(true);
        await fetch("/api/auth/resend-verification", {
            method:  "POST",
            headers: { "Content-Type": "application/json" },
            body:    JSON.stringify({ email }),
        });
        setResending(false);
        setResendDone(true);
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Shared shell
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>

                {/* ── LOGGED IN ───────────────────────────────────────────── */}
                {mode === "logged-in" && user && (
                    <>
                        <div className="pt-10 pb-6 px-8 text-center border-b border-white/5">
                            {user.image ? (
                                <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full object-cover mx-auto mb-4 ring-2 ring-red-600/40" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white shadow-lg shadow-red-900/40">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                            <p className="text-white font-semibold text-lg">{user.name}</p>
                            <p className="text-zinc-500 text-sm mt-0.5">{user.email}</p>
                        </div>
                        <div className="p-6 space-y-3">
                            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/3 border border-white/6">
                                <User className="w-4 h-4 text-zinc-500" />
                                <span className="text-sm text-zinc-400">Member Account</span>
                                <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">Active</span>
                            </div>
                            <button
                                onClick={() => { logout(); onClose(); }}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        </div>
                    </>
                )}

                {/* ── VERIFY PENDING ──────────────────────────────────────── */}
                {(mode === "verify-pending" || mode === "verify-expired") && (
                    <div className="px-8 py-10 text-center space-y-5">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto">
                            <MailCheck className="w-7 h-7 text-amber-400" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-white mb-2">
                                {mode === "verify-expired" ? "Link Expired" : "Check your inbox"}
                            </h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                {mode === "verify-expired"
                                    ? "Your verification link has expired. Request a new one below."
                                    : `We sent a verification link to ${email || "your email"}. Click it to activate your account.`
                                }
                            </p>
                            {/* Portfolio convenience: allow skipping the email check */}
                            {!hasCredentials && mode === "verify-pending" && (
                                <p className="text-[10px] text-zinc-600 mt-4 italic">
                                    Portfolio Note: Real emails are disabled. 
                                    <a href={`/api/auth/verify-email?token=DEV`} className="text-red-500/60 hover:text-red-500 ml-1 underline underline-offset-2">
                                        Click here to auto-verify
                                    </a>
                                </p>
                            )}
                        </div>
                        {resendDone ? (
                            <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm">
                                <CheckCircle className="w-4 h-4" /> New link sent!
                            </div>
                        ) : (
                            <button
                                onClick={handleResend}
                                disabled={resending}
                                className="flex items-center gap-2 mx-auto text-sm text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
                            >
                                {resending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                                Resend verification email
                            </button>
                        )}
                        <button onClick={() => setMode("login")} className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
                            ← Back to sign in
                        </button>
                    </div>
                )}

                {/* ── LOGIN / REGISTER ─────────────────────────────────────── */}
                {(mode === "login" || mode === "register") && (
                    <>
                        {/* Header */}
                        <div className="px-8 pt-8 pb-6 bg-gradient-to-b from-red-950/50 to-zinc-900 text-white text-center border-b border-white/5">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-600/20 mb-4 ring-1 ring-red-500/40">
                                <Car className="w-6 h-6 text-red-500" />
                            </div>
                            <h2 className="text-xl font-semibold uppercase tracking-widest mb-1">
                                {mode === "login" ? "Member Access" : "Join Velocity"}
                            </h2>
                            <p className="text-zinc-400 text-sm">
                                {mode === "login" ? "Welcome back to the extraordinary" : "Experience luxury performance"}
                            </p>
                        </div>

                        <div className="p-8 space-y-5">
                            {/* Google */}
                            <button
                                onClick={handleGoogle}
                                disabled={googleLoading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-all disabled:opacity-70"
                            >
                                {googleLoading
                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                    : <ChromeIcon className="w-4 h-4 text-red-500" />
                                }
                                Continue with Google
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-white/8" />
                                <span className="text-xs text-zinc-600 uppercase tracking-widest">or</span>
                                <div className="flex-1 h-px bg-white/8" />
                            </div>

                            {/* Form */}
                            <form
                                onSubmit={mode === "login" ? handleLogin : handleRegister}
                                className="space-y-4"
                                noValidate
                            >
                                {/* Name — register only */}
                                {mode === "register" && (
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest">Full Name</label>
                                        <div className="relative">
                                            <User className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
                                            <input
                                                type="text" required value={name}
                                                onChange={(e) => { setName(e.target.value); clearError(); }}
                                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-600"
                                                placeholder="Alex Johnson"
                                                autoComplete="name"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Email */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest">Email</label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
                                        <input
                                            type="email" required value={email}
                                            onChange={(e) => { setEmail(e.target.value); clearError(); }}
                                            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-600"
                                            placeholder="name@example.com"
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest">Password</label>
                                    <div className="relative">
                                        <Lock className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
                                        <input
                                            type="password" required value={password}
                                            onChange={(e) => { setPassword(e.target.value); clearError(); }}
                                            className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-600"
                                            placeholder="••••••••"
                                            autoComplete={mode === "login" ? "current-password" : "new-password"}
                                        />
                                    </div>
                                </div>

                                {/* Confirm password — register only */}
                                {mode === "register" && (
                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest">Confirm Password</label>
                                        <div className="relative">
                                            <Lock className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3.5" />
                                            <input
                                                type="password" required value={confirmPw}
                                                onChange={(e) => { setConfirmPw(e.target.value); clearError(); }}
                                                className="w-full pl-10 pr-4 py-3 bg-black/40 border border-zinc-800 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition-all placeholder-zinc-600"
                                                placeholder="••••••••"
                                                autoComplete="new-password"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="flex items-start gap-2.5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3 rounded-lg font-semibold text-sm tracking-wide transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/20"
                                >
                                    {loading
                                        ? <Loader2 className="w-4 h-4 animate-spin" />
                                        : <>{mode === "login" ? "Sign In" : "Create Account"} <ArrowRight className="w-4 h-4" /></>
                                    }
                                </button>
                            </form>

                            {/* Toggle */}
                            <p className="text-center text-sm text-zinc-500">
                                {mode === "login" ? "Don't have an account?" : "Already a member?"}
                                <button
                                    onClick={() => { setMode(mode === "login" ? "register" : "login"); clearError(); }}
                                    className="ml-2 text-red-500 hover:text-red-400 transition-colors uppercase tracking-wider text-xs font-bold"
                                >
                                    {mode === "login" ? "Sign Up" : "Sign In"}
                                </button>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
