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
            ? "nav-glass shadow-sm"
            : "bg-white/98 border-b border-gray-100"
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo area */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              {/* PMI Logo - Left */}
              <div className="relative h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                <Image
                  src="/logo-pmi.jpg"
                  alt="Logo Palang Merah Indonesia"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>

              {/* Center text */}
              <div className="hidden sm:flex flex-col items-center text-center leading-none">
                <span className="text-[10px] md:text-xs font-bold text-pmi-red tracking-widest uppercase">
                  PORTAL KESEHATAN
                </span>
                <span className="text-[10px] md:text-xs font-bold text-brand-secondary tracking-widest uppercase">
                  &amp; KEMANUSIAAN
                </span>
                <span className="text-[8px] text-gray-400 tracking-wider mt-0.5">
                  Kabupaten Sumenep
                </span>
              </div>

              {/* Bulan Sabit Logo - Right */}
              <div className="relative h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                <Image
                  src="/logo-bulan-sabit.jpg"
                  alt="Logo Bulan Sabit Sumenep"
                  fill
                  className="object-contain rounded-lg"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.slice(0, 7).map((link) => {
                const hasDropdown = link.label in dropdownMenus;
                const isActive = pathname === link.href ||
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
                      {hasDropdown && <ChevronDown size={13} className="opacity-60" />}
                    </Link>

                    {/* Dropdown */}
                    {hasDropdown && activeDropdown === link.label && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50">
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

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/donor-darah"
                className="hidden md:inline-flex btn-primary text-xs py-2 px-4"
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                Donor Darah
              </Link>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
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
              <div className="pt-3 pb-1">
                <Link href="/donor-darah" className="btn-primary w-full justify-center text-sm">
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
