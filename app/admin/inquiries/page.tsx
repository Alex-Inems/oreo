"use client";

import { useState } from "react";
import { INQUIRIES, Inquiry } from "@/lib/data";
import {
  MessageSquare, Search, Mail, Phone, Car,
  CheckCheck, Circle, XCircle, ChevronDown, ChevronUp, Trash2,
} from "lucide-react";

function Badge({ status }: { status: Inquiry["status"] }) {
  const map = {
    new:       "bg-blue-500/15   text-blue-400   border-blue-500/20",
    contacted: "bg-purple-500/15 text-purple-400 border-purple-500/20",
    closed:    "bg-zinc-500/15   text-zinc-400   border-zinc-500/20",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${map[status]}`}>
      {status}
    </span>
  );
}

function InquiryRow({
  inq,
  onUpdate,
  onDelete,
}: {
  inq: Inquiry;
  onUpdate: (id: number, status: Inquiry["status"]) => void;
  onDelete: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#111] border border-white/6 rounded-xl overflow-hidden hover:border-white/10 transition-colors">
      {/* Summary row */}
      <div
        className="px-6 py-4 flex flex-wrap items-center gap-4 cursor-pointer"
        onClick={() => setExpanded((e) => !e)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <p className="font-semibold text-white">{inq.name}</p>
            <Badge status={inq.status} />
          </div>
          <p className="text-xs text-zinc-500 truncate">{inq.carName ?? "General"} · {inq.date}</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-zinc-500 shrink-0">
          <span className="hidden sm:block truncate max-w-[160px]">{inq.email}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-white/5 px-6 py-5 space-y-5">
          {/* Message */}
          <p className="text-sm text-zinc-300 leading-relaxed bg-white/2 border border-white/5 rounded-lg px-4 py-3">
            {inq.message}
          </p>

          {/* Contact details */}
          <div className="flex flex-wrap gap-4 text-sm">
            <a href={`mailto:${inq.email}`} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4 text-zinc-600" /> {inq.email}
            </a>
            {inq.phone && (
              <a href={`tel:${inq.phone}`} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-zinc-600" /> {inq.phone}
              </a>
            )}
            {inq.carId && (
              <span className="flex items-center gap-2 text-zinc-500">
                <Car className="w-4 h-4 text-zinc-600" /> Vehicle #{inq.carId}: {inq.carName}
              </span>
            )}
          </div>

          {/* Status actions */}
          <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
            <button
              disabled={inq.status === "new"}
              onClick={() => onUpdate(inq.id, "new")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <Circle className="w-3 h-3" /> Mark New
            </button>
            <button
              disabled={inq.status === "contacted"}
              onClick={() => onUpdate(inq.id, "contacted")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <CheckCheck className="w-3 h-3" /> Mark Contacted
            </button>
            <button
              disabled={inq.status === "closed"}
              onClick={() => onUpdate(inq.id, "closed")}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 hover:bg-zinc-500/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <XCircle className="w-3 h-3" /> Close
            </button>
            <button
              onClick={() => onDelete(inq.id)}
              className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-500/10 bg-red-500/5 hover:bg-red-500/15 transition-all"
            >
              <Trash2 className="w-3 h-3" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>(INQUIRIES);
  const [filter, setFilter] = useState<"all" | Inquiry["status"]>("all");
  const [search, setSearch] = useState("");

  const update = (id: number, status: Inquiry["status"]) =>
    setInquiries((list) => list.map((i) => (i.id === id ? { ...i, status } : i)));

  const remove = (id: number) => setInquiries((list) => list.filter((i) => i.id !== id));

  const filtered = inquiries.filter((i) => {
    const matchFilter = filter === "all" || i.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      (i.carName?.toLowerCase().includes(q) ?? false) ||
      i.message.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const counts = {
    all:       inquiries.length,
    new:       inquiries.filter((i) => i.status === "new").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    closed:    inquiries.filter((i) => i.status === "closed").length,
  };

  return (
    <div className="p-6 md:p-10 pt-20 md:pt-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Inquiries</h1>
        <p className="text-zinc-500 text-sm mt-1">Manage and respond to customer enquiries.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center">
        {(["all", "new", "contacted", "closed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm border transition-all ${
              filter === tab
                ? "bg-red-600/15 border-red-500/30 text-red-400"
                : "bg-[#111] border-white/6 text-zinc-400 hover:text-white hover:border-white/10"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            <span className="text-xs font-bold opacity-70">{counts[tab]}</span>
          </button>
        ))}

        <div className="relative ml-auto min-w-[200px]">
          <Search className="w-4 h-4 text-zinc-600 absolute left-3.5 top-2.5" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries…"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#111] border border-white/8 text-white text-sm placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-all"
          />
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">No inquiries found.</div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inq) => (
            <InquiryRow key={inq.id} inq={inq} onUpdate={update} onDelete={remove} />
          ))}
        </div>
      )}
    </div>
  );
}
