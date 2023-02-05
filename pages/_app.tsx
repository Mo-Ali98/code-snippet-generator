import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { AppProvider } from "../contexts/app-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </AppProvider>
  );
}
