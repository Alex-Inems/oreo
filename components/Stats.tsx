"use client";

import { Gauge, Car, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const Stats = () => {
    const stats = [
        { icon: <Gauge className="w-5 h-5" />, value: "0–100", label: "Under 3.5s" },
        { icon: <Car className="w-5 h-5" />, value: "120+", label: "Luxury Models" },
        { icon: <ShieldCheck className="w-5 h-5" />, value: "100%", label: "Verified History" },
        { icon: <Users className="w-5 h-5" />, value: "5,000+", label: "Happy Owners" },
    ];

    return (
        <section className="section-padding bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="text-center group"
                    >
                        <div className="w-11 h-11 rounded-full bg-[var(--accent-muted)] border border-[var(--border-accent)] flex items-center justify-center text-[var(--accent)] mx-auto mb-4 group-hover:scale-110 transition-transform">
                            {s.icon}
                        </div>
                        <div className="font-display text-3xl md:text-4xl font-light text-[var(--text-primary)] mb-1">{s.value}</div>
                        <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-muted)]">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
