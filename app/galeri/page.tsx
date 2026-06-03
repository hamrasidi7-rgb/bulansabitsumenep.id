"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, Camera } from "lucide-react";

const categories = ["Semua", "Donor Darah", "Kemanusiaan", "Relawan", "PMR", "Event"];

const gallery = [
  { id: 1, src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=800&h=600&fit=crop", cat: "Donor Darah", title: "Gebyar Donor Darah Ramadan 2025", date: "Mei 2025" },
  { id: 2, src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&h=600&fit=crop", cat: "Kemanusiaan", title: "Respon Bencana Banjir Rubaru", date: "Mei 2025" },
  { id: 3, src: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=600&fit=crop", cat: "Relawan", title: "Pelatihan P3K Relawan Baru", date: "Mei 2025" },
  { id: 4, src: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop", cat: "Event", title: "Upacara Hari PMI Nasional", date: "Apr 2025" },
  { id: 5, src: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=800&h=600&fit=crop", cat: "PMR", title: "Jumbara PMR Jawa Timur 2025", date: "Mei 2025" },
  { id: 6, src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&h=600&fit=crop", cat: "Kemanusiaan", title: "Distribusi Bantuan Korban Kebakaran", date: "Mei 2025" },
  { id: 7, src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop", cat: "Event", title: "Peluncuran Platform Digital PMI", date: "Jun 2025" },
  { id: 8, src: "https://images.unsplash.com/photo-1584118624012-df056829fbd0?w=800&h=600&fit=crop", cat: "Relawan", title: "Tim Relawan Siaga Bencana", date: "Apr 2025" },
  { id: 9, src: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop", cat: "Donor Darah", title: "Donor Darah Kampus UNIBA", date: "Apr 2025" },
];

export default function GaleriPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [lightbox, setLightbox] = useState<typeof gallery[0] | null>(null);

  const filtered = activeCategory === "Semua" ? gallery : gallery.filter((g) => g.cat === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 py-14">
        <div className="container-site text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full mb-5">
              <Camera size={12} /> Galeri Kegiatan
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Galeri Kegiatan PMI Sumenep
            </h1>
            <p className="text-gray-300 max-w-md mx-auto">
              Dokumentasi aksi nyata kemanusiaan dan kesehatan PMI Kabupaten Sumenep
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-10">
        {/* Filter */}
        <div className="flex gap-2 flex-wrap mb-8 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat ? "bg-pmi-red text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-2xl"
              onClick={() => setLightbox(item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={800}
                height={600}
                className="w-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-xs font-bold text-red-300 uppercase tracking-wider">{item.cat}</span>
                  <p className="text-white text-sm font-semibold mt-0.5">{item.title}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <ZoomIn size={14} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors">
            <X size={20} />
          </button>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={800}
              height={600}
              className="w-full rounded-2xl object-cover"
            />
            <div className="text-center mt-4">
              <span className="text-red-400 text-xs font-bold uppercase tracking-wider">{lightbox.cat}</span>
              <p className="text-white font-semibold mt-1">{lightbox.title}</p>
              <p className="text-gray-400 text-sm">{lightbox.date}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
