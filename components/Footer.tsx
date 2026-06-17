"use client";

import Link from "next/link";
import { Car, Mail, Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { usePathname } from "next/navigation";

const Footer = () => {
    const { content } = useSiteContent();
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-[#f8f8f8] border-t border-[var(--border-light)] pt-14 pb-8">
            <div className="max-w-[1280px] mx-auto px-5 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <Car className="w-6 h-6 text-[var(--orange)]" />
                        <span className="text-lg font-bold text-[var(--text-dark)]">oreo</span>
                    </Link>
                    <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                        {content.footer_tagline}. Find your perfect car today.
                    </p>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-[var(--text-dark)] mb-4">Quick Links</h4>
                    <nav className="flex flex-col gap-2">
                        {["Inventory", "Performance", "Financing", "Reviews"].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className="text-sm text-[var(--text-muted)] hover:text-[var(--orange)] transition-colors">
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div>
                    <h4 className="text-sm font-bold text-[var(--text-dark)] mb-4">Contact</h4>
                    <a href={`mailto:${content.contact_email}`} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--orange)] mb-2 transition-colors">
                        <Mail className="w-4 h-4" /> {content.contact_email}
                    </a>
                    <a href={`tel:${content.contact_phone}`} className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--orange)] transition-colors">
                        <Phone className="w-4 h-4" /> {content.contact_phone}
                    </a>
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto px-5 md:px-8 mt-10 pt-6 border-t border-[var(--border-light)] text-center text-[13px] text-[var(--text-muted)]">
                © {new Date().getFullYear()} oreo Group. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
