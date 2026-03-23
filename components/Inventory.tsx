"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { subscribeInventory, Car as InventoryCar } from "@/lib/inventory";

const Inventory = () => {
    const [cars, setCars] = useState<InventoryCar[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = subscribeInventory((data) => {
            // Display roughly up to 6 featured cars, or just the 6 latest cars
            setCars(data.slice(0, 6));
            setLoading(false);
        });
        return () => unsub();
    }, []);

    if (loading) {
        return (
            <section className="py-32 bg-white flex flex-col items-center justify-center gap-4 text-black">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p className="text-sm tracking-widest uppercase font-bold text-gray-400">Loading Featured Inventory...</p>
            </section>
        );
    }

    return (
        <section className="py-32 bg-white text-black">
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8">
                <h2 className="text-5xl font-light reveal mb-20 text-gray-900">
                    Featured Inventory
                </h2>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-8 lg:gap-12">
                    {cars.map((car) => {
                        const hpSpec = car.specs?.find(s => s.label.toLowerCase().includes("hp") || s.label.toLowerCase().includes("power"))?.value;
                        const specString = [hpSpec ? `${hpSpec} HP` : "", car.bodyType, car.engine].filter(Boolean).join(" · ");
                        return (
                            <div key={car.id!} className="group border border-gray-100 hover:shadow-2xl transition">
                                <Link href={`/inventory/${car.id}`} className="block aspect-4/3 overflow-hidden relative">
                                    <img
                                        src={car.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-1200"
                                        alt={car.model}
                                    />
                                    {car.condition === "New" && (
                                       <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-xl">New Arrival</span>
                                    )}
                                </Link>

                                <div className="p-8">
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-1">{car.make} {car.model}</h3>
                                    <p className="text-sm font-medium text-gray-500 mb-2 truncate uppercase tracking-widest">
                                        {specString}
                                    </p>
                                    <p className="text-lg font-black text-red-600 mb-6">${car.price.toLocaleString()}</p>

                                    <Link href={`/inventory/${car.id}`} className="text-red-600 text-sm font-bold tracking-wider uppercase flex items-center gap-2 hover:gap-3 transition-all">
                                        View Details <ArrowRight className="w-4 h-4" />
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
