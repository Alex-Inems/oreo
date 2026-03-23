import { SignIn } from "@clerk/nextjs";
import { Car } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Abstract Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-900/40 rounded-full blur-[120px]" />

      <Link href="/" className="flex items-center gap-3 text-white tracking-[0.4em] text-xl font-bold mb-12 relative z-10 hover:scale-105 transition-transform group">
        <Car className="w-7 h-7 text-red-600 group-hover:rotate-[-10deg] transition-transform" />
        oreo
      </Link>

      <div className="relative z-10 w-full flex justify-center">
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-zinc-900 border border-white/5 shadow-2xl rounded-3xl",
              headerTitle: "text-white font-bold tracking-tight",
              headerSubtitle: "text-zinc-500",
              socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all",
              socialButtonsBlockButtonText: "text-white font-medium",
              dividerLine: "bg-white/5",
              dividerText: "text-zinc-600 text-[10px] uppercase tracking-widest font-black",
              formLabelRow: "mb-1",
              formLabel: "text-[10px] text-zinc-500 uppercase tracking-widest font-black ml-1",
              formInput: "bg-black/40 border border-zinc-800 rounded-xl text-white focus:ring-1 focus:ring-red-600 transition-all py-3",
              formButtonPrimary: "bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-red-900/20",
              footerActionText: "text-zinc-500",
              footerActionLink: "text-red-500 hover:text-red-400 font-bold",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-red-500"
            }
          }}
        />
      </div>

      <p className="mt-12 text-[10px] text-zinc-600 uppercase tracking-[0.3em] font-black relative z-10">
        Engineered for performance · Secured by oreo
      </p>
    </div>
  );
}
