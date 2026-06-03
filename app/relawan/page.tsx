"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Users, Shield, BookOpen, Award, Heart, CheckCircle, ArrowRight, Star } from "lucide-react";

const benefits = [
  { icon: Shield, title: "Pelatihan P3K", desc: "Kuasai pertolongan pertama tingkat dasar dan lanjutan", color: "text-blue-600 bg-blue-50" },
  { icon: BookOpen, title: "Edukasi Kesehatan", desc: "Akses materi kesehatan eksklusif dari dokter PMI", color: "text-green-600 bg-green-50" },
  { icon: Award, title: "Sertifikat Resmi PMI", desc: "Diakui PMI Indonesia dan dunia internasional", color: "text-purple-600 bg-purple-50" },
  { icon: Heart, title: "Dampak Sosial Nyata", desc: "Bantu sesama langsung di lapangan", color: "text-red-600 bg-red-50" },
  { icon: Users, title: "Komunitas Kuat", desc: "Bergabung dengan 513+ relawan aktif Sumenep", color: "text-orange-600 bg-orange-50" },
  { icon: Star, title: "Pengembangan Diri", desc: "Tingkatkan soft & hard skills Anda", color: "text-teal-600 bg-teal-50" },
];

const steps = [
  { step: "01", title: "Daftar Online", desc: "Isi formulir pendaftaran relawan secara online" },
  { step: "02", title: "Verifikasi Data", desc: "Tim PMI akan memverifikasi data Anda dalam 2-3 hari kerja" },
  { step: "03", title: "Pelatihan Dasar", desc: "Ikuti pelatihan orientasi dan P3K dasar selama 2 hari" },
  { step: "04", title: "Aktif Bertugas", desc: "Mulai bertugas dan berkontribusi nyata bagi masyarakat" },
];

const testimonials = [
  {
    name: "Ahmad Fauzi", role: "Relawan sejak 2022", rating: 5,
    text: "Menjadi relawan PMI mengubah perspektif saya. Pelatihan yang diberikan sangat bermanfaat dan komunitas relawan sangat supportive.",
    initials: "AF", color: "from-blue-500 to-blue-700",
  },
  {
    name: "Siti Rahmah", role: "Relawan PMR SMA 2 Sumenep", rating: 5,
    text: "Saya bangga bisa membantu korban bencana langsung. Pengalaman yang tidak bisa saya dapatkan di tempat lain.",
    initials: "SR", color: "from-rose-500 to-rose-700",
  },
  {
    name: "Budi Hariyono", role: "Relawan Ambulans Sosial", rating: 5,
    text: "Sudah 3 tahun jadi pengemudi ambulans sosial PMI. Setiap perjalanan adalah kepuasan tersendiri bisa membantu yang membutuhkan.",
    initials: "BH", color: "from-green-500 to-green-700",
  },
];

export default function RelawanPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", address: "", motivation: "" });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-red-950 to-gray-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,25,32,0.3)_0%,transparent_70%)]" />
        <div className="container-site text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full mb-5">
              <Users size={12} /> 513 Relawan Aktif
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Jadilah Relawan PMI,{" "}
              <span className="text-red-300">Wujudkan Kemanusiaan</span>
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
              Bergabunglah dengan ratusan relawan aktif PMI Kabupaten Sumenep dan berikan dampak nyata bagi masyarakat.
            </p>
            <a
              href="#daftar"
              className="inline-flex items-center gap-2 bg-pmi-red text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-red-800 transition-all shadow-lg hover:-translate-y-0.5"
            >
              <Heart size={16} className="fill-current" /> Daftar Sekarang <ArrowRight size={15} />
            </a>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12">
        {/* Benefits */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h2 className="section-title">Keuntungan Menjadi <span className="gradient-text">Relawan PMI</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-card transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${benefit.color} flex items-center justify-center mb-3`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{benefit.title}</h3>
                  <p className="text-gray-500 text-sm">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Steps */}
        <section className="mb-16 bg-gray-50 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Cara Menjadi Relawan</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-pmi-red text-white font-extrabold text-xl flex items-center justify-center mx-auto mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Kata Relawan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Registration form */}
        <section id="daftar" className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Formulir Pendaftaran Relawan</h2>
            <p className="text-gray-500 mt-2 text-sm">Isi data dengan lengkap dan benar</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-card">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Nama lengkap Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="email@anda.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nomor HP / WhatsApp *</label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="08xxxxxxxxxx"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Kecamatan, Kabupaten Sumenep"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Motivasi Menjadi Relawan</label>
                <textarea
                  rows={3}
                  className="input-field resize-none"
                  placeholder="Ceritakan motivasi Anda bergabung sebagai relawan PMI..."
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                />
              </div>
              <div className="flex items-start gap-2.5">
                <input type="checkbox" id="agree" className="mt-1 accent-pmi-red" />
                <label htmlFor="agree" className="text-sm text-gray-600">
                  Saya menyetujui{" "}
                  <Link href="/syarat" className="text-pmi-red hover:underline">syarat dan ketentuan</Link>{" "}
                  pendaftaran relawan PMI Sumenep
                </label>
              </div>
              <button className="btn-primary w-full justify-center py-3.5 text-base">
                <Heart size={17} className="fill-current" /> Kirim Pendaftaran
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
