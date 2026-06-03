import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/ai/AIAssistant";

export const metadata: Metadata = {
  title: {
    default: "Bulan Sabit Sumenep — Portal Kesehatan & Kemanusiaan",
    template: "%s | Bulan Sabit Sumenep",
  },
  description:
    "Portal Kesehatan & Kemanusiaan Kabupaten Sumenep. Menghadirkan edukasi kesehatan terpercaya dari dokter dan tenaga kesehatan serta informasi aksi kemanusiaan untuk masyarakat.",
  keywords: [
    "PMI Sumenep",
    "donor darah Sumenep",
    "edukasi kesehatan",
    "Portal Kesehatan Sumenep",
    "kemanusiaan Sumenep",
    "relawan PMI",
    "bulan sabit merah",
    "kesehatan masyarakat",
  ],
  authors: [{ name: "PMI Kabupaten Sumenep" }],
  creator: "PMI Kabupaten Sumenep",
  publisher: "PMI Kabupaten Sumenep",
  metadataBase: new URL("https://bulansabitsumenep.id"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bulansabitsumenep.id",
    siteName: "Bulan Sabit Sumenep",
    title: "Portal Kesehatan & Kemanusiaan Kabupaten Sumenep",
    description:
      "Edukasi Kesehatan, Aksi Kemanusiaan. Platform kesehatan masyarakat dan aktivitas kemanusiaan PMI Kabupaten Sumenep.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bulan Sabit Sumenep — Portal Kesehatan & Kemanusiaan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bulan Sabit Sumenep — Portal Kesehatan & Kemanusiaan",
    description: "Edukasi Kesehatan, Aksi Kemanusiaan. PMI Kabupaten Sumenep.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#D71920",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalWebPage",
              name: "Bulan Sabit Sumenep",
              description: "Portal Kesehatan & Kemanusiaan Kabupaten Sumenep",
              url: "https://bulansabitsumenep.id",
              publisher: {
                "@type": "Organization",
                name: "PMI Kabupaten Sumenep",
                logo: {
                  "@type": "ImageObject",
                  url: "https://bulansabitsumenep.id/logo-pmi.jpg",
                },
              },
              medicalAudience: {
                "@type": "MedicalAudience",
                audienceType: "Patient",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
