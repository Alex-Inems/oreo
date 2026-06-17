"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Gauge, Fuel, Loader2 } from "lucide-react";
import { useInventory } from "@/hooks/useInventory";
import { getCarDisplayName } from "@/lib/carMedia";
import { CarImage } from "@/components/UI/CarImage";

const FeaturedCars = () => {
    const { cars, loading } = useInventory();
    const [filter, setFilter] = useState<"New" | "Used">("New");

    const filtered = cars.filter((c) => {
        if (filter === "New") return c.condition === "New";
        return c.condition === "Used" || c.condition === "Certified";
    }).slice(0, 6);

    return (
        <section className="bg-white py-14 md:py-20">
            <div className="max-w-[1280px] mx-auto px-5 md:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                    <div>
                        <p className="text-[var(--orange)] text-[15px] font-semibold mb-1">Handy picked</p>
                        <h2 className="text-3xl md:text-[40px] font-bold text-[var(--text-dark)] leading-tight">
                            Featured Cars
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        {(["New", "Used"] as const).map((f) => (
                            <button
                                key={f}
                                type="button"
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all ${
                                    filter === f
                                        ? "bg-[var(--orange-light)] text-[var(--orange)]"
                                        : "bg-[#f0f0f0] text-[var(--text-muted)] hover:bg-[#e8e8e8]"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-[var(--orange)]" />
                        <p className="text-[var(--text-muted)] text-sm">Loading vehicles...</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24 text-[var(--text-muted)]">
                        No {filter.toLowerCase()} vehicles available.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filtered.map((car) => (
                            <Link
                                key={car.id}
                                href={`/inventory/${car.id}`}
                                className="group bg-white rounded-2xl overflow-hidden border border-[var(--border-light)] hover:shadow-[var(--shadow-card)] transition-shadow"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
                                    <CarImage
                                        car={car}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {car.condition === "New" && (
                                        <span className="absolute top-4 left-4 bg-[var(--orange)] text-white text-[11px] font-bold uppercase px-3 py-1 rounded">
                                            New
                                        </span>
                                    )}
                                </div>
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <h3 className="text-[17px] font-bold text-[var(--text-dark)] leading-snug group-hover:text-[var(--orange)] transition-colors">
                                            {getCarDisplayName(car)}
                                        </h3>
                                        <span className="text-[17px] font-bold text-[var(--orange)] shrink-0">
                                            ${car.price.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-[13px] text-[var(--text-muted)]">
                                        <span className="flex items-center gap-1.5">
                                            <Gauge className="w-3.5 h-3.5" />
                                            {car.mileage.toLocaleString()} mi
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Fuel className="w-3.5 h-3.5" />
                                            {car.engine || "Petrol"}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5" />
                                            {car.bodyType}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="/inventory"
                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md border-2 border-[var(--orange)] text-[var(--orange)] font-semibold text-[15px] hover:bg-[var(--orange)] hover:text-white transition-all"
                    >
                        View All Inventory
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCars;
