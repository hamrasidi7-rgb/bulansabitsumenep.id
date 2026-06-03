"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Droplets, Radio } from "lucide-react";

interface Headline {
  id: number;
  judul: string;
  slug: string;
}

interface TickerStats {
  donors: number;
  bags: number;
  month: string;
}

interface Props {
  newsEndpoint: string;
  stats: TickerStats;
}

export default function HealthTicker({ newsEndpoint, stats }: Props) {
  const [headlines, setHeadlines] = useState<Headline[]>([]);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(newsEndpoint)
      .then((r) => r.json())
      .then((data) => setHeadlines(data.headlines ?? []))
      .catch(() => {});
  }, [newsEndpoint]);

  // Duplikat item agar loop terlihat seamless
  const items = [...headlines, ...headlines];

  return (
    <div className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="container-site">
        <div className="flex items-stretch h-9 overflow-hidden">

          {/* ── Label kiri ── */}
          <div className="flex items-center gap-2 flex-shrink-0 pr-3 border-r border-gray-150">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pmi-red opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pmi-red" />
            </span>
            <span className="text-[11px] font-bold text-pmi-red uppercase tracking-wider whitespace-nowrap">
              Berita
            </span>
          </div>

          {/* ── Statistik pendonor ── */}
          <div className="hidden sm:flex items-center gap-3 flex-shrink-0 px-3 border-r border-gray-100">
            <Droplets size={12} className="text-pmi-red flex-shrink-0" />
            <span className="text-[11px] text-gray-600 whitespace-nowrap font-medium">
              <span className="text-pmi-red font-bold">
                {stats.donors.toLocaleString("id-ID")}
              </span>{" "}
              pendonor
            </span>
            <span className="text-gray-200">·</span>
            <span className="text-[11px] text-gray-600 whitespace-nowrap font-medium">
              <span className="text-pmi-red font-bold">
                {stats.bags.toLocaleString("id-ID")}
              </span>{" "}
              kantong
            </span>
            <span className="text-gray-200 hidden md:inline">·</span>
            <span className="text-[11px] text-gray-400 whitespace-nowrap hidden md:inline">
              {stats.month}
            </span>
          </div>

          {/* ── Scrolling headlines ── */}
          <div
            className="flex-1 overflow-hidden relative flex items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* fade edges */}
            <div className="absolute left-0 w-6 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 w-10 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {headlines.length === 0 ? (
              <div className="px-4 text-[11px] text-gray-400 animate-pulse">
                Memuat berita...
              </div>
            ) : (
              <div
                ref={trackRef}
                className="flex items-center whitespace-nowrap"
                style={{
                  animation: "ticker-scroll 40s linear infinite",
                  animationPlayState: paused ? "paused" : "running",
                }}
              >
                {items.map((item, i) => (
                  <span key={`${item.id}-${i}`} className="inline-flex items-center">
                    <Link
                      href={`/berita/${item.slug}`}
                      className="text-[11px] text-gray-700 hover:text-pmi-red transition-colors px-4 font-medium"
                      tabIndex={-1}
                    >
                      {item.judul}
                    </Link>
                    <span className="text-gray-300 text-xs select-none">◆</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Ikon live kanan ── */}
          <div className="hidden sm:flex items-center pl-3 border-l border-gray-100 flex-shrink-0">
            <Radio size={13} className="text-gray-300" />
          </div>

        </div>
      </div>

      {/* Keyframe injected via style tag */}
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
