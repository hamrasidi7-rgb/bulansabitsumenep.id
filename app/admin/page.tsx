import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "@/components/admin/AdminShell";
import {
  Newspaper, Heart, Calendar, Droplets,
  Users, BarChart2, ArrowRight, Activity,
} from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: adminUser } = await supabase
    .from("admin_users")
    .select("nama, role")
    .eq("id", user.id)
    .single();

  if (!adminUser) redirect("/admin/login");

  // Ambil ringkasan data
  const [
    { count: totalBerita },
    { count: totalAksi },
    { count: totalDonor },
    { data: statistik },
    { data: stokDarah },
  ] = await Promise.all([
    supabase.from("berita").select("*", { count: "exact", head: true }),
    supabase.from("aksi_kemanusiaan").select("*", { count: "exact", head: true }),
    supabase.from("jadwal_donor").select("*", { count: "exact", head: true }).eq("status", "aktif"),
    supabase.from("statistik").select("*").single(),
    supabase.from("stok_darah").select("*").order("golongan"),
  ]);

  const cards = [
    { label: "Total Berita",       value: totalBerita ?? 0,      icon: Newspaper, href: "/admin/berita",      color: "bg-blue-50 text-blue-600" },
    { label: "Aksi Kemanusiaan",   value: totalAksi ?? 0,        icon: Heart,     href: "/admin/aksi",        color: "bg-orange-50 text-orange-600" },
    { label: "Jadwal Donor Aktif", value: totalDonor ?? 0,       icon: Calendar,  href: "/admin/donor",       color: "bg-green-50 text-green-600" },
    { label: "Relawan Aktif",      value: statistik?.relawan_aktif ?? 0, icon: Users, href: "/admin/statistik", color: "bg-purple-50 text-purple-600" },
  ];

  const statusStyle: Record<string, string> = {
    Normal:    "bg-green-100 text-green-700",
    Menipis:   "bg-yellow-100 text-yellow-700",
    Prioritas: "bg-red-100 text-red-700",
  };

  const quickLinks = [
    { href: "/admin/berita/baru",      label: "Tulis Berita Baru",         icon: Newspaper },
    { href: "/admin/aksi/baru",        label: "Tambah Aksi Kemanusiaan",   icon: Heart },
    { href: "/admin/donor/baru",       label: "Tambah Jadwal Donor",       icon: Calendar },
    { href: "/admin/stok-darah",       label: "Update Stok Darah",         icon: Droplets },
    { href: "/admin/kontributor/baru", label: "Tambah Kontributor",        icon: Users },
    { href: "/admin/statistik",        label: "Edit Statistik",            icon: BarChart2 },
  ];

  return (
    <AdminShell nama={adminUser.nama}>
      <div className="p-6 lg:p-8 max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat datang, {adminUser.nama} 👋
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Kelola konten Portal Kesehatan & Kemanusiaan PMI Sumenep dari sini.
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.label} href={card.href}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-card-hover transition-all hover:-translate-y-0.5">
                  <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                    <Icon size={18} />
                  </div>
                  <div className="text-2xl font-extrabold text-gray-900">{card.value}</div>
                  <div className="text-gray-500 text-sm mt-0.5">{card.label}</div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Stok darah */}
          <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 flex items-center gap-2">
                <Droplets size={16} className="text-pmi-red" /> Stok Darah
              </h2>
              <Link href="/admin/stok-darah" className="text-xs text-pmi-red hover:text-red-800 flex items-center gap-0.5">
                Edit <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-2.5">
              {stokDarah?.map((s) => (
                <div key={s.golongan} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-pmi-red font-bold text-sm">
                      {s.golongan}
                    </span>
                    <span className="text-gray-700 text-sm font-medium">{s.jumlah_kantong} kantong</span>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyle[s.status]}`}>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 text-xs text-gray-400 flex items-center gap-1">
              <Activity size={11} /> Terakhir diupdate oleh admin
            </div>
          </div>

          {/* Quick actions */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {quickLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-pmi-red hover:bg-red-50 group transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-pmi-red flex items-center justify-center transition-colors">
                      <Icon size={15} className="text-gray-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-pmi-red transition-colors">
                      {item.label}
                    </span>
                    <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-pmi-red transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
