import IntlProviderWrapper from "@/provider/IntlProviderWrapper";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/lib/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IntlProviderWrapper>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </IntlProviderWrapper>
  )
}
