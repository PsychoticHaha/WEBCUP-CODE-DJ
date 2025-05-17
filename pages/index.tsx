import HeroSection from "@/components/hero-section";
<<<<<<< HEAD
<<<<<<< HEAD:app/page.tsx
// import Features from "@/components/features-1";
// import ContentSection from "@/components/content-1";
// import CallToAction from "@/components/call-to-action";
// import FooterSection from "@/components/footer";
=======
=======
>>>>>>> 3293ee89dddad5bbca59ea33b63f06774cd9b4a8
import Features from "@/components/features-1";
import ContentSection from "@/components/content-1";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";
import { useEmotion } from "@/hooks/useEmotion";
<<<<<<< HEAD
>>>>>>> c28f93079de9f5a47bac13f0257563f6833a7732:pages/index.tsx
=======
>>>>>>> 3293ee89dddad5bbca59ea33b63f06774cd9b4a8

export default function Home() {
  const message = useEmotion("C'est un test de message pour générer une émotion avec OpenAI.");
  return (
    <>
      <h1>Emotion: {message}</h1>
      <HeroSection />
<<<<<<< HEAD
      {/* <Features />
      <ContentSection />
      <CallToAction />
      <FooterSection /> */}
=======
      <Features />
      <ContentSection />
      <CallToAction />
      <FooterSection />
>>>>>>> 3293ee89dddad5bbca59ea33b63f06774cd9b4a8
    </>
  );
}
