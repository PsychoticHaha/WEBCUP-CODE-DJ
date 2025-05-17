"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import Image from "next/image";


export function SwitcherLanguage() {
  const { locale } = useRouter()
  const [mounted, setMounted] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // ou un fallback

 const { pathname,push } = router
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
          <Image src="/flag/france.svg" alt="French Flag" width={20} height={20} className="mr-2 inline-block" />
          <FormattedMessage id="french"/>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => push(pathname, pathname, { locale: 'en' })}>
           <Image src="/flag/united-states.svg" alt="French Flag" width={20} height={20} className="mr-2 inline-block" />
           <FormattedMessage id="english"/>
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => push(pathname, pathname, { locale: 'en' })}>
           <Image src="/flag/macao.svg" alt="French Flag" width={20} height={20} className="mr-2 inline-block" />
           Emotion
        </DropdownMenuItem>
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
