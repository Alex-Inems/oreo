"use client";

import { CARS, REVIEWS, INQUIRIES, formatPrice } from "@/lib/data";
import { Car, Star, MessageSquare, DollarSign, TrendingUp, Clock, CheckCircle, Package } from "lucide-react";
import Link from "next/link";

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-[#111] border border-white/6 rounded-xl p-6 flex gap-4 items-start hover:border-white/10 transition-colors">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-zinc-500 text-xs uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold text-white mt-0.5">{value}</p>
        <p className="text-xs text-zinc-500 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    sold: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
    reserved: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    contacted: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    closed: "bg-zinc-500/15 text-zinc-400 border-zinc-500/20",
    approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const totalRevenue = CARS.filter((c) => c.status === "sold").reduce((s, c) => s + c.price, 0);
  const available = CARS.filter((c) => c.status === "available").length;
  const newInquiries = INQUIRIES.filter((i) => i.status === "new").length;
  const pendingReviews = REVIEWS.filter((r) => r.status === "pending").length;

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Welcome back — here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Car} label="Available" value={available} sub={`of ${CARS.length} total listings`} color="bg-red-600" />
        <StatCard icon={DollarSign} label="Revenue" value={formatPrice(totalRevenue)} sub="from sold vehicles" color="bg-emerald-600" />
        <StatCard icon={MessageSquare} label="New Inquiries" value={newInquiries} sub="awaiting response" color="bg-blue-600" />
        <StatCard icon={Star} label="Pending Reviews" value={pendingReviews} sub="need moderation" color="bg-amber-500" />
      </div>

      {/* Body grid */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Recent inventory — span 3 */}
        <section className="lg:col-span-3 bg-[#111] border border-white/6 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-white flex items-center gap-2"><Package className="w-4 h-4 text-zinc-500" /> Inventory</h2>
            <Link href="/admin/inventory" className="text-xs text-red-400 hover:text-red-300 transition-colors">View all →</Link>
          </div>
          <div className="divide-y divide-white/5">
            {CARS.slice(0, 5).map((car) => (
              <div key={car.id} className="px-6 py-4 flex items-center gap-4 hover:bg-white/2 transition-colors">
                <img src={car.image} alt={car.name} className="w-14 h-10 object-cover rounded-md flex-shrink-0 bg-zinc-800" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{car.name}</p>
                  <p className="text-xs text-zinc-500">{car.year} · {car.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white">{formatPrice(car.price)}</p>
                  <Badge status={car.status} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right column: activity + inquiries */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent inquiries */}
          <section className="bg-[#111] border border-white/6 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-semibold text-white flex items-center gap-2"><MessageSquare className="w-4 h-4 text-zinc-500" /> Inquiries</h2>
              <Link href="/admin/inquiries" className="text-xs text-red-400 hover:text-red-300 transition-colors">View all →</Link>
            </div>
            <div className="divide-y divide-white/5">
              {INQUIRIES.map((inq) => (
                <div key={inq.id} className="px-6 py-4 hover:bg-white/2 transition-colors">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-white">{inq.name}</p>
                    <Badge status={inq.status} />
                  </div>
                  <p className="text-xs text-zinc-500 truncate">{inq.carName ?? "General inquiry"}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick stats */}
          <section className="bg-[#111] border border-white/6 rounded-xl p-6 space-y-4">
            <h2 className="font-semibold text-white text-sm flex items-center gap-2"><TrendingUp className="w-4 h-4 text-zinc-500" /> Quick Stats</h2>
            {[
              { icon: CheckCircle, label: "Cars Sold", value: CARS.filter(c => c.status === "sold").length, color: "text-emerald-400" },
              { icon: Clock, label: "Reserved", value: CARS.filter(c => c.status === "reserved").length, color: "text-amber-400" },
              { icon: Star, label: "Approved Reviews", value: REVIEWS.filter(r => r.status === "approved").length, color: "text-yellow-400" },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${color}`} />
                <span className="text-sm text-zinc-400 flex-1">{label}</span>
                <span className="text-sm font-bold text-white">{value}</span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
