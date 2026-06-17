"use client";

const WhyChooseUs = () => (
    <section className="section-padding bg-[var(--bg-elevated)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
                <span className="section-label">The oreo Edge</span>
                <h2 className="section-title mt-4">Why Choose oreo</h2>
                <p className="section-intro mx-auto mt-4">
                    We set a higher standard for how luxury vehicles are sourced, presented, and delivered.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                    { num: "01", title: "Exclusive Inventory", desc: "Access to rare and limited edition performance vehicles not found elsewhere. Our network spans private collections across three continents." },
                    { num: "02", title: "Certified Vehicles", desc: "Every machine undergoes a rigorous 200-point inspection by factory-trained technicians. Full history reports included with every listing." },
                    { num: "03", title: "Transparent Pricing", desc: "Direct market-reflective pricing with zero hidden fees or surprises. What you see is what you pay — always." },
                ].map((item) => (
                    <div key={item.num} className="card-surface p-8 md:p-10 group h-full">
                        <span className="font-display text-5xl text-[var(--accent)]/25 group-hover:text-[var(--accent)]/50 transition-colors">{item.num}</span>
                        <h3 className="font-display text-xl md:text-2xl font-light text-[var(--text-primary)] mt-4 mb-4">{item.title}</h3>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default WhyChooseUs;
