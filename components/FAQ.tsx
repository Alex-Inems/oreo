"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        { q: "Do you offer financing?", a: "Yes, we provide tailored financing options for all vehicles — including lease, loan, and bespoke capital structures. Pre-approval typically takes under 15 minutes." },
        { q: "Are all cars certified?", a: "Absolutely. Every car undergoes our 200-point inspection and comes with a full vehicle history report. Factory-trained technicians verify every listing." },
        { q: "Can I trade in my vehicle?", a: "Yes, trade-ins are welcome. We offer instant valuations and can apply equity directly toward your next acquisition." },
        { q: "Do you deliver nationwide?", a: "We offer white-glove enclosed transport anywhere in the continental United States. Most deliveries complete within 48 hours of purchase." },
        { q: "Can I schedule a private viewing?", a: "Of course. Contact our concierge team to arrange a private showroom visit or an at-home viewing for qualified buyers." },
    ];

    return (
        <section className="section-padding bg-[var(--bg-muted)]">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
                    <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
                        <span className="section-label">Support</span>
                        <h2 className="section-title mt-4 mb-6">Frequently Asked Questions</h2>
                        <p className="section-intro mb-8">
                            Everything you need to know about acquiring your next performance vehicle through oreo.
                        </p>
                        <Link href="/support" className="btn-outline">
                            Contact Support
                        </Link>
                    </div>

                    <div className="lg:col-span-3 space-y-3">
                        {faqs.map((f, i) => (
                            <div key={i} className="card-surface overflow-hidden">
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[var(--accent-muted)] transition-colors"
                                >
                                    <span className="text-sm md:text-base text-[var(--text-primary)] font-medium pr-4">{f.q}</span>
                                    <ChevronDown
                                        className={`w-4 h-4 text-[var(--accent)] shrink-0 transition-transform duration-300 ${
                                            openIndex === i ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        openIndex === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <p className="px-6 pb-5 text-[var(--text-muted)] text-sm leading-relaxed">{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
