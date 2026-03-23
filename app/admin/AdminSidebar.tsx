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
  FileText,
} from "lucide-react";
import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const NAV = [
  { label: "Dashboard",       href: "/admin",            icon: LayoutDashboard },
  { label: "Site Content",    href: "/admin/content",    icon: FileText },
  { label: "Inventory",       href: "/admin/inventory",  icon: ListOrdered },
  { label: "Reviews",         href: "/admin/reviews",    icon: Star },
  { label: "Inquiries",       href: "/admin/inquiries",  icon: MessageSquare },
  { label: "Settings",        href: "/admin/settings",   icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Don't render sidebar on login page
  if (pathname === "/admin/login") return null;

  const handleLogout = () => {
    router.push("/");
  };

  const SidebarContents = () => (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Brand */}
      <div className="px-6 py-8 border-b border-white/5 bg-black/20">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-900/40 transform transition-transform group-hover:scale-105">
            <Car className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold tracking-widest text-sm leading-tight">VELOCITY</p>
            <p className="text-[10px] text-zinc-500 tracking-[0.2em] font-medium uppercase mt-0.5">Control Panel</p>
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-800">
        {NAV.map(({ label, href, icon: Icon }) => {
          const isActive = href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? "bg-red-600/15 text-red-400 border border-red-500/10 shadow-inner"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-red-600/10" : "bg-zinc-900/40"}`}>
                <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? "text-red-500 scale-110" : "group-hover:text-white group-hover:scale-110"}`} />
              </div>
              <span className="flex-1 tracking-wide">{label}</span>
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.8)]" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer: User Info + Logout */}
      <div className="px-4 pb-8 border-t border-white/5 pt-6 space-y-3 bg-black/10">
        <div className="px-4 py-3.5 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-white/10 bg-zinc-800 flex items-center justify-center">
            {user?.imageUrl ? <img src={user.imageUrl} className="rounded-full" alt="" /> : <Car className="w-4 h-4 text-zinc-600" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user?.firstName || "Demo Admin"}</p>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Development Mode</p>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-red-400 hover:bg-red-500/5 transition-all border border-zinc-800/40 hover:border-red-500/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          Exit Dashboard
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 bg-[#080808] border-r border-white/5 z-[60] shadow-2xl shadow-black/80">
        <SidebarContents />
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-[60] bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-6 py-4 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Car className="w-4 h-4 text-white" />
          </div>
          <span className="text-white font-bold tracking-widest text-sm italic">VELOCITY CONTROL</span>
        </Link>
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-zinc-400 hover:text-white active:scale-95 transition-all"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[70] pt-16 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-full max-w-[280px] h-full bg-[#080808] border-r border-white/5 animate-in slide-in-from-left duration-300">
            <SidebarContents />
          </aside>
        </div>
      )}
    </>
  );
}
