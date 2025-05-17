import { ReactNode, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import fr from "../i18n/fr.json";
import en from "../i18n/en.json";
import { useRouter } from "next/router";

const messages = { fr, en };

export default function IntlProviderWrapper({ children }: { children: ReactNode }) {
  const router = useRouter()
  const { locale = "fr" } = router;
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // ou un fallback
  return (
    <IntlProvider locale={locale} messages={messages[locale as "fr" | "en"]}>
      {children}
    </IntlProvider>
  );
}