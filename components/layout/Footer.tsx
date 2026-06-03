import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Phone, Mail, Instagram, Facebook, Youtube,
  Heart, Shield, Clock, ArrowRight
} from "lucide-react";

const footerLinks = {
  "Layanan": [
    { href: "/donor-darah", label: "Donor Darah" },
    { href: "/donor-darah/stok", label: "Stok Darah" },
    { href: "/relawan", label: "Daftar Relawan" },
    { href: "/kemanusiaan", label: "Aksi Kemanusiaan" },
    { href: "/kontak", label: "Hubungi Kami" },
  ],
  "Edukasi": [
    { href: "/edukasi/kesehatan-anak", label: "Kesehatan Anak" },
    { href: "/edukasi/gizi", label: "Gizi & Nutrisi" },
    { href: "/edukasi/kesehatan-mental", label: "Kesehatan Mental" },
    { href: "/edukasi/pertolongan-pertama", label: "Pertolongan Pertama" },
    { href: "/dokter-menulis", label: "Dokter Menulis" },
  ],
  "Tentang": [
    { href: "/tentang", label: "Profil PMI" },
    { href: "/tentang#sejarah", label: "Sejarah" },
    { href: "/tentang#struktur", label: "Struktur Organisasi" },
    { href: "/galeri", label: "Galeri Kegiatan" },
    { href: "/berita", label: "Berita Kesehatan" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-pmi-red to-red-900 py-10">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Jadilah Bagian dari Gerakan Kemanusiaan
            </h3>
            <p className="text-red-100 mt-1 text-sm">
              Satu tetes darah Anda dapat menyelamatkan tiga nyawa.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link
              href="/donor-darah"
              className="bg-white text-pmi-red px-6 py-3 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Heart size={15} className="fill-current" /> Donor Darah Sekarang
            </Link>
            <Link
              href="/relawan"
              className="border border-white/40 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Jadi Relawan
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              {/* Bulan Sabit logo */}
              <Image
                src="/logo-bulan-sabit.jpg"
                alt="Bulan Sabit Sumenep"
                width={44}
                height={44}
                className="object-contain flex-shrink-0"
              />
              {/* Brand name */}
              <div className="leading-none">
                <div className="text-pmi-red font-extrabold text-xl tracking-tight leading-none">
                  bulansabit
                </div>
                <div className="text-white font-extrabold text-xl tracking-tight leading-none">
                  sumenep
                </div>
              </div>
              {/* Separator */}
              <div className="w-px h-10 bg-gray-600 mx-1 flex-shrink-0" />
              {/* PMI logo + label */}
              <div className="flex items-center gap-2">
                <Image
                  src="/logo-pmi.jpg"
                  alt="PMI"
                  width={36}
                  height={36}
                  className="object-contain flex-shrink-0"
                />
                <div className="leading-none">
                  <div className="text-gray-300 font-semibold text-xs leading-tight">Palang Merah</div>
                  <div className="text-gray-300 font-semibold text-xs leading-tight">Indonesia</div>
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Platform kesehatan masyarakat dan aktivitas kemanusiaan yang
              dikelola PMI Kabupaten Sumenep. Menghadirkan edukasi kesehatan
              terpercaya dari dokter dan tenaga kesehatan.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                <Shield size={11} className="text-pmi-red" /> Terverifikasi PMI
              </span>
              <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                <Heart size={11} className="text-pmi-red" /> Review Dokter
              </span>
              <span className="flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                <Clock size={11} className="text-green-400" /> Update Real-time
              </span>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-gray-800 hover:bg-pmi-red flex items-center justify-center transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight
                        size={11}
                        className="opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0 transition-all text-pmi-red"
                      />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <MapPin size={14} className="text-pmi-red" />
              </div>
              <div>
                <div className="text-white text-xs font-medium mb-0.5">Alamat</div>
                <div className="text-gray-400 text-xs">
                  Jl. Dr. Cipto Mangunkusumo No. XX<br />
                  Sumenep, Jawa Timur 69400
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Phone size={14} className="text-pmi-red" />
              </div>
              <div>
                <div className="text-white text-xs font-medium mb-0.5">Telepon</div>
                <div className="text-gray-400 text-xs">
                  (0328) 671-XXX<br />
                  Hotline 24 Jam
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Mail size={14} className="text-pmi-red" />
              </div>
              <div>
                <div className="text-white text-xs font-medium mb-0.5">Email</div>
                <div className="text-gray-400 text-xs">
                  info@bulansabitsumenep.id<br />
                  pmi.sumenep@pmi.or.id
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} PMI Kabupaten Sumenep. Hak Cipta Dilindungi.
          </p>
          <div className="flex gap-5">
            <Link href="/privasi" className="hover:text-gray-300 transition-colors">Kebijakan Privasi</Link>
            <Link href="/syarat" className="hover:text-gray-300 transition-colors">Syarat Penggunaan</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-300 transition-colors">Sitemap</Link>
          </div>
          <p className="text-gray-600">
            <span className="text-pmi-red">♥</span> Dibuat dengan cinta untuk masyarakat Sumenep
          </p>
        </div>
      </div>
    </footer>
  );
}
