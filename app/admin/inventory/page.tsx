"use client";

import { useState } from "react";
import { CARS, Car, formatPrice } from "@/lib/data";
import {
  Plus, Search, Pencil, Trash2, X, Car as CarIcon,
  CheckCircle, Clock, Package, SlidersHorizontal,
} from "lucide-react";

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ status }: { status: string }) {
  const map: Record<string, string> = {
    available: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    sold:      "bg-zinc-500/15  text-zinc-400  border-zinc-500/20",
    reserved:  "bg-amber-500/15 text-amber-400 border-amber-500/20",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}

// ── Car Form Modal ─────────────────────────────────────────────────────────────
function CarModal({
  car,
  onClose,
  onSave,
}: {
  car: Partial<Car> | null;
  onClose: () => void;
  onSave: (car: Car) => void;
}) {
  const isNew = !car?.id;
  const [form, setForm] = useState<Partial<Car>>(
    car ?? { status: "available", category: "Supercars", year: new Date().getFullYear() }
  );

  const set = (key: keyof Car, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.name || !form.price) return;
    onSave({ ...form } as Car);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600/15 border border-red-500/20 flex items-center justify-center">
              <CarIcon className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold text-white">{isNew ? "Add New Vehicle" : "Edit Vehicle"}</h2>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fields */}
        <div className="px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Vehicle Name *</label>
            <input
              value={form.name ?? ""}
              onChange={(e) => set("name", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="e.g. Porsche 911 GT3"
            />
          </div>

          {/* Price */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Price (USD) *</label>
            <input
              type="number"
              value={form.price ?? ""}
              onChange={(e) => set("price", Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="200000"
            />
          </div>

          {/* Year */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Year</label>
            <input
              type="number"
              value={form.year ?? ""}
              onChange={(e) => set("year", Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="2025"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Category</label>
            <select
              value={form.category ?? "Supercars"}
              onChange={(e) => set("category", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
            >
              {["Supercars", "SUVs", "Sedans", "Electric", "Trucks"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Status</label>
            <select
              value={form.status ?? "available"}
              onChange={(e) => set("status", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#1a1a1a] border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
            >
              {["available", "reserved", "sold"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Color */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Color</label>
            <input
              value={form.color ?? ""}
              onChange={(e) => set("color", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Midnight Silver"
            />
          </div>

          {/* Mileage */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Mileage (mi)</label>
            <input
              type="number"
              value={form.mileage ?? ""}
              onChange={(e) => set("mileage", Number(e.target.value))}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="0"
            />
          </div>

          {/* 0-60 */}
          <div className="space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">0–60 mph</label>
            <input
              value={form.speed ?? ""}
              onChange={(e) => set("speed", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="3.2s"
            />
          </div>

          {/* VIN */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">VIN</label>
            <input
              value={form.vin ?? ""}
              onChange={(e) => set("vin", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm font-mono focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="17-character VIN"
              maxLength={17}
            />
          </div>

          {/* Image URL */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Image URL</label>
            <input
              value={form.image ?? ""}
              onChange={(e) => set("image", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="https://..."
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs text-zinc-400 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-white/3 border border-white/8 text-white text-sm resize-none focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
              placeholder="Short description..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-white/5 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm text-zinc-400 bg-white/5 hover:bg-white/8 border border-white/8 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-lg text-sm text-white bg-red-600 hover:bg-red-500 font-semibold transition-all shadow-lg shadow-red-900/30"
          >
            {isNew ? "Add Vehicle" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Delete Confirm ─────────────────────────────────────────────────────────────
function DeleteConfirm({ car, onClose, onConfirm }: { car: Car; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-red-500/20 rounded-2xl w-full max-w-sm p-8 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
          <Trash2 className="w-5 h-5 text-red-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Delete Vehicle?</h3>
        <p className="text-sm text-zinc-400 mb-6">
          <span className="text-white font-medium">{car.name}</span> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-zinc-400 bg-white/5 hover:bg-white/8 border border-white/8 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-lg text-sm text-white bg-red-600 hover:bg-red-500 font-semibold transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdminInventoryPage() {
  const [cars, setCars] = useState<Car[]>(CARS);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [editCar, setEditCar] = useState<Partial<Car> | null | undefined>(undefined);
  const [deleteCar, setDeleteCar] = useState<Car | null>(null);

  const filtered = cars.filter((c) => {
    const q = search.toLowerCase();
    const matchesSearch = c.name.toLowerCase().includes(q) || c.vin?.toLowerCase().includes(q);
    const matchesStatus = filterStatus === "all" || c.status === filterStatus;
    const matchesCategory = filterCategory === "all" || c.category === filterCategory;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleSave = (saved: Car) => {
    if (!saved.id) {
      const newId = Math.max(...cars.map((c) => c.id)) + 1;
      setCars([...cars, { ...saved, id: newId }]);
    } else {
      setCars(cars.map((c) => (c.id === saved.id ? saved : c)));
    }
    setEditCar(undefined);
  };

  const handleDelete = () => {
    if (deleteCar) {
      setCars(cars.filter((c) => c.id !== deleteCar.id));
      setDeleteCar(null);
    }
  };

  const categories = ["all", ...Array.from(new Set(cars.map((c) => c.category)))];

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Inventory</h1>
          <p className="text-zinc-500 text-sm mt-1">{cars.length} vehicles total</p>
        </div>
        <button
          onClick={() => setEditCar({})}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-red-900/30"
        >
          <Plus className="w-4 h-4" /> Add Vehicle
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        {[
          { icon: Package,      label: "Total",     val: cars.length,                                     color: "text-zinc-300" },
          { icon: CheckCircle,  label: "Available", val: cars.filter(c => c.status === "available").length, color: "text-emerald-400" },
          { icon: Clock,        label: "Reserved",  val: cars.filter(c => c.status === "reserved").length,  color: "text-amber-400" },
          { icon: X,            label: "Sold",      val: cars.filter(c => c.status === "sold").length,       color: "text-zinc-500" },
        ].map(({ icon: Icon, label, val, color }) => (
          <div key={label} className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-white/6 rounded-lg text-sm">
            <Icon className={`w-4 h-4 ${color}`} />
            <span className="text-zinc-400">{label}:</span>
            <span className="font-bold text-white">{val}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-3" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or VIN…"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#111] border border-white/8 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[#111] border border-white/8 text-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
          >
            <option value="all">All Status</option>
            {["available", "reserved", "sold"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 rounded-lg bg-[#111] border border-white/8 text-zinc-300 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 transition-all"
          >
            {categories.map((c) => <option key={c} value={c}>{c === "all" ? "All Categories" : c}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-white/6 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-xs text-zinc-500 uppercase tracking-widest">
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-4 py-4 font-medium">Year</th>
                <th className="px-4 py-4 font-medium">Category</th>
                <th className="px-4 py-4 font-medium">Price</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Mileage</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-zinc-600">No vehicles found.</td>
                </tr>
              ) : (
                filtered.map((car) => (
                  <tr key={car.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={car.image} alt={car.name} className="w-14 h-10 object-cover rounded-md bg-zinc-800 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-white">{car.name}</p>
                          <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{car.vin}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-zinc-300">{car.year}</td>
                    <td className="px-4 py-4 text-zinc-400">{car.category}</td>
                    <td className="px-4 py-4 font-semibold text-white">{formatPrice(car.price)}</td>
                    <td className="px-4 py-4"><Badge status={car.status} /></td>
                    <td className="px-4 py-4 text-zinc-400">{car.mileage?.toLocaleString()} mi</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setEditCar(car)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCar(car)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {editCar !== undefined && (
        <CarModal car={editCar} onClose={() => setEditCar(undefined)} onSave={handleSave} />
      )}
      {deleteCar && (
        <DeleteConfirm car={deleteCar} onClose={() => setDeleteCar(null)} onConfirm={handleDelete} />
      )}
    </div>
  );
}
