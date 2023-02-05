import Head from "next/head";
import React, { ReactNode, useEffect } from "react";
import { Result } from "../interfaces/results";

interface AppContext {
  storedResults: Result[];
  setStoredResults: React.Dispatch<React.SetStateAction<Result[]>>;
}
const AppContext = React.createContext<AppContext | null>(null);

interface AppContextProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppContextProps> = ({ children }) => {
  const [storedResults, setStoredResults] = React.useState<Result[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("generate-code-results") || "[]"
    );
    if (data) {
      setStoredResults(data);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        storedResults,
        setStoredResults,
      }}
    >
      <Head>
        <title>Generate Code!</title>

        <meta
          property="og:title"
          content="Generate code snippets!"
          key="title"
        />
        <meta
          property="og:description"
          key="description"
          content="Generate code snippets using AI!"
        />
        <meta
          property="og:image"
          content="https://my-gpt3-writer.vercel.app/api/og"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContext => {
  const context = React.useContext(AppContext);

  if (context === null) {
    throw new Error("useApp must be used within a AppProvider");
  }

  return context;
};
