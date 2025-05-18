import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(bgRef.current, {
      backgroundPosition: "200% 50%",
      duration: 20,
      ease: "linear",
    });
  }, []);

  return (
    <div
      ref={bgRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
        width: "100vw",
        height: "100vh",
        background: `
          linear-gradient(-45deg,
          #0f0c29,
          #302b63,
          #24243e,
          #1c1c2e)`,
        backgroundSize: "400% 400%",
        transition: "opacity 1s ease-in-out",
      }}
    />
  );
}
