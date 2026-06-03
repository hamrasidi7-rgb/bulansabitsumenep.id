"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Search, TrendingUp } from "lucide-react";

const categories = ["Semua", "Kesehatan Masyarakat", "PMI & Kemanusiaan", "Rumah Sakit", "Puskesmas", "Inovasi Kesehatan"];

const news = [
  {
    id: 1, category: "PMI & Kemanusiaan",
    title: "PMI Sumenep Luncurkan Aplikasi Donor Darah Digital untuk Kemudahkan Masyarakat",
    excerpt: "PMI Kabupaten Sumenep resmi meluncurkan platform digital untuk memudahkan proses pendaftaran donor darah dan pemantauan stok darah secara real-time.",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop",
    date: "3 Juni 2025", readTime: "3 menit", featured: true,
    tag: "Terbaru",
  },
  {
    id: 2, category: "Kesehatan Masyarakat",
    title: "Kasus DBD di Sumenep Turun 40% Berkat Program Jumantik Terpadu",
    excerpt: "Dinas Kesehatan Sumenep mencatat penurunan signifikan kasus demam berdarah dengue berkat kolaborasi program Juru Pemantau Jentik lintas sektor.",
    image: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=600&h=400&fit=crop",
    date: "1 Juni 2025", readTime: "4 menit", featured: false,
    tag: "Trending",
  },
  {
    id: 3, category: "Rumah Sakit",
    title: "RSUD Sumenep Buka Layanan Klinik Gizi Terpadu Gratis untuk Balita",
    excerpt: "RSUD dr. H. Moh. Anwar Sumenep membuka layanan klinik gizi terpadu yang dapat diakses gratis oleh balita dari keluarga kurang mampu.",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
    date: "29 Mei 2025", readTime: "3 menit", featured: false, tag: "",
  },
  {
    id: 4, category: "Puskesmas",
    title: "Program Skrining Hipertensi Gratis di 27 Puskesmas se-Kabupaten Sumenep",
    excerpt: "Dinas Kesehatan Sumenep meluncurkan program skrining hipertensi gratis yang menjangkau 27 puskesmas seluruh kecamatan.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    date: "27 Mei 2025", readTime: "5 menit", featured: false, tag: "",
  },
  {
    id: 5, category: "Inovasi Kesehatan",
    title: "Dokter Muda Sumenep Ciptakan Alat Deteksi Stunting Berbasis AI",
    excerpt: "Dua dokter muda asal Sumenep berhasil menciptakan alat skrining stunting berbasis kecerdasan buatan yang akurat dan mudah digunakan.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
    date: "25 Mei 2025", readTime: "6 menit", featured: false, tag: "Inovasi",
  },
  {
    id: 6, category: "PMI & Kemanusiaan",
    title: "Relawan PMI Sumenep Ikuti Pelatihan Disaster Management Nasional",
    excerpt: "Sebanyak 25 relawan terpilih PMI Sumenep mengikuti pelatihan manajemen bencana tingkat nasional di Jakarta.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
    date: "23 Mei 2025", readTime: "4 menit", featured: false, tag: "",
  },
];

export default function BeritaPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = news.filter((n) => {
    const matchCat = activeCategory === "Semua" || n.category === activeCategory;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = filtered.find((n) => n.featured);
  const rest = filtered.filter((n) => !n.featured);

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="container-site">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <span className="inline-flex items-center gap-2 bg-red-50 text-pmi-red text-xs font-bold px-4 py-1.5 rounded-full mb-4">
              <TrendingUp size={12} /> Berita Kesehatan
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
              Berita Kesehatan Sumenep
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto">
              Jurnalisme kesehatan yang fokus pada masyarakat, inovasi medis, dan aksi kemanusiaan
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari berita..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-red/20 focus:border-pmi-red bg-white"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-pmi-red text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-10">
        {featured && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
            <Link href={`/berita/${featured.id}`}>
              <div className="group grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
                <div className="relative h-64 md:h-auto">
                  <Image src={featured.image} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {featured.tag && (
                    <span className="absolute top-4 left-4 bg-pmi-red text-white text-xs font-bold px-3 py-1 rounded-full">
                      {featured.tag}
                    </span>
                  )}
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-pmi-red bg-red-50 px-2.5 py-1 rounded-full w-fit mb-3">{featured.category}</span>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-pmi-red transition-colors leading-snug">{featured.title}</h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{featured.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {featured.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="group"
            >
              <Link href={`/berita/${item.id}`}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    {item.tag && (
                      <span className="absolute top-3 left-3 bg-pmi-red text-white text-xs font-bold px-2 py-0.5 rounded-full">{item.tag}</span>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <span className="text-xs text-pmi-red font-semibold mb-2">{item.category}</span>
                    <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-2 group-hover:text-pmi-red transition-colors flex-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-auto pt-3 border-t border-gray-50">
                      <span>{item.date}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Clock size={10} /> {item.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="btn-outline-red">Muat Lebih Banyak <ArrowRight size={15} /></button>
        </div>
      </div>
    </div>
  );
}
