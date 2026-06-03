"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, CheckCircle, BarChart2, Users, ArrowRight, Edit3, Eye, Award } from "lucide-react";

const workflow = [
  { step: "01", title: "Buat Draft", desc: "Tulis artikel menggunakan editor kami yang mudah digunakan", icon: Edit3 },
  { step: "02", title: "Review Redaksi", desc: "Tim redaksi memeriksa kelengkapan dan kejelasan tulisan", icon: Eye },
  { step: "03", title: "Medical Review", desc: "Dokter senior atau spesialis memverifikasi akurasi medis", icon: CheckCircle },
  { step: "04", title: "Terbit", desc: "Artikel tayang dan menjangkau ribuan pembaca Sumenep", icon: Award },
];

const benefits = [
  { icon: BarChart2, title: "Analitik Artikel", desc: "Pantau jumlah pembaca, share, dan engagement artikel Anda" },
  { icon: Users, title: "Jangkau Lebih Luas", desc: "Artikel Anda dibaca ribuan masyarakat Sumenep" },
  { icon: Award, title: "Sertifikat Kontributor", desc: "Sertifikat resmi dari PMI Sumenep untuk portofolio Anda" },
  { icon: FileText, title: "Portofolio Digital", desc: "Bangun profil digital sebagai tenaga kesehatan terpercaya" },
];

export default function DokterMenulisPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 py-16">
        <div className="container-site text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full mb-5">
              <Edit3 size={12} /> Kontributor Kesehatan
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Dokter Menulis,<br />
              <span className="text-red-300">Masyarakat Sehat</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
              Platform bagi dokter dan tenaga kesehatan Sumenep untuk berbagi ilmu
              dan mengedukasi masyarakat melalui tulisan yang terverifikasi.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dokter-menulis/daftar" className="btn-primary bg-white text-pmi-red hover:bg-red-50 shadow-lg">
                Daftar sebagai Kontributor <ArrowRight size={15} />
              </Link>
              <Link href="/dokter-menulis/masuk" className="border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
                Masuk ke Dashboard
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-14">
        {/* Workflow */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="section-title">Alur Penerbitan <span className="gradient-text">Artikel</span></h2>
            <p className="section-subtitle mt-2">Proses seleksi ketat untuk memastikan akurasi informasi medis</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-0.5 bg-gray-200 z-0" />

            {workflow.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative text-center z-10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-pmi-red text-white flex flex-col items-center justify-center mx-auto mb-4 shadow-glow-sm">
                    <Icon size={20} />
                    <span className="text-xs font-bold mt-0.5 text-red-200">{step.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Keuntungan Berkontribusi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-card transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-pmi-red flex items-center justify-center mb-3">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{benefit.title}</h3>
                  <p className="text-gray-500 text-xs">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Who can join */}
        <section className="bg-gray-50 rounded-3xl p-8 mb-14">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Siapa yang Bisa Bergabung?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: "👨‍⚕️", title: "Dokter Umum", desc: "Dokter praktek atau rumah sakit" },
              { emoji: "🩺", title: "Dokter Spesialis", desc: "Spesialis dari berbagai bidang" },
              { emoji: "👩‍⚕️", title: "Perawat", desc: "Perawat berpengalaman minimal 2 tahun" },
              { emoji: "🤱", title: "Bidan", desc: "Bidan praktik mandiri atau RS" },
              { emoji: "🥗", title: "Ahli Gizi", desc: "Nutrisionis & dietisien" },
              { emoji: "💊", title: "Apoteker", desc: "Farmasis klinis atau komunitas" },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-gray-100">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Siap Berbagi Ilmu?</h2>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Bergabunglah dengan 64+ dokter dan tenaga kesehatan yang telah berkontribusi di bulansabitsumenep.id
          </p>
          <Link href="/dokter-menulis/daftar" className="btn-primary text-base py-3.5 px-8">
            Daftar Sekarang — Gratis <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
