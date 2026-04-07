"use client";

import { Settings } from "lucide-react";

const Financing = () => (
    <section className="py-20 md:py-32 bg-neutral-900 text-white">
        <div className="w-full max-w-[90vw] min-[2000px]:max-w-[1600px] min-[3000px]:max-w-[2000px] mx-auto px-6 md:px-8 text-center">
            <Settings className="w-8 h-8 md:w-10 md:h-10 text-red-600 mx-auto mb-6 md:mb-8" />
            <h2 className="text-3xl md:text-5xl font-light mb-4 md:mb-6 leading-tight">Tailored Financing</h2>
            <p className="text-white/70 text-base md:text-xl mb-8 md:mb-12 max-w-xl mx-auto">
                Flexible payment options crafted for performance driven lifestyles.
            </p>

            <button className="border border-red-600 px-8 py-3 md:px-12 md:py-4 hover:bg-red-600 transition text-[10px] md:text-sm tracking-[0.2em] uppercase">
                Get Pre Approved
            </button>
        </div>
    </section>
);

export default Financing;
