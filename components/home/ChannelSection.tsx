"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Newspaper, Heart, ArrowRight, Clock,
  CheckCircle, MapPin, Calendar, ChevronRight,
} from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "PMI & Kemanusiaan",
    title: "PMI Sumenep Luncurkan Platform Digital Donor Darah untuk Masyarakat",
    excerpt: "PMI Kabupaten Sumenep resmi meluncurkan platform digital untuk memudahkan proses pendaftaran donor darah dan pemantauan stok darah secara real-time.",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=380&fit=crop",
    date: "3 Jun 2025",
    readTime: "3 menit",
    tag: "Terbaru",
    tagColor: "bg-pmi-red text-white",
  },
  {
    id: 2,
    category: "Kesehatan Masyarakat",
    title: "Kasus DBD Turun 40% Berkat Program Jumantik Terpadu Sumenep",
    excerpt: "Dinas Kesehatan Sumenep mencatat penurunan kasus demam berdarah berkat kolaborasi program Juru Pemantau Jentik lintas sektor.",
    image: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=600&h=380&fit=crop",
    date: "1 Jun 2025",
    readTime: "4 menit",
    tag: "Trending",
    tagColor: "bg-orange-500 text-white",
  },
  {
    id: 3,
    category: "Inovasi Kesehatan",
    title: "Dokter Muda Sumenep Ciptakan Alat Deteksi Stunting Berbasis AI",
    excerpt: "Dua dokter muda asal Sumenep berhasil menciptakan alat skrining stunting berbasis kecerdasan buatan yang akurat dan mudah digunakan.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=380&fit=crop",
    date: "25 Mei 2025",
    readTime: "6 menit",
    tag: "Inovasi",
    tagColor: "bg-blue-600 text-white",
  },
  {
    id: 4,
    category: "Rumah Sakit",
    title: "RSUD Sumenep Buka Klinik Gizi Terpadu Gratis untuk Balita",
    excerpt: "RSUD dr. H. Moh. Anwar membuka layanan klinik gizi terpadu yang dapat diakses gratis oleh balita dari keluarga kurang mampu.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=380&fit=crop",
    date: "29 Mei 2025",
    readTime: "3 menit",
    tag: "",
    tagColor: "",
  },
];

const humanActions = [
  {
    id: 1,
    type: "Donor Darah",
    typeColor: "bg-red-100 text-red-700",
    title: "1.200 Kantong Darah Terkumpul dalam Gebyar Donor Darah Ramadan",
    excerpt: "PMI Sumenep berhasil mengumpulkan 1.200 kantong darah dalam kegiatan donor darah massal yang melibatkan komunitas dan pesantren se-Sumenep.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=380&fit=crop",
    date: "28 Mei 2025",
    location: "Gedung PMI Sumenep",
    impact: "1.200 kantong · 400+ peserta",
    impactColor: "text-red-600 bg-red-50",
  },
  {
    id: 2,
    type: "Bantuan Bencana",
    typeColor: "bg-orange-100 text-orange-700",
    title: "Respon Cepat PMI Pasca Banjir di Kecamatan Rubaru",
    excerpt: "Tim relawan PMI Sumenep memberikan bantuan logistik, evakuasi, dan layanan kesehatan darurat kepada 450 keluarga terdampak.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=380&fit=crop",
    date: "20 Mei 2025",
    location: "Kec. Rubaru, Sumenep",
    impact: "450 keluarga terbantu",
    impactColor: "text-orange-600 bg-orange-50",
  },
  {
    id: 3,
    type: "Pelatihan Relawan",
    typeColor: "bg-blue-100 text-blue-700",
    title: "200 Relawan Baru Lulus Pelatihan P3K dan Disaster Management",
    excerpt: "PMI Sumenep meluluskan 200 relawan baru yang mengikuti pelatihan pertolongan pertama dan manajemen bencana selama 3 hari.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=380&fit=crop",
    date: "15 Mei 2025",
    location: "Markas PMI Sumenep",
    impact: "200 relawan lulus",
    impactColor: "text-blue-600 bg-blue-50",
  },
  {
    id: 4,
    type: "Ambulans Sosial",
    typeColor: "bg-purple-100 text-purple-700",
    title: "340 Perjalanan Ambulans Gratis Sepanjang Tahun untuk Warga Kurang Mampu",
    excerpt: "Program ambulans sosial PMI Sumenep membantu 340 pasien kurang mampu mendapatkan akses layanan kesehatan tanpa biaya.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=380&fit=crop",
    date: "10 Mei 2025",
    location: "Seluruh Kab. Sumenep",
    impact: "340 pasien terbantu",
    impactColor: "text-purple-600 bg-purple-50",
  },
];

