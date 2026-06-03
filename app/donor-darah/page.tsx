"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, Clock, Users, Droplets, AlertTriangle, CheckCircle, ArrowRight, Heart } from "lucide-react";

const bloodStock = [
  { type: "A", status: "normal", count: 87, max: 150 },
  { type: "B", status: "menipis", count: 23, max: 150 },
  { type: "AB", status: "prioritas", count: 8, max: 150 },
  { type: "O", status: "normal", count: 112, max: 150 },
];

const statusStyles = {
  normal: { bar: "bg-green-500", badge: "bg-green-100 text-green-700", label: "Normal", icon: "✓" },
  menipis: { bar: "bg-yellow-500", badge: "bg-yellow-100 text-yellow-700", label: "Menipis", icon: "⚠" },
  prioritas: { bar: "bg-red-600", badge: "bg-red-100 text-red-700", label: "Prioritas!", icon: "🚨" },
};

const events = [
  {
    id: 1, title: "Donor Darah RSUD Moh. Anwar",
    location: "RSUD dr. H. Moh. Anwar Sumenep",
    address: "Jl. Jend. Sudirman No. 1, Sumenep",
    date: "Sabtu, 8 Juni 2025", time: "08:00 - 12:00 WIB",
    quota: 50, registered: 38, urgent: false,
  },
  {
    id: 2, title: "Gebyar Donor Darah Komunitas",
    location: "Alun-alun Sumenep",
    address: "Jl. Trunojoyo, Sumenep",
    date: "Minggu, 15 Juni 2025", time: "07:30 - 11:30 WIB",
    quota: 150, registered: 67, urgent: true,
  },
  {
    id: 3, title: "Donor Darah Puskesmas Kalianget",
    location: "Puskesmas Kalianget",
    address: "Jl. Raya Kalianget, Sumenep",
    date: "Rabu, 18 Juni 2025", time: "09:00 - 13:00 WIB",
    quota: 30, registered: 12, urgent: false,
  },
  {
    id: 4, title: "Donor Darah Mahasiswa UNIBA",
    location: "Universitas Bakti Indonesia",
    address: "Jl. Raya Bata-bata, Sumenep",
    date: "Kamis, 26 Juni 2025", time: "08:00 - 12:00 WIB",
    quota: 80, registered: 45, urgent: false,
  },
];

const requirements = [
  "Usia 17-65 tahun",
  "Berat badan minimal 45 kg",
  "Tekanan darah normal (sistolik 100-170 mmHg)",
  "Hemoglobin minimal 12,5 g/dL (wanita) / 13 g/dL (pria)",
  "Tidak sedang sakit atau minum obat",
  "Tidak sedang hamil atau menyusui",
  "Jeda minimal 3 bulan dari donor terakhir",
];

export default function DonorDarahPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-red-900 to-gray-900 py-16">
        <div className="container-site text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full mb-5">
              <Droplets size={12} /> Donor Darah
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Pusat Donor Darah PMI Sumenep
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
              Satu tetes darah Anda dapat menyelamatkan hingga tiga nyawa.
              Cek stok dan jadwal donor terdekat.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="#jadwal" className="btn-primary bg-white text-pmi-red hover:bg-red-50 shadow-lg">
                <Calendar size={15} /> Lihat Jadwal
              </Link>
              <Link href="#stok" className="border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                <Droplets size={15} /> Cek Stok Darah
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12">
        {/* Blood stock section */}
        <section id="stok" className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Stok Darah Hari Ini</h2>
            <span className="text-xs text-gray-400">Diperbarui: Hari ini 07:00 WIB</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            {bloodStock.map((blood, index) => {
              const style = statusStyles[blood.status as keyof typeof statusStyles];
              const pct = Math.min((blood.count / blood.max) * 100, 100);
              return (
                <motion.div
                  key={blood.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className={`bg-white border-2 ${blood.status === "prioritas" ? "border-red-300 bg-red-50/50" : "border-gray-100"} rounded-2xl p-5 text-center`}
                >
                  <div className="text-4xl font-black text-gray-800 mb-1">{blood.type}</div>
                  <div className="text-2xl font-bold text-gray-700 mb-1">{blood.count}</div>
                  <div className="text-xs text-gray-400 mb-3">kantong tersedia</div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                      className={`h-full ${style.bar} rounded-full`}
                    />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>
                    {style.icon} {style.label}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Urgent alert */}
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-2xl p-4">
            <AlertTriangle size={18} className="text-pmi-red mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-800 text-sm">
                Stok Golongan Darah AB Sangat Mendesak!
              </p>
              <p className="text-red-600 text-xs mt-0.5">
                Hanya tersisa 8 kantong. Jika Anda bergolongan AB, segera hubungi PMI Sumenep atau
                daftar ke jadwal donor terdekat.
              </p>
            </div>
            <Link href="/kontak" className="flex-shrink-0 text-xs bg-pmi-red text-white px-3 py-1.5 rounded-lg hover:bg-red-800 transition-colors">
              Hubungi Sekarang
            </Link>
          </div>
        </section>

        {/* Events section */}
        <section id="jadwal" className="mb-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Jadwal Donor Darah</h2>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Calendar size={12} /> Juni 2025
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {events.map((event, index) => {
              const pct = (event.registered / event.quota) * 100;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`bg-white border ${event.urgent ? "border-red-200" : "border-gray-100"} rounded-2xl p-5 hover:shadow-card transition-all`}
                >
                  {event.urgent && (
                    <span className="inline-flex items-center gap-1 bg-pmi-red text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> MENDESAK
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-1.5 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2"><MapPin size={13} className="text-pmi-red" />{event.location}</div>
                    <div className="text-xs text-gray-400 pl-5">{event.address}</div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><Calendar size={12} className="text-pmi-red" />{event.date}</span>
                      <span className="flex items-center gap-1"><Clock size={12} className="text-pmi-red" />{event.time}</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="flex items-center gap-1"><Users size={11} />{event.registered}/{event.quota} terdaftar</span>
                      <span>{event.quota - event.registered} slot tersisa</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${pct > 80 ? "bg-orange-500" : "bg-green-500"}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <Link href={`/donor-darah/daftar/${event.id}`} className="btn-primary w-full justify-center text-sm py-2.5">
                    Daftar Donor Sekarang
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Requirements */}
        <section className="bg-gray-50 rounded-3xl p-8 mb-14">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
            <Heart size={20} className="text-pmi-red" /> Syarat Donor Darah
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {requirements.map((req) => (
              <div key={req} className="flex items-center gap-3 text-sm text-gray-700">
                <CheckCircle size={15} className="text-green-500 flex-shrink-0" />
                {req}
              </div>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-gray-200">
            <Link href="/donor-darah/edukasi/syarat" className="text-pmi-red text-sm font-medium flex items-center gap-1 hover:text-red-800">
              Baca syarat lengkap <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
