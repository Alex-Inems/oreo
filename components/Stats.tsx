"use client";

import { Gauge, Car, ShieldCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

const Stats = () => {
    const stats = [
        { icon: <Gauge />, value: "0–100", label: "Under 3.5s" },
        { icon: <Car />, value: "120+", label: "Luxury Models" },
        { icon: <ShieldCheck />, value: "100%", label: "Verified History" },
        { icon: <Users />, value: "5,000+", label: "Happy Owners" },
    ];

    return (
        <section className="py-20 md:py-32 bg-black text-white overflow-hidden">
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 min-[2000px]:gap-24 min-[3000px]:gap-32 gap-8 md:gap-16 text-center">
                {stats.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        <div className="text-red-600 flex justify-center mb-6">{s.icon}</div>
                        <div className="text-4xl font-light mb-2">{s.value}</div>
                        <div className="text-sm tracking-widest uppercase text-white/60">{s.label}</div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
