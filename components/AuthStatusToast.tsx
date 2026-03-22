"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle, X, Mail } from "lucide-react";

export default function AuthStatusToast() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const verified = searchParams.get("verified");
        if (verified) {
            setStatus(verified);
            // Clean up the URL after 5 seconds or when toast is closed
            const t = setTimeout(() => {
                const params = new URLSearchParams(searchParams.toString());
                params.delete("verified");
                router.replace(window.location.pathname + (params.toString() ? `?${params.toString()}` : ""));
            }, 6000);
            return () => clearTimeout(t);
        }
    }, [searchParams, router]);

    if (!status) return null;

    const config = {
        success: {
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
            title: "Email Verified",
            desc: "Your account is active. You can now sign in.",
            bg: "bg-emerald-500/10 border-emerald-500/20",
        },
        expired: {
            icon: <AlertCircle className="w-5 h-5 text-amber-400" />,
            title: "Link Expired",
            desc: "The verification link has expired. Please try signing in to resend.",
            bg: "bg-amber-500/10 border-amber-500/20",
        },
        invalid: {
            icon: <X className="w-5 h-5 text-red-400" />,
            title: "Invalid Link",
            desc: "This verification link is invalid or has already been used.",
            bg: "bg-red-500/10 border-red-500/20",
        },
    }[status as "success" | "expired" | "invalid"];

    if (!config) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[200] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className={`flex items-start gap-4 p-5 rounded-2xl border ${config.bg} backdrop-blur-xl shadow-2xl max-w-sm w-full relative group`}>
                <div className="shrink-0 mt-0.5">{config.icon}</div>
                <div className="flex-1">
                    <p className="text-white font-bold text-sm tracking-wide">{config.title}</p>
                    <p className="text-zinc-400 text-xs mt-1 leading-relaxed">{config.desc}</p>
                </div>
                <button 
                    onClick={() => setStatus(null)}
                    className="shrink-0 text-zinc-600 hover:text-white transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
                
                {/* Visual progress bar */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-white/10 w-full overflow-hidden rounded-b-2xl">
                    <div className="h-full bg-current opacity-20 animate-shrink-width" />
                </div>
            </div>
        </div>
    );
}
