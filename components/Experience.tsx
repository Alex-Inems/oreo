"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FallbackImage } from "@/components/UI/FallbackImage";

const Experience = () => (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <FallbackImage
            src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=2000&q=80"
            fallbackSrc="/public/images/car3.jpg"
            alt="Driving experience"
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--text-primary)]/75" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 w-full">
            <div className="max-w-xl">
                <motion.span
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-label text-[var(--accent)]"
                >
                    The Experience
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-display text-4xl md:text-6xl font-light text-white mt-4 mb-6 leading-tight"
                >
                    Feel Every Revolution
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-white/70 text-base md:text-lg leading-relaxed mb-10"
                >
                    Schedule a private viewing or inaugural drive at our showroom. Our specialists tailor every visit to your preferences — no pressure, no rush, just the pure sensation of exceptional engineering.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <Link href="/support?inquiry=test-drive" className="btn-primary">
                        Book a Test Drive
                    </Link>
                    <Link href="/performance" className="inline-block border border-white/30 text-white px-9 py-[0.9rem] text-[0.7rem] font-semibold uppercase tracking-[0.2em] hover:bg-white hover:text-[var(--text-primary)] transition-all">
                        View Performance
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/10">
                {[
                    { val: "3.5s", label: "Avg 0–100" },
                    { val: "250+", label: "Top Speed MPH" },
                    { val: "24/7", label: "Concierge" },
                    { val: "48hr", label: "Delivery Window" },
                ].map((s, i) => (
                    <motion.div
                        key={s.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <p className="font-display text-3xl md:text-4xl text-white">{s.val}</p>
                        <p className="text-[10px] uppercase tracking-widest text-white/50 mt-1">{s.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Experience;
