import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    href: "#",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "X / Twitter",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
  {
    href: "#",
    label: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
];

const footerLinks = [
  { href: "/tentang",           label: "Tentang Kami" },
  { href: "/tentang#struktur",  label: "Manajemen & Dewan Redaksi" },
  { href: "/pedoman-media",     label: "Pedoman Media Siber" },
  { href: "/kerjasama",         label: "Periklanan & Kerjasama" },
  { href: "/faq",               label: "FAQ" },
  { href: "/kebijakan-layanan", label: "Kebijakan Layanan" },
  { href: "/privasi",           label: "Privasi Pengguna" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1e2433] text-gray-300">
      <div className="container-site py-10">

        {/* Logos */}
        <div className="flex items-center justify-center gap-4 mb-7">
          <Image
            src="/logo-bulan-sabit.jpg"
            alt="Bulan Sabit Sumenep"
            width={56}
            height={56}
            className="object-contain rounded-xl"
          />
          <div className="w-px h-10 bg-gray-600" />
          <Image
            src="/logo-pmi.jpg"
            alt="Palang Merah Indonesia"
            width={48}
            height={48}
            className="object-contain rounded-xl"
          />
        </div>

        {/* Social media */}
        <div className="flex items-center justify-center gap-3 mb-7">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-400 transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Horizontal links */}
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 mb-7">
          {footerLinks.map((link, i) => (
            <span key={link.href} className="flex items-center gap-1">
              <Link
                href={link.href}
                className="text-xs text-gray-400 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
              {i < footerLinks.length - 1 && (
                <span className="text-gray-600 text-xs select-none">•</span>
              )}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700/60 mb-6" />

        {/* Copyright */}
        <p className="text-center text-xs text-gray-500">
          Copyright © {new Date().getFullYear()} Bulan Sabit Sumenep • PMI Kabupaten Sumenep.
          All rights reserved.
        </p>

      </div>
    </footer>
  );
}
