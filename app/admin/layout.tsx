import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AdminAuthProvider } from "@/lib/adminAuth";
import AdminGuard from "./AdminGuard";
import AdminSidebar from "./AdminSidebar";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Admin Panel · oreo Cars26",
  description: "oreo Cars26 administration dashboard",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <div className={`${geist.variable} font-sans`}>
        <AdminGuard>
          <AdminSidebar />
          <main className="md:pl-64 pt-20 md:pt-0 min-h-screen bg-[#0a0a0a] text-white">
            {children}
          </main>
        </AdminGuard>
      </div>
    </AdminAuthProvider>
  );
}
