"use client";

import { FallbackImage } from "./UI/FallbackImage";

const Gallery = () => {
    const images = [
        { src: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80", tall: true },
        { src: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80", tall: false },
        { src: "/public/images/car2.jpg", tall: false },
        { src: "/public/images/car1.jpg", tall: false },
        { src: "/public/images/car4.jpg", tall: true },
        { src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80", tall: false },
        { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80", tall: false },
    ];

    return (
        <section className="section-padding bg-[var(--bg-muted)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                    <div>
                        <span className="section-label">Visual Showcase</span>
                        <h2 className="section-title mt-4">The Collection</h2>
                    </div>
                    <p className="section-intro md:text-right">
                        A glimpse into the machines that define our showroom.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 auto-rows-[180px] md:auto-rows-[220px]">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={`overflow-hidden group relative ${
                                img.tall ? "row-span-2" : ""
                            } ${i === 0 ? "col-span-2 row-span-2" : ""}`}
                        >
                            <FallbackImage
                                src={img.src}
                                fallbackSrc="/public/images/car2.jpg"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                alt="car gallery"
                            />
                            <div className="absolute inset-0 bg-[var(--accent)]/0 group-hover:bg-[var(--accent)]/15 transition-colors duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
