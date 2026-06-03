"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Users, Droplets, Truck, BookOpen } from "lucide-react";

const stories = [
  {
    id: 1,
    type: "Donor Darah",
    icon: Droplets,
    color: "text-red-600",
    bg: "bg-red-50",
    title: "1.200 Kantong Darah Terkumpul dalam Gebyar Donor Darah Ramadan",
    excerpt:
      "PMI Sumenep berhasil mengumpulkan 1.200 kantong darah dalam kegiatan donor darah massal bulan Ramadan yang melibatkan komunitas, instansi, dan pesantren se-Sumenep.",
    image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=600&h=400&fit=crop",
    date: "28 Mei 2025",
    location: "Gedung PMI Sumenep",
  },
  {
    id: 2,
    type: "Bantuan Bencana",
    icon: Heart,
    color: "text-orange-600",
    bg: "bg-orange-50",
    title: "Respon Cepat PMI Pasca Banjir di Kecamatan Rubaru",
    excerpt:
      "Tim relawan PMI Sumenep bergerak cepat memberikan bantuan logistik, evakuasi, dan layanan kesehatan darurat kepada 450 keluarga terdampak banjir di Rubaru.",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
    date: "20 Mei 2025",
    location: "Kecamatan Rubaru, Sumenep",
  },
  {
    id: 3,
    type: "Relawan PMI",
    icon: Users,
    color: "text-blue-600",
    bg: "bg-blue-50",
    title: "Pelatihan P3K dan Disaster Management untuk 200 Relawan Baru",
    excerpt:
      "PMI Sumenep meluluskan 200 relawan baru yang telah mengikuti pelatihan pertolongan pertama dan manajemen bencana selama 3 hari penuh.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop",
    date: "15 Mei 2025",
    location: "Markas PMI Sumenep",
  },
  {
    id: 4,
    type: "Ambulans Sosial",
    icon: Truck,
    color: "text-purple-600",
    bg: "bg-purple-50",
    title: "Layanan Ambulans Gratis: 340 Perjalanan dalam Satu Tahun",
    excerpt:
      "Program ambulans sosial PMI Sumenep telah membantu 340 pasien kurang mampu mendapatkan akses layanan kesehatan tanpa biaya transportasi.",
    image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600&h=400&fit=crop",
    date: "10 Mei 2025",
    location: "Seluruh Kabupaten Sumenep",
  },
  {
    id: 5,
    type: "PMR",
    icon: BookOpen,
    color: "text-teal-600",
    bg: "bg-teal-50",
    title: "PMR Sumenep Juara 1 Jumbara Provinsi Jawa Timur 2025",
    excerpt:
      "Palang Merah Remaja Kabupaten Sumenep berhasil meraih juara 1 dalam Jumbara tingkat Provinsi Jawa Timur kategori pertolongan pertama.",
    image: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=400&fit=crop",
    date: "5 Mei 2025",
    location: "Surabaya, Jawa Timur",
  },
];

export default function HumanitarianStories() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const FeaturedIcon = stories[0].icon;

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50/50 to-white" ref={ref}>
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
              Aksi Kemanusiaan
            </span>
            <h2 className="section-title">
              Kisah Nyata{" "}
              <span className="gradient-text">Kemanusiaan</span>
            </h2>
            <p className="section-subtitle mt-2">
              Setiap aksi membawa perubahan nyata bagi masyarakat Sumenep
            </p>
          </div>
          <Link href="/kemanusiaan" className="btn-outline-red flex-shrink-0 text-sm py-2.5">
            Semua Kegiatan <ArrowRight size={15} />
          </Link>
        </motion.div>

        {/* Featured large story + side stories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Main story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:row-span-2"
          >
            <Link href={`/kemanusiaan/${stories[0].id}`}>
              <div className="group relative overflow-hidden rounded-3xl h-full min-h-[400px] bg-gray-900 cursor-pointer">
                <Image
                  src={stories[0].image}
                  alt={stories[0].title}
                  fill
                  className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className={`inline-flex items-center gap-1.5 ${stories[0].bg} ${stories[0].color} text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                    <FeaturedIcon size={11} />
                    {stories[0].type}
                  </div>
                  <h3 className="text-white text-xl font-bold leading-tight mb-2">
                    {stories[0].title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {stories[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{stories[0].location} · {stories[0].date}</span>
                    <span className="flex items-center gap-1 text-white text-xs bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-full">
                      Baca Lengkap <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Side stories */}
          <div className="flex flex-col gap-4">
            {stories.slice(1, 3).map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Link href={`/kemanusiaan/${story.id}`}>
                  <div className="group flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                    <div className="relative w-28 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`inline-flex items-center gap-1 ${story.bg} ${story.color} text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5`}>
                        <story.icon size={10} />
                        {story.type}
                      </div>
                      <h3 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-pmi-red transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">{story.date}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom row stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stories.slice(3).map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <Link href={`/kemanusiaan/${story.id}`}>
                <div className="group flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                  <div className="relative w-24 h-20 flex-shrink-0 rounded-xl overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`inline-flex items-center gap-1 ${story.bg} ${story.color} text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5`}>
                      <story.icon size={10} />
                      {story.type}
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 leading-tight line-clamp-2 group-hover:text-pmi-red transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">{story.location}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
