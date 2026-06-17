"use client";

import Link from "next/link";
import { Settings, Percent, Clock, ShieldCheck } from "lucide-react";

const PERKS = [
    { icon: <Percent className="w-4 h-4" />, text: "Rates from 4.99% APR" },
    { icon: <Clock className="w-4 h-4" />, text: "15-minute pre-approval" },
    { icon: <ShieldCheck className="w-4 h-4" />, text: "No prepayment penalties" },
];

const Financing = () => (
    <section className="section-padding bg-[var(--bg-elevated)] border-y border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                    <div className="w-12 h-12 rounded-full bg-[var(--accent-muted)] border border-[var(--border-accent)] flex items-center justify-center mb-8">
                        <Settings className="w-5 h-5 text-[var(--accent)]" />
                    </div>
                    <span className="section-label">Flexible Options</span>
                    <h2 className="section-title mt-4 mb-5">Tailored Financing</h2>
                    <p className="section-intro mb-8">
                        Flexible payment structures crafted for performance-driven lifestyles. Lease, loan, or bespoke capital solutions — our finance team builds a plan around your goals.
                    </p>
                    <ul className="space-y-4 mb-10">
                        {PERKS.map((perk) => (
                            <li key={perk.text} className="flex items-center gap-3 text-sm text-[var(--text-primary)]">
                                <span className="text-[var(--accent)]">{perk.icon}</span>
                                {perk.text}
                            </li>
                        ))}
                    </ul>
                    <Link href="/financing" className="btn-primary">
                        Get Pre Approved
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: "Lease", desc: "12–48 month terms with optimized residuals" },
                        { label: "Loan", desc: "Up to 84 months, simple interest" },
                        { label: "Trade-In", desc: "Instant valuation on your current vehicle" },
                        { label: "Private", desc: "Bespoke structures for collectors" },
                    ].map((opt) => (
                        <div key={opt.label} className="card-surface p-6">
                            <p className="font-display text-xl text-[var(--accent)] mb-2">{opt.label}</p>
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{opt.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Financing;
