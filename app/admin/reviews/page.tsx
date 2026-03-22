"use client";

import { useState } from "react";
import { REVIEWS, Review } from "@/lib/data";
import { Star, CheckCircle, XCircle, Clock, Search, Trash2 } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-zinc-700"}`}
        />
      ))}
    </div>
  );
}

function Badge({ status }: { status: Review["status"] }) {
  const map = {
    approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    pending:  "bg-amber-500/15  text-amber-400  border-amber-500/20",
    rejected: "bg-red-500/15    text-red-400    border-red-500/20",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${map[status]}`}>
      {status}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS);
  const [filter, setFilter] = useState<"all" | Review["status"]>("all");
  const [search, setSearch] = useState("");

  const update = (id: number, status: Review["status"]) =>
    setReviews((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));

  const remove = (id: number) => setReviews((rs) => rs.filter((r) => r.id !== id));

  const filtered = reviews.filter((r) => {
    const matchFilter = filter === "all" || r.status === filter;
    const q = search.toLowerCase();
    const matchSearch = r.author.toLowerCase().includes(q) || r.car.toLowerCase().includes(q) || r.text.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    all:      reviews.length,
    pending:  reviews.filter((r) => r.status === "pending").length,
    approved: reviews.filter((r) => r.status === "approved").length,
    rejected: reviews.filter((r) => r.status === "rejected").length,
  };

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Reviews</h1>
        <p className="text-zinc-500 text-sm mt-1">Moderate customer reviews before they appear on the site.</p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {(["all", "pending", "approved", "rejected"] as const).map((tab) => {
          const icons = {
            all:      Clock,
            pending:  Clock,
            approved: CheckCircle,
            rejected: XCircle,
          };
          const Icon = icons[tab];
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${
                filter === tab
                  ? "bg-red-600/15 border-red-500/30 text-red-400"
                  : "bg-[#111] border-white/6 text-zinc-400 hover:text-white hover:border-white/10"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-1 text-xs font-bold opacity-70">{counts[tab]}</span>
            </button>
          );
        })}

        {/* Search */}
        <div className="relative ml-auto min-w-[200px]">
          <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-2.5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews…"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111] border border-white/8 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">No reviews match your filters.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="bg-[#111] border border-white/6 rounded-xl p-6 flex flex-col gap-4 hover:border-white/10 transition-colors"
            >
              {/* Author */}
              <div className="flex items-start gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-white text-sm truncate">{review.author}</p>
                    <Badge status={review.status} />
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <StarRating rating={review.rating} />
                    <span className="text-xs text-zinc-600">{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <p className="text-sm text-zinc-300 leading-relaxed flex-1">&ldquo;{review.text}&rdquo;</p>

              {/* Car tag */}
              <p className="text-xs text-zinc-500">
                Vehicle: <span className="text-zinc-300">{review.car}</span>
              </p>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-white/5">
                <button
                  disabled={review.status === "approved"}
                  onClick={() => update(review.id, "approved")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <CheckCircle className="w-3.5 h-3.5" /> Approve
                </button>
                <button
                  disabled={review.status === "rejected"}
                  onClick={() => update(review.id, "rejected")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>
                <button
                  onClick={() => remove(review.id)}
                  className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
