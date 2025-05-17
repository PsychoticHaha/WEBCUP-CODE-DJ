import HeroSection from "@/components/hero-section";
import Features from "@/components/features-1";
import ContentSection from "@/components/content-1";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";
import { useEmotion } from "@/hooks/useEmotion";

export default function Home() {
  const message = useEmotion("C'est un test de message pour générer une émotion avec OpenAI.");
  return (
    <>
      
      <HeroSection />
      <h1>Emotion: {message}</h1>
      {/* <Features />
      <ContentSection />
      <CallToAction />
       */}
       <FooterSection />
    </>
  );
}
