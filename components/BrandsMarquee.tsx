"use client";

const BRANDS = [
    "Porsche", "Lamborghini", "Ferrari", "McLaren", "Mercedes-AMG",
    "Aston Martin", "Bentley", "Bugatti", "Rolls-Royce", "BMW M",
];

const BrandsMarquee = () => (
    <section className="py-10 bg-[var(--bg-muted)] border-y border-[var(--border-subtle)] overflow-hidden">
        <p className="text-center text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)] mb-8">
            Representing the World&apos;s Finest Marques
        </p>
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--bg-muted)] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--bg-muted)] to-transparent z-10" />
            <div className="marquee-track">
                {[...BRANDS, ...BRANDS].map((brand, i) => (
                    <span
                        key={`${brand}-${i}`}
                        className="font-display text-2xl md:text-3xl font-light text-[var(--text-primary)]/20 hover:text-[var(--accent)] transition-colors px-10 md:px-14 whitespace-nowrap"
                    >
                        {brand}
                    </span>
                ))}
            </div>
        </div>
    </section>
);

export default BrandsMarquee;
