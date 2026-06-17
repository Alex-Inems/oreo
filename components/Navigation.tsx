"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Car, ChevronDown, Menu, X, LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Inventory", href: "/inventory" },
    { label: "Pages", href: "/support" },
    { label: "Blog", href: "/reviews" },
    { label: "Features", href: "/performance" },
];

type NavShellProps = {
    light: boolean;
    pathname: string;
    mobileOpen: boolean;
    setMobileOpen: (v: boolean) => void;
    authSlot: React.ReactNode;
};

function NavShell({ light, pathname, mobileOpen, setMobileOpen, authSlot }: NavShellProps) {
    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                light ? "bg-transparent" : "bg-white shadow-sm border-b border-[var(--border-light)]"
            }`}
        >
            <nav className="max-w-[1280px] mx-auto px-5 md:px-8">
                <div className="flex items-center justify-between h-[72px]">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <Car className="w-7 h-7 text-[var(--orange)]" strokeWidth={1.5} />
                        <span className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-[var(--text-dark)]"}`}>
                            oreo
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-7">
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-1 text-[15px] font-medium transition-colors ${
                                    light
                                        ? "text-white/90 hover:text-white"
                                        : "text-[var(--text-dark)] hover:text-[var(--orange)]"
                                } ${pathname === item.href ? (light ? "text-white" : "text-[var(--orange)]") : ""}`}
                            >
                                {item.label}
                                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-5">
                        {authSlot}
                        <Link
                            href="/support?inquiry=submit"
                            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-md text-[14px] font-semibold border-2 transition-all ${
                                light
                                    ? "border-[var(--orange)] text-white hover:bg-[var(--orange)]"
                                    : "border-[var(--orange)] text-[var(--orange)] hover:bg-[var(--orange)] hover:text-white"
                            }`}
                        >
                            <span className="text-lg leading-none">+</span> Submit Vehicle
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className={`lg:hidden p-2 ${light ? "text-white" : "text-[var(--text-dark)]"}`}
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className={`lg:hidden pb-6 border-t ${light ? "border-white/10" : "border-[var(--border-light)]"}`}>
                        {NAV_LINKS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`block py-3 text-[15px] font-medium ${light ? "text-white" : "text-[var(--text-dark)]"}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
}

function GuestAuthLinks({ light }: { light: boolean }) {
    const linkClass = `text-[15px] font-medium transition-colors ${
        light ? "text-white/90 hover:text-white" : "text-[var(--text-dark)] hover:text-[var(--orange)]"
    }`;

    return (
        <>
            <Link href="/sign-in" className={linkClass}>Log in</Link>
            <Link href="/sign-up" className={linkClass}>Register</Link>
        </>
    );
}

function ClerkAuthLinks({ light }: { light: boolean }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { user, isLoaded, isSignedIn } = useUser();
    const { signOut, openSignIn } = useClerk();

    useEffect(() => {
        if (!userMenuOpen) return;
        const close = () => setUserMenuOpen(false);
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, [userMenuOpen]);

    if (!isLoaded) return null;

    if (!isSignedIn) {
        return (
            <>
                <button
                    onClick={() => openSignIn()}
                    className={`text-[15px] font-medium transition-colors ${
                        light ? "text-white/90 hover:text-white" : "text-[var(--text-dark)] hover:text-[var(--orange)]"
                    }`}
                >
                    Log in
                </button>
                <Link
                    href="/sign-up"
                    className={`text-[15px] font-medium transition-colors ${
                        light ? "text-white/90 hover:text-white" : "text-[var(--text-dark)] hover:text-[var(--orange)]"
                    }`}
                >
                    Register
                </Link>
            </>
        );
    }

    return (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setUserMenuOpen(!userMenuOpen)} aria-label="User menu" className="flex items-center gap-2">
                <img src={user?.imageUrl} alt="" className="w-8 h-8 rounded-full border-2 border-[var(--orange)]" />
            </button>
            {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-[var(--border-light)] py-2">
                    <p className="px-4 py-2 text-sm font-medium text-[var(--text-dark)] truncate">{user?.firstName}</p>
                    <button
                        onClick={() => signOut()}
                        className="w-full text-left px-4 py-2 text-sm text-[var(--text-muted)] hover:text-[var(--orange)] flex items-center gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            )}
        </div>
    );
}

function NavigationInner({ clerkEnabled }: { clerkEnabled: boolean }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [onHero, setOnHero] = useState(true);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        if (!isHome) { setOnHero(false); return; }
        const onScroll = () => setOnHero(window.scrollY < window.innerHeight * 0.6);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isHome]);

    if (pathname?.startsWith("/admin")) return null;

    const light = isHome && onHero;

    return (
        <NavShell
            light={light}
            pathname={pathname}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            authSlot={clerkEnabled ? <ClerkAuthLinks light={light} /> : <GuestAuthLinks light={light} />}
        />
    );
}

export default function Navigation({ clerkEnabled }: { clerkEnabled: boolean }) {
    return <NavigationInner clerkEnabled={clerkEnabled} />;
}
