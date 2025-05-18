import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type Shard = {
  id: string;
  points: string;
};

export default function GlassBreakBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  const shardCount = 30;
  const shards: Shard[] = Array.from({ length: shardCount }, (_, i) => ({
    id: `shard-${i}`,
    points: generateRandomPolygon(800, 600), // SVG dimensions
  }));

  useEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    shards.forEach((shard, i) => {
      const el = containerRef.current?.querySelector(`#${shard.id}`);
      if (!el) return;

      const randomX = gsap.utils.random(-400, 400);
      const randomY = gsap.utils.random(-300, 300);
      const scale = gsap.utils.random(0.2, 0.6);
      const rotate = gsap.utils.random(-180, 180);

      timeline.fromTo(
        el,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
        },
        {
          x: randomX,
          y: randomY,
          scale,
          rotate,
          opacity: 0,
          duration: 1.2,
          ease: "power3.inOut",
        },
        i * 0.05
      );

      timeline.to(
        el,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "+=0.3"
      );
    });

    return () => timeline.kill();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="0 0 800 600"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
      >
        {shards.map(({ id, points }) => (
          <polygon
            key={id}
            id={id}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={0.4}
            points={points}
          />
        ))}
      </svg>
    </div>
  );
}

function generateRandomPolygon(width: number, height: number): string {
  const centerX = Math.random() * width;
  const centerY = Math.random() * height;
  const radius = Math.random() * 30 + 15;
  const sides = Math.floor(Math.random() * 3) + 3; // 3 à 5 côtés

  return Array.from({ length: sides }, (_, i) => {
    const angle = (Math.PI * 2 * i) / sides;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(" ");
}
