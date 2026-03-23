import { SignUp } from "@clerk/nextjs";
import { Car } from "lucide-react";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-15%] w-[45%] h-[45%] bg-zinc-900/40 rounded-full blur-[150px]" />

      <Link href="/" className="flex items-center gap-3 text-white tracking-[0.4em] text-xl font-bold mb-12 relative z-10 group">
        <Car className="w-8 h-8 text-red-600 group-hover:rotate-[-5deg] transition-transform" />
        VELOCITY
      </Link>

      <div className="relative z-10 w-full flex justify-center">
        <SignUp 
          appearance={{
            elements: {
              card: "bg-zinc-900 border border-white/5 shadow-2xl rounded-3xl",
              headerTitle: "text-white font-bold tracking-tight text-xl mb-1",
              headerSubtitle: "text-zinc-600 text-sm",
              socialButtonsBlockButton: "bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all rounded-xl",
              socialButtonsBlockButtonText: "text-white font-medium",
              dividerLine: "bg-white/5",
              dividerText: "text-zinc-700 text-[9px] uppercase tracking-widest font-black",
              formLabel: "text-[9px] text-zinc-500 uppercase tracking-widest font-black mb-1 ml-1",
              formInput: "bg-black/60 border border-zinc-900 rounded-xl text-white focus:ring-1 focus:ring-red-600 text-sm py-2.5",
              formButtonPrimary: "bg-red-600 hover:bg-red-500 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl shadow-lg",
              footerActionText: "text-zinc-600 text-xs",
              footerActionLink: "text-red-500 hover:text-red-400 font-bold ml-1",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-red-500"
            }
          }}
        />
      </div>

      <p className="mt-12 text-[9px] text-zinc-700 uppercase tracking-[0.4em] font-black relative z-10">
        © {new Date().getFullYear()} Velocity Group · Join the Elite Fleet
      </p>
    </div>
  );
}
