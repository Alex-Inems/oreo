"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";
import { ArrowRight } from "lucide-react";

const Hero = () => {
    const { content } = useSiteContent();

    return (
        <section className="relative min-h-[110vh] flex items-stretch overflow-hidden bg-[var(--bg-elevated)]">
            <div className="absolute inset-0 lg:left-[42%]">
                <div
                    className="absolute inset-0 scale-105"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80)",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-elevated)] via-[var(--bg-elevated)]/60 to-transparent lg:via-[var(--bg-elevated)]/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-elevated)]/40 lg:hidden" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 flex flex-col justify-center pt-36 pb-24 lg:pt-40 lg:pb-32">
                <div className="max-w-2xl">
                    <motion.span
                        initial={{ opacity: 0, x: -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        className="section-label mb-8"
                    >
                        {content.hero.subtitle}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.1 }}
                        className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-[var(--text-primary)] leading-[1.02] tracking-tight mb-8"
                    >
                        {content.hero.title}
                    </motion.h1>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.25 }}
                        className="gold-line mb-8 origin-left"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.35 }}
                        className="text-xs font-semibold text-[var(--accent)] uppercase tracking-[0.35em] mb-3"
                    >
                        {content.mission.heading}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="text-base md:text-lg text-[var(--text-muted)] max-w-lg mb-10 leading-relaxed"
                    >
                        {content.mission.text}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="flex flex-col sm:flex-row items-start gap-4 mb-16"
                    >
                        <Link href="/inventory" className="btn-primary">
                            {content.hero.cta}
                        </Link>
                        <Link href="/performance" className="btn-outline">
                            Explore Performance
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="grid grid-cols-3 gap-6 pt-8 border-t border-[var(--border-subtle)] max-w-md"
                    >
                        {[
                            { val: "120+", label: "Vehicles" },
                            { val: "15+", label: "Brands" },
                            { val: "98%", label: "Satisfaction" },
                        ].map((s) => (
                            <div key={s.label}>
                                <p className="font-display text-2xl md:text-3xl text-[var(--text-primary)]">{s.val}</p>
                                <p className="text-[9px] uppercase tracking-widest text-[var(--text-muted)] mt-1">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <Link
                href="#collection"
                className="absolute bottom-10 right-8 hidden lg:flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
            >
                Discover
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </section>
    );
};

export default Hero;
