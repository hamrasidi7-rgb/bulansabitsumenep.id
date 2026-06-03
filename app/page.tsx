import type { Metadata } from "next";
import HealthTicker from "@/components/HealthTicker";
import ChannelSection from "@/components/home/ChannelSection";
import ImpactDashboard from "@/components/home/ImpactDashboard";
import BloodDonationSection from "@/components/home/BloodDonationSection";
import DoctorContributors from "@/components/home/DoctorContributors";
import VolunteerCTA from "@/components/home/VolunteerCTA";

export const metadata: Metadata = {
  title: "Beranda — Portal Kesehatan & Kemanusiaan Kabupaten Sumenep",
  description:
    "Edukasi Kesehatan, Aksi Kemanusiaan. Platform kesehatan masyarakat dan aktivitas kemanusiaan PMI Kabupaten Sumenep.",
};

export default function HomePage() {
  return (
    <>
      {/* Ticker: statistik pendonor + headline berita — hover-to-pause */}
      <HealthTicker
        newsEndpoint="/api/berita-kesehatan"
        stats={{ donors: 1248, bags: 873, month: "Juni 2026" }}
      />

      <ChannelSection />
      <ImpactDashboard />
      <BloodDonationSection />
      <DoctorContributors />
      <VolunteerCTA />
    </>
  );
}
