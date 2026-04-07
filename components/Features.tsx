"use client";

import { Fuel, Gauge, ShieldCheck, Settings } from "lucide-react";

const Features = () => {
    const features = [
        { icon: <Fuel />, title: "Fuel Efficiency", desc: "Optimized engines for maximum mileage." },
        { icon: <Gauge />, title: "High Performance", desc: "0–100 in under 3.5 seconds." },
        { icon: <ShieldCheck />, title: "Safety First", desc: "Advanced safety features for peace of mind." },
        { icon: <Settings />, title: "Customizable", desc: "Tailor your car to your exact preferences." },
    ];

    return (
        <section className="py-20 md:py-32 bg-white text-black">
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 min-[2500px]:grid-cols-8 gap-8 md:gap-12 text-center">
                {features.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-6">
                        <div className="text-red-600 text-4xl">{f.icon}</div>
                        <h3 className="text-xl md:text-2xl font-light text-gray-900">{f.title}</h3>
                        <p className="text-black/70 text-sm">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;
