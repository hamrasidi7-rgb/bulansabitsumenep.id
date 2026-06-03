"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Heart, Shield, BookOpen, Award, ArrowRight, Users } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Pelatihan P3K", desc: "Kuasai pertolongan pertama" },
  { icon: BookOpen, title: "Pendidikan Gratis", desc: "Materi kesehatan eksklusif" },
  { icon: Award, title: "Sertifikat Resmi", desc: "Diakui PMI Indonesia" },
  { icon: Heart, title: "Dampak Nyata", desc: "Bantu sesama langsung" },
];

export default function VolunteerCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pmi-red via-red-800 to-gray-900 p-8 md:p-12"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/30 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-medium px-4 py-2 rounded-full mb-5">
                  <Users size={12} />
                  513 Relawan Aktif
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
                  Jadilah Relawan PMI,{" "}
                  <span className="text-red-200">Jadilah Pahlawan</span>{" "}
                  Kemanusiaan
                </h2>
                <p className="text-red-100 text-base leading-relaxed mb-8">
                  Bergabunglah dengan ratusan relawan aktif PMI Kabupaten Sumenep.
                  Dapatkan pelatihan, sertifikasi, dan kesempatan memberi dampak
                  nyata bagi masyarakat.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/relawan/daftar"
                    className="inline-flex items-center justify-center gap-2 bg-white text-pmi-red px-7 py-3.5 rounded-full font-bold text-sm hover:bg-red-50 transition-all hover:-translate-y-0.5 shadow-lg"
                  >
                    <Heart size={15} className="fill-current" />
                    Daftar Jadi Relawan
                    <ArrowRight size={14} />
                  </Link>
                  <Link
                    href="/relawan"
                    className="inline-flex items-center justify-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-white/10 transition-all"
                  >
                    Pelajari Lebih Lanjut
                  </Link>
                </div>
              </div>

              {/* Benefits grid */}
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 hover:bg-white/15 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div className="text-white font-semibold text-sm">{benefit.title}</div>
                      <div className="text-red-200 text-xs mt-0.5">{benefit.desc}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
