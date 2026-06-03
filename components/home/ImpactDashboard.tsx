"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Droplets, Users, BookOpen, Stethoscope, Heart } from "lucide-react";

const stats = [
  {
    icon: Droplets,
    value: 342,
    suffix: "",
    label: "Kantong Darah Tersedia",
    desc: "Siap digunakan",
    color: "text-pmi-red",
    bg: "bg-red-50",
    border: "border-red-100",
  },
  {
    icon: Users,
    value: 128,
    suffix: "+",
    label: "Pendonor Bulan Ini",
    desc: "Juni 2025",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
  },
  {
    icon: BookOpen,
    value: 287,
    suffix: "+",
    label: "Artikel Kesehatan",
    desc: "Terverifikasi dokter",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: Stethoscope,
    value: 64,
    suffix: "",
    label: "Dokter Kontributor",
    desc: "Dari berbagai spesialisasi",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-100",
  },
  {
    icon: Heart,
    value: 513,
    suffix: "+",
    label: "Relawan Aktif",
    desc: "Siap membantu",
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
  },
];

function AnimatedCounter({
  end,
  suffix = "",
  started,
}: {
  end: number;
  suffix?: string;
  started: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [end, started]);

  return (
    <span>
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

export default function ImpactDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-site">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-pmi-red text-xs font-bold uppercase tracking-widest mb-3 bg-red-50 px-4 py-1.5 rounded-full">
            Dampak Nyata
          </span>
          <h2 className="section-title">
            Bersama Kami, Membangun{" "}
            <span className="gradient-text">Sumenep Sehat</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Data real-time layanan PMI Kabupaten Sumenep
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative p-5 rounded-2xl border ${stat.border} ${stat.bg} text-center group hover:shadow-card transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm mb-3 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <Icon size={22} />
                </div>
                <div className={`text-3xl font-extrabold ${stat.color} leading-none mb-1`}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} started={isInView} />
                </div>
                <div className="text-gray-700 font-semibold text-sm leading-tight">{stat.label}</div>
                <div className="text-gray-400 text-xs mt-1">{stat.desc}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 p-5 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-pmi-red flex items-center justify-center">
              <Droplets size={18} className="text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-800 text-sm">
                Stok darah diperbarui setiap hari
              </div>
              <div className="text-xs text-gray-500">Terakhir diperbarui: Hari ini pukul 07:00</div>
            </div>
          </div>
          <a
            href="/donor-darah/stok"
            className="btn-primary text-xs py-2.5 px-5 flex-shrink-0"
          >
            Cek Stok Darah
          </a>
        </motion.div>
      </div>
    </section>
  );
}
