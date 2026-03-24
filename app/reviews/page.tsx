"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Star, 
  Quote, 
  Play, 
  Instagram, 
  CheckCircle, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  X,
  PlusCircle,
  MessageSquare,
  Award,
  ArrowRight,
  Loader2
} from "lucide-react";
import { subscribeReviews, addReview, Review as FirebaseReview } from "@/lib/reviews";
import { FallbackImage } from "@/components/UI/FallbackImage";

// --- Static Data Fallbacks & Content ---

const VIDEOS = [
  { id: "1614162692292-7ac56d7f7f1e", title: "Lamborghini Huracán STO Delivery", category: "Supercars", duration: "0:45" },
  { id: "1503376763036-066120622c74", title: "Porsche 911 GT3 Handover", category: "Asset Management", duration: "1:12" },
  { id: "1580273916550-e323be2ebeed", title: "G-Wagon Bespoke Pickup", category: "Luxury SUVs", duration: "0:58" },
  { id: "1614162692292-7ac56d7f7f1e", title: "Ferrari SF90 First Drive", category: "Hypercars", duration: "2:05" }
];

const INSTAGRAM_IDS = [
  "1552519507-da8b1227ec3a",
  "1542362567-b05eac1a67a4",
  "1511919884226-fd3cad34687c",
  "1525609004556-c46c7d6cf048",
  "1560958089-b8a1929cea89",
  "1617814076367-b759c7d7e738"
];

// --- Animations ---

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

// --- Components ---

