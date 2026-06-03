"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { MapPin, Calendar, Clock, Users, ArrowRight, Droplets, AlertTriangle } from "lucide-react";

const bloodStock = [
  { type: "A", status: "normal", count: 87 },
  { type: "B", status: "menipis", count: 23 },
  { type: "AB", status: "prioritas", count: 8 },
  { type: "O", status: "normal", count: 112 },
];

const donationEvents = [
  {
    id: 1,
    title: "Donor Darah RSUD Moh. Anwar",
    location: "RSUD dr. H. Moh. Anwar, Jl. Jend. Sudirman Sumenep",
    date: "Sabtu, 8 Juni 2025",
    time: "08:00 - 12:00 WIB",
    quota: 50,
    registered: 38,
    organizer: "PMI Sumenep & RSUD",
    urgent: false,
  },
  {
    id: 2,
    title: "Gebyar Donor Darah Komunitas",
    location: "Alun-alun Sumenep",
    date: "Minggu, 15 Juni 2025",
    time: "07:30 - 11:30 WIB",
    quota: 150,
    registered: 67,
    organizer: "PMI Sumenep",
    urgent: true,
  },
  {
    id: 3,
    title: "Donor Darah Puskesmas Kalianget",
    location: "Puskesmas Kalianget, Sumenep",
    date: "Rabu, 18 Juni 2025",
    time: "09:00 - 13:00 WIB",
    quota: 30,
    registered: 12,
    organizer: "PMI & Puskesmas Kalianget",
    urgent: false,
  },
];

const statusStyles = {
  normal: {
    bar: "bg-green-500",
    badge: "bg-green-50 text-green-700 border-green-200",
    label: "Normal",
  },
  menipis: {
    bar: "bg-yellow-500",
    badge: "bg-yellow-50 text-yellow-700 border-yellow-200",
    label: "Menipis",
  },
  prioritas: {
    bar: "bg-red-600",
    badge: "bg-red-50 text-red-700 border-red-200",
    label: "Prioritas",
  },
};

export default function BloodDonationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="inline-block text-pmi-red text-xs font-bold uppercase tracking-widest mb-3 bg-red-50 px-4 py-1.5 rounded-full">
            Donor Darah
          </span>
          <h2 className="section-title">
            Stok Darah &amp;{" "}
            <span className="gradient-text">Jadwal Donor</span>
          </h2>
          <p className="section-subtitle mt-2">
            Informasi ketersediaan darah dan agenda donor darah terkini
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Blood stock dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-red-900 to-gray-900 rounded-3xl p-6 h-full">
              <div className="flex items-center gap-2 mb-5">
                <Droplets size={18} className="text-red-300" />
                <h3 className="text-white font-bold">Stok Darah PMI Sumenep</h3>
              </div>

              <div className="space-y-4">
                {bloodStock.map((blood) => {
                  const style = statusStyles[blood.status as keyof typeof statusStyles];
                  const percentage = Math.min((blood.count / 150) * 100, 100);

                  return (
                    <div key={blood.type} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold flex-shrink-0">
                        {blood.type}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-gray-300 text-sm">{blood.count} kantong</span>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${style.badge}`}>
                            {style.label}
                          </span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${percentage}%` } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className={`h-full ${style.bar} rounded-full`}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Alert for prioritas */}
              <div className="mt-5 bg-red-900/50 border border-red-700/50 rounded-xl p-3 flex items-start gap-2">
                <AlertTriangle size={13} className="text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-red-200 text-xs">
                  Golongan darah <strong>AB</strong> sangat dibutuhkan.
                  Anda bergolongan AB? Segera donor sekarang.
                </p>
              </div>

              <Link
                href="/donor-darah/stok"
                className="mt-4 flex items-center justify-center gap-2 bg-pmi-red text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-800 transition-colors w-full"
              >
                Detail Stok Darah <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Donation events */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">Jadwal Donor Terdekat</h3>
              <Link
                href="/donor-darah/jadwal"
                className="text-pmi-red text-sm font-medium hover:text-red-800 flex items-center gap-1"
              >
                Lihat Semua <ArrowRight size={13} />
              </Link>
            </div>

            {donationEvents.map((event, index) => {
              const progressPct = (event.registered / event.quota) * 100;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <div className={`bg-white border ${event.urgent ? "border-red-200 bg-red-50/30" : "border-gray-100"} rounded-2xl p-5 hover:shadow-card transition-all duration-300`}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        {event.urgent && (
                          <span className="inline-flex items-center gap-1 bg-pmi-red text-white text-xs font-bold px-2 py-0.5 rounded-full mb-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            MENDESAK
                          </span>
                        )}
                        <h4 className="font-bold text-gray-900 text-sm">{event.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{event.organizer}</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <MapPin size={12} className="text-pmi-red flex-shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Calendar size={12} className="text-pmi-red" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Clock size={12} className="text-pmi-red" />
                          {event.time}
                        </div>
                      </div>
                    </div>

                    {/* Registration progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                        <div className="flex items-center gap-1">
                          <Users size={11} />
                          <span>{event.registered} terdaftar</span>
                        </div>
                        <span>{event.quota - event.registered} slot tersisa</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${progressPct > 80 ? "bg-orange-500" : "bg-green-500"}`}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/donor-darah/daftar/${event.id}`}
                      className="btn-primary text-xs py-2.5 w-full justify-center"
                    >
                      Daftar Donor Sekarang
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Education teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              emoji: "💉",
              title: "Syarat Donor Darah",
              desc: "Siapa saja yang boleh mendonorkan darah?",
              href: "/donor-darah/edukasi/syarat",
            },
            {
              emoji: "❤️",
              title: "Manfaat Donor Darah",
              desc: "Donor darah baik untuk kesehatan pendonor",
              href: "/donor-darah/edukasi/manfaat",
            },
            {
              emoji: "❓",
              title: "FAQ Donor Darah",
              desc: "Pertanyaan yang paling sering ditanyakan",
              href: "/donor-darah/edukasi/faq",
            },
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex items-center gap-4 bg-gray-50 hover:bg-red-50 border border-gray-100 hover:border-red-100 rounded-2xl p-4 transition-all duration-200"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div>
                <div className="font-semibold text-gray-800 text-sm group-hover:text-pmi-red transition-colors">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
              <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-pmi-red transition-colors" />
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
