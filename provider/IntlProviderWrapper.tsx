import { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import fr from "../i18n/fr.json";
import en from "../i18n/en.json";
import { useRouter } from "next/router";

const messages = { fr, en };

export default function IntlProviderWrapper({ children }: { children: ReactNode }) {
  const { locale = "fr" } = useRouter();
  return (
    <IntlProvider locale={locale} messages={messages[locale as "fr" | "en"]}>
      {children}
    </IntlProvider>
  );
}