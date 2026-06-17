import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
    variable: "--font-cormorant",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600"],
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
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} font-sans antialiased`}
                >
                    <Providers>
                        <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased overflow-x-hidden">
                            <Navigation />
                            {children}
                            <Footer />
                        </div>
                    </Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
