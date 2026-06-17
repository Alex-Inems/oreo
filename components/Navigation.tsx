"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

const NAV_LINKS = ["Inventory", "Performance", "Financing", "Reviews"];

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const { user, isLoaded: userLoaded, isSignedIn } = useUser();
    const { signOut, openSignIn } = useClerk();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (pathname?.startsWith("/admin")) return null;

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
        <header
            className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-500 ${
                scrolled || mobileOpen
                    ? "bg-[var(--bg-glass)] backdrop-blur-xl border-b border-[var(--border-subtle)]"
                    : "bg-transparent"
            }`}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-8">
                <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}>
                    <Link
                        href="/"
                        className="font-display text-xl md:text-2xl font-light tracking-wide text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                    >
                        oreo
                    </Link>

                    <div className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map((item) => {
                            const href = `/${item.toLowerCase()}`;
                            const isActive = pathname === href;
                            return (
                                <Link
                                    key={item}
                                    href={href}
                                    className={`text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${
                                        isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                    }`}
                                >
                                    {item}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden lg:flex items-center gap-6">
                        {userLoaded && (
                            <>
                                {!isSignedIn ? (
                                    <>
                                        <button
                                            onClick={() => openSignIn()}
                                            className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                        >
                                            Log In
                                        </button>
                                        <Link href="/sign-up" className="btn-primary !py-2.5 !px-5 !text-[10px]">
                                            Join Fleet
                                        </Link>
                                    </>
                                ) : (
                                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                                        <button
                                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                                            className="flex items-center gap-3 group focus:outline-none"
                                        >
                                            <img
                                                src={user?.imageUrl}
                                                alt={user?.firstName || "User"}
                                                className="w-9 h-9 rounded-full border border-[var(--border-subtle)] group-hover:border-[var(--accent)] transition-all"
                                            />
                                            <span className="text-[11px] font-medium text-[var(--text-muted)] group-hover:text-[var(--text-primary)] uppercase tracking-wider">
                                                {user?.firstName || "Account"}
                                            </span>
                                        </button>

                                        <div
                                            className={`absolute right-0 top-[calc(100%+8px)] w-52 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg shadow-2xl overflow-hidden transition-all duration-200 origin-top-right ${
                                                userMenuOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
                                            }`}
                                        >
                                            <div className="px-4 py-3 border-b border-[var(--border-subtle)]">
                                                <p className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-0.5">Signed in as</p>
                                                <p className="text-sm text-[var(--text-primary)] truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                                            </div>
                                            <div className="p-1.5">
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-semibold tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-muted)] rounded transition-all"
                                                >
                                                    <LogOut className="w-3.5 h-3.5" />
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden text-[var(--text-primary)] p-2 hover:text-[var(--accent)] transition-colors"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <div className={`lg:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? "max-h-[500px] pb-6" : "max-h-0"}`}>
                    <div className="pt-4 border-t border-[var(--border-subtle)] space-y-1">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="block py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="pt-4 mt-2 border-t border-[var(--border-subtle)]">
                            {isSignedIn ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 py-2">
                                        <img src={user?.imageUrl} className="w-10 h-10 rounded-full border border-[var(--border-subtle)]" alt="" />
                                        <div>
                                            <p className="text-sm text-[var(--text-primary)]">{user?.fullName}</p>
                                            <p className="text-[10px] text-[var(--text-muted)]">{user?.primaryEmailAddress?.emailAddress}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleSignOut}
                                        className="w-full btn-outline !text-center !py-3"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2 pt-2">
                                    <button
                                        onClick={() => { openSignIn(); setMobileOpen(false); }}
                                        className="w-full py-3 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--text-muted)] border border-[var(--border-subtle)] hover:border-[var(--accent)] transition-colors"
                                    >
                                        Log In
                                    </button>
                                    <Link
                                        href="/sign-up"
                                        onClick={() => setMobileOpen(false)}
                                        className="w-full btn-primary text-center !py-3"
                                    >
                                        Join Fleet
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
