import Link from 'next/link';

export default function PerformancePage() {
    return (
        <div className="bg-black text-white min-h-screen">
            {/* 1. Hero */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-black">
                    <img 
                        src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=2400&q=80" 
                        alt="Performance Speed" 
                        className="w-full h-full object-cover opacity-60 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black" />
                </div>
                <div className="relative z-10 text-center px-8">
                    <h1 className="text-8xl md:text-9xl font-black italic uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white to-zinc-500 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Speed</h1>
                    <p className="text-xl md:text-2xl text-red-500 font-mono tracking-widest mt-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">ENGINEERING LIMITS REDEFINED</p>
                </div>
            </section>

            {/* 2. Specs Grid */}
            <section className="py-24 px-8 border-y border-zinc-800 bg-zinc-950">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800">
                    {[
                        { label: "Top Speed", val: "250+" },
                        { label: "0-60 MPH", val: "1.9s" },
                        { label: "Horsepower", val: "1000+" },
                        { label: "Lateral G", val: "1.4G" }
                    ].map((stat, i) => (
                        <div key={i} className="p-4">
                            <div className="text-4xl md:text-6xl font-black italic">{stat.val}</div>
                            <div className="text-xs text-red-600 uppercase tracking-[0.2em] font-bold mt-2">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Tech Feature Left */}
            <section className="py-24 px-8">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto grid md:grid-cols-2 min-[2500px]:grid-cols-3 gap-16 items-center">
                    <div className="h-[500px] bg-zinc-800 border border-zinc-700 p-2 relative group overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80" alt="Aero" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition duration-500" />
                        <div className="absolute inset-0 border border-red-600/0 group-hover:border-red-600/50 transition duration-500"></div>
                    </div>
                    <div>
                        <span className="text-red-600 font-mono text-xs">SYSTEM 01</span>
                        <h2 className="text-5xl font-bold uppercase italic mb-6">Aerodynamics</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            Active aero elements adjust 100 times per second to maximize downforce and minimize drag, keeping you glued to the tarmac.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-zinc-900 px-4 py-2 border border-zinc-700 text-xs font-mono">DRAG COEFF: 0.20</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Tech Feature Right */}
            <section className="py-24 px-8 bg-zinc-900">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto grid md:grid-cols-2 min-[2500px]:grid-cols-3 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <span className="text-red-600 font-mono text-xs">SYSTEM 02</span>
                        <h2 className="text-5xl font-bold uppercase italic mb-6">Hybrid Powertrain</h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            F1-derived hybrid technology delivers instant torque fill, eliminating turbo lag and propelling you forward with relentless force.
                        </p>
                    </div>
                    <div className="h-[500px] bg-zinc-800 border border-zinc-700 order-1 md:order-2 overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=800&q=80" alt="Hybrid" className="w-full h-full object-cover opacity-70" />
                    </div>
                </div>
            </section>

            {/* 5. Track Records */}
            <section className="py-24 px-8 border-t border-zinc-800">
                <h2 className="text-3xl font-black uppercase text-center mb-16 italic">Nürburgring Nordschleife Lap Times</h2>
                <div className="w-full max-w-[90vw] min-[2000px]:max-w-[1600px] min-[3000px]:max-w-[2000px] mx-auto space-y-6">
                    {[
                        { car: "Mercedes-AMG One", time: "6:29.090", year: "2022" },
                        { car: "Porsche 911 GT2 RS (Manthey Racing)", time: "6:43.300", year: "2021" },
                        { car: "Mercedes-AMG GT Black Series", time: "6:48.047", year: "2020" },
                        { car: "Lamborghini Aventador SVJ", time: "6:44.970", year: "2018" },
                        { car: "Porsche 911 GT3 (992)", time: "6:59.927", year: "2021" },
                    ].map((record, i) => (
                        <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-800 pb-4 gap-2">
                            <div>
                                <span className="text-xl font-bold uppercase text-zinc-300 block sm:inline">{record.car}</span>
                                <span className="text-sm text-zinc-500 font-mono ml-0 sm:ml-4 block sm:inline">({record.year})</span>
                            </div>
                            <span className="text-2xl font-mono text-red-500 font-bold">{record.time}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. CTA */}
            <section className="py-32 text-center bg-red-900 text-white">
                <h2 className="text-6xl font-black italic uppercase mb-8">Experience It</h2>
                <Link 
                    href="/support?inquiry=performance" 
                    className="inline-block bg-black text-white px-12 py-5 font-bold uppercase tracking-widest hover:scale-105 transition duration-300"
                >
                    Book Test Drive
                </Link>
            </section>
        </div>
    );
}
