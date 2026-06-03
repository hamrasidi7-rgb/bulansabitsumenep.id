import { NextResponse } from "next/server";

// Nanti diganti dengan query Supabase setelah Tahap 4
const DUMMY_HEADLINES = [
  { id: 1, judul: "PMI Sumenep Luncurkan Platform Digital Donor Darah untuk Masyarakat",        slug: "pmi-sumenep-platform-digital-donor" },
  { id: 2, judul: "Kasus DBD di Sumenep Turun 40% Berkat Program Jumantik Terpadu",             slug: "kasus-dbd-sumenep-turun-40-persen" },
  { id: 3, judul: "RSUD Sumenep Buka Klinik Gizi Terpadu Gratis untuk Balita",                  slug: "rsud-klinik-gizi-gratis-balita" },
  { id: 4, judul: "200 Relawan Baru Lulus Pelatihan P3K dan Disaster Management PMI Sumenep",   slug: "200-relawan-lulus-pelatihan-p3k" },
  { id: 5, judul: "Skrining Hipertensi Gratis Kini Tersedia di 27 Puskesmas Kabupaten Sumenep", slug: "skrining-hipertensi-gratis-27-puskesmas" },
  { id: 6, judul: "Dokter Muda Sumenep Ciptakan Alat Deteksi Stunting Berbasis AI",             slug: "alat-deteksi-stunting-ai-sumenep" },
  { id: 7, judul: "Stok Darah Golongan AB Mendesak — PMI Sumenep Buka Donor Darurat",           slug: "stok-darah-ab-donor-darurat" },
];

export async function GET() {
  return NextResponse.json(
    { headlines: DUMMY_HEADLINES },
    {
      headers: {
        "Cache-Control": "public, max-age=300, stale-while-revalidate=60",
      },
    }
  );
}
