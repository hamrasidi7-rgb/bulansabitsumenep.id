import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bulansabitsumenep.id";

  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/edukasi", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/donor-darah", priority: 0.9, changeFrequency: "daily" as const },
    { url: "/kemanusiaan", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/relawan", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/berita", priority: 0.8, changeFrequency: "daily" as const },
    { url: "/galeri", priority: 0.6, changeFrequency: "weekly" as const },
    { url: "/dokter-menulis", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/tentang", priority: 0.6, changeFrequency: "monthly" as const },
    { url: "/kontak", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
