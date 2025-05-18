"use client";

import * as React from "react";

import { Box, Button } from "@mui/material";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";


export function SwitcherLanguage() {
  const { locale } = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // ou un fallback

  const { pathname, push } = router
  const defaultLocale = locale === "fr" ? "fr" : "en"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outlined" sx={{ borderRadius: "1000px", overflow: "hidden", padding: "10px", height: "50px", width: "50px", background: "#d9d9d9", fontSize: "25px" }} >
          {defaultLocale?.toUpperCase() === "FR" ? "🇫🇷" : "🇬🇧"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ zIndex: 9999 }}>
        <DropdownMenuItem onClick={() => push(pathname, pathname, { locale: 'fr' })}>
          🇫🇷 <Box sx={{ minWidth: "1px", height: "100%" }}></Box>
          <FormattedMessage id="french" />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push(pathname, pathname, { locale: 'en' })}>
          🇬🇧<Box sx={{ minWidth: "1px", height: "100%" }}></Box>
          <FormattedMessage id="english" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
