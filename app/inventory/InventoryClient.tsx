"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { useInventory } from "@/hooks/useInventory";
import {
  filterInventory,
  parseSearchParams,
  describeSearch,
  type InventorySearchParams,
} from "@/lib/inventorySearch";
import { getCarDisplayName } from "@/lib/carMedia";
import { CarImage } from "@/components/UI/CarImage";

function InventoryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { cars, loading } = useInventory();
  const [activeBodyFilter, setActiveBodyFilter] = useState("All");

  const urlFilters: InventorySearchParams = useMemo(
    () => parseSearchParams(searchParams),
    [searchParams]
  );

  const hasUrlSearch = Boolean(
    urlFilters.condition ||
      urlFilters.make ||
      urlFilters.model ||
      urlFilters.maxPrice ||
      urlFilters.bodyType
  );

  const searchFiltered = useMemo(
    () => filterInventory(cars, urlFilters),
    [cars, urlFilters]
  );

  const bodyTypes = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.bodyType).filter(Boolean)))],
    [cars]
  );

  const displayedCars = useMemo(() => {
    if (activeBodyFilter === "All") return searchFiltered;
    return searchFiltered.filter((c) => c.bodyType === activeBodyFilter);
  }, [searchFiltered, activeBodyFilter]);

  useEffect(() => {
    if (urlFilters.bodyType) {
      setActiveBodyFilter(urlFilters.bodyType);
    }
  }, [urlFilters.bodyType]);

  const clearSearch = () => {
    setActiveBodyFilter("All");
    router.push("/inventory");
  };

  const speedSpec = (car: (typeof cars)[0]) =>
    car.specs?.find((s) => s.label.toLowerCase().includes("0-60"))?.value || "N/A";

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--orange)]" />
        <p className="text-[var(--text-muted)] text-sm">Loading fleet...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <section className="pt-28 pb-10 px-5 md:px-8 border-b border-[var(--border-light)]">
        <div className="max-w-[1280px] mx-auto">
          <h1 className="text-3xl md:text-[40px] font-bold text-[var(--text-dark)]">Inventory</h1>
          {hasUrlSearch && (
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-sm text-[var(--text-muted)]">
                Results for: <strong className="text-[var(--text-dark)]">{describeSearch(urlFilters)}</strong>
                {" "}({displayedCars.length} {displayedCars.length === 1 ? "vehicle" : "vehicles"})
              </span>
              <button
                type="button"
                onClick={clearSearch}
                className="inline-flex items-center gap-1 text-sm text-[var(--orange)] font-semibold hover:underline"
              >
                <X className="w-4 h-4" /> Clear search
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="sticky top-[72px] z-40 bg-white/95 backdrop-blur border-b border-[var(--border-light)]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-3 flex gap-2 overflow-x-auto no-scrollbar">
          {bodyTypes.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveBodyFilter(filter)}
              className={`text-[13px] font-semibold px-5 py-2 rounded-full whitespace-nowrap transition-all ${
                activeBodyFilter === filter
                  ? "bg-[var(--orange)] text-white"
                  : "bg-[#f0f0f0] text-[var(--text-muted)] hover:bg-[#e5e5e5]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-5 md:px-8 max-w-[1280px] mx-auto min-h-[400px]">
        {displayedCars.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-muted)] mb-4">No vehicles match your search.</p>
            <Link href="/" className="text-[var(--orange)] font-semibold hover:underline">
              Try a new search on the homepage
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {displayedCars.map((car) => (
              <Link
                key={car.id}
                href={`/inventory/${car.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-[var(--border-light)] hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
                  <CarImage
                    car={car}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {car.condition === "New" && (
                    <span className="absolute top-4 left-4 bg-[var(--orange)] text-white text-[11px] font-bold uppercase px-3 py-1 rounded">
                      New
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-[17px] font-bold text-[var(--text-dark)] group-hover:text-[var(--orange)] transition-colors">
                      {getCarDisplayName(car)}
                    </h3>
                    <span className="text-[17px] font-bold text-[var(--orange)] shrink-0">
                      ${car.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)] mb-3">
                    {car.bodyType} · {car.engine} · 0-60: {speedSpec(car)}
                  </p>
                  <p className="text-[13px] text-[var(--text-muted)]">
                    {car.mileage.toLocaleString()} mi · {car.condition}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function InventoryClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--orange)]" />
        </div>
      }
    >
      <InventoryContent />
    </Suspense>
  );
}
