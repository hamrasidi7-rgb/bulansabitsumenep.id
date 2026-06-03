"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, AlertCircle, Minimize2, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "Apa syarat donor darah?",
  "Bagaimana gejala DBD?",
  "Cara daftar jadi relawan?",
  "Cara melakukan CPR?",
  "Stok darah hari ini?",
];

const BOT_RESPONSES: Record<string, string> = {
  default: "Terima kasih atas pertanyaannya! Saya Bulan Sabit AI, asisten kesehatan PMI Sumenep. Saya dapat membantu Anda dengan informasi donor darah, edukasi kesehatan, dan layanan PMI. Untuk kondisi medis yang serius, harap konsultasikan dengan dokter. 🏥",
  donor: "**Syarat Donor Darah PMI Sumenep:**\n\n✅ Usia 17-65 tahun\n✅ Berat badan minimal 45 kg\n✅ Tekanan darah normal (100-170/60-100)\n✅ Hemoglobin normal (≥12,5 g/dL)\n✅ Tidak sedang sakit atau minum obat\n✅ Jeda minimal 3 bulan dari donor terakhir\n\nKunjungi /donor-darah untuk jadwal lengkap! 💉",
  dbd: "**Gejala Demam Berdarah (DBD):**\n\n🌡️ Demam mendadak tinggi (>38°C) 2-7 hari\n🩸 Bintik merah di kulit (petekie)\n😣 Nyeri kepala, otot, dan sendi\n🤢 Mual dan muntah\n😰 Kelelahan ekstrem\n\n⚠️ **Segera ke dokter jika:** mimisan, gusi berdarah, sakit perut hebat.\n\n*Ini bukan diagnosis. Konsultasikan ke dokter.*",
  relawan: "**Cara Daftar Relawan PMI Sumenep:**\n\n1️⃣ Kunjungi halaman /relawan/daftar\n2️⃣ Isi formulir pendaftaran online\n3️⃣ Tunggu verifikasi 2-3 hari kerja\n4️⃣ Ikuti pelatihan P3K dasar (2 hari)\n5️⃣ Mulai bertugas!\n\nSyarat: WNI, usia 17+, sehat jasmani & rohani. Tidak dipungut biaya! 🙋",
  cpr: "**Cara Melakukan CPR Dasar:**\n\n1. **Cek kesadaran** — Panggil dan tepuk bahu korban\n2. **Minta bantuan** — Hubungi 119 atau minta orang lain menelepon\n3. **Posisi** — Baringkan korban di permukaan keras\n4. **Kompresi dada** — Tekan tengah dada 5-6 cm, 100-120x/menit\n5. **Nafas buatan** — 2 napas setelah 30 kompresi (jika terlatih)\n\n⏱️ Lakukan tanpa henti sampai bantuan tiba.\n\n*Ikuti pelatihan P3K PMI untuk praktik langsung!*",
  stok: "**Stok Darah PMI Sumenep Hari Ini:**\n\n🅰️ Gol. A — 87 kantong (Normal)\n🅱️ Gol. B — 23 kantong (Menipis)\n🆎 Gol. AB — 8 kantong (⚠️ PRIORITAS!)\n🅾️ Gol. O — 112 kantong (Normal)\n\n📞 Untuk kebutuhan darurat: (0328) 671-XXX\n🩸 Jadwal donor: /donor-darah/jadwal",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("donor") || lower.includes("darah") || lower.includes("syarat")) return BOT_RESPONSES.donor;
  if (lower.includes("dbd") || lower.includes("demam berdarah") || lower.includes("dengue")) return BOT_RESPONSES.dbd;
  if (lower.includes("relawan") || lower.includes("daftar") || lower.includes("bergabung")) return BOT_RESPONSES.relawan;
  if (lower.includes("cpr") || lower.includes("rjp") || lower.includes("jantung berhenti")) return BOT_RESPONSES.cpr;
  if (lower.includes("stok") || lower.includes("ketersediaan") || lower.includes("kantong")) return BOT_RESPONSES.stok;
  return BOT_RESPONSES.default;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Halo! Saya **Bulan Sabit AI** 🌙, asisten kesehatan PMI Sumenep.\n\nSaya siap membantu Anda dengan:\n• Informasi donor darah\n• Edukasi kesehatan umum\n• Layanan PMI Sumenep\n• Pertolongan pertama dasar\n\nApa yang ingin Anda ketahui?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    await new Promise((r) => setTimeout(r, 800 + Math.random() * 600));

    const response = getResponse(messageText);
    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMsg]);
  };

  const formatContent = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br/>");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 no-print">
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[340px] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pmi-red to-red-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Sparkles size={17} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm leading-none">Bulan Sabit AI</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-red-100 text-xs">Online</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <Minimize2 size={12} className="text-white" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                  >
                    <X size={12} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Disclaimer */}
                <div className="bg-amber-50 border-b border-amber-100 px-4 py-2 flex items-start gap-2">
                  <AlertCircle size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-amber-700 text-xs">
                    AI bukan pengganti konsultasi dokter. Untuk kondisi darurat, hubungi 119.
                  </p>
                </div>

                {/* Messages */}
                <div className="h-72 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-full bg-pmi-red flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                          <Bot size={13} className="text-white" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          msg.role === "user"
                            ? "bg-pmi-red text-white rounded-tr-sm"
                            : "bg-gray-100 text-gray-700 rounded-tl-sm"
                        }`}
                        dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                      />
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-pmi-red flex items-center justify-center flex-shrink-0">
                        <Bot size={13} className="text-white" />
                      </div>
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3.5 py-2.5 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:300ms]" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick questions */}
                <div className="px-4 pb-2">
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
                    {QUICK_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="flex-shrink-0 text-xs bg-red-50 text-pmi-red border border-red-100 px-2.5 py-1.5 rounded-full hover:bg-pmi-red hover:text-white transition-colors whitespace-nowrap"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input */}
                <div className="p-4 pt-2 border-t border-gray-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Tanya sesuatu..."
                      className="flex-1 text-xs border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-pmi-red/20 focus:border-pmi-red"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim()}
                      className="w-9 h-9 bg-pmi-red rounded-xl flex items-center justify-center text-white hover:bg-red-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="relative w-14 h-14 bg-pmi-red rounded-2xl shadow-glow flex items-center justify-center text-white hover:bg-red-800 transition-colors"
        aria-label="AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
}
