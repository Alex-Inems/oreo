"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { subscribeInventory, Car as InventoryCar } from "@/lib/inventory";
import { Loader2 } from "lucide-react";
import { FallbackImage } from "@/components/UI/FallbackImage";

export default function InventoryClient() {
    const [activeFilter, setActiveFilter] = useState("All");
    const [cars, setCars] = useState<InventoryCar[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = subscribeInventory((data) => {
            setCars(data);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    const FILTERS = ["All", ...Array.from(new Set(cars.map((c) => c.bodyType).filter(Boolean)))];

    const filteredCars = activeFilter === "All"
        ? cars
        : cars.filter((car) => car.bodyType === activeFilter);

    const speedSpec = (car: InventoryCar) => car.specs?.find((s) => s.label.toLowerCase().includes("0-60"))?.value || "N/A";
    const rangeSpec = (car: InventoryCar) => car.specs?.find((s) => s.label.toLowerCase().includes("range"))?.value;

    if (loading) {
        return (
            <div className="bg-[var(--bg-primary)] min-h-screen flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
                <p className="text-[10px] font-medium tracking-[0.3em] uppercase text-[var(--text-muted)]">Loading Fleet</p>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen">
            <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-8 text-center border-b border-[var(--border-subtle)]">
                <span className="section-label">Full Collection</span>
                <h1 className="section-title mt-4">Current Inventory</h1>
                <p className="text-sm text-[var(--text-muted)] mt-4 uppercase tracking-[0.2em]">Performance & Luxury Vehicles</p>
            </section>

            <section className="sticky top-[72px] z-40 bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)]">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex gap-2 overflow-x-auto no-scrollbar">
                    {FILTERS.map((filter, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveFilter(filter as string)}
                            className={`text-[10px] font-semibold uppercase tracking-widest px-5 py-2 border transition cursor-pointer whitespace-nowrap ${
                                activeFilter === filter
                                    ? "bg-[var(--accent)] border-[var(--accent)] text-[var(--text-on-accent)]"
                                    : "border-[var(--border-subtle)] text-[var(--text-muted)] hover:border-[var(--border-accent)] hover:text-[var(--text-primary)]"
                            }`}
                        >
                            {filter as string}
                        </button>
                    ))}
                </div>
            </section>

            <section className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto min-h-[400px]">
                {filteredCars.length === 0 ? (
                    <div className="text-center text-[var(--text-muted)] py-20 text-sm uppercase tracking-widest">
                        No vehicles found in this category.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredCars.map((car) => {
                            const speed = speedSpec(car);
                            const range = rangeSpec(car);
                            return (
                                <div key={car.id!} className="card-surface group overflow-hidden">
                                    <Link href={`/inventory/${car.id}`} className="block aspect-[4/3] relative overflow-hidden">
                                        <FallbackImage
                                            src={car.image}
                                            fallbackSrc="/public/images/car3.jpg"
                                            alt={car.model}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                        {car.condition === "New" && (
                                            <span className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--text-on-accent)] px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                                                New Arrival
                                            </span>
                                        )}
                                    </Link>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-display text-xl text-[var(--text-primary)]">{car.make} {car.model}</h3>
                                                <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">{car.year} · {car.bodyType}</p>
                                            </div>
                                            <span className="font-display text-lg text-[var(--accent)]">${car.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex gap-4 text-[10px] text-[var(--text-muted)] uppercase tracking-widest border-t border-[var(--border-subtle)] pt-4">
                                            <span>0-60: <span className="text-[var(--text-primary)]">{speed}</span></span>
                                            {range ? (
                                                <span>Range: <span className="text-[var(--text-primary)]">{range}</span></span>
                                            ) : (
                                                <span>{car.mileage.toLocaleString()} mi</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            <section className="py-20 md:py-28 bg-[var(--bg-muted)] border-y border-[var(--border-subtle)] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(166,124,46,0.08)_0%,transparent_70%)]" />
                <div className="relative max-w-2xl mx-auto px-6">
                    <h2 className="font-display text-3xl md:text-5xl font-light text-[var(--text-primary)] mb-4">Trade-In Protocol</h2>
                    <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
                        Maximize your acquisition power. Get an extra $5,000 for your trade-in this month.
                    </p>
                    <button className="btn-primary">Initiate Valuation</button>
                </div>
            </section>

            <section className="py-16 md:py-20 px-6 md:px-8 max-w-7xl mx-auto">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)] mb-8">Recently Sold</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar snap-x">
                    {["car1.jpg", "car2.jpg", "car3.jpg", "car4.jpg", "aventador.jpg", "lambo.jpg"].map((img, i) => (
                        <div key={i} className="min-w-[260px] md:min-w-[320px] aspect-[4/3] relative overflow-hidden snap-center group grayscale hover:grayscale-0 transition-all duration-500 border border-[var(--border-subtle)]">
                            <FallbackImage src={`/public/images/${img}`} fallbackSrc="/public/images/car1.jpg" alt="Sold Car" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-[var(--accent)] font-display text-lg tracking-[0.15em] border border-[var(--accent)]/50 px-4 py-2 -rotate-6">Sold</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 md:px-8 border-t border-[var(--border-subtle)] text-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--text-primary)] mb-6">Don&apos;t miss the next drop</h2>
                <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-0">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border-subtle)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] outline-none"
                    />
                    <button className="btn-primary !rounded-none sm:!px-8">Join</button>
                </div>
            </section>
        </div>
    );
}