export default function ChannelSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-gray-50/60 pt-5 pb-12 md:pt-6 md:pb-16" ref={ref}>
      <div className="container-site">

        {/* Channel headers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* ═══════════════ KANAL 1: BERITA KESEHATAN ═══════════════ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55 }}
          >
            {/* Channel label */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-pmi-red flex items-center justify-center shadow-glow-sm">
                  <Newspaper size={17} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 leading-none">
                    Berita Kesehatan
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Jurnalisme kesehatan terpercaya</p>
                </div>
              </div>
              <Link
                href="/berita"
                className="flex items-center gap-1 text-pmi-red text-xs font-semibold hover:text-red-800 transition-colors group"
              >
                Semua Berita
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Featured news */}
            <Link href={`/berita/${newsItems[0].id}`} className="group block mb-3">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={newsItems[0].image}
                    alt={newsItems[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {newsItems[0].tag && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${newsItems[0].tagColor}`}>
                      {newsItems[0].tag}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock size={10} /> {newsItems[0].readTime}
                  </span>
                </div>
                <div className="p-4">
                  <span className="text-xs font-semibold text-pmi-red">{newsItems[0].category}</span>
                  <h3 className="font-bold text-gray-900 text-sm leading-snug mt-1 group-hover:text-pmi-red transition-colors line-clamp-2">
                    {newsItems[0].title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1.5 line-clamp-2">
                    {newsItems[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <span className="text-gray-400 text-xs">{newsItems[0].date}</span>
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      <CheckCircle size={10} /> Terverifikasi
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* News list */}
            <div className="space-y-2">
              {newsItems.slice(1).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                >
                  <Link href={`/berita/${item.id}`} className="group flex gap-3 bg-white rounded-xl p-3 border border-gray-100 hover:border-red-100 hover:shadow-card transition-all duration-200">
                    <div className="relative w-16 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {item.tag && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.tagColor} mr-1`}>
                          {item.tag}
                        </span>
                      )}
                      <h4 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-pmi-red transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-gray-400">{item.date}</span>
                        <span className="text-gray-200">·</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                          <Clock size={9} /> {item.readTime}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-gray-200 group-hover:text-pmi-red flex-shrink-0 self-center transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA berita */}
            <Link
              href="/berita"
              className="mt-4 flex items-center justify-center gap-2 border-2 border-pmi-red text-pmi-red hover:bg-pmi-red hover:text-white rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 w-full"
            >
              <Newspaper size={15} /> Baca Semua Berita Kesehatan
            </Link>
          </motion.div>

          {/* ═══════════════ KANAL 2: AKSI KEMANUSIAAN ═══════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {/* Channel label */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-secondary flex items-center justify-center">
                  <Heart size={17} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 leading-none">
                    Aksi Kemanusiaan
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Dampak nyata PMI Sumenep</p>
                </div>
              </div>
              <Link
                href="/kemanusiaan"
                className="flex items-center gap-1 text-brand-secondary text-xs font-semibold hover:text-gray-700 transition-colors group"
              >
                Semua Aksi
                <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Featured action */}
            <Link href={`/kemanusiaan/${humanActions[0].id}`} className="group block mb-3">
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={humanActions[0].image}
                    alt={humanActions[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${humanActions[0].typeColor}`}>
                    {humanActions[0].type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-brand-secondary transition-colors line-clamp-2">
                    {humanActions[0].title}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mt-1.5 line-clamp-2">
                    {humanActions[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar size={10} /> {humanActions[0].date}</span>
                      <span className="flex items-center gap-1"><MapPin size={10} /> {humanActions[0].location}</span>
                    </div>
                  </div>
                  <div className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${humanActions[0].impactColor}`}>
                    ✓ {humanActions[0].impact}
                  </div>
                </div>
              </div>
            </Link>

            {/* Action list */}
            <div className="space-y-2">
              {humanActions.slice(1).map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                >
                  <Link href={`/kemanusiaan/${item.id}`} className="group flex gap-3 bg-white rounded-xl p-3 border border-gray-100 hover:border-gray-300 hover:shadow-card transition-all duration-200">
                    <div className="relative w-16 h-14 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.typeColor}`}>
                        {item.type}
                      </span>
                      <h4 className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-brand-secondary transition-colors mt-0.5">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-1">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${item.impactColor}`}>
                          ✓ {item.impact}
                        </span>
                      </div>
                    </div>
                    <ArrowRight size={13} className="text-gray-200 group-hover:text-brand-secondary flex-shrink-0 self-center transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA kemanusiaan */}
            <Link
              href="/kemanusiaan"
              className="mt-4 flex items-center justify-center gap-2 border-2 border-brand-secondary text-brand-secondary hover:bg-brand-secondary hover:text-white rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 w-full"
            >
              <Heart size={15} /> Lihat Semua Aksi Kemanusiaan
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
