"use client";

import { Star } from "lucide-react";

const Testimonial = () => (
    <section className="relative py-32 bg-white overflow-hidden">
        {/* Slanted background accent */}
        <div className="absolute top-0 left-0 w-full h-2/3 bg-gray-50 -skew-y-3 origin-top-left" />

        <div className="relative w-full max-w-[90vw] min-[2000px]:max-w-[1200px] min-[3000px]:max-w-[1600px] mx-auto px-8 text-center">
            {/* Stars */}
            <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-500 text-yellow-500 mx-1" />
                ))}
            </div>

            {/* Testimonial Card */}
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 relative z-10">
                <p className="text-2xl md:text-3xl font-light italic text-gray-900 mb-8 leading-relaxed">
                    “oreo delivered an experience that matched the car itself. Smooth, transparent, exceptional.”
                </p>
                <p className="text-sm tracking-widest uppercase text-gray-500">
                    Daniel Roberts · GT Owner
                </p>
            </div>

            {/* Optional CTA */}
            <button className="mt-12 px-12 py-4 border-2 border-gray-900 text-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition text-sm tracking-[0.2em] uppercase">
                Read More Reviews
            </button>
        </div>
    </section>
);

export default Testimonial;
