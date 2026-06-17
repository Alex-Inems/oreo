"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const NewsletterCTA = () => {
    const [email, setEmail] = useState("");

    return (
        <section className="section-padding bg-[var(--bg-muted)] border-t border-[var(--border-subtle)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="relative overflow-hidden rounded-sm bg-[var(--text-primary)] px-8 py-16 md:px-16 md:py-20">
                    <div className="absolute inset-0 opacity-10"
                        style={{
                            backgroundImage: "url(https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <span className="text-[10px] uppercase tracking-[0.35em] text-[var(--accent)] font-semibold">
                                Stay Informed
                            </span>
                            <h2 className="font-display text-3xl md:text-5xl font-light text-white mt-3 mb-4 leading-tight">
                                Never Miss a New Arrival
                            </h2>
                            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md">
                                Be the first to know when rare inventory lands. Exclusive previews, private events, and market insights — delivered to your inbox.
                            </p>
                        </div>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col sm:flex-row gap-0"
                        >
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email address"
                                className="flex-1 bg-white/10 border border-white/20 px-5 py-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--accent)] outline-none"
                            />
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 bg-[var(--accent)] text-[var(--text-on-accent)] px-8 py-4 text-[0.7rem] font-bold uppercase tracking-[0.2em] hover:bg-[var(--accent-hover)] transition-colors"
                            >
                                Subscribe <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCTA;
