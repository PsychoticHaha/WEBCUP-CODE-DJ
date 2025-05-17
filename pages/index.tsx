import HeroSection from "@/components/hero-section";
import FooterSection from "@/components/footer";
import PageLayout from "@/components/PageLayout/PageLayout";

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <FooterSection />
    </PageLayout>
  );
}
