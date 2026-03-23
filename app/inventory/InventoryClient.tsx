"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { subscribeInventory, Car as InventoryCar } from "@/lib/inventory";
import { Loader2 } from "lucide-react";

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

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500">Loading Fleet...</p>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            {/* 1. Hero */}
            <section className="pt-32 pb-24 px-8 text-center bg-zinc-900 border-b border-zinc-800">
                <h1 className="text-6xl font-bold mb-4 tracking-tighter">Current Inventory</h1>
                <p className="text-xl text-zinc-400 w-full max-w-[90vw] min-[2000px]:max-w-[1000px] min-[3000px]:max-w-[1200px] mx-auto uppercase tracking-widest">Performance & Luxury Vehicles</p>
            </section>

            {/* 2. Filter Bar */}
            <section className="border-b border-zinc-800 sticky top-20 bg-black/90 backdrop-blur z-40">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8 py-4 flex flex-wrap gap-4 justify-center md:justify-start">
                    {FILTERS.map((filter, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveFilter(filter)}
                            className={`text-sm uppercase tracking-widest px-4 py-2 border border-zinc-800 hover:border-red-600 transition cursor-pointer ${activeFilter === filter ? 'bg-red-600 border-red-600' : ''}`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </section>

            {/* 3. Car Grid */}
            <section className="py-12 px-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto min-h-[500px]">
                {filteredCars.length === 0 ? (
                    <div className="text-center text-zinc-500 py-20 uppercase tracking-widest">No vehicles found in this category.</div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-8 text-left">
                        {filteredCars.map((car) => {
                            const speedSpec = car.specs?.find((s) => s.label.toLowerCase().includes("0-60"))?.value || "N/A";
                            const rangeSpec = car.specs?.find((s) => s.label.toLowerCase().includes("range"))?.value;
                            return (
                            <div key={car.id!} className="group bg-zinc-900 border border-zinc-800 hover:border-red-600 transition duration-500">
                                <Link href={`/inventory/${car.id}`} className="h-64 relative overflow-hidden group block">
                                    <img src={car.image} alt={car.model} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    <div className="absolute inset-0 bg-zinc-700/80 translate-y-full group-hover:translate-y-0 transition duration-500 flex items-center justify-center">
                                        <span className="text-sm font-bold uppercase tracking-widest cursor-pointer">View Details</span>
                                    </div>
                                    {car.condition === "New" && (
                                       <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Just Inducted</span>
                                    )}
                                </Link>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">{car.make} {car.model}</h3>
                                            <p className="text-xs text-zinc-500 uppercase tracking-widest">{car.year} • {car.bodyType}</p>
                                        </div>
                                        <span className="text-red-500 font-bold">${car.price.toLocaleString()}</span>
                                    </div>
                                    <div className="flex gap-4 text-xs text-zinc-400 border-t border-zinc-800 pt-4 font-mono">
                                        <span>0-60: {speedSpec}</span>
                                        {rangeSpec && <span>Range: {rangeSpec}</span>}
                                        {!rangeSpec && <span>{car.mileage.toLocaleString()} mi</span>}
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* 4. Promo Banner */}
            <section className="py-24 bg-red-900 text-center">
                <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-4">Trade-In Bonus</h2>
                <p className="text-xl font-bold mb-8">Get an extra $5,000 for your trade-in this month.</p>
                <button className="bg-black text-white px-10 py-4 uppercase tracking-widest font-bold hover:bg-white hover:text-black transition cursor-pointer">Value My Trade</button>
            </section>

            {/* 5. Recently Sold */}
            <section className="py-24 px-8 bg-zinc-900 border-t border-zinc-800">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
                    <h2 className="text-2xl font-bold mb-8 text-zinc-500 uppercase tracking-widest">Recently Sold</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 opacity-50 grayscale hover:grayscale-0 transition duration-700">
                        {["car1.jpg", "car2.jpg", "car3.jpg", "car4.jpg"].map((img, i) => (
                            <div key={i} className="min-w-[300px] h-48 bg-zinc-800 border border-zinc-700 flex items-center justify-center relative overflow-hidden">
                                <img src={`/public/images/${img}`} alt="Sold Car" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                                <span className="text-red-600 font-black text-2xl -rotate-12 border-4 border-red-600 px-4 py-2 z-10">SOLD</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Newsletter */}
            <section className="py-24 px-8 border-t border-zinc-800 text-center">
                <h2 className="text-xl font-bold mb-4 uppercase tracking-widest">Don't miss the next drop</h2>
                <div className="max-w-md mx-auto flex gap-0">
                    <input type="email" placeholder="EMAIL ADDRESS" className="bg-black border border-zinc-700 flex-1 px-4 py-3 uppercase text-sm focus:border-red-600 outline-none" />
                    <button className="bg-white text-black px-6 py-3 font-bold uppercase hover:bg-red-600 hover:text-white transition cursor-pointer">Join</button>
                </div>
            </section>
        </div>
    );
}
