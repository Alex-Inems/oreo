"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Car, LogOut, User as UserIcon } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

const NAV_LINKS = ["Inventory", "Performance", "Financing", "Reviews"];

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();
    
    // Clerk Hooks
    const { user, isLoaded: userLoaded, isSignedIn } = useUser();
    const { signOut, openSignIn } = useClerk();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (pathname?.startsWith("/admin")) return null;

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
            className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 will-change-transform w-[95%] lg:w-[90%] max-w-[1400px] ${
                scrolled || mobileOpen
                    ? "top-4 bg-black/75 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50" 
                    : "top-6 bg-black/20 backdrop-blur-sm border border-white/10 hover:bg-black/40 hover:backdrop-blur-md"
            } ${
                mobileOpen ? "rounded-[2rem]" : "rounded-full"
            }`}
        >
            <div className={`flex items-center justify-between transition-all duration-500 ${scrolled ? "px-6 py-3" : "px-8 py-5"}`}>
                {/* Brand */}
                <Link href="/" className="flex items-center gap-3 text-white tracking-[0.3em] font-bold text-lg hover:text-red-500 transition-colors group">
                    <Car className="w-6 h-6 text-red-600 group-hover:scale-110 transition-transform duration-300" />
                    <span>VELOCITY</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden lg:flex gap-8 text-xs tracking-[0.2em] font-semibold uppercase items-center">
                    {NAV_LINKS.map((item) => {
                        const href = `/${item.toLowerCase()}`;
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={item}
                                href={href}
                                className={`relative py-2 transition-colors duration-300 ${isActive ? "text-red-500" : "text-zinc-400 hover:text-white"}`}
                            >
                                {item}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-full blur-[1px]"></span>
                                )}
                            </Link>
                        );
                    })}

                    <div className="h-5 w-px bg-white/10 mx-2" />

                    {userLoaded && (
                        <>
                            {!isSignedIn ? (
                                <div className="flex items-center gap-5">
                                    <button
                                        onClick={() => openSignIn()}
                                        className="text-zinc-300 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold"
                                    >
                                        Log In
                                    </button>
                                    <Link
                                        href="/sign-up"
                                        className="relative group text-white bg-red-600 border border-red-500 hover:border-red-400 transition-all px-6 py-2.5 rounded-full uppercase tracking-[0.2em] text-[10px] font-black overflow-hidden"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
                                        <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                                            Join Fleet
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-3 group focus:outline-none"
                                    >
                                        <div className="relative">
                                            <img 
                                                src={user?.imageUrl} 
                                                alt={user?.firstName || "User"} 
                                                className="w-10 h-10 rounded-full border border-white/20 group-hover:border-red-500 transition-all shadow-md group-hover:shadow-red-500/20"
                                            />
                                            <div className="absolute inset-0 rounded-full ring-2 ring-red-500 opacity-0 group-hover:opacity-100 transition-opacity scale-110"></div>
                                        </div>
                                        <span className="text-zinc-300 group-hover:text-white text-xs transition-colors font-bold tracking-wider">
                                            {user?.firstName || "Account"}
                                        </span>
                                    </button>

                                    {/* Dropdown */}
                                    <div className={`absolute right-0 top-[calc(100%+12px)] w-56 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top-right ${
                                        userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                                    }`}>
                                        <div className="px-5 py-4 border-b border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1 font-bold">Signed in as</p>
                                            <p className="text-sm font-semibold text-white truncate drop-shadow-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                                        </div>
                                        <div className="p-2">
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-3 px-3 py-3 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-xl transition-all"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full transition-colors focus:outline-none"
                >
                    {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-8 pb-8 pt-4 space-y-5 border-t border-white/10 bg-gradient-to-b from-transparent to-black/60">
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item}
                            href={`/${item.toLowerCase()}`}
                            className="block text-zinc-400 hover:text-white transition-colors uppercase tracking-[0.25em] text-xs font-bold py-2"
                            onClick={() => setMobileOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}

                    <div className="pt-6 border-t border-white/10">
                        {isSignedIn ? (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <img src={user?.imageUrl} className="w-12 h-12 rounded-full border border-white/20 shadow-lg" alt="" />
                                    <div>
                                        <p className="text-white text-sm font-bold tracking-wide">{user?.fullName}</p>
                                        <p className="text-zinc-500 text-xs tracking-wider">{user?.primaryEmailAddress?.emailAddress}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="flex items-center justify-center w-full gap-2 text-white bg-white/5 hover:bg-red-500 hover:text-black hover:border-transparent border border-white/10 py-3 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all"
                                >
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => { openSignIn(); setMobileOpen(false); }}
                                    className="w-full text-center text-white border border-white/20 hover:bg-white/10 py-3 rounded-xl uppercase tracking-[0.2em] text-xs font-black transition-all"
                                >
                                    Log In
                                </button>
                                <Link
                                    href="/sign-up"
                                    onClick={() => setMobileOpen(false)}
                                    className="w-full text-center text-white bg-red-600 hover:bg-red-500 py-3 rounded-xl uppercase tracking-[0.2em] text-xs font-black transition-all shadow-lg shadow-red-900/20"
                                >
                                    Join Fleet
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
