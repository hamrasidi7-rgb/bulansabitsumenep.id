"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Search, Clock, CheckCircle, Filter, BookOpen, ArrowRight, User } from "lucide-react";

const categories = [
  { id: "semua", label: "Semua", count: 287 },
  { id: "kesehatan-anak", label: "Kesehatan Anak", count: 48, emoji: "👶" },
  { id: "penyakit-menular", label: "Penyakit Menular", count: 35, emoji: "🦠" },
  { id: "penyakit-tidak-menular", label: "Penyakit Tidak Menular", count: 42, emoji: "💊" },
  { id: "gizi", label: "Gizi & Nutrisi", count: 31, emoji: "🥗" },
  { id: "lansia", label: "Kesehatan Lansia", count: 27, emoji: "👴" },
  { id: "kesehatan-mental", label: "Kesehatan Mental", count: 39, emoji: "🧠" },
  { id: "pertolongan-pertama", label: "Pertolongan Pertama", count: 22, emoji: "🩺" },
  { id: "kesehatan-wanita", label: "Kesehatan Wanita", count: 43, emoji: "👩" },
];

const articles = [
  {
    id: 1,
    category: "Kesehatan Anak",
    categoryId: "kesehatan-anak",
    title: "Panduan Lengkap Jadwal Imunisasi Anak dari Bayi hingga 5 Tahun",
    excerpt: "Imunisasi adalah tindakan pencegahan penyakit paling efektif. Kenali jadwal, jenis vaksin, dan manfaat imunisasi lengkap.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    readTime: 5, author: "dr. Fatima Zahra, Sp.A",
    reviewedBy: "dr. Fatima Zahra, Sp.A", date: "2 Jun 2025", slug: "jadwal-imunisasi-anak",
    categoryColor: "bg-blue-50 text-blue-700",
  },
  {
    id: 2,
    category: "Gizi & Nutrisi",
    categoryId: "gizi",
    title: "7 Tanda Kekurangan Gizi pada Anak yang Sering Terlewat",
    excerpt: "Malnutrisi tidak selalu terlihat jelas. Kenali tanda-tanda kekurangan gizi pada anak sejak dini.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    readTime: 4, author: "Ns. Rina Fitriana, S.Kep",
    reviewedBy: "dr. Ahmad Fauzi, Sp.GK", date: "1 Jun 2025", slug: "tanda-kekurangan-gizi-anak",
    categoryColor: "bg-green-50 text-green-700",
  },
  {
    id: 3,
    category: "Penyakit Menular",
    categoryId: "penyakit-menular",
    title: "Demam Berdarah: Gejala, Pencegahan, dan Kapan Harus ke Dokter",
    excerpt: "DBD masih menjadi ancaman serius. Kenali gejala awal dan cara pencegahan yang efektif.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    readTime: 6, author: "dr. Budi Santoso",
    reviewedBy: "dr. Budi Santoso", date: "30 Mei 2025", slug: "demam-berdarah",
    categoryColor: "bg-orange-50 text-orange-700",
  },
  {
    id: 4,
    category: "Kesehatan Mental",
    categoryId: "kesehatan-mental",
    title: "Mengenali Depresi Pasca Melahirkan: Bukan Sekadar Baby Blues",
    excerpt: "Postpartum depression mempengaruhi 1 dari 8 ibu baru. Temukan bedanya dengan baby blues.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop",
    readTime: 7, author: "Psikolog Dewi Lestari, M.Psi",
    reviewedBy: "Psikolog Dewi Lestari, M.Psi", date: "29 Mei 2025", slug: "depresi-pasca-melahirkan",
    categoryColor: "bg-teal-50 text-teal-700",
  },
  {
    id: 5,
    category: "Pertolongan Pertama",
    categoryId: "pertolongan-pertama",
    title: "Cara Tepat Melakukan CPR: Panduan Dasar yang Wajib Diketahui",
    excerpt: "CPR yang dilakukan dengan benar dalam 4 menit pertama dapat meningkatkan peluang keselamatan hingga 70%.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
    readTime: 8, author: "dr. Agus Prasetyo, Sp.JP",
    reviewedBy: "dr. Agus Prasetyo, Sp.JP", date: "28 Mei 2025", slug: "cara-cpr-dasar",
    categoryColor: "bg-red-50 text-red-700",
  },
  {
    id: 6,
    category: "Kesehatan Wanita",
    categoryId: "kesehatan-wanita",
    title: "PCOS: Gejala, Penyebab, dan Penanganannya pada Wanita Muda",
    excerpt: "Sindrom ovarium polikistik mempengaruhi 1 dari 10 wanita usia subur. Kenali gejalanya lebih awal.",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=400&fit=crop",
    readTime: 9, author: "dr. Siti Aminah, Sp.OG",
    reviewedBy: "dr. Siti Aminah, Sp.OG", date: "27 Mei 2025", slug: "pcos-wanita-muda",
    categoryColor: "bg-rose-50 text-rose-700",
  },
];

export default function EdukasiPage() {
  const [activeCategory, setActiveCategory] = useState("semua");
  const [search, setSearch] = useState("");

  const filtered = articles.filter((a) => {
    const matchCat = activeCategory === "semua" || a.categoryId === activeCategory;
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 py-16 md:py-20">
        <div className="container-site text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full mb-5">
              <BookOpen size={12} /> Edukasi Kesehatan
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
              Pusat Edukasi Kesehatan
            </h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
              Artikel kesehatan yang ditulis dan direview oleh dokter serta tenaga kesehatan terpercaya
            </p>

            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari artikel kesehatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-pmi-red/30 shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories + Articles */}
      <div className="container-site py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-8 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeCategory === cat.id
                  ? "bg-pmi-red text-white shadow-glow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.emoji && <span>{cat.emoji}</span>}
              {cat.label}
              <span className={`text-xs ${activeCategory === cat.id ? "text-red-200" : "text-gray-400"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p>Tidak ada artikel ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/edukasi/${article.slug}`}>
                  <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className={`absolute top-3 left-3 badge-category ${article.categoryColor} text-xs`}>
                        {article.category}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-pmi-red transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                            <User size={11} />
                          </div>
                          <span className="text-xs truncate max-w-[120px]">{article.author}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Clock size={11} /> {article.readTime} mnt
                          </span>
                          <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                            <CheckCircle size={10} /> Reviewed
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* Load more */}
        <div className="text-center mt-10">
          <button className="btn-outline-red">
            Muat Lebih Banyak <ArrowRight size={15} />
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-blue-50 border-t border-blue-100 py-4">
        <div className="container-site text-center text-xs text-blue-700 flex items-center justify-center gap-2">
          <Filter size={12} />
          Semua artikel di-review oleh dokter atau tenaga kesehatan berpengalaman.
          Informasi ini bukan pengganti konsultasi medis.
        </div>
      </div>
    </div>
  );
}
