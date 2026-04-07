"use client";

import { useState, useEffect } from "react";

const FAQ = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const faqs = [
        { q: "Do you offer financing?", a: "Yes, we provide tailored financing options for all vehicles." },
        { q: "Are all cars certified?", a: "Absolutely. Every car is fully inspected and verified." },
        { q: "Can I trade in my vehicle?", a: "Yes, trade-ins are welcome. Get an instant valuation." },
    ];

    return (
        <section className="relative bg-white py-20 md:py-32 overflow-hidden text-gray-400">
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center relative gap-12">

                {/* FAQ LEFT */}
                <div className="md:w-1/2 space-y-8 md:space-y-16 relative z-20">
                    <h2 className="text-3xl md:text-5xl font-light mb-8 md:mb-12 text-gray-900 leading-tight">Frequently Asked Questions</h2>
                    {faqs.map((f, i) => (
                        <div
                            key={i}
                            className={`bg-white border border-black/10 p-6 md:p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105`}
                            style={{
                                zIndex: faqs.length - i,
                                marginTop: isMobile ? 0 : i * -20, 
                            }}
                        >
                            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">{f.q}</h3>
                            <p className="text-black/70 text-sm">{f.a}</p>
                        </div>
                    ))}
                </div>

                {/* IMAGE RIGHT */}
                <div className="md:w-1/2 mt-12 md:mt-0 relative">
                    {/* Red accent slant */}
                    <div className="absolute inset-0 clip-slant-right bg-red-600 z-10" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 80%)" }} />

                    <div
                        className="h-full w-full rounded-tl-[80px] rounded-bl-[80px] shadow-xl relative z-20"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            minHeight: "500px",
                            clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        }}
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-white/80 to-transparent rounded-tl-[80px] rounded-bl-[80px]" />
                </div>
            </div>
        </section>
    );
};

export default FAQ;
