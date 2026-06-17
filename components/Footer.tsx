"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useSiteContent } from "@/hooks/useSiteContent";
import { usePathname } from "next/navigation";

const Footer = () => {
    const { content } = useSiteContent();
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
                    <div className="md:col-span-5">
                        <Link href="/" className="font-display text-2xl font-light text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                            oreo
                        </Link>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed mt-4 max-w-sm">
                            {content.footer_tagline}. Precision performance. Curated luxury.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] mb-5">Showcase</h4>
                        <nav className="flex flex-col gap-3">
                            {["Inventory", "Performance", "Financing", "Reviews"].map(item => (
                                <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                                    {item}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--accent)] mb-5">Contact</h4>
                        <div className="space-y-4">
                            <a href={`mailto:${content.contact_email}`} className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group">
                                <Mail className="w-4 h-4 text-[var(--accent)]/60 group-hover:text-[var(--accent)]" />
                                {content.contact_email}
                            </a>
                            <a href={`tel:${content.contact_phone}`} className="flex items-center gap-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors group">
                                <Phone className="w-4 h-4 text-[var(--accent)]/60 group-hover:text-[var(--accent)]" />
                                {content.contact_phone}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                        © {new Date().getFullYear()} oreo Group
                    </p>
                    <div className="flex gap-6">
                        {["Support", "Privacy", "Terms"].map(item => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
