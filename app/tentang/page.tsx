"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Shield, Heart, Globe, Award, ArrowRight, Users, BookOpen, Droplets } from "lucide-react";

const values = [
  { icon: Heart, title: "Kemanusiaan", desc: "Mendahulukan kepentingan manusia di atas segalanya", color: "text-red-600 bg-red-50" },
  { icon: Globe, title: "Kenetralan", desc: "Tidak memihak dalam konflik, netral di setiap situasi", color: "text-blue-600 bg-blue-50" },
  { icon: Shield, title: "Ketidakberpihakan", desc: "Berdasarkan kebutuhan, tanpa diskriminasi", color: "text-green-600 bg-green-50" },
  { icon: Award, title: "Kemandirian", desc: "Mandiri dalam menjalankan misi kemanusiaan", color: "text-purple-600 bg-purple-50" },
];

const timeline = [
  { year: "1945", event: "PMI didirikan oleh Drs. Mohammad Hatta pada 17 September 1945" },
  { year: "1960", event: "PMI Cabang Sumenep resmi terbentuk dan mulai beroperasi" },
  { year: "1975", event: "Pembangunan markas PMI Sumenep dan unit transfusi darah pertama" },
  { year: "1995", event: "Pendirian Palang Merah Remaja (PMR) di sekolah-sekolah Sumenep" },
  { year: "2010", event: "Modernisasi layanan UTD dengan teknologi pemeriksaan darah terkini" },
  { year: "2020", event: "Respons besar PMI Sumenep dalam penanganan pandemi COVID-19" },
  { year: "2025", event: "Peluncuran platform digital kesehatan bulansabitsumenep.id" },
];

const leaders = [
  { name: "H. Mochammad Zaidi, SE", role: "Ketua PMI Kabupaten Sumenep", period: "2021-2026", initials: "MZ", color: "from-red-500 to-red-700" },
  { name: "dr. Samsul Arifin", role: "Wakil Ketua Bidang Kesehatan", period: "2021-2026", initials: "SA", color: "from-blue-500 to-blue-700" },
  { name: "Hj. Nurul Faizah", role: "Sekretaris Umum", period: "2021-2026", initials: "NF", color: "from-green-500 to-green-700" },
];

const stats = [
  { value: "60+", label: "Tahun Melayani", icon: Award },
  { value: "513", label: "Relawan Aktif", icon: Users },
  { value: "5.200+", label: "Jiwa Terbantu/Tahun", icon: Heart },
  { value: "89", label: "Program Kemanusiaan", icon: BookOpen },
];

export default function TentangPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 py-16">
        <div className="container-site text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-center gap-4 mb-6">
              <Image src="/logo-pmi.jpg" alt="PMI" width={64} height={64} className="rounded-xl object-contain bg-white p-1.5" />
              <Image src="/logo-bulan-sabit.jpg" alt="Bulan Sabit Sumenep" width={64} height={64} className="rounded-xl object-contain bg-white p-1.5" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              PMI Kabupaten Sumenep
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Melayani dengan sepenuh hati sejak 1960. Bersama kami, kemanusiaan bukan sekadar kata.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-pmi-red py-8">
        <div className="container-site grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                <Icon size={20} className="text-red-200 mx-auto mb-1" />
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-red-200 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="container-site py-14">
        {/* About */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-pmi-red text-xs font-bold uppercase tracking-widest mb-3 bg-red-50 px-4 py-1.5 rounded-full">
              Tentang Kami
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Melayani Kemanusiaan di Kabupaten Sumenep
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4">
              Palang Merah Indonesia (PMI) Kabupaten Sumenep adalah organisasi kemanusiaan yang
              bergerak dalam bidang kesehatan dan penanggulangan bencana di wilayah Kabupaten Sumenep,
              Jawa Timur, termasuk 126 pulau di kepulauannya.
            </p>
            <p className="text-gray-500 leading-relaxed mb-6">
              Platform <strong className="text-gray-700">bulansabitsumenep.id</strong> adalah wujud
              komitmen PMI Sumenep dalam menghadirkan edukasi kesehatan terpercaya dan informasi
              layanan kemanusiaan yang mudah diakses oleh seluruh lapisan masyarakat.
            </p>
            <div className="flex gap-4">
              <Link href="/kontak" className="btn-primary text-sm">Hubungi Kami <ArrowRight size={14} /></Link>
              <Link href="/relawan" className="btn-secondary text-sm">Jadi Relawan</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-gray-50 rounded-3xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Visi & Misi</h3>
              <div className="mb-4">
                <div className="text-pmi-red font-semibold text-sm mb-1">Visi</div>
                <p className="text-gray-600 text-sm">PMI Sumenep yang profesional dan dicintai masyarakat dalam melaksanakan tugas kemanusiaan.</p>
              </div>
              <div>
                <div className="text-pmi-red font-semibold text-sm mb-2">Misi</div>
                <ul className="space-y-2">
                  {["Meningkatkan kapasitas dan kualitas layanan PMI", "Melaksanakan edukasi kesehatan berbasis bukti", "Mengembangkan jaringan relawan yang tangguh", "Memperkuat layanan donor darah dan UTD"].map((m) => (
                    <li key={m} className="flex items-start gap-2 text-sm text-gray-600">
                      <Droplets size={12} className="text-pmi-red mt-1 flex-shrink-0" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <section id="nilai" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">7 Prinsip Dasar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-5 bg-white border border-gray-100 rounded-2xl hover:shadow-card transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center mx-auto mb-3`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{v.title}</h3>
                  <p className="text-gray-500 text-xs">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section id="sejarah" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sejarah PMI Sumenep</h2>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-5 pl-14 relative"
                >
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-pmi-red text-white flex items-center justify-center text-xs font-bold z-10">
                    {item.year}
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 flex-1 hover:shadow-card transition-all">
                    <p className="text-gray-700 text-sm">{item.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="struktur" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Pimpinan PMI Sumenep</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {leaders.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-card transition-all"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${leader.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-3`}>
                  {leader.initials}
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{leader.name}</h3>
                <p className="text-pmi-red text-xs font-medium mt-0.5">{leader.role}</p>
                <p className="text-gray-400 text-xs mt-0.5">Periode {leader.period}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
