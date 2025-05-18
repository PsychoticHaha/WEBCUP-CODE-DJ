import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type AnimatedTitleProps = {
  title: string;
  subtitle: string;
};

export const AnimatedTitle = ({ title, subtitle }: AnimatedTitleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const words = containerRef.current.querySelectorAll(".word");
      gsap.set(words, { opacity: 0, y: 30 });

      gsap.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.08,
      });
    }
  }, []);

  const renderText = (text: string) =>
    text.split(" ").map((word, i) => (
      <span key={i} className="word" style={{ display: "inline-block", marginRight: "0.3em" }}>
        {word}
      </span>
    ));

  return (
    <Typography
      variant="h1"
      component="div"
      ref={containerRef}
      sx={{
        lineHeight: 1.5,
        fontSize: "max(5vw, 20px)",
        fontWeight: 700,
        textAlign: "center",
      }}
    >
      {renderText(title)} <br />
      {renderText(subtitle)}
    </Typography>
  );
};
