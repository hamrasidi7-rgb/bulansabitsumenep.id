"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Heart, Users, Truck, BookOpen, Droplets, ArrowRight, MapPin, Calendar } from "lucide-react";

const categories = [
  { id: "semua", label: "Semua Kegiatan", icon: Heart },
  { id: "donor", label: "Donor Darah", icon: Droplets },
  { id: "bencana", label: "Bantuan Bencana", icon: Truck },
  { id: "relawan", label: "Kegiatan Relawan", icon: Users },
  { id: "pmr", label: "PMR", icon: BookOpen },
];

const activities = [
  {
    id: 1, category: "Donor Darah", categoryId: "donor",
    title: "1.200 Kantong Darah Terkumpul dalam Gebyar Donor Darah Ramadan",
    desc: "PMI Sumenep berhasil mengumpulkan 1.200 kantong darah dalam kegiatan donor darah massal yang melibatkan komunitas, instansi, dan pesantren.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=500&fit=crop",
    date: "28 Mei 2025", location: "Gedung PMI Sumenep",
    impact: "1.200 kantong darah · 400+ peserta",
    color: "bg-red-50 text-red-700",
  },
  {
    id: 2, category: "Bantuan Bencana", categoryId: "bencana",
    title: "Respon Cepat PMI Pasca Banjir di Kecamatan Rubaru",
    desc: "Tim relawan PMI Sumenep bergerak memberikan bantuan logistik, evakuasi, dan layanan kesehatan darurat kepada 450 keluarga terdampak banjir.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=500&fit=crop",
    date: "20 Mei 2025", location: "Kecamatan Rubaru",
    impact: "450 keluarga dibantu · 60 relawan terlibat",
    color: "bg-orange-50 text-orange-700",
  },
  {
    id: 3, category: "Kegiatan Relawan", categoryId: "relawan",
    title: "Pelatihan P3K dan Disaster Management untuk 200 Relawan Baru",
    desc: "PMI Sumenep meluluskan 200 relawan baru yang telah mengikuti pelatihan pertolongan pertama dan manajemen bencana selama 3 hari penuh.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop",
    date: "15 Mei 2025", location: "Markas PMI Sumenep",
    impact: "200 relawan lulus · 3 hari pelatihan",
    color: "bg-blue-50 text-blue-700",
  },
  {
    id: 4, category: "Kegiatan Relawan", categoryId: "relawan",
    title: "Layanan Ambulans Gratis: 340 Perjalanan dalam Satu Tahun",
    desc: "Program ambulans sosial PMI Sumenep telah membantu 340 pasien kurang mampu mendapatkan akses layanan kesehatan tanpa biaya.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=500&fit=crop",
    date: "10 Mei 2025", location: "Seluruh Kabupaten Sumenep",
    impact: "340 perjalanan gratis · 340 pasien terbantu",
    color: "bg-purple-50 text-purple-700",
  },
  {
    id: 5, category: "PMR", categoryId: "pmr",
    title: "PMR Sumenep Juara 1 Jumbara Provinsi Jawa Timur 2025",
    desc: "Palang Merah Remaja Kabupaten Sumenep meraih juara 1 dalam Jumbara tingkat Provinsi Jawa Timur kategori pertolongan pertama.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=500&fit=crop",
    date: "5 Mei 2025", location: "Surabaya, Jawa Timur",
    impact: "Juara 1 tingkat Provinsi",
    color: "bg-teal-50 text-teal-700",
  },
  {
    id: 6, category: "Bantuan Bencana", categoryId: "bencana",
    title: "Distribusi 500 Paket Sembako untuk Korban Kebakaran",
    desc: "PMI Sumenep mendistribusikan 500 paket sembako dan kebutuhan darurat kepada korban kebakaran di dua kecamatan.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=500&fit=crop",
    date: "1 Mei 2025", location: "Kec. Lenteng & Ganding",
    impact: "500 paket · 2 kecamatan",
    color: "bg-orange-50 text-orange-700",
  },
];

const stats = [
  { value: "5.200+", label: "Jiwa Terbantu", icon: Heart },
  { value: "89", label: "Aksi Kemanusiaan", icon: Users },
  { value: "340", label: "Ambulans Gratis", icon: Truck },
  { value: "513", label: "Relawan Aktif", icon: Users },
];

export default function KemanusiaanPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 py-16">
        <div className="container-site text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full mb-5">
              <Heart size={12} /> Aksi Kemanusiaan
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Pusat Kemanusiaan PMI Sumenep
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Setiap aksi, setiap kehadiran, setiap tetes keringat relawan kami
              membawa perubahan nyata bagi masyarakat Sumenep.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Impact stats */}
      <div className="bg-pmi-red py-8">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-red-200 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-pmi-red transition-all"
              >
                <Icon size={13} /> {cat.label}
              </button>
            );
          })}
        </div>

        {/* Timeline activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group"
            >
              <Link href={`/kemanusiaan/${activity.id}`}>
                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={activity.image}
                      alt={activity.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full ${activity.color}`}>
                      {activity.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-pmi-red transition-colors">
                      {activity.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {activity.desc}
                    </p>
                    <div className="space-y-1.5 pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={11} className="text-pmi-red" /> {activity.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin size={11} className="text-pmi-red" /> {activity.location}
                      </div>
                      <div className="flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full w-fit mt-1">
                        ✓ {activity.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Join relawan CTA */}
        <div className="mt-12 bg-gradient-to-r from-pmi-red to-red-800 rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ikut Berkontribusi</h2>
          <p className="text-red-100 mb-6 max-w-md mx-auto">
            Bergabunglah dengan relawan PMI Sumenep dan jadilah bagian dari gerakan kemanusiaan nyata.
          </p>
          <Link href="/relawan/daftar" className="inline-flex items-center gap-2 bg-white text-pmi-red px-7 py-3 rounded-full font-bold text-sm hover:bg-red-50 transition-colors">
            <Heart size={15} className="fill-current" /> Daftar Jadi Relawan <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
