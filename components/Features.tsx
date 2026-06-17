"use client";

import { Fuel, Gauge, ShieldCheck, Settings } from "lucide-react";

const Features = () => {
    const features = [
        { icon: <Fuel className="w-5 h-5" />, title: "Fuel Efficiency", desc: "Optimized engines for maximum mileage without compromising performance." },
        { icon: <Gauge className="w-5 h-5" />, title: "High Performance", desc: "0–100 in under 3.5 seconds across our performance tier collection." },
        { icon: <ShieldCheck className="w-5 h-5" />, title: "Safety First", desc: "Advanced driver assistance and safety systems on every vehicle." },
        { icon: <Settings className="w-5 h-5" />, title: "Customizable", desc: "Bespoke configuration options to match your exact preferences." },
    ];

    return (
        <section className="section-padding bg-[var(--bg-elevated)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="text-center mb-16">
                    <span className="section-label">Capabilities</span>
                    <h2 className="section-title mt-4">Built for Excellence</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f, i) => (
                        <div key={i} className="card-surface p-8 text-center group">
                            <div className="w-14 h-14 rounded-full bg-[var(--accent-muted)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent)] mx-auto mb-6 group-hover:border-[var(--border-accent)] transition-colors">
                                {f.icon}
                            </div>
                            <h3 className="font-display text-lg md:text-xl font-light text-[var(--text-primary)] mb-3">{f.title}</h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
