import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import ImpactDashboard from "@/components/home/ImpactDashboard";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import DoctorContributors from "@/components/home/DoctorContributors";
import HumanitarianStories from "@/components/home/HumanitarianStories";
import BloodDonationSection from "@/components/home/BloodDonationSection";
import VolunteerCTA from "@/components/home/VolunteerCTA";

export const metadata: Metadata = {
  title: "Beranda — Portal Kesehatan & Kemanusiaan Kabupaten Sumenep",
  description:
    "Edukasi Kesehatan, Aksi Kemanusiaan. Platform kesehatan masyarakat dan aktivitas kemanusiaan PMI Kabupaten Sumenep.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ImpactDashboard />
      <FeaturedArticles />
      <BloodDonationSection />
      <HumanitarianStories />
      <DoctorContributors />
      <VolunteerCTA />
    </>
  );
}
