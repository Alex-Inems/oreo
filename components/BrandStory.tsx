"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FallbackImage } from "@/components/UI/FallbackImage";

const BrandStory = () => (
    <section className="section-padding bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-[4/5] overflow-hidden rounded-sm">
                        <FallbackImage
                            src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80"
                            fallbackSrc="/public/images/car2.jpg"
                            alt="Luxury vehicle detail"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-48 h-48 border border-[var(--accent)]/30 hidden md:block" />
                    <div className="absolute top-8 -left-4 bg-[var(--bg-elevated)] px-5 py-4 shadow-[var(--shadow-card)] border border-[var(--border-subtle)]">
                        <p className="font-display text-3xl text-[var(--accent)]">Since 2010</p>
                        <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">Curating Excellence</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                >
                    <span className="section-label">Our Story</span>
                    <h2 className="section-title mt-4 mb-6">
                        Where Passion Meets Precision
                    </h2>
                    <p className="section-intro mb-6">
                        oreo was founded on a simple belief: acquiring a performance vehicle should feel as exceptional as driving one. Every car in our collection is hand-selected, meticulously inspected, and presented with complete transparency.
                    </p>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8">
                        From rare hypercars to daily-driven grand tourers, we partner with collectors and enthusiasts worldwide — offering concierge service, bespoke financing, and a buying experience worthy of the machines we represent.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mb-10">
                        {["Factory-trained technicians", "White-glove delivery", "Global sourcing network", "Lifetime ownership support"].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                    <Link href="/support" className="btn-outline">
                        Speak With Us
                    </Link>
                </motion.div>
            </div>
        </div>
    </section>
);

export default BrandStory;
