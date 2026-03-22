"use client";

import { Car } from "lucide-react";

const Footer = () => (
    <footer className="bg-black text-white py-20">
        <div className="max-w-350 mx-auto px-8 flex flex-col md:flex-row justify-between gap-10">
            <div>
                <div className="flex items-center gap-3 tracking-[0.3em] text-lg mb-4">
                    <Car className="text-red-600" />
                    VELOCITY
                </div>
                <p className="text-white/50 text-sm">
                    Precision performance. Curated luxury.
                </p>
            </div>

            <div className="flex gap-10 text-sm text-white/60">
                {["Inventory", "Financing", "Privacy", "Contact"].map(item => (
                    <a key={item} href="#" className="hover:text-red-600 transition">
                        {item}
                    </a>
                ))}
            </div>
        </div>
    </footer>
);

export default Footer;
