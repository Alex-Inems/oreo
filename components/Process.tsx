"use client";

const Process = () => (
    <section className="py-32 bg-white text-black">
        <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8">
            <h2 className="text-5xl font-light mb-24 text-center text-gray-900">The oreo Process</h2>
            <div className="grid md:grid-cols-3 gap-24 relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gray-100 -z-0" />

                {[
                    { step: "01", title: "Browse Inventory", desc: "Explore our curated selection of luxury vehicles." },
                    { step: "02", title: "Personal Consultation", desc: "Speak with our performance specialists about your needs." },
                    { step: "03", title: "Inaugural Drive", desc: "Experience the machine on your terms with our concierge service." },
                ].map((p, i) => (
                    <div key={i} className="relative z-10 text-center">
                        <div className="w-24 h-24 bg-white border border-gray-100 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl group hover:border-red-600 transition-colors">
                            <span className="text-2xl font-light text-gray-400 group-hover:text-red-600 transition-colors">{p.step}</span>
                        </div>
                        <h3 className="text-2xl font-light mb-6 text-gray-900">{p.title}</h3>
                        <p className="text-gray-500 leading-relaxed px-4">{p.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Process;
