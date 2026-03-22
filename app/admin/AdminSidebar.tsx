"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Car,
  LayoutDashboard,
  ListOrdered,
  Star,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "@/lib/adminAuth";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard },
  { label: "Inventory",  href: "/admin/inventory",  icon: ListOrdered },
  { label: "Reviews",    href: "/admin/reviews",    icon: Star },
  { label: "Inquiries",  href: "/admin/inquiries",  icon: MessageSquare },
  { label: "Settings",   href: "/admin/settings",   icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't render sidebar on login page
  if (pathname === "/admin/login") return null;

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  const SidebarContents = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-8 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/40">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold tracking-wider text-sm">VELOCITY</p>
            <p className="text-[10px] text-zinc-500 tracking-widest uppercase">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all group ${
                isActive
                  ? "bg-red-600/15 text-red-400 border border-red-600/20"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-red-500" : "group-hover:text-white"}`} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight className="w-3 h-3 text-red-500" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer: user info + logout */}
      <div className="px-3 pb-6 border-t border-white/5 pt-4 space-y-2">
        <div className="px-4 py-3 rounded-lg bg-white/3 border border-white/5">
          <p className="text-xs text-zinc-400 truncate">{admin?.email}</p>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mt-0.5">Super Admin</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/10"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-[#0d0d0d] border-r border-white/5 z-50">
        <SidebarContents />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-50 bg-[#0d0d0d] border-b border-white/5 flex items-center justify-between px-4 py-3.5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-semibold tracking-wider text-sm">VELOCITY Admin</span>
        </Link>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-zinc-400 hover:text-white">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-14">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-[#0d0d0d] border-r border-white/5">
            <SidebarContents />
          </aside>
        </div>
      )}
    </>
  );
}
