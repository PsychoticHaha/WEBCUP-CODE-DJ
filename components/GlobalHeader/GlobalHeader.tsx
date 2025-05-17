import Link from "next/link";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import { SwitcherLanguage } from "../switcherLang";
import SafeFormattedMessage from "../SafeFormattedMessage/SafeFormattedMessage";
import { Box, Typography } from "@mui/material";

export const GlobalHeader = () => {
  const [menuState, setMenuState] = useState(false);

  return (
    <Box component="header" sx={{ background: "#000814" }}>
      <nav data-state={menuState && "active"}>
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
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

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <Box sx={{ display: "flex", gap: "10px" }} >
                <ModeToggle />
                <SwitcherLanguage />
              </Box>
              <Box className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit" sx={{
                background: "#d9d9d9",
                padding: "5px 10px",
                borderRadius: "5px"
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
            </div>
          </div>
        </div>
      </nav>
    </Box>
  );
};
