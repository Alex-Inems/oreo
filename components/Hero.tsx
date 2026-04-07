"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";

const Hero = () => {
    const { content } = useSiteContent();

    return (
        /* 
           Cinematic Hero Section: 
           Uses a background image with dual-layer gradients (bottom-up and top-down)
           to ensure legibility for both the floated navbar and the centered mission text.
           overflow-hidden is applied to prevent any motion-driven horizontal scrolling.
        */
        <section
            className="h-screen relative flex items-end overflow-hidden"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Gradient Overlays: Secure contrast for Navbar (top) and Typography (bottom) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-0" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/60 to-transparent z-0 pointer-events-none" />

            {/* Content Container: Uses max-w with relative-to-viewport constraints to prevent overflow on ultra-wide screens */}
            <div className="relative w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-6 md:px-8 pb-16 md:pb-32 text-white">
                {/* Brand / Kicker */}
                <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-block border border-red-600 px-4 py-1.5 md:px-6 md:py-2 text-[10px] md:text-xs tracking-[0.3em] uppercase"
                >
                    {content.hero.subtitle}
                </motion.span>

                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-light mt-6 mb-8 uppercase leading-[1.1] md:leading-[1] tracking-tighter"
                >
                    {content.hero.title}
                </motion.h1>

                <motion.h3
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-sm md:text-xl font-bold text-red-500 uppercase tracking-[0.3em] md:tracking-[0.4em] mb-4"
                >
                    {content.mission.heading}
                </motion.h3>

                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-base md:text-xl text-white/80 w-full max-w-[90vw] min-[2000px]:max-w-[1000px] min-[3000px]:max-w-[1200px] mb-12 leading-relaxed"
                >
                    {content.mission.text}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link 
                        href="/inventory"
                        className="inline-block border-2 border-red-600 px-12 py-4 hover:bg-red-600 transition text-sm tracking-[0.2em] uppercase"
                    >
                        {content.hero.cta}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
