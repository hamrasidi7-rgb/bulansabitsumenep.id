"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, Newspaper, Users, Droplets,
  Heart, BarChart2, Calendar, LogOut,
  ChevronRight, Menu, X, ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin",             label: "Ringkasan",          icon: LayoutDashboard, exact: true },
  { href: "/admin/berita",      label: "Berita Kesehatan",   icon: Newspaper },
  { href: "/admin/aksi",        label: "Aksi Kemanusiaan",   icon: Heart },
  { href: "/admin/donor",       label: "Jadwal Donor",       icon: Calendar },
  { href: "/admin/stok-darah",  label: "Stok Darah",         icon: Droplets },
  { href: "/admin/kontributor", label: "Kontributor",        icon: Users },
  { href: "/admin/statistik",   label: "Statistik",          icon: BarChart2 },
];

export default function AdminSidebar({ nama }: { nama?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href) && href !== "/admin";

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-gray-100">
        <Link href="/admin" onClick={() => setMobileOpen(false)}>
          <Image
            src="/logo-brand.jpg"
            alt="bulansabit sumenep"
            width={140}
            height={44}
            className="object-contain"
          />
        </Link>
        <p className="text-[10px] text-gray-400 mt-1 font-medium uppercase tracking-widest">
          Dashboard Admin
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact) ||
            (item.exact && pathname === "/admin");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group",
                active
                  ? "bg-pmi-red text-white shadow-glow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon size={17} className="flex-shrink-0" />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto opacity-60" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <ExternalLink size={16} />
          Lihat Website
        </Link>
        <div className="px-3 py-2.5 rounded-xl bg-gray-50">
          <p className="text-xs text-gray-400">Masuk sebagai</p>
          <p className="text-sm font-semibold text-gray-800 truncate">{nama || "Admin"}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} />
          Keluar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 xl:w-64 flex-shrink-0 flex-col bg-white border-r border-gray-100 min-h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile: top bar + drawer */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-30">
          <Link href="/admin">
            <Image src="/logo-brand.jpg" alt="Admin" width={110} height={34} className="object-contain" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Drawer overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black/40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="relative z-50 w-64 bg-white shadow-2xl h-full">
              <SidebarContent />
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
