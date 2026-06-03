import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <div className="text-8xl font-black text-gray-100 mb-4">404</div>
        <div className="w-16 h-16 rounded-2xl bg-pmi-red flex items-center justify-center mx-auto mb-5">
          <Search size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Halaman Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Halaman yang Anda cari tidak ada atau telah dipindahkan. Kembali ke halaman utama.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={15} /> Ke Beranda
          </Link>
          <Link href="/edukasi" className="btn-secondary">
            <ArrowLeft size={15} /> Edukasi Kesehatan
          </Link>
        </div>
      </div>
    </div>
  );
}
