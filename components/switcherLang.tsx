"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";


export function SwitcherLanguage() {
 const { locale } = useRouter()
 const { pathname,push } = useRouter()
 const defaultLocale =  locale === "fr" ? "fr" : "en"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
            {defaultLocale?.toUpperCase()}  
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => push(pathname, pathname, { locale: 'fr' })}>
          {locale === "fr" ? "Francais" : "French"}
          
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push(pathname, pathname, { locale: 'en' })}>
          {locale === "fr" ? "Englais" : "English"}
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
