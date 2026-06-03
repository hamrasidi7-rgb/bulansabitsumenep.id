"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Instagram, Facebook } from "lucide-react";

export default function KontakPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 to-red-950 py-14">
        <div className="container-site text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Hubungi Kami</h1>
            <p className="text-gray-300 max-w-md mx-auto">
              Tim PMI Sumenep siap membantu Anda. Kami merespons setiap pesan dalam 1x24 jam.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <h2 className="text-xl font-bold text-gray-900 mb-5">Informasi Kontak</h2>

              {[
                {
                  icon: MapPin, title: "Alamat",
                  lines: ["Jl. Dr. Cipto Mangunkusumo No. XX", "Sumenep, Jawa Timur 69400"],
                  color: "text-pmi-red bg-red-50",
                },
                {
                  icon: Phone, title: "Telepon",
                  lines: ["(0328) 671-XXX", "Hotline 24 Jam untuk Darurat"],
                  color: "text-blue-600 bg-blue-50",
                },
                {
                  icon: Mail, title: "Email",
                  lines: ["info@bulansabitsumenep.id", "pmi.sumenep@pmi.or.id"],
                  color: "text-green-600 bg-green-50",
                },
                {
                  icon: Clock, title: "Jam Operasional",
                  lines: ["Senin-Jumat: 08:00-16:00", "Sabtu: 08:00-13:00"],
                  color: "text-purple-600 bg-purple-50",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-card transition-all">
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={17} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm mb-0.5">{item.title}</div>
                      {item.lines.map((l) => (
                        <div key={l} className="text-gray-500 text-xs">{l}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Social media */}
            <div className="p-5 bg-gray-50 rounded-2xl">
              <div className="font-semibold text-gray-800 text-sm mb-3">Media Sosial</div>
              <div className="space-y-3">
                {[
                  { icon: Instagram, label: "@pmi.sumenep", href: "#", color: "text-pink-600" },
                  { icon: Facebook, label: "PMI Kabupaten Sumenep", href: "#", color: "text-blue-600" },
                  { icon: MessageCircle, label: "WhatsApp: 0812-XXXX-XXXX", href: "#", color: "text-green-600" },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a key={s.label} href={s.href} className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors group">
                      <Icon size={16} className={s.color} />
                      <span className="group-hover:underline">{s.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-card">
                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Send size={28} className="text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Pesan Terkirim!</h3>
                    <p className="text-gray-500">Tim kami akan merespons dalam 1x24 jam. Terima kasih telah menghubungi PMI Sumenep.</p>
                    <button onClick={() => setSent(false)} className="mt-6 btn-outline-red text-sm py-2.5">
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                          <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="Nama Anda"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                          <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="email@anda.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Subjek *</label>
                        <select
                          required
                          className="input-field"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        >
                          <option value="">Pilih subjek...</option>
                          <option>Informasi Donor Darah</option>
                          <option>Pendaftaran Relawan</option>
                          <option>Edukasi Kesehatan</option>
                          <option>Laporan Kedaruratan</option>
                          <option>Kerja Sama</option>
                          <option>Lainnya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Pesan *</label>
                        <textarea
                          rows={5}
                          required
                          className="input-field resize-none"
                          placeholder="Tuliskan pesan Anda di sini..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>
                      <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
                        <Send size={16} /> Kirim Pesan
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
