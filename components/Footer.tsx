"use client";

import { Car, Mail, Phone } from "lucide-react";
import { useSiteContent } from "@/hooks/useSiteContent";
import { usePathname } from "next/navigation";

const Footer = () => {
    const { content } = useSiteContent();
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5">
            <div className="max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Brand */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="flex items-center gap-3 tracking-[0.4em] font-bold text-xl uppercase">
                        <Car className="text-red-600 transition-transform hover:scale-110" />
                        {content.footer_tagline}
                    </div>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-sm italic">
                        Precision performance. Curated luxury. Experience the extraordinary at every turn.
                    </p>
                </div>

                {/* Contact */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-red-600">Contact Excellence</h3>
                    <div className="space-y-4">
                        <a href={`mailto:${content.contact_email}`} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-600/40 transition-colors">
                                <Mail className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                            </div>
                            <span className="text-sm tracking-wide">{content.contact_email}</span>
                        </a>
                        <a href={`tel:${content.contact_phone}`} className="flex items-center gap-4 text-zinc-400 hover:text-white transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-red-600/40 transition-colors">
                                <Phone className="w-4 h-4 text-zinc-500 group-hover:text-red-500 transition-colors" />
                            </div>
                            <span className="text-sm tracking-wide">{content.contact_phone}</span>
                        </a>
                    </div>
                </div>

                {/* Quick Nav */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Showcase</h4>
                        <nav className="flex flex-col gap-3 text-sm text-zinc-500">
                            {["Inventory", "Performance", "Reviews"].map(item => (
                                <a key={item} href={`/${item.toLowerCase()}`} className="hover:text-red-600 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">Company</h4>
                        <nav className="flex flex-col gap-3 text-sm text-zinc-500 transition-opacity">
                            {["Support", "Privacy", "Terms"].map(item => (
                                <a key={item} href={`/${item.toLowerCase()}`} className="hover:text-red-600 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            <div className="max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8 pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between gap-6">
                <p className="text-zinc-600 text-[10px] uppercase tracking-widest font-black">
                    © {new Date().getFullYear()} VELOCITY Group. Engineered to Perfection.
                </p>
                <div className="flex gap-8">
                    <span className="text-zinc-700 text-[10px] uppercase tracking-[0.2em] hover:text-zinc-500 transition font-bold cursor-default">Washington iad1</span>
                    <span className="text-zinc-700 text-[10px] uppercase tracking-[0.2em] hover:text-zinc-500 transition font-bold cursor-default">Cloudinary Edge</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
