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
            <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-red-600" />
                <p className="text-sm font-bold tracking-[0.2em] uppercase text-zinc-500">Loading Fleet...</p>
            </div>
        );
    }

    return (
        <div className="bg-black text-white min-h-screen">
            {/* 1. Hero */}
            <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-6 md:px-8 text-center bg-zinc-900 border-b border-zinc-800">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter uppercase italic leading-tight">Current Inventory</h1>
                <p className="text-sm md:text-xl text-zinc-400 w-full max-w-[90vw] min-[2000px]:max-w-[1000px] min-[3000px]:max-w-[1200px] mx-auto uppercase tracking-widest">Performance & Luxury Vehicles</p>
            </section>

            {/* 2. Filter Bar */}
            <section className="border-b border-zinc-800 sticky top-16 md:top-20 bg-black/90 backdrop-blur z-40">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-6 md:px-8 py-3 md:py-4 flex flex-nowrap overflow-x-auto gap-3 md:gap-4 justify-start md:justify-start no-scrollbar">
                    {FILTERS.map((filter, i) => (
                        <button 
                            key={i} 
                            onClick={() => setActiveFilter(filter as string)}
                            className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-2 border border-zinc-800 hover:border-red-600 transition cursor-pointer whitespace-nowrap ${activeFilter === filter ? 'bg-red-600 border-red-600 text-white' : 'text-zinc-500 hover:text-white'}`}
                        >
                            {filter as string}
                        </button>
                    ))}
                </div>
            </section>

            {/* 3. Car Grid */}
            <section className="py-16 md:py-24 px-6 md:px-8 w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto min-h-[500px]">
                {filteredCars.length === 0 ? (
                    <div className="text-center text-zinc-500 py-20 uppercase tracking-widest">No vehicles found in this category.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-6 md:gap-8 text-left">
                        {filteredCars.map((car) => {
                            const speed = speedSpec(car);
                            const range = rangeSpec(car);
                            return (
                            <div key={car.id!} className="group bg-zinc-900/50 border border-zinc-900 hover:border-red-600/50 transition-all duration-500 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                                <Link href={`/inventory/${car.id}`} className="h-48 md:h-72 relative overflow-hidden group block">
                                    <FallbackImage 
                                        src={car.image} 
                                        fallbackSrc="/public/images/car3.jpg"
                                        alt={car.model} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition duration-1000" 
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View Details</span>
                                    </div>
                                    {car.condition === "New" && (
                                       <span className="absolute top-4 left-4 md:top-6 md:left-6 bg-red-600 text-white px-3 py-1 md:px-4 md:py-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">New Arrival</span>
                                    )}
                                </Link>
                                <div className="p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-4 md:mb-6">
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter mb-1">{car.make} {car.model}</h3>
                                            <p className="text-[9px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{car.year} • {car.bodyType}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-red-500 font-black text-lg md:text-xl tracking-tighter">${car.price.toLocaleString()}</span>
                                            <p className="text-[7px] md:text-[8px] text-zinc-700 font-bold uppercase tracking-widest">MSRP</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2 md:gap-4 text-[9px] md:text-[10px] text-zinc-400 border-t border-white/5 pt-4 md:pt-6 font-bold uppercase tracking-widest">
                                        <span className="flex items-center gap-2">0-60: <span className="text-white">{speed}</span></span>
                                        {range && <span className="flex items-center gap-2 text-red-500">Range: <span className="text-white">{range}</span></span>}
                                        {!range && <span className="flex items-center gap-2">MILEAGE: <span className="text-white">{car.mileage.toLocaleString()} MI</span></span>}
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* 4. Promo Banner */}
            <section className="py-20 md:py-32 bg-red-600 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-tight">Trade-In Protocol</h2>
                    <p className="text-lg md:text-2xl font-bold mb-8 md:mb-10 text-red-100 italic">Maximize your acquisition power. Get an extra $5,000 for your trade-in this month.</p>
                    <button className="bg-white text-black px-10 py-4 md:px-12 md:py-5 uppercase tracking-[0.2em] md:tracking-[0.3em] font-black text-[10px] md:text-xs hover:bg-black hover:text-white transition-all transform hover:scale-105 shadow-2xl active:scale-95">Initiate Valuation</button>
                </div>
            </section>

            {/* 5. Recently Sold */}
            <section className="py-20 md:py-32 px-6 md:px-8 bg-black border-t border-white/5 overflow-hidden">
                <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto">
                    <h2 className="text-lg md:text-xl font-black mb-8 md:mb-12 text-zinc-700 uppercase tracking-[0.3em] md:tracking-[0.4em]">Historical Registry / Recently Sold</h2>
                    <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
                        {["car1.jpg", "car2.jpg", "car3.jpg", "car4.jpg", "aventador.jpg", "lambo.jpg"].map((img, i) => (
                            <div key={i} className="min-w-[280px] md:min-w-[400px] h-48 md:h-64 bg-zinc-900 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center relative overflow-hidden snap-center group grayscale hover:grayscale-0 transition-all duration-700">
                                <FallbackImage src={`/public/images/${img}`} fallbackSrc="/public/images/car1.jpg" alt="Sold Car" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-red-600/20 transition-all duration-700" />
                                <span className="relative z-10 text-red-600 font-black text-xl md:text-3xl tracking-[0.1em] md:tracking-[0.2em] -rotate-12 border-2 md:border-4 border-red-600 px-4 py-2 md:px-8 md:py-3 transform group-hover:scale-110 shadow-2xl transition-transform">DECOMMISSIONED</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Newsletter */}
            <section className="py-16 md:py-24 px-6 md:px-8 border-t border-zinc-800 text-center">
                <h2 className="text-lg md:text-xl font-bold mb-6 md:mb-4 uppercase tracking-widest">Don't miss the next drop</h2>
                <div className="max-w-md mx-auto flex flex-col md:flex-row gap-4 md:gap-0">
                    <input type="email" placeholder="EMAIL ADDRESS" className="bg-black border border-zinc-700 flex-1 px-4 py-3 uppercase text-xs md:text-sm focus:border-red-600 outline-none h-12" />
                    <button className="bg-white text-black px-6 md:px-8 h-12 font-bold uppercase hover:bg-red-600 hover:text-white transition cursor-pointer text-xs md:text-sm">Join</button>
                </div>
            </section>
        </div>
    );
}
