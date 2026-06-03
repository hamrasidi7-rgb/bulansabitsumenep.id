"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, CheckCircle, User } from "lucide-react";

const articles = [
  {
    id: 1,
    category: "Kesehatan Anak",
    categoryColor: "bg-blue-50 text-blue-700 border-blue-100",
    title: "Panduan Lengkap Jadwal Imunisasi Anak: Dari Bayi hingga 5 Tahun",
    excerpt:
      "Imunisasi adalah salah satu tindakan pencegahan penyakit yang paling efektif. Kenali jadwal, jenis vaksin, dan manfaat imunisasi lengkap untuk buah hati Anda.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    readTime: "5 menit",
    author: "dr. Fatima Zahra, Sp.A",
    reviewedBy: "dr. Fatima Zahra, Sp.A",
    date: "2 Juni 2025",
    featured: true,
    slug: "jadwal-imunisasi-anak",
  },
  {
    id: 2,
    category: "Gizi & Nutrisi",
    categoryColor: "bg-green-50 text-green-700 border-green-100",
    title: "7 Tanda Kekurangan Gizi pada Anak yang Sering Terlewat",
    excerpt:
      "Malnutrisi tidak selalu terlihat jelas. Kenali tanda-tanda kekurangan gizi pada anak sejak dini untuk mencegah dampak jangka panjang.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    readTime: "4 menit",
    author: "Ns. Rina Fitriana, S.Kep",
    reviewedBy: "dr. Ahmad Fauzi, Sp.GK",
    date: "1 Juni 2025",
    featured: false,
    slug: "tanda-kekurangan-gizi-anak",
  },
  {
    id: 3,
    category: "Penyakit Menular",
    categoryColor: "bg-orange-50 text-orange-700 border-orange-100",
    title: "Demam Berdarah: Gejala, Pencegahan, dan Kapan Harus ke Dokter",
    excerpt:
      "DBD masih menjadi ancaman serius. Kenali gejala awal, cara pencegahan efektif, dan tanda bahaya yang mengharuskan segera ke fasilitas kesehatan.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
    readTime: "6 menit",
    author: "dr. Budi Santoso",
    reviewedBy: "dr. Budi Santoso",
    date: "30 Mei 2025",
    featured: false,
    slug: "demam-berdarah-gejala-pencegahan",
  },
  {
    id: 4,
    category: "Kesehatan Mental",
    categoryColor: "bg-teal-50 text-teal-700 border-teal-100",
    title: "Mengenali Depresi Pasca Melahirkan: Bukan Sekadar 'Baby Blues'",
    excerpt:
      "Postpartum depression mempengaruhi 1 dari 8 ibu baru. Temukan bedanya dengan baby blues, gejala, dan cara mendapatkan bantuan.",
    image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=400&fit=crop",
    readTime: "7 menit",
    author: "Psikolog Dewi Lestari, M.Psi",
    reviewedBy: "Psikolog Dewi Lestari, M.Psi",
    date: "29 Mei 2025",
    featured: false,
    slug: "depresi-pasca-melahirkan",
  },
  {
    id: 5,
    category: "Pertolongan Pertama",
    categoryColor: "bg-red-50 text-red-700 border-red-100",
    title: "Cara Tepat Melakukan CPR: Panduan Dasar yang Wajib Diketahui",
    excerpt:
      "CPR yang dilakukan dengan benar dalam 4 menit pertama dapat meningkatkan peluang keselamatan hingga 70%. Pelajari tekniknya sekarang.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=400&fit=crop",
    readTime: "8 menit",
    author: "dr. Agus Prasetyo",
    reviewedBy: "dr. Agus Prasetyo, Sp.JP",
    date: "28 Mei 2025",
    featured: false,
    slug: "cara-cpr-dasar",
  },
];

export default function FeaturedArticles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1);

  return (
    <section className="section-padding bg-gray-50/50" ref={ref}>
      <div className="container-site">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <span className="inline-block text-pmi-red text-xs font-bold uppercase tracking-widest mb-3 bg-red-50 px-4 py-1.5 rounded-full">
              Edukasi Kesehatan
            </span>
            <h2 className="section-title">
              Artikel <span className="gradient-text">Pilihan Dokter</span>
            </h2>
            <p className="section-subtitle mt-2">
              Setiap artikel ditinjau dan diverifikasi oleh dokter dan tenaga kesehatan
            </p>
          </div>
          <Link
            href="/edukasi"
            className="btn-outline-red flex-shrink-0 text-sm py-2.5"
          >
            Lihat Semua Artikel <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured large card */}
          <motion.article
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 group"
          >
            <Link href={`/edukasi/${featuredArticle.slug}`}>
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <span
                    className={`absolute top-4 left-4 badge-category border ${featuredArticle.categoryColor}`}
                  >
                    {featuredArticle.category}
                  </span>
                  <span className="absolute top-4 right-4 bg-white/90 text-gray-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Clock size={11} /> {featuredArticle.readTime}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-pmi-red transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={12} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-700">{featuredArticle.author}</div>
                        <div className="text-xs text-gray-400">{featuredArticle.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-medium bg-green-50 px-2.5 py-1 rounded-full">
                      <CheckCircle size={11} /> Terverifikasi
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Side articles */}
          <div className="flex flex-col gap-4">
            {sideArticles.slice(0, 4).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className="group"
              >
                <Link href={`/edukasi/${article.slug}`}>
                  <div className="flex gap-4 bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5">
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`badge-category border text-xs ${article.categoryColor} mb-1`}>
                        {article.category}
                      </span>
                      <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 group-hover:text-pmi-red transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock size={10} /> {article.readTime}
                        </span>
                        <span className="text-gray-300">·</span>
                        <span className="text-gray-400 text-xs">{article.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Category quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap gap-3 justify-center"
        >
          {[
            { label: "Kesehatan Anak", emoji: "👶", href: "/edukasi/kesehatan-anak" },
            { label: "Penyakit Menular", emoji: "🦠", href: "/edukasi/penyakit-menular" },
            { label: "Gizi & Nutrisi", emoji: "🥗", href: "/edukasi/gizi" },
            { label: "Kesehatan Mental", emoji: "🧠", href: "/edukasi/kesehatan-mental" },
            { label: "Pertolongan Pertama", emoji: "🩺", href: "/edukasi/pertolongan-pertama" },
            { label: "Lansia", emoji: "👴", href: "/edukasi/lansia" },
          ].map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-pmi-red hover:text-pmi-red text-gray-600 text-sm px-4 py-2 rounded-full transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
