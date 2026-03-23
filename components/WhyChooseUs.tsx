"use client";

const WhyChooseUs = () => (
    <section className="py-32 bg-white text-black">
        <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8">
            <div className="text-center mb-20">
                <span className="text-red-600 font-mono text-xs uppercase tracking-widest">The oreo Edge</span>
                <h2 className="text-5xl font-light mt-4 text-gray-900">Why Choose oreo</h2>
            </div>

            <div className="grid md:grid-cols-3 lg:grid-cols-4 min-[2000px]:grid-cols-5 min-[3000px]:grid-cols-6 gap-8">
                {[
                    { title: "Exclusive Inventory", desc: "Access to rare and limited edition performance vehicles not found elsewhere." },
                    { title: "Certified Vehicles", desc: "Every machine undergoes a rigorous 200-point inspection by factory-trained technicians." },
                    { title: "Transparent Pricing", desc: "Direct market-reflective pricing with zero hidden fees or surprises." }
                ].map((item, i) => (
                    <div key={i} className="group p-10 bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-500 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-0 bg-red-600 group-hover:h-full transition-all duration-500" />
                        <h3 className="text-2xl font-light mb-6 text-gray-900">{item.title}</h3>
                        <p className="text-gray-500 leading-relaxed">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default WhyChooseUs;
