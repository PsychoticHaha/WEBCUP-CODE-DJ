import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@mui/material";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import SafeFormattedMessage from "./SafeFormattedMessage/SafeFormattedMessage";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import GlobalContainer from "./GlobalContainer/GlobalContainer";

export default function HeroSection() {
  const router = useRouter();
  const { locale } = router;
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // ou un fallback

  return (
    <>
      <Box component="main" className="" sx={{ background: "#000814", color: "white" }}>
        <GlobalContainer component="section">
          <Box className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44" sx={{ margin: "0 auto", maxWidth: "100vw", marginTop: { md: "74px", xs: "74px" } }}>
            <Box className="flex" sx={{ flexDirection: "column", padding: "0 20px", textAlign: "center" }}>
              <Typography variant="h1" className="" sx={{ lineHeight: "2", fontSize: "max(5vw, 20px)" }}>
                <SafeFormattedMessage id="globals.hero.title" /> <br />
                <SafeFormattedMessage id="globals.hero.title2" />
              </Typography>
              <Box className="" sx={{ marginTop: "20px" }}>
                <Button className="px-5 text-base" sx={{
                  marginTop: "100px",
                  padding: "10px",
                  background: "#b71c00",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "15px",
                  border: "1px solid transparent",
                  "&:hover": {
                    border: "1px solid #b71c00",
                    color: "#b71c00"
                  },
                }}>
                  <Link href="/create">
                    <span className="text-nowrap">
                      <SafeFormattedMessage id="globals.button.start"></SafeFormattedMessage>
                    </span>
                  </Link>
                </Button>
              </Box>
            </Box>
          </Box>
        </GlobalContainer>
        {/* <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Soutenu par les entreprises</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="20"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="16"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-5 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                      alt="Lemon Squeezy Logo"
                      height="20"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-4 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/laravel.svg"
                      alt="Laravel Logo"
                      height="16"
                      width="20"
                    />
                  </div>
                  <div className="flex">
                    <Image
                      className="mx-auto h-7 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/lilly.svg"
                      alt="Lilly Logo"
                      height="28"
                      width="20"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      className="mx-auto h-6 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/openai.svg"
                      alt="OpenAI Logo"
                      height="24"
                      width="20"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section> */}
      </Box>
    </>
  );
}
