"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Inventory = () => {
    const cars = [
        {
            id: 4,
            name: "Porsche 911 Turbo S",
            image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
            specs: "640 HP · AWD · Automatic",
        },
        {
            id: 2,
            name: "Lamborghini Huracán EVO",
            image: "/public/images/lambo.jpg",
            specs: "630 HP · RWD · V10",
        },
        {
            id: 6,
            name: "Mercedes AMG GT",
            image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80",
            specs: "577 HP · AWD · Twin Turbo",
        },
    ];

    return (
        <section className="py-32 bg-white text-black">
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8">
                <h2 className="text-5xl font-light reveal mb-20 text-gray-900">
                    Featured Inventory
                </h2>

                <div className="grid md:grid-cols-3 lg:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-8 lg:gap-12">
                    {cars.map((car, i) => (
                        <div key={i} className="group border border-gray-100 hover:shadow-2xl transition">
                            <Link href={`/inventory/${car.id}`} className="block aspect-4/3 overflow-hidden">
                                <img
                                    src={car.image}
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-1200"
                                    alt={car.name}
                                />
                            </Link>

                            <div className="p-8">
                                <h3 className="text-2xl font-light mb-3 text-gray-900">{car.name}</h3>
                                <p className="text-sm text-gray-500 mb-6">{car.specs}</p>

                                <Link href={`/inventory/${car.id}`} className="text-red-600 text-sm tracking-wider uppercase flex items-center gap-2 hover:gap-3 transition-all">
                                    View Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Inventory;
