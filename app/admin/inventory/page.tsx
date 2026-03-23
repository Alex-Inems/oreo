"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  getAllCars, addCar, updateCar, deleteCar, Car, CarSpec 
} from "@/lib/inventory";
import { uploadToCloudinary } from "@/lib/cloudinary-client";
import {
  Plus, Search, Pencil, Trash2, X, Car as CarIcon,
  CheckCircle, Clock, Package, SlidersHorizontal,
  Upload, Loader2, DollarSign, Gauge, Zap, PlusCircle, Info
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────
const formatPrice = (price: number) => 
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

function Badge({ condition }: { condition: string }) {
  const map: Record<string, string> = {
    New:       "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Used:      "bg-zinc-500/15  text-zinc-400  border-zinc-500/20",
    Certified: "bg-blue-500/15  text-blue-400  border-blue-500/20",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${map[condition] ?? ""}`}>
      {condition}
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
  onSave: () => void;
}) {
  const isNew = !car?.id;
  const [form, setForm] = useState<Partial<Car>>(
    car ?? { 
      make: "", model: "", year: 2024, price: 0, 
      condition: "New", bodyType: "Coupe", engine: "V8", 
      mileage: 0, description: "", specs: [], featured: false,
      image: "", images: []
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof Car, val: any) => {
    setForm((f) => ({ ...f, [key]: val }));
    if (error) setError(null); // clear error when modifying fields
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const url = await uploadToCloudinary(file);
      set("image", url);
    } catch (err) {
      setError("Image upload failed. Please verify your internet connection or Cloudinary API keys.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setError(null);
    if (!form.make || form.make.trim() === "") {
        setError("Vehicle Maker field is required.");
        return;
    }
    if (!form.model || form.model.trim() === "") {
        setError("Vehicle Model field is required.");
        return;
    }
    if (form.price === undefined || form.price < 0) {
        setError("Please provide a valid numerical price.");
        return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addCar(form);
      } else {
        await updateCar(car.id!, form);
      }
      onSave();
    } catch (err: any) {
      console.error(err);
      setError(`Database Error: ${err.message || "Failed to commit changes."}`);
    } finally {
      setSaving(false);
    }
  };

  const addSpec = () => {
    const specs = [...(form.specs || []), { label: "", value: "" }];
    set("specs", specs);
  };

  const updateSpec = (idx: number, field: keyof CarSpec, val: string) => {
    const specs = [...(form.specs || [])];
    specs[idx] = { ...specs[idx], [field]: val };
    set("specs", specs);
  };

  const removeSpec = (idx: number) => {
    set("specs", (form.specs || []).filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[2rem] w-full max-w-4xl shadow-2xl flex flex-col max-h-full overflow-hidden">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between bg-black/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center shadow-lg shadow-red-900/40">
              <CarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-widest uppercase italic">{isNew ? "Induct New Vehicle" : "Update Fleet Registry"}</h2>
              <p className="text-[10px] text-zinc-500 tracking-[0.2em] font-black uppercase mt-1">Velocity Inventory Protocol v2.0</p>
            </div>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-12 scrollbar-thin scrollbar-thumb-zinc-800">
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-5 py-4 rounded-xl flex items-start gap-3">
               <Info className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
               <p className="leading-relaxed">{error}</p>
            </div>
          )}

          {/* Grid: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-red-500" /> Basic Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Make</label>
                  <input value={form.make} onChange={e => set("make", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 transition-all outline-none" placeholder="e.g. Lamborghini" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Model</label>
                  <input value={form.model} onChange={e => set("model", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 transition-all outline-none" placeholder="e.g. Aventador SVJ" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Price (USD)</label>
                  <input type="number" value={form.price} onChange={e => set("price", Number(e.target.value))} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 transition-all outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Year</label>
                  <input type="number" value={form.year} onChange={e => set("year", Number(e.target.value))} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 transition-all outline-none" />
                </div>
              </div>

              {/* Grid: Mechanical Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Engine</label>
                  <input value={form.engine} onChange={e => set("engine", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-red-600" placeholder="V12 / Hybrid" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Mileage</label>
                  <input type="number" value={form.mileage} onChange={e => set("mileage", Number(e.target.value))} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-red-600" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Body Type</label>
                  <input value={form.bodyType} onChange={e => set("bodyType", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-red-600" placeholder="Coupe / SUV" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-600 uppercase font-black tracking-widest ml-1">Condition</label>
                  <select value={form.condition} onChange={e => set("condition", e.target.value)} className="w-full bg-[#151515] border border-zinc-800 rounded-xl px-4 py-3 text-white text-xs outline-none">
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Certified">Certified</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div className="space-y-6">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-red-500" /> Primary Image
              </h3>
              <div className="relative aspect-video rounded-2xl bg-zinc-900 border-2 border-dashed border-zinc-800 overflow-hidden group">
                {form.image ? (
                  <>
                    <img src={form.image} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <label className="cursor-pointer bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg">Replace</label>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    {uploading ? <Loader2 className="w-6 h-6 animate-spin text-red-600" /> : <Upload className="w-6 h-6 text-zinc-700" />}
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{uploading ? "Uploading..." : "Click to Upload"}</p>
                  </div>
                )}
                <input type="file" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer disabled:hidden" disabled={uploading} accept="image/*" />
              </div>
            </div>
          </div>

          {/* Section: Specs & Features */}
          <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em] flex items-center gap-2">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-red-500" /> Performance Specifications
                </h3>
                <button onClick={addSpec} className="flex items-center gap-2 text-[10px] text-red-500 font-black uppercase tracking-widest hover:text-white transition-colors">
                    <PlusCircle className="w-3.5 h-3.5" /> Add Field
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(form.specs || []).map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/2 border border-zinc-800 p-3 rounded-2xl">
                        <input value={spec.label} onChange={e => updateSpec(idx, "label", e.target.value)} placeholder="Label (e.g. 0-60)" className="flex-1 bg-transparent border-none outline-none text-xs text-zinc-400 font-medium" />
                        <div className="w-px h-4 bg-zinc-800" />
                        <input value={spec.value} onChange={e => updateSpec(idx, "value", e.target.value)} placeholder="Value (e.g. 2.8s)" className="flex-1 bg-transparent border-none outline-none text-xs text-white font-bold" />
                        <button onClick={() => removeSpec(idx)} className="text-zinc-600 hover:text-red-500"><X className="w-4 h-4" /></button>
                    </div>
                ))}
              </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
             <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-[0.3em]">Vehicle Biography</h3>
             <textarea 
               value={form.description} 
               onChange={e => set("description", e.target.value)} 
               rows={4} 
               className="w-full bg-white/2 border border-zinc-800 rounded-3xl p-6 text-sm text-zinc-300 outline-none focus:border-red-600 transition-all resize-none leading-relaxed italic"
               placeholder="Tell the story of this masterpiece..."
             />
          </div>

        </div>

        {/* Footer */}
        <div className="px-10 py-8 border-t border-white/5 flex gap-4 justify-end bg-black/20">
          <button onClick={onClose} className="px-8 py-3 rounded-xl text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] border border-white/5 hover:bg-white/5 transition-all">Cancel</button>
          <button 
            onClick={handleSave} 
            disabled={saving || uploading}
            className="flex items-center gap-3 px-10 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-900/30 disabled:opacity-50"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin text-white" />}
            {isNew ? "Induct Vehicle" : "Update Fleet Registry"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdminInventoryPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editCar, setEditCar] = useState<Partial<Car> | null | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    const data = await getAllCars();
    setCars(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This is permanent.")) return;
    await deleteCar(id);
    fetchCars();
  };

  const filtered = cars.filter((c) => {
    const q = search.toLowerCase();
    return c.make.toLowerCase().includes(q) || c.model.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tighter italic uppercase">Fleet Registry</h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase mt-2 font-medium">Manage your {cars.length} exclusive performance vehicles.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="w-4 h-4 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-red-500 transition-colors" />
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by make or model..." 
              className="pl-11 pr-6 py-3 bg-zinc-900 border border-white/5 rounded-2xl text-xs text-white outline-none focus:ring-1 focus:ring-red-600 transition-all w-[300px]" 
            />
          </div>
          <button 
            onClick={() => setEditCar({})}
            className="flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-red-900/30 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
          <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Accessing Secure Database...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filtered.map((car) => (
            <div key={car.id} className="group relative bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/30 transition-all duration-500 shadow-2xl hover:shadow-red-900/10">
              {/* Image */}
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={car.image} alt="" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 right-6">
                    <Badge condition={car.condition} />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">{car.make} {car.model}</h3>
                        <p className="text-[10px] text-zinc-600 uppercase font-black tracking-[0.2em] mt-1">{car.year} · {car.engine}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-black text-red-500 italic">{formatPrice(car.price)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/3 rounded-xl border border-white/5">
                        <Zap className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase truncate">{car.bodyType}</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/3 rounded-xl border border-white/5">
                        <Gauge className="w-3.5 h-3.5 text-zinc-600" />
                        <span className="text-[10px] text-zinc-400 font-bold uppercase truncate">{car.mileage.toLocaleString()} KM</span>
                    </div>
                </div>

                <div className="flex gap-3 pt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button 
                        onClick={() => setEditCar(car)}
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                    >
                        <Pencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button 
                        onClick={() => handleDelete(car.id!)}
                        className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
              </div>
            </div>
          ))}

          {/* New Car Placeholder */}
          <button 
            onClick={() => setEditCar({})}
            className="group aspect-square md:aspect-auto flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-[2.5rem] hover:border-red-600/40 hover:bg-red-600/5 transition-all duration-500 gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-red-600 transition-colors">
                <Plus className="w-8 h-8 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] group-hover:text-red-500 transition-colors">Expand Inventory</p>
          </button>
        </div>
      )}

      {/* Modals */}
      {editCar !== undefined && (
        <CarModal 
          car={editCar} 
          onClose={() => setEditCar(undefined)} 
          onSave={() => { setEditCar(undefined); fetchCars(); }} 
        />
      )}
    </div>
  );
}
