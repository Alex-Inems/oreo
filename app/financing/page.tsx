import Link from "next/link";

export default function FinancingPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* 1. Hero */}
            <section className="relative pt-48 pb-32 px-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=2000&q=80" 
                        alt="Finance Background" 
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black" />
                </div>
                <div className="relative z-10 text-center space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500">Financing</h1>
                    <p className="text-xl text-zinc-400 uppercase tracking-widest max-w-2xl mx-auto">Flexible capital solutions for the extraordinary.</p>
                </div>
            </section>

            {/* 2. Options Grid */}
            <section className="py-24 px-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Lease", tag: "Business & Personal", desc: "Preserve capital with our high-residual leasing programs." },
                        { title: "Loan", tag: "Ownership", desc: "Amortize your investment with competitive long-term rates." },
                        { title: "Custom", tag: "Private Wealth", desc: "Bespoke structures for complex financial portfolios." }
                    ].map((opt, i) => (
                        <div key={i} className="group bg-zinc-900/50 border border-zinc-800 p-10 hover:border-red-600 transition-all duration-500 rounded-2xl backdrop-blur-sm">
                            <span className="text-red-500 font-mono text-xs uppercase tracking-widest">{opt.tag}</span>
                            <h3 className="text-4xl font-bold uppercase italic mt-2 mb-4">{opt.title}</h3>
                            <p className="text-zinc-400 mb-10 leading-relaxed">{opt.desc}</p>
                            <ul className="space-y-3 text-sm text-zinc-500 mb-10 border-t border-zinc-800 pt-6">
                                <li className="flex justify-between"><span>Term</span><span className="text-white font-mono">12 - 60 mo</span></li>
                                <li className="flex justify-between"><span>APR</span><span className="text-white font-mono">From 3.49%</span></li>
                            </ul>
                            <Link href="/support?inquiry=financing" className="block text-center w-full border border-white py-4 uppercase font-bold text-xs hover:bg-white hover:text-black transition-all">Apply Now</Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Calculator */}
            <section className="py-24 px-8 bg-zinc-950 border-y border-zinc-800">
                <div className="w-full max-w-[90vw] min-[2000px]:max-w-[1600px] min-[3000px]:max-w-[2000px] mx-auto">
                    <h2 className="text-4xl font-bold uppercase italic mb-16 text-center tracking-tight">Payment Estimator</h2>
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 bg-zinc-900/30 p-10 rounded-2xl border border-zinc-800">
                            <div>
                                <label className="block text-xs uppercase font-bold text-zinc-500 mb-3 tracking-widest">Vehicle Price</label>
                                <input type="text" className="w-full bg-black border border-zinc-800 p-4 text-white font-mono rounded focus:border-red-600 outline-none transition" defaultValue="$120,000" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-bold text-zinc-500 mb-3 tracking-widest">Down Payment</label>
                                <input type="text" className="w-full bg-black border border-zinc-800 p-4 text-white font-mono rounded focus:border-red-600 outline-none transition" defaultValue="$20,000" />
                            </div>
                            <div>
                                <label className="block text-xs uppercase font-bold text-zinc-500 mb-3 tracking-widest">Term (Months)</label>
                                <div className="flex gap-3">
                                    {[36, 48, 60, 72].map(m => (
                                        <button key={m} className={`flex-1 py-4 font-mono border transition ${m === 60 ? 'bg-red-600 border-red-600' : 'bg-black border-zinc-800 hover:border-zinc-600'}`}>{m}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-2xl flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="text-[100px] font-black text-white/5 select-none absolute -top-10 -right-5 italic">CALC</span>
                            </div>
                            <div className="relative z-10">
                                <div className="text-sm font-bold uppercase text-zinc-500 mb-4 tracking-[0.2em]">Estimated Monthly</div>
                                <div className="text-7xl md:text-8xl font-black italic text-white mb-6 drop-shadow-lg">$1,850</div>
                                <p className="text-xs text-zinc-600 max-w-xs">*Excluding tax and fees. Subject to credit verification by our underwriting team.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Contact Finance */}
            <section className="py-32 px-8 text-center">
                <div className="max-w-3xl mx-auto space-y-8">
                    <h2 className="text-5xl font-black uppercase italic tracking-tighter">Bespoke Solutions</h2>
                    <p className="text-zinc-400 text-lg leading-relaxed">Our finance directors specialize in structuring private acquisition deals for high-net-worth individuals, institutional collectors, and premium fleets.</p>
                    <Link href="/support?inquiry=financing" className="inline-block bg-white text-black px-12 py-5 font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-xl">Contact Private Office</Link>
                </div>
            </section>
        </div>
    );
}
