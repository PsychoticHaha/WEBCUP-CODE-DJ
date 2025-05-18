import Link from "next/link";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { SwitcherLanguage } from "../switcherLang";
import SafeFormattedMessage from "../SafeFormattedMessage/SafeFormattedMessage";
import { Box, Typography } from "@mui/material";
import GlobalContainer from "../GlobalContainer/GlobalContainer";

export const GlobalHeader = () => {
  const [menuState, setMenuState] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box component="header" sx={{ background: "#000814", position: "fixed", top: "0", width: "100%", zIndex: "999" }}>
      <nav data-state={menuState && "active"}>
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <GlobalContainer className="relative flex flex-wrap items-center py-3 lg:py-4" sx={{ justifyContent: "space-between", }}>
            <div className="flex">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Typography variant="h5" className="text-3xl" sx={{ color: "#b71c00", fontSize: "25px", fontWeight: "bold", }}>
                  TheEnd.Page
                </Typography>
              </Link>
            </div>

            <Box className="flex gap-10" sx={{ display: { xs: "none", md: "flex" } }}>
              <Box sx={{ display: "flex", gap: "10px" }} >
                <SwitcherLanguage />
              </Box>
              <Box className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit" sx={{
                background: "#d9d9d9",
                padding: "5px 10px",
                borderRadius: "5px"
              }}>
                <Button sx={{ minWidth: "130px" }} variant="outlined">
                  <Link href="/login">
                    <SafeFormattedMessage id="globals.button.login" defaultMessage="Se connecter" />
                  </Link>
                </Button>
                <Button sx={{ minWidth: "130px", background: "#000814", color: "white", borderRadius: "15px" }} variant="contained">
                  <Link href="/register">
                    <SafeFormattedMessage id="globals.button.register" defaultMessage="S'inscrire" />
                  </Link>
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Box sx={{ display: { xs: "flex", md: "none" }, gap: "10px", marginRight: "15px" }} >
                <SwitcherLanguage />
              </Box>
              <Box className="flex gap-10" sx={{ display: { xs: "flex", md: "none", position: "relative" } }}>
                {/* create a hamburger menu */}
                <Box component="button"
                  className="relative z-50 flex h-10 w-10 items-center justify-center"
                  onClick={() => setIsOpen(!isOpen)}
                  sx={{
                    borderRadius: "5px",
                    "&:hover": {
                      background: "#d9d9d9",
                      borderRadius: "5px",
                      cursor: "pointer",
                      "& svg": {
                        stroke: "black",
                      },
                    },
                    background: isOpen ? "#d9d9d9" : "transparent",
                    "& svg": {
                        stroke: isOpen ? "black" : "white",
                      },
                  }}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </Box>

                {(isOpen) && (
                  <Box className="contents flex gap-10" sx={{ display: "flex", position: "absolute", top: "calc(100% + 15px)", flexWrap: "nowrap", right: "0", flexDirection: "column", gap: "10px", background: "#000814", padding: "0", borderRadius: "5px", border: "1px solid #d9d9d9", overflow: "hidden", width: "100%", minWidth: "fit-content" }}>
                    <Box className="flex w-full space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit" sx={{
                      background: "#d9d9d9",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      gap: "10px"
                    }}>
                      <Button sx={{ minWidth: "130px" }} variant="outlined">
                        <Link href="#">
                          <SafeFormattedMessage id="globals.button.login" defaultMessage="Se connecter" />
                        </Link>
                      </Button>
                      <Button sx={{ minWidth: "130px", background: "#000814", color: "white", borderRadius: "15px" }} variant="contained">
                        <Link href="#">
                          <SafeFormattedMessage id="globals.button.register" defaultMessage="S'inscrire" />
                        </Link>
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </GlobalContainer>
        </div>
      </nav>
    </Box>
  );
};
