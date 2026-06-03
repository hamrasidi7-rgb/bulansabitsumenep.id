import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SecondaryNav from "@/components/layout/SecondaryNav";
import Footer from "@/components/layout/Footer";
import AIAssistant from "@/components/ai/AIAssistant";

const BRAND = "Portal Kesehatan & Kemanusiaan Sumenep";
const SITE_URL = "https://bulansabitsumenep.id";
const OG_IMAGE = "/og-image.jpg";

export const metadata: Metadata = {
  title: {
    default: BRAND,
    template: `%s | ${BRAND}`,
  },
  description: undefined,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: BRAND,
    title: BRAND,
    description: BRAND,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: BRAND }],
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND,
    description: BRAND,
    images: [OG_IMAGE],
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
        <SecondaryNav />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <AIAssistant />
      </body>
    </html>
  );
}
