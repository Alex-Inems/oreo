"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Car, ChevronDown } from "lucide-react";
import { useInventory } from "@/hooks/useInventory";
import {
  buildMakeOptions,
  buildModelOptions,
  buildSearchQuery,
} from "@/lib/inventorySearch";

const TABS = ["All", "New", "Used"] as const;

const CATEGORIES = [
  { label: "Sedan", bodyType: "Sedan" },
  { label: "Coupe", bodyType: "Coupe" },
  { label: "SUV", bodyType: "SUV" },
  { label: "Hatchback", bodyType: "Hatchback" },
  { label: "Convertible", bodyType: "Convertible" },
];

const PRICE_OPTIONS = [
  "Max Price",
  "$150,000",
  "$250,000",
  "$400,000",
  "$600,000",
  "$1,000,000",
];

const Hero = () => {
  const router = useRouter();
  const { cars, loading } = useInventory();
  const [tab, setTab] = useState<typeof TABS[number]>("All");
  const [make, setMake] = useState("All Makes");
  const [model, setModel] = useState("All Models");
  const [maxPrice, setMaxPrice] = useState("Max Price");

  const makeOptions = useMemo(() => buildMakeOptions(cars), [cars]);
  const modelOptions = useMemo(() => buildModelOptions(cars, make), [cars, make]);

  useEffect(() => {
    if (model !== "All Models" && !modelOptions.includes(model)) {
      setModel("All Models");
    }
  }, [make, model, modelOptions]);

  const handleSearch = () => {
    const query = buildSearchQuery({
      condition: tab,
      make,
      model,
      maxPrice,
    });
    router.push(`/inventory${query}`);
  };

  return (
    <section className="relative min-h-[620px] md:min-h-[700px] flex flex-col items-center justify-center pt-[72px] pb-16 overflow-hidden">
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4 gap-0">
        {[
          "https://images.unsplash.com/photo-1627454819213-f56f48f5236f?w=600&q=80",
          "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=600&q=80",
          "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=600&q=80",
          "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=600&q=80",
          "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&q=80",
          "https://images.unsplash.com/photo-1631269382218-ec379cb3a73c?w=600&q=80",
          "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80",
          "https://images.unsplash.com/photo-1614026871583-9b4ea4e70e28?w=600&q=80",
        ].map((src, i) => (
          <div key={i} className="relative h-full min-h-[200px] overflow-hidden">
            <img src={src} alt="" className="w-full h-full object-cover scale-110" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-[var(--dark-hero)]/82" />

      <div className="relative z-10 w-full max-w-[900px] mx-auto px-5 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-[56px] font-bold text-white leading-tight mb-10">
          Find Your{" "}
          <span className="text-[var(--orange)]">Perfect</span> Car
        </h1>

        <div className="flex justify-center gap-8 mb-0">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`relative pb-3 text-[15px] font-semibold transition-colors ${
                tab === t ? "text-[var(--orange)]" : "text-white/70 hover:text-white"
              }`}
            >
              {t}
              {tab === t && (
                <>
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--orange)]" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[var(--orange)]" />
                </>
              )}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="bg-white rounded-xl shadow-2xl flex flex-col sm:flex-row items-stretch mt-2 overflow-hidden"
        >
          <div className="flex flex-1 flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-light)]">
            <div className="relative flex-1">
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                aria-label="Select make"
                disabled={loading}
                className="w-full appearance-none bg-transparent px-5 py-4 pr-10 text-[15px] text-[var(--text-dark)] font-medium outline-none cursor-pointer disabled:opacity-50"
              >
                {(makeOptions.length > 1 ? makeOptions : ["All Makes", "Porsche", "Lamborghini", "Ferrari", "Mercedes-AMG", "BMW", "Audi"]).map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                aria-label="Select model"
                disabled={loading || make === "All Makes"}
                className="w-full appearance-none bg-transparent px-5 py-4 pr-10 text-[15px] text-[var(--text-dark)] font-medium outline-none cursor-pointer disabled:opacity-50"
              >
                {modelOptions.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>
            <div className="relative flex-1">
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                aria-label="Max price"
                className="w-full appearance-none bg-transparent px-5 py-4 pr-10 text-[15px] text-[var(--text-dark)] font-medium outline-none cursor-pointer"
              >
                {PRICE_OPTIONS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
            </div>
          </div>
          <button
            type="submit"
            aria-label="Search vehicles"
            className="bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-white flex items-center justify-center px-8 py-4 sm:py-0 transition-colors shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>

        <div className="flex justify-center gap-6 md:gap-10 mt-12 flex-wrap">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={`/inventory?bodyType=${encodeURIComponent(cat.bodyType)}`}
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-[72px] h-[72px] rounded-full border-2 border-white/60 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                <Car className="w-8 h-8 text-white/80 group-hover:text-white" strokeWidth={1.2} />
              </div>
              <span className="text-[14px] font-medium text-white/80 group-hover:text-white transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
