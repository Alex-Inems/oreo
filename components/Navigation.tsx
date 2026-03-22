"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Car, LogOut, User as UserIcon } from "lucide-react";
import { useUser, useAuth, useClerk } from "@clerk/nextjs";

const NAV_LINKS = ["Inventory", "Performance", "Financing", "Reviews"];

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();
    
    // Clerk Hooks
    const { user, isLoaded: userLoaded, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const { openSignIn } = useClerk();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close user dropdown on outside click
    useEffect(() => {
        if (!userMenuOpen) return;
        const handleClick = () => setUserMenuOpen(false);
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [userMenuOpen]);

    const handleSignOut = async () => {
        await signOut();
        setUserMenuOpen(false);
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-black/90 backdrop-blur border-b border-white/10" : "bg-transparent"
            }`}
        >
            <div className="w-full max-w-[95vw] min-[2000px]:max-w-[2400px] min-[3000px]:max-w-[3200px] mx-auto px-8 py-6 flex items-center justify-between">
                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 text-white tracking-[0.3em] text-lg">
                    <Car className="w-6 h-6 text-red-600" />
                    VELOCITY
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex gap-10 text-sm tracking-widest uppercase items-center">
                    {NAV_LINKS.map((item) => {
                        const href = `/${item.toLowerCase()}`;
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={item}
                                href={href}
                                className={`transition ${isActive ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                            >
                                {item}
                            </Link>
                        );
                    })}

                    <div className="h-4 w-px bg-white/10 mx-2" />

                    {userLoaded && (
                        <>
                            {!isSignedIn ? (
                                <button
                                    onClick={() => openSignIn()}
                                    className="text-white hover:text-red-500 transition border border-white/30 px-6 py-2 hover:border-red-500 uppercase tracking-widest text-sm"
                                >
                                    Client Login
                                </button>
                            ) : (
                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-3 group"
                                    >
                                        <img 
                                            src={user?.imageUrl} 
                                            alt={user?.firstName || "User"} 
                                            className="w-9 h-9 rounded-full border border-white/10 group-hover:border-red-500 transition-colors"
                                        />
                                        <span className="text-zinc-400 group-hover:text-white text-xs transition-colors font-medium">
                                            {user?.firstName || "Account"}
                                        </span>
                                    </button>

                                    {/* Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 top-full mt-4 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                            <div className="px-4 py-3 border-b border-white/5">
                                                <p className="text-xs text-zinc-500 uppercase tracking-tighter mb-0.5">Signed in as</p>
                                                <p className="text-sm font-semibold text-white truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-white"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden bg-black border-t border-white/10 px-8 py-6 space-y-4">
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="block text-gray-400 hover:text-red-500 transition uppercase tracking-widest text-sm"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}

                    <div className="pt-4 border-t border-white/10">
                        {isSignedIn ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <img src={user?.imageUrl} className="w-10 h-10 rounded-full border border-white/10" alt="" />
                                    <div>
                                        <p className="text-white text-sm font-semibold">{user?.fullName}</p>
                                        <p className="text-zinc-500 text-xs">{user?.primaryEmailAddress?.emailAddress}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center gap-2 text-red-500 text-sm font-semibold uppercase tracking-wider"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => { openSignIn(); setMobileOpen(false); }}
                                className="text-white hover:text-red-500 transition uppercase tracking-widest text-sm font-semibold"
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;
