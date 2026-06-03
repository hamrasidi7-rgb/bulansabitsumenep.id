"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FileText, Star, Award, ArrowRight, ChevronRight } from "lucide-react";

const doctors = [
  {
    id: 1,
    name: "dr. Fatima Zahra",
    title: "Sp.A",
    role: "Dokter Spesialis",
    specialty: "Dokter Spesialis Anak",
    workplace: "RSUD dr. H. Moh. Anwar Sumenep",
    expertise: ["Tumbuh Kembang", "Imunisasi", "Gizi Anak"],
    articles: 24,
    rating: 4.9,
    avatar: null,
    initials: "FZ",
    color: "from-blue-500 to-blue-700",
  },
  {
    id: 2,
    name: "dr. Budi Santoso",
    title: "",
    role: "Dokter Umum",
    specialty: "Dokter Umum",
    workplace: "Puskesmas Sumenep Kota",
    expertise: ["Penyakit Dalam", "Kesehatan Umum", "Hipertensi"],
    articles: 18,
    rating: 4.8,
    avatar: null,
    initials: "BS",
    color: "from-green-500 to-green-700",
  },
  {
    id: 3,
    name: "dr. Siti Aminah",
    title: "Sp.OG",
    role: "Dokter Spesialis",
    specialty: "Dokter Spesialis Kandungan",
    workplace: "RSUD dr. H. Moh. Anwar Sumenep",
    expertise: ["Kehamilan", "Persalinan", "Kesehatan Reproduksi"],
    articles: 31,
    rating: 4.9,
    avatar: null,
    initials: "SA",
    color: "from-rose-500 to-rose-700",
  },
  {
    id: 4,
    name: "Ns. Rina Fitriana",
    title: "S.Kep",
    role: "Perawat",
    specialty: "Perawat Komunitas",
    workplace: "Puskesmas Kalianget",
    expertise: ["Keperawatan", "Kesehatan Komunitas", "P3K"],
    articles: 12,
    rating: 4.7,
    avatar: null,
    initials: "RF",
    color: "from-teal-500 to-teal-700",
  },
  {
    id: 5,
    name: "Psikolog Dewi Lestari",
    title: "M.Psi",
    role: "Psikolog",
    specialty: "Psikolog Klinis",
    workplace: "Klinik Kesehatan Mental Sumenep",
    expertise: ["Kesehatan Mental", "Depresi", "Kecemasan"],
    articles: 15,
    rating: 4.8,
    avatar: null,
    initials: "DL",
    color: "from-purple-500 to-purple-700",
  },
  {
    id: 6,
    name: "dr. Agus Prasetyo",
    title: "Sp.JP",
    role: "Dokter Spesialis",
    specialty: "Dokter Spesialis Jantung",
    workplace: "RSUD dr. H. Moh. Anwar Sumenep",
    expertise: ["Jantung", "Pembuluh Darah", "Hipertensi"],
    articles: 20,
    rating: 5.0,
    avatar: null,
    initials: "AP",
    color: "from-red-500 to-red-700",
  },
];

const filters = ["Semua", "Dokter Spesialis", "Dokter Umum", "Perawat", "Psikolog"];

export default function DoctorContributors() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered =
    activeFilter === "Semua"
      ? doctors
      : doctors.filter((d) => d.role === activeFilter);

  return (
    <section className="section-padding bg-white" ref={ref}>
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
        >
          <div>
            <span className="inline-block text-pmi-red text-xs font-bold uppercase tracking-widest mb-3 bg-red-50 px-4 py-1.5 rounded-full">
              Kontributor
            </span>
            <h2 className="section-title">
              Dokter &amp; Tenaga{" "}
              <span className="gradient-text">Kesehatan Kami</span>
            </h2>
            <p className="section-subtitle mt-2">
              Konten kami ditulis dan direview oleh dokter dan tenaga kesehatan berpengalaman
            </p>
          </div>
          <Link href="/dokter-menulis" className="btn-outline-red flex-shrink-0 text-sm py-2.5">
            Bergabung Menulis <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 flex-wrap mb-8"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? "bg-pmi-red text-white shadow-glow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Doctors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.07 }}
            >
              <Link href={`/kontributor/${doctor.id}`}>
                <div className="group bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-card-hover hover:border-red-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doctor.color} flex items-center justify-center text-white font-bold text-lg flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      {doctor.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-gray-900 text-sm leading-tight group-hover:text-pmi-red transition-colors">
                            {doctor.name}{doctor.title ? `, ${doctor.title}` : ""}
                          </h3>
                          <p className="text-pmi-red text-xs font-medium mt-0.5">{doctor.specialty}</p>
                        </div>
                        <ChevronRight size={14} className="text-gray-300 group-hover:text-pmi-red transition-colors mt-0.5 flex-shrink-0" />
                      </div>

                      <p className="text-gray-400 text-xs mt-1 line-clamp-1">{doctor.workplace}</p>
                    </div>
                  </div>

                  {/* Expertise tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {doctor.expertise.slice(0, 2).map((exp) => (
                      <span
                        key={exp}
                        className="text-xs bg-gray-50 text-gray-600 border border-gray-100 px-2 py-0.5 rounded-full"
                      >
                        {exp}
                      </span>
                    ))}
                    {doctor.expertise.length > 2 && (
                      <span className="text-xs text-gray-400">+{doctor.expertise.length - 2}</span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-1 text-gray-500 text-xs">
                      <FileText size={12} className="text-gray-400" />
                      <span className="font-semibold text-gray-700">{doctor.articles}</span> artikel
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-medium">
                      <Star size={12} className="fill-current" />
                      {doctor.rating}
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
                      <Award size={12} />
                      Terverifikasi
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-gray-500 text-sm mb-4">
            Apakah Anda seorang dokter atau tenaga kesehatan?
          </p>
          <Link href="/dokter-menulis" className="btn-primary">
            Bergabung sebagai Kontributor <ArrowRight size={15} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
