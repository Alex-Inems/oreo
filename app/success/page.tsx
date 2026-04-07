import Link from 'next/link';
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-2xl mx-auto space-y-12">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.5)] animate-pulse">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            Reservation <span className="text-red-600">Locked</span>
          </h1>
          <p className="text-xl text-zinc-400 uppercase tracking-widest font-bold">Protocol fully executed / Asset Secured</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl shadow-2xl space-y-8">
          <p className="text-lg text-zinc-300 leading-relaxed font-sans">
            Your transaction has been verified. Our concierge team will initiate contact within the next 4 business hours to finalize the logistics of your acquisition.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-left">
            <div className="p-6 bg-black/50 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-1">Status</p>
                <p className="text-sm font-bold text-green-500 uppercase">Confirmed</p>
            </div>
             <div className="p-6 bg-black/50 rounded-2xl border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-black mb-1">Queue</p>
                <p className="text-sm font-bold uppercase">Priority: 01</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="/inventory"
            className="flex items-center gap-3 bg-white text-black px-10 py-5 uppercase tracking-[0.3em] font-black text-xs hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl active:scale-95 group"
          >
            <ShoppingBag className="w-4 h-4" /> Keep Exploring fleet
          </Link>
          <Link
            href="/"
            className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest hover:text-white transition-all flex items-center gap-2"
          >
            Return to HQ Registry <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
