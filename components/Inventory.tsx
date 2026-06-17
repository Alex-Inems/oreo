"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { subscribeInventory, Car as InventoryCar } from "@/lib/inventory";
import { FallbackImage } from "@/components/UI/FallbackImage";

const Inventory = () => {
    const [cars, setCars] = useState<InventoryCar[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = subscribeInventory((data) => {
            setCars(data.slice(0, 6));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    if (loading) {
        return (
            <section className="py-32 bg-[var(--bg-elevated)] flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-7 h-7 animate-spin text-[var(--accent)]" />
                <p className="text-[10px] tracking-[0.3em] uppercase text-[var(--text-muted)]">Loading Inventory</p>
            </section>
        );
    }

    return (
        <section className="section-padding bg-[var(--bg-muted)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
                    <div>
                        <span className="section-label">Curated Selection</span>
                        <h2 className="section-title mt-4">Featured Inventory</h2>
                        <p className="section-intro mt-4">Hand-picked performance and luxury vehicles, ready for their next chapter.</p>
                    </div>
                    <Link href="/inventory" className="btn-outline !py-2.5 self-start md:self-auto">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {cars.map((car) => {
                        const hpSpec = car.specs?.find(s => s.label.toLowerCase().includes("hp") || s.label.toLowerCase().includes("power"))?.value;
                        const specString = [hpSpec ? `${hpSpec} HP` : "", car.bodyType, car.engine].filter(Boolean).join(" · ");
                        return (
                            <div key={car.id!} className="card-surface group overflow-hidden">
                                <Link href={`/inventory/${car.id}`} className="block aspect-[4/3] overflow-hidden relative">
                                    <FallbackImage
                                        src={car.image}
                                        fallbackSrc="/public/images/car1.jpg"
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                        alt={car.model}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                    {car.condition === "New" && (
                                        <span className="absolute top-4 left-4 bg-[var(--accent)] text-[var(--text-on-accent)] px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                                            New Arrival
                                        </span>
                                    )}
                                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                        <div>
                                            <h3 className="font-display text-xl text-white">{car.make} {car.model}</h3>
                                            <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mt-1">{specString}</p>
                                        </div>
                                        <span className="font-display text-lg text-[var(--accent)]">${car.price.toLocaleString()}</span>
                                    </div>
                                </Link>
                                <div className="px-5 py-4 border-t border-[var(--border-subtle)]">
                                    <Link href={`/inventory/${car.id}`} className="text-[var(--accent)] text-[10px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                                        View Details <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Inventory;
