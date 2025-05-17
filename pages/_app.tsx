import IntlProviderWrapper from "@/provider/IntlProviderWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IntlProviderWrapper>
      <Component {...pageProps} />
    </IntlProviderWrapper>
  )
}
