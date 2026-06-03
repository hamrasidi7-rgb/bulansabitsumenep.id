"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/",               label: "Beranda",       exact: true },
  { href: "/berita",         label: "Berita" },
  { href: "/edukasi",        label: "Edukasi" },
  { href: "/donor-darah",    label: "Donor Darah" },
  { href: "/kemanusiaan",    label: "Kemanusiaan" },
  { href: "/relawan",        label: "Relawan" },
  { href: "/dokter-menulis", label: "Dokter Menulis" },
  { href: "/galeri",         label: "Galeri" },
  { href: "/tentang",        label: "Tentang" },
  { href: "/kontak",         label: "Kontak" },
];

export default function SecondaryNav() {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="bg-white border-b border-gray-100 overflow-x-auto scrollbar-hide">
      <div className="container-site">
        <nav className="flex items-center gap-0 w-max min-w-full">
          {menuItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex-shrink-0 px-4 py-2.5 text-[12.5px] font-medium whitespace-nowrap transition-colors duration-150",
                  active
                    ? "text-pmi-red"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                {item.label}
                {/* Active underline */}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-pmi-red" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
