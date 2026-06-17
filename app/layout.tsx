import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { isClerkEnabled } from "@/lib/clerk";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "oreo Cars26",
    description: "Exclusive Performance & Luxury Vehicles",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const clerkEnabled = isClerkEnabled();

    const shell = (
        <Providers>
            <div className="bg-white text-[var(--text-dark)] font-sans antialiased overflow-x-hidden">
                <Navigation clerkEnabled={clerkEnabled} />
                {children}
                <Footer />
            </div>
        </Providers>
    );

    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
                {clerkEnabled ? <ClerkProvider>{shell}</ClerkProvider> : shell}
            </body>
        </html>
    );
}
