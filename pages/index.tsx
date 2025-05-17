import HeroSection from "@/components/hero-section";
import FooterSection from "@/components/footer";
import { useEmotion } from "@/hooks/useEmotion";

export default function Home() {
  const message = useEmotion("C'est un test de message pour générer une émotion avec OpenAI.");
  return (
    <>
      <h1>Emotion: {message}</h1>
      <HeroSection />
      <FooterSection />
    </>
  );
}
