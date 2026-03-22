"use client";

import { Settings } from "lucide-react";

const Financing = () => (
    <section className="py-32 bg-neutral-900 text-white">
        <div className="w-full max-w-[90vw] min-[2000px]:max-w-[1600px] min-[3000px]:max-w-[2000px] mx-auto px-8 text-center">
            <Settings className="w-10 h-10 text-red-600 mx-auto mb-8" />
            <h2 className="text-5xl font-light mb-6">Tailored Financing</h2>
            <p className="text-white/70 text-xl mb-12">
                Flexible payment options crafted for performance driven lifestyles.
            </p>

            <button className="border border-red-600 px-12 py-4 hover:bg-red-600 transition text-sm tracking-[0.2em] uppercase">
                Get Pre Approved
            </button>
        </div>
    </section>
);

export default Financing;
