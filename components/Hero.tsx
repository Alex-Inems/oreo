"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";

const Hero = () => {
    const { content } = useSiteContent();

    return (
        <section
            className="h-screen relative flex items-end"
            style={{
                backgroundImage:
                    "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=80)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />

            <div className="relative w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8 pb-32 text-white">
                <motion.span 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-block border border-red-600 px-6 py-2 text-xs tracking-[0.3em] uppercase"
                >
                    {content.hero.subtitle}
                </motion.span>

                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-7xl md:text-8xl font-light mt-6 mb-6 uppercase"
                >
                    {content.hero.title}
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-white/80 w-full max-w-[90vw] min-[2000px]:max-w-[1000px] min-[3000px]:max-w-[1200px] mb-12"
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
