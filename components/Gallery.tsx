"use client";

import { FallbackImage } from "./UI/FallbackImage";

const Gallery = () => {
    const images = [
        "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1200&q=80",
        "/public/images/car2.jpg",
       "/public/images/car1.jpg",
        "/public/images/car4.jpg",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80",
    ];

    return (
        <section className="py-32 bg-white text-black">
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8">
                <h2 className="text-5xl font-light mb-12 text-center text-gray-900">Gallery</h2>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-8">
                    {images.map((img, i) => (
                        <div key={i} className="overflow-hidden rounded-lg">
                            <FallbackImage
                                src={img}
                                fallbackSrc="/public/images/car2.jpg"
                                className="w-full h-full object-cover hover:scale-110 transition duration-1000"
                                alt="car gallery"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
