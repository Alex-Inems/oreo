"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const REVIEWS = [
    {
        quote: "oreo delivered an experience that matched the car itself. Smooth, transparent, exceptional.",
        author: "Daniel Roberts",
        role: "GT Owner",
    },
    {
        quote: "From first inquiry to delivery, every detail was handled with white-glove care. Truly world-class.",
        author: "Sarah Chen",
        role: "McLaren 720S Owner",
    },
    {
        quote: "The most transparent luxury car purchase I've ever made. No hidden fees, no surprises — just excellence.",
        author: "Marcus Webb",
        role: "Porsche GT3 RS Owner",
    },
];

const Testimonial = () => (
    <section className="section-padding bg-[var(--bg-elevated)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-14">
                <span className="section-label">Client Voices</span>
                <h2 className="section-title mt-4">Trusted by Enthusiasts</h2>
                <p className="section-intro mx-auto mt-4">
                    Hear from owners who chose oreo for their most significant automotive acquisitions.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {REVIEWS.map((review, i) => (
                    <motion.div
                        key={review.author}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="card-surface p-8 md:p-10 flex flex-col"
                    >
                        <div className="flex gap-0.5 mb-6">
                            {[...Array(5)].map((_, j) => (
                                <Star key={j} className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                            ))}
                        </div>
                        <blockquote className="font-display text-xl md:text-2xl font-light text-[var(--text-primary)] leading-relaxed flex-1 mb-8">
                            &ldquo;{review.quote}&rdquo;
                        </blockquote>
                        <div className="pt-6 border-t border-[var(--border-subtle)]">
                            <p className="text-sm font-medium text-[var(--text-primary)]">{review.author}</p>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">{review.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link href="/reviews" className="btn-outline">
                    Read All Reviews
                </Link>
            </div>
        </div>
    </section>
);

export default Testimonial;
