"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Heart, BookOpen, AlertCircle, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-950 via-red-950 to-gray-900">
      {/* Background mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(215,25,32,0.35)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(31,41,55,0.8)_0%,transparent_60%)]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-pmi-red/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none"
      />

      <div className="container-site relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            PMI Kabupaten Sumenep — Platform Resmi
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
          >
            Portal Kesehatan{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-red-500">
              dan Kemanusiaan
            </span>{" "}
            Kabupaten Sumenep
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Menghadirkan edukasi kesehatan terpercaya dari dokter dan tenaga
            kesehatan serta informasi aksi kemanusiaan untuk masyarakat.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/edukasi"
              className="inline-flex items-center justify-center gap-2 bg-white text-pmi-red px-8 py-4 rounded-full font-bold text-sm hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 group"
            >
              <BookOpen size={17} />
              Baca Edukasi Kesehatan
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/donor-darah"
              className="inline-flex items-center justify-center gap-2 bg-pmi-red text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 border border-red-600 group"
            >
              <Heart size={17} className="group-hover:scale-110 transition-transform" />
              Jadwal Donor Darah
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-white/10"
          >
            {[
              { label: "Artikel Terverifikasi Dokter", icon: "✓" },
              { label: "Update Real-time", icon: "⚡" },
              { label: "Gratis & Terpercaya", icon: "🛡️" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Emergency alert - floating */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col gap-3 w-64"
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={14} className="text-pmi-red" />
              <span className="text-white text-xs font-semibold uppercase tracking-wider">
                Stok Darah Hari Ini
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["A", "B", "AB", "O"].map((type, i) => (
                <div key={type} className="text-center">
                  <div className="text-white font-bold text-sm">{type}</div>
                  <div
                    className={`text-xs mt-0.5 ${
                      i === 2 ? "text-red-400" : i === 1 ? "text-yellow-400" : "text-green-400"
                    }`}
                  >
                    {i === 2 ? "Prioritas" : i === 1 ? "Menipis" : "Normal"}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/donor-darah/stok"
              className="mt-3 flex items-center justify-center gap-1 bg-pmi-red text-white text-xs py-2 rounded-xl hover:bg-red-800 transition-colors w-full"
            >
              Lihat Detail <ArrowRight size={11} />
            </Link>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
            <div className="text-white text-xs font-semibold mb-2">Donor Terdekat</div>
            <div className="text-gray-300 text-xs">
              <div className="font-medium text-white">RSUD dr. H. Moh. Anwar</div>
              <div className="text-gray-400 mt-0.5">Sabtu, 8 Juni 2025 · 08:00</div>
            </div>
            <Link
              href="/donor-darah/jadwal"
              className="mt-2 flex items-center gap-1 text-red-300 hover:text-red-200 text-xs transition-colors"
            >
              Daftar Sekarang <ArrowRight size={10} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
      >
        <span className="text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}
