import { useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { gsap } from "gsap";
import SafeFormattedMessage from "../SafeFormattedMessage/SafeFormattedMessage";

type ScrollDownProps = {
  targetId: string;
};

const ScrollDown = ({ targetId }: ScrollDownProps) => {
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(iconRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 0.8,
    });
  }, []);

  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target.offsetTop, autoKill: true },
        ease: "power2.out",
      });
    }
  };

  return (
    <Box textAlign="center" mt={4}>
      <IconButton onClick={scrollToTarget} ref={iconRef} sx={{ color: "white" }}>
        <KeyboardArrowDownIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default ScrollDown;
