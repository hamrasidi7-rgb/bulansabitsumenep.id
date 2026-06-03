"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { cn, NAV_LINKS } from "@/lib/utils";

const dropdownMenus: Record<string, { href: string; label: string; desc: string }[]> = {
  "Edukasi Kesehatan": [
    { href: "/edukasi/kesehatan-anak", label: "Kesehatan Anak", desc: "Tumbuh kembang & imunisasi" },
    { href: "/edukasi/penyakit-menular", label: "Penyakit Menular", desc: "Pencegahan & penanganan" },
    { href: "/edukasi/gizi", label: "Gizi & Nutrisi", desc: "Pola makan sehat" },
    { href: "/edukasi/kesehatan-mental", label: "Kesehatan Mental", desc: "Kesehatan jiwa & psikologi" },
    { href: "/edukasi/pertolongan-pertama", label: "Pertolongan Pertama", desc: "Panduan P3K dasar" },
    { href: "/edukasi", label: "Lihat Semua →", desc: "" },
  ],
  "Donor Darah": [
    { href: "/donor-darah/jadwal", label: "Jadwal Donor", desc: "Agenda donor darah terdekat" },
    { href: "/donor-darah/stok", label: "Stok Darah", desc: "Ketersediaan darah real-time" },
    { href: "/donor-darah/edukasi", label: "Edukasi Donor", desc: "Manfaat & syarat donor" },
  ],
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-pmi-red text-white text-xs py-1.5 hidden md:block">
        <div className="container-site flex justify-between items-center">
          <span className="flex items-center gap-2 opacity-90">
            <Phone size={11} />
            Hotline PMI Sumenep: <strong>(0328) 671-XXX</strong>
          </span>
          <span className="opacity-90">
            Edukasi Kesehatan · Aksi Kemanusiaan · Kabupaten Sumenep
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-white border-b border-gray-100"
        )}
      >
        <div className="container-site px-4">
          <div className="flex items-center justify-between h-[60px] sm:h-[68px] md:h-[72px]">

            {/* ── LOGO AREA ── */}
            <Link href="/" className="flex items-center flex-shrink-0">

              {/* Logo brand baru — satu gambar (ikon + bulansabit + sumenep) */}
              <div className="relative h-9 sm:h-10 md:h-11 flex-shrink-0"
                   style={{ aspectRatio: "3.2/1" }}>
                <Image
                  src="/logo-brand.jpg"
                  alt="bulansabit sumenep"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>

              {/* Separator */}
              <div className="w-px h-9 bg-gray-300 mx-3 sm:mx-4 md:mx-5 flex-shrink-0" />

              {/* PMI logo */}
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 flex-shrink-0">
                <Image
                  src="/logo-pmi.jpg"
                  alt="Palang Merah Indonesia"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* PMI text */}
              <div className="leading-none ml-2">
                <div className="text-gray-700 font-semibold text-[10px] sm:text-[11px] md:text-xs leading-tight">
                  Palang Merah
                </div>
                <div className="text-gray-700 font-semibold text-[10px] sm:text-[11px] md:text-xs leading-tight">
                  Indonesia
                </div>
              </div>

            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.slice(0, 7).map((link) => {
                const hasDropdown = link.label in dropdownMenus;
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname.startsWith(link.href));

                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => hasDropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "text-pmi-red bg-red-50"
                          : "text-gray-600 hover:text-pmi-red hover:bg-red-50"
                      )}
                    >
                      {link.label}
                      {hasDropdown && (
                        <ChevronDown size={12} className="opacity-50" />
                      )}
                    </Link>

                    {/* Dropdown */}
                    {hasDropdown && activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
                        {dropdownMenus[link.label].map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-3 py-2.5 rounded-xl hover:bg-red-50 group transition-colors"
                          >
                            <div className="text-sm font-medium text-gray-800 group-hover:text-pmi-red">
                              {item.label}
                            </div>
                            {item.desc && (
                              <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ── RIGHT SIDE ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/donor-darah"
                className="hidden md:inline-flex btn-primary text-xs py-2 px-4"
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                Donor Darah
              </Link>

              {/* Hamburger — lg:hidden, tampil jelas di mobile */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors text-gray-800"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
            <div className="container-site py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-pmi-red bg-red-50"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {/* PMI info on mobile menu */}
              <div className="flex items-center gap-2.5 px-4 py-3 mt-2 border-t border-gray-100">
                <div className="relative h-7 w-7 flex-shrink-0">
                  <Image src="/logo-pmi.jpg" alt="PMI" fill className="object-contain" />
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  Palang Merah Indonesia — Kab. Sumenep
                </span>
              </div>

              <div className="pt-1 pb-1">
                <Link
                  href="/donor-darah"
                  className="btn-primary w-full justify-center text-sm"
                >
                  Daftar Donor Darah
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
