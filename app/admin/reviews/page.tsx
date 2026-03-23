"use client";

import { useState, useEffect, useCallback } from "react";
import { subscribeReviews, addReview, updateReview, deleteReview, Review } from "@/lib/reviews";
import { uploadToCloudinary } from "@/lib/cloudinary-client";
import { 
  Star, CheckCircle2, XCircle, Clock, Search, 
  Trash2, Plus, X, User, Car, Quote, 
  MapPin, Loader2, Pencil, Image as ImageIcon 
} from "lucide-react";

// ── Components ──────────────────────────────────────────────────────────────────
function StarRating({ rating, setRating }: { rating: number, setRating?: (r: number) => void }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          disabled={!setRating}
          onClick={() => setRating?.(i)}
          className={`transition-all ${setRating ? "hover:scale-125 active:scale-95" : ""}`}
        >
          <Star
            className={`w-4 h-4 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-800"}`}
          />
        </button>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Review["status"] }) {
  const map: Record<string, string> = {
    Active:  "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    Pending: "bg-amber-500/15  text-amber-400  border-amber-500/20",
    Archived: "bg-zinc-500/15  text-zinc-500  border-zinc-500/20",
  };
  return (
    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${map[status]}`}>
      {status}
    </span>
  );
}

// ── Review Form Modal ─────────────────────────────────────────────────────────────
function ReviewModal({
  review,
  onClose,
  onSave,
}: {
  review: Partial<Review> | null;
  onClose: () => void;
  onSave: () => void;
}) {
  const isNew = !review?.id;
  const [form, setForm] = useState<Partial<Review>>(
    review ?? { 
      name: "", role: "Owner", comment: "", rating: 5, 
      status: "Active", location: "", vehicle: "", avatar: "" 
    }
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof Review, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      set("avatar", url);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.comment) return;
    setSaving(true);
    try {
      if (isNew) await addReview(form);
      else await updateReview(review.id!, form);
      onSave();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        <div className="px-10 py-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Quote className="w-5 h-5 text-amber-500" />
             </div>
             <div>
                <h2 className="text-xl font-bold text-white tracking-widest uppercase italic">{isNew ? "Record Testimonial" : "Edit Experience"}</h2>
                <p className="text-[10px] text-zinc-600 tracking-[0.2em] font-black uppercase mt-1 italic">Verified Customer Program</p>
             </div>
          </div>
          <button onClick={onClose} className="text-zinc-600 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-10 space-y-8 scrollbar-thin scrollbar-thumb-zinc-800">
          
          <div className="flex items-center gap-8">
             <div className="relative group">
                <div className="w-24 h-24 rounded-[2rem] bg-zinc-900 border-2 border-dashed border-zinc-800 overflow-hidden flex items-center justify-center">
                   {form.avatar ? (
                     <img src={form.avatar} className="w-full h-full object-cover" alt="" />
                   ) : (
                     <User className="w-8 h-8 text-zinc-800" />
                   )}
                   {uploading && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-amber-500" /></div>}
                </div>
                <input type="file" onChange={handleAvatarUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg border-2 border-[#0d0d0d]">
                   <ImageIcon className="w-3.5 h-3.5 text-black" />
                </div>
             </div>
             <div className="flex-1 space-y-4">
                <div className="space-y-1">
                   <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Full Name</label>
                   <input value={form.name} onChange={e => set("name", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-5 py-3 text-white text-sm outline-none focus:border-amber-500/50 transition-all" placeholder="e.g. Julian Sterling" />
                </div>
                <div className="flex gap-4">
                   <div className="flex-1 space-y-1">
                      <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Global Status</label>
                      <select value={form.status} onChange={e => set("status", e.target.value)} className="w-full bg-[#151515] border border-zinc-800 rounded-xl px-4 py-2 text-xs text-white outline-none">
                         <option value="Active">Active</option>
                         <option value="Pending">Pending</option>
                         <option value="Archived">Archived</option>
                      </select>
                   </div>
                   <div className="flex-1 space-y-1">
                      <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Rating</label>
                      <div className="pt-2"><StarRating rating={form.rating!} setRating={(r) => set("rating", r)} /></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-1">
                <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest flex items-center gap-2"><Car className="w-3 h-3"/> Vehicle Acquired</label>
                <input value={form.vehicle} onChange={e => set("vehicle", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-amber-500/50" placeholder="e.g. Porsche 911 Turbo S" />
             </div>
             <div className="space-y-1">
                <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3"/> Location</label>
                <input value={form.location} onChange={e => set("location", e.target.value)} className="w-full bg-white/3 border border-zinc-800 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-amber-500/50" placeholder="e.g. Monaco / Beverly Hills" />
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">The Experience</label>
             <textarea value={form.comment} onChange={e => set("comment", e.target.value)} rows={5} className="w-full bg-white/3 border border-zinc-800 rounded-[2rem] p-6 text-sm text-zinc-300 italic outline-none focus:border-amber-500/50 resize-none leading-relaxed" placeholder="Transcribe the customer's quote..." />
          </div>

        </div>

        <div className="px-10 py-8 border-t border-white/5 flex gap-4 justify-end bg-black/20">
           <button onClick={onClose} className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-500 border border-white/5 hover:bg-white/5 transition-all">Dismiss</button>
           <button onClick={handleSave} disabled={saving || uploading} className="flex items-center gap-3 px-10 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-amber-900/20 disabled:opacity-50">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {isNew ? "Induct Review" : "Save Changes"}
           </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editReview, setEditReview] = useState<Partial<Review> | null | undefined>(undefined);

  useEffect(() => {
    const unsub = subscribeReviews((data) => {
      setReviews(data);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This is permanent.")) return;
    await deleteReview(id);
  };

  const filtered = reviews.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.vehicle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-[1600px] mx-auto space-y-12 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-white/5">
        <div>
           <h1 className="text-4xl font-extrabold text-white tracking-tighter italic uppercase">Patron Testimonials</h1>
           <p className="text-zinc-500 text-xs tracking-[0.3em] font-black uppercase mt-2">Managing the voice of excellence · {reviews.length} entries</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="relative group">
              <Search className="w-4 h-4 text-zinc-700 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-amber-500 transition-colors" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or vehicle..." className="pl-11 pr-6 py-3.5 bg-zinc-900/50 border border-white/5 rounded-2xl text-xs text-white outline-none focus:ring-1 focus:ring-amber-500/30 transition-all w-[320px]" />
           </div>
           <button onClick={() => setEditReview({})} className="flex items-center gap-3 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-900/10 transition-all active:scale-95">
              <Plus className="w-4 h-4" /> Record Review
           </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
           <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
           <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Sourcing Testimonials...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
           {filtered.map(review => (
             <div key={review.id} className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 space-y-8 hover:translate-y-[-4px] hover:border-amber-500/20 transition-all duration-500 shadow-2xl">
                
                <div className="flex items-start justify-between">
                   <div className="flex items-center gap-5">
                      <img src={review.avatar || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=200"} className="w-16 h-16 rounded-[1.5rem] object-cover border border-white/10 group-hover:border-amber-500/30 transition-colors" alt="" />
                      <div>
                         <h3 className="text-lg font-bold text-white tracking-tight">{review.name}</h3>
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">{review.location}</p>
                      </div>
                   </div>
                   <StatusBadge status={review.status} />
                </div>

                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <StarRating rating={review.rating} />
                      <div className="w-1 h-1 rounded-full bg-zinc-800" />
                      <p className="text-[10px] text-zinc-700 font-black uppercase tracking-widest italic">{review.vehicle}</p>
                   </div>
                   <p className="text-zinc-400 text-sm leading-relaxed italic line-clamp-4 group-hover:text-zinc-200 transition-colors">
                      &ldquo;{review.comment}&rdquo;
                   </p>
                </div>

                <div className="flex gap-3 pt-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={() => setEditReview(review)} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all">
                       <Pencil className="w-3.5 h-3.5" /> Modify
                    </button>
                    <button onClick={() => handleDelete(review.id!)} className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-600/10 border border-red-600/20 text-red-500 hover:bg-red-600 hover:text-white transition-all">
                       <Trash2 className="w-4 h-4" />
                    </button>
                </div>
             </div>
           ))}

           <button onClick={() => setEditReview({})} className="aspect-video lg:aspect-auto flex flex-col items-center justify-center border-2 border-dashed border-zinc-900 rounded-[2.5rem] hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-500 gap-4 group">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center group-hover:bg-amber-500 transition-colors duration-500">
                 <Plus className="w-8 h-8 text-zinc-800 group-hover:text-black transition-colors" />
              </div>
              <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">Record New Patron Voice</p>
           </button>
        </div>
      )}

      {editReview !== undefined && (
        <ReviewModal review={editReview} onClose={() => setEditReview(undefined)} onSave={() => setEditReview(undefined)} />
      )}
    </div>
  );
}