function ReviewCard({ review }: { review: FirebaseReview }) {
  return (
    <motion.div 
      variants={fadeInUp}
      className="group relative bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl hover:border-red-600/50 transition-all duration-700 shadow-2xl overflow-hidden min-[2000px]:p-12"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700 text-red-500">
        <Quote className="w-12 h-12" />
      </div>
      
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "text-red-500 fill-red-500" : "text-zinc-800"}`} />
        ))}
      </div>

      <p className="text-zinc-300 text-lg md:text-xl font-medium leading-relaxed italic mb-10 group-hover:text-white transition-colors">
        "{review.comment}"
      </p>

      <div className="flex items-center gap-4 border-t border-white/5 pt-8">
        <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-white/10 overflow-hidden shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-500 shrink-0">
          <FallbackImage 
            src={review.avatar || `https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80`} 
            fallbackSrc="/public/images/car1.jpg"
            alt={review.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-white font-bold uppercase text-[11px] tracking-widest">{review.name}</h4>
          <p className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mt-1">
            {review.vehicle} · {review.location}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function ReviewModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: "", vehicle: "", location: "", rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addReview({
        ...form,
        avatar: "", // Placeholder
        status: "Active", // Auto-active for demo, change to "Pending" in prod
        role: "Client",
        createdAt: new Date()
      });
      setDone(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10"
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <motion.div 
        initial={{ y: 50, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 50, scale: 0.95 }}
        className="relative bg-zinc-950 border border-white/10 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-10 md:p-16">
          <button onClick={onClose} className="absolute top-8 right-8 text-zinc-500 hover:text-white"><X className="w-6 h-6" /></button>
          
          {done ? (
            <div className="py-20 text-center space-y-6">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto shadow-xl">
                 <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black italic uppercase italic tracking-tighter">Inducted Successfully</h2>
              <p className="text-zinc-500 uppercase tracking-widest text-[10px]">Your experience has been archived in our global registry.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h2 className="text-4xl font-black italic uppercase italic tracking-tighter mb-2">Registry Entry</h2>
                <p className="text-zinc-500 uppercase tracking-widest text-[10px] font-bold">Document your Oreo acquisition journey</p>
              </div>

              <form onSubmit={submit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Legal Name</label>
                    <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-white/5 border border-zinc-900 rounded-2xl p-4 outline-none focus:border-red-600 transition-all italic text-sm" placeholder="e.g. John Wick" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Asset Model</label>
                    <input required value={form.vehicle} onChange={e => setForm({...form, vehicle: e.target.value})} className="w-full bg-white/5 border border-zinc-900 rounded-2xl p-4 outline-none focus:border-red-600 transition-all italic text-sm" placeholder="e.g. GT3 RS" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Satisfactory Rating</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map(v => (
                      <button 
                        key={v} 
                        type="button" 
                        onClick={() => setForm({...form, rating: v})}
                        className={`flex-1 py-4 rounded-xl border font-black transition-all ${form.rating === v ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40' : 'bg-transparent border-zinc-900 text-zinc-500 hover:border-zinc-700'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Deposition</label>
                  <textarea required value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} rows={4} className="w-full bg-white/5 border border-zinc-900 rounded-2xl p-6 outline-none focus:border-red-600 transition-all italic text-sm resize-none leading-relaxed" placeholder="Tell the story of your masterpiece..." />
                </div>

                <button 
                  disabled={loading}
                  className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authorize Entry"}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<FirebaseReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsub = subscribeReviews((data) => {
      setReviews(data.filter(r => r.status === "Active"));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-red-600/30 overflow-x-hidden">
      
      {/* 1. Cinematic Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FallbackImage 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80" 
            fallbackSrc="/public/images/car1.jpg"
            alt="Client Community" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
        </div>

        <div className="relative z-10 text-center container px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-red-500 font-black tracking-[0.5em] uppercase text-xs mb-6 border-b-2 border-red-600 pb-2">
              The Collective Presence
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
              Client <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600 italic">Testimony</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto italic leading-relaxed">
              Real-world accounts from the global network of performance elite.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. KPI Dashboard */}
      <section className="relative z-20 -mt-20 container mx-auto px-6 mb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-3xl shadow-2xl"
        >
          {[
            { label: "Global Rating", value: "4.9/5", icon: <Star className="w-5 h-5 text-red-600" /> },
            { label: "Total Handovers", value: "1,200+", icon: <CheckCircle className="w-5 h-5 text-red-600" /> },
            { label: "Asset Value Transacted", value: "$420M+", icon: <Award className="w-5 h-5 text-red-600" /> },
            { label: "Elite Members", value: "850+", icon: <Users className="w-5 h-5 text-red-600" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-zinc-950/60 p-12 text-center group hover:bg-white/5 transition-colors duration-500">
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
              <div className="text-4xl min-[2000px]:text-5xl font-black italic mb-2 tracking-tighter">{stat.value}</div>
              <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* 3. Masonry Review Grid */}
      <section className="py-24 px-6 container mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
             <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
             <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">Accessing Global Testimony Cache...</p>
          </div>
        ) : (
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 min-[2000px]:columns-4"
          >
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
        )}
      </section>

      {/* 4. Delivery Day Gallery - Cinematic Thumbnails */}
      <section className="py-48 px-6 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
            <div>
              <h2 className="text-5xl font-black uppercase italic italic tracking-tighter mb-4">Handoff Protocols</h2>
              <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold italic">Documenting the specific moment an asset meets its driver</p>
            </div>
            <button className="flex items-center gap-3 text-red-500 font-black uppercase text-[10px] tracking-[0.3em] hover:text-white transition-colors">
              VIEW ARCHIVE <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VIDEOS.map((video, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[16/10] bg-zinc-900 rounded-[2rem] overflow-hidden cursor-pointer"
              >
                <FallbackImage 
                  src={`https://images.unsplash.com/photo-${video.id}?auto=format&fit=crop&w=800&q=80`} 
                  fallbackSrc="/public/images/car4.jpg"
                  alt={video.title} 
                  className="w-full h-full object-cover transition duration-1000 group-hover:scale-110 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-900/40">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full group-hover:translate-x-2 transition-transform duration-500">
                  <div className="text-red-500 text-[10px] font-black uppercase tracking-widest mb-1">{video.category}</div>
                  <h4 className="text-white font-bold uppercase italic text-sm">{video.title}</h4>
                </div>

                <div className="absolute top-6 right-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">
                  {video.duration}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Author Experience - Premium CTA */}
      <section className="py-48 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-6 py-2 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
             <MessageSquare className="w-4 h-4" /> Share Your Presence
          </div>
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">Enter The <br /> Collective</h2>
          <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed italic max-w-2xl mx-auto">
             If you&apos;ve acquired an asset from Oreo, your story belongs in our official registry. Help the next generation of drivers find their edge.
          </p>
          <button 
            onClick={() => setShowModal(true)}
            className="group relative px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-2xl active:scale-95"
          >
            Authorize Entry <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </section>

      {/* 6. Instagram Feed - High Aesthetic */}
      <section className="pb-32 px-6 container mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <Instagram className="w-8 h-8 text-white" />
          <h2 className="text-3xl font-black uppercase italic italic tracking-tighter">The Visual Network</h2>
          <div className="flex-1 h-px bg-white/5" />
          <a href="#" className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors">@OREOCARS</a>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {INSTAGRAM_IDS.map((id, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square bg-zinc-900 rounded-[1.5rem] overflow-hidden group relative"
            >
              <FallbackImage 
                src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=600&q=80`} 
                fallbackSrc="/public/images/lambo.jpg"
                alt={`Network Post ${i}`} 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-6 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-red-600/0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 group-hover:bg-red-600/20 transition-all duration-500">
                 <Instagram className="w-5 h-5 text-white" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modals & Portal Overlays */}
      <AnimatePresence>
        {showModal && <ReviewModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">© Oreo Presence Group. Established 2024.</p>
      </footer>
    </div>
  );
}

