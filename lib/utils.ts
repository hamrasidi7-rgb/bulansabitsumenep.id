import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export const BLOOD_TYPES = ["A", "B", "AB", "O"] as const;
export type BloodType = (typeof BLOOD_TYPES)[number];

export const BLOOD_STATUS = {
  normal: { label: "Normal", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" },
  menipis: { label: "Menipis", color: "text-yellow-600", bg: "bg-yellow-50", border: "border-yellow-200" },
  prioritas: { label: "Prioritas", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
} as const;

export const ARTICLE_CATEGORIES = [
  { id: "kesehatan-anak", label: "Kesehatan Anak", color: "bg-blue-50 text-blue-700", icon: "👶" },
  { id: "penyakit-menular", label: "Penyakit Menular", color: "bg-orange-50 text-orange-700", icon: "🦠" },
  { id: "penyakit-tidak-menular", label: "Penyakit Tidak Menular", color: "bg-purple-50 text-purple-700", icon: "💊" },
  { id: "gizi", label: "Gizi & Nutrisi", color: "bg-green-50 text-green-700", icon: "🥗" },
  { id: "lansia", label: "Kesehatan Lansia", color: "bg-pink-50 text-pink-700", icon: "👴" },
  { id: "kesehatan-mental", label: "Kesehatan Mental", color: "bg-teal-50 text-teal-700", icon: "🧠" },
  { id: "pertolongan-pertama", label: "Pertolongan Pertama", color: "bg-red-50 text-red-700", icon: "🩺" },
  { id: "kesehatan-wanita", label: "Kesehatan Wanita", color: "bg-rose-50 text-rose-700", icon: "👩‍⚕️" },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/edukasi", label: "Edukasi Kesehatan" },
  { href: "/dokter-menulis", label: "Dokter Menulis" },
  { href: "/donor-darah", label: "Donor Darah" },
  { href: "/kemanusiaan", label: "Kemanusiaan" },
  { href: "/relawan", label: "Relawan" },
  { href: "/berita", label: "Berita Kesehatan" },
  { href: "/galeri", label: "Galeri" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
] as const;
