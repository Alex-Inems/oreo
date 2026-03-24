"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  Calculator, 
  ShieldCheck, 
  Zap, 
  Clock, 
  ChevronRight, 
  DollarSign, 
  Percent, 
  TrendingUp,
  CreditCard,
  Building2,
  Lock,
  ArrowRight
} from "lucide-react";
import { FallbackImage } from "@/components/UI/FallbackImage";

// --- Components ---

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function FinancingPage() {
  // Calculator State
  const [price, setPrice] = useState(120000);
  const [downPayment, setDownPayment] = useState(25000);
  const [term, setTerm] = useState(60);
  const [apr, setApr] = useState(4.99);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = price - downPayment;
    const monthlyRate = apr / 100 / 12;
    const numberOfPayments = term;
    
    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      setMonthlyPayment(payment);
    }
  }, [price, downPayment, term, apr]);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(val);

  return (
    <div className="bg-[#050505] text-white min-h-screen selection:bg-red-600/30 overflow-x-hidden">
      
      {/* 1. Hero Section - Cinematic Entry */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FallbackImage 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&w=2000&q=80" 
            fallbackSrc="/public/images/car1.jpg"
            alt="Capital Structure" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#050505]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="relative z-10 text-center container px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-red-500 font-black tracking-[0.5em] uppercase text-xs mb-6 border-b-2 border-red-600 pb-2">
              OREO Capital Solutions
            </span>
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8">
              Wealth <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">Architected</span>
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-medium max-w-2xl mx-auto italic leading-relaxed">
              Bespoke financial engineering for the world&apos;s most sought-after assets.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500"
          >
            <div className="flex items-center gap-3"><ShieldCheck className="w-4 h-4 text-red-600" /> SECURE UNDERWRITING</div>
            <div className="flex items-center gap-3"><Zap className="w-4 h-4 text-red-600" /> INSTANT PRE-APPROVAL</div>
            <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-red-600" /> TAILORED STRUCTURES</div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce opacity-30">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white" />
          <span className="text-[8px] font-black uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* 2. Strategy Grid - Card Revamp */}
      <section className="py-32 px-6 container mx-auto">
        <motion.div 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            { 
              title: "Strategic Lease", 
              tag: "Agile Ownership", 
              desc: "Optimized residual values designed for frequent fleet rotation and capital preservation.",
              icon: <Building2 className="w-6 h-6" />,
              features: ["12-48 Month Terms", "Off-Balance Sheet Options", "Tax Efficient Structures"]
            },
            { 
              title: "Performance Loan", 
              tag: "Long-term Equity", 
              desc: "Traditional financing with non-traditional speed. Build equity in your masterpiece with zero penalty.",
              icon: <CreditCard className="w-6 h-6" />,
              features: ["Market-leading Rates", "Up to 84 Month Terms", "Simple Interest Loans"]
            },
            { 
              title: "Private Equity", 
              tag: "Bespoke Capital", 
              desc: "Engineered solutions for complex portfolios involving multi-car acquisition and institutional trust.",
              icon: <Lock className="w-6 h-6" />,
              features: ["Lien-free Structures", "Asset Backed Lending", "Cross-Border Support"]
            }
          ].map((opt, i) => (
            <motion.div 
              key={i} 
              variants={fadeIn}
              className="group relative bg-zinc-900/20 border border-white/5 p-12 hover:border-red-600/50 transition-all duration-700 rounded-[2.5rem] backdrop-blur-xl overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700 text-red-500">
                {opt.icon}
              </div>
              
              <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.3em] block mb-2">{opt.tag}</span>
              <h3 className="text-3xl font-bold uppercase italic mb-6 tracking-tight text-white group-hover:text-red-500 transition-colors">{opt.title}</h3>
              <p className="text-zinc-400 mb-10 text-sm leading-relaxed italic">{opt.desc}</p>
              
              <div className="space-y-4 mb-12">
                {opt.features.map((f, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                    <div className="w-1 h-1 bg-red-600 rounded-full" />
                    {f}
                  </div>
                ))}
              </div>

              <Link 
                href="/support?inquiry=financing" 
                className="group/btn relative inline-flex items-center justify-center w-full bg-white text-black py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] overflow-hidden transition-all hover:bg-red-600 hover:text-white"
              >
                <span className="relative z-10 flex items-center gap-2">Initiate Protocol <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" /></span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Interactive Payment Engine */}
      <section className="py-32 px-6 bg-[#080808] border-y border-white/5 mask-image-edge">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl font-black uppercase italic italic tracking-tighter mb-4">Precision Engine</h2>
            <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] font-bold">Real-time payment simulation for your next acquisition</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Inputs */}
            <div className="lg:col-span-7 space-y-12 bg-zinc-900/40 p-12 rounded-[3rem] border border-white/5 backdrop-blur-md shadow-inner">
              
              {/* Slider 1: Price */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.3em]">Acquisition Capital</label>
                  <span className="text-2xl font-black italic text-red-500">{formatCurrency(price)}</span>
                </div>
                <input 
                  type="range" 
                  min="50000" 
                  max="1000000" 
                  step="5000"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full accent-red-600 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Slider 2: Down Payment */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <label className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.3em]">Initial Liquidity</label>
                  <span className="text-2xl font-black italic text-white/90">{formatCurrency(downPayment)}</span>
                </div>
                <input 
                  type="range" 
                  min="5000" 
                  max={Math.floor(price * 0.9)} 
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-zinc-500 h-1.5 bg-zinc-800 rounded-full appearance-none cursor-pointer"
                />
              </div>

              {/* Term Grid */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <label className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.3em]">Strategic Term</label>
                  <div className="flex gap-2">
                    {[36, 48, 60, 72].map(m => (
                      <button 
                        key={m} 
                        onClick={() => setTerm(m)}
                        className={`flex-1 py-4 font-black italic text-xs border rounded-xl transition-all ${term === m ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-transparent border-white/10 text-zinc-500 hover:border-white/30'}`}
                      >
                        {m}M
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <label className="text-[10px] uppercase font-black text-zinc-500 tracking-[0.3em]">Target APR</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={apr} 
                      onChange={(e) => setApr(Number(e.target.value))}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white font-mono focus:border-red-600 outline-none transition"
                    />
                    <Percent className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Output Display */}
            <div className="lg:col-span-5 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-br from-red-600 to-zinc-900 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative bg-zinc-900 border border-white/10 p-16 rounded-[3rem] flex flex-col justify-center items-center text-center shadow-2xl h-full overflow-hidden">
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-5 select-none text-[200px] font-black italic -mr-4 -mt-10">
                  PAY
                </div>

                <div className="relative z-10 space-y-12 w-full">
                  <div>
                    <div className="text-[10px] font-black uppercase text-red-500 mb-6 tracking-[0.5em]">Reserved Monthly Budget</div>
                    <motion.div 
                      key={monthlyPayment}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-7xl md:text-8xl font-black italic text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-none mb-4"
                    >
                      {formatCurrency(monthlyPayment)}
                    </motion.div>
                    <p className="text-[11px] text-zinc-500 font-medium italic opacity-60">
                      Amortized schedule based on {apr}% APR
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-12 border-t border-white/5">
                    <div className="text-left">
                      <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Total Funded</p>
                      <p className="text-xl font-bold italic text-zinc-300">{formatCurrency(price - downPayment)}</p>
                    </div>
                    <div className="text-left border-l border-white/5 pl-6">
                      <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mb-1">Total Interest</p>
                      <p className="text-xl font-bold italic text-red-500/80">{formatCurrency((monthlyPayment * term) - (price - downPayment))}</p>
                    </div>
                  </div>

                  <Link href="/support?inquiry=financing" className="mt-8 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white w-full py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all transform active:scale-95 shadow-xl shadow-red-900/20">
                    Acquire Pre-Approval <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Luxury Details - Feature Grid */}
      <section className="py-40 px-6 container mx-auto">
        <div className="grid md:grid-cols-4 gap-12 text-center">
          {[
            { icon: <TrendingUp className="w-8 h-8 text-red-600" />, label: "Appreciation Protection", desc: "Leasing structures that account for vintage market shifts." },
            { icon: <ShieldCheck className="w-8 h-8 text-red-600" />, label: "Total Confidentiality", desc: "Institutional grade privacy for high-profile acquisitions." },
            { icon: <Zap className="w-8 h-8 text-red-600" />, label: "15 Minute Approval", desc: "Our executive committee remains available 24/7 globally." },
            { icon: <Calculator className="w-8 h-8 text-red-600" />, label: "Tax Optimization", desc: "Section 179 and corporate structuring assistance." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 mx-auto flex items-center justify-center border border-white/5 shadow-xl">
                {item.icon}
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest italic">{item.label}</h4>
              <p className="text-xs text-zinc-500 leading-relaxed max-w-[200px] mx-auto italic">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Concierge CTA */}
      <section className="py-48 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <FallbackImage 
            src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2000&q=80" 
            fallbackSrc="/public/images/lambo.jpg"
            className="w-full h-full object-cover opacity-20 grayscale" 
            alt="Private Office" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>
        
        <div className="relative z-10 container mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-12"
          >
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">Bespoke <br /> Inquiries</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto italic">
              Our finance directors specialize in structuring acquisition deals for institutional collectors, premium fleets, and private wealth offices.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/support?inquiry=financing" className="px-16 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all transform hover:scale-105 shadow-[0_20px_60px_-15px_rgba(255,255,255,0.2)]">
                Secure Private Meeting
              </Link>
              <Link href="tel:+1800OREOCAP" className="px-12 py-6 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white/5 transition-all flex items-center gap-4">
                <Building2 className="w-4 h-4 text-red-600" /> Direct Concierge
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-700">© Oreo Capital Management INC. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

