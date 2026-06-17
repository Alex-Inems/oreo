"use client";

const Process = () => (
    <section className="section-padding bg-[var(--bg-muted)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-20">
                <span className="section-label">How It Works</span>
                <h2 className="section-title mt-4">The oreo Process</h2>
                <p className="section-intro mx-auto mt-4">
                    Three deliberate steps from discovery to delivery — designed around you.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
                {[
                    { step: "01", title: "Browse Inventory", desc: "Explore our curated selection online or visit our showroom. Filter by marque, performance, or price — every listing includes full specs and history.", detail: "500+ vehicles browsed monthly" },
                    { step: "02", title: "Personal Consultation", desc: "Speak with our performance specialists about your needs, preferences, and financing options. Private viewings available by appointment.", detail: "Dedicated specialist assigned" },
                    { step: "03", title: "Inaugural Drive", desc: "Experience the machine on your terms with our concierge service. White-glove delivery to your door, anywhere in the country.", detail: "48-hour delivery available" },
                ].map((p, i) => (
                    <div key={i} className="relative">
                        {i < 2 && (
                            <div className="hidden md:block absolute top-8 left-[calc(100%+1rem)] w-[calc(100%-2rem)] h-px bg-gradient-to-r from-[var(--accent)]/40 to-transparent" />
                        )}
                        <div className="card-surface p-8 md:p-10 h-full">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[var(--accent)]/30 text-[var(--accent)] font-display text-xl mb-6">
                                {p.step}
                            </div>
                            <h3 className="font-display text-xl md:text-2xl font-light text-[var(--text-primary)] mb-3">{p.title}</h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">{p.desc}</p>
                            <p className="text-[10px] uppercase tracking-widest text-[var(--accent)]">{p.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Process;
