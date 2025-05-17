import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import ContentSection from "@/components/content-1";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <HeroSection />
      <Features />
      <ContentSection />
      <CallToAction />
      <FooterSection />
    </>
  );
}
