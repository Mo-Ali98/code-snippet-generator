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
        <title>Generate code snippets!</title>
        <meta name="description" content="Generate code snippets using AI!" />

        <meta
          property="og:url"
          content="https://generate-code-snippets.vercel.app/"
        />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Generate code snippets!" />
        <meta
          property="og:description"
          content="Generate code snippets using AI!"
        />
        <meta
          property="og:image"
          content="https://generate-code-snippets.vercel.app/api/og"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="my-gpt3-writer.vercel.app" />
        <meta
          property="twitter:url"
          content="https://generate-code-snippets.vercel.app/"
        />
        <meta name="twitter:title" content="Generate code snippets!" />
        <meta
          name="twitter:description"
          content="Generate code snippets using AI!"
        />
        <meta
          name="twitter:image"
          content="https://generate-code-snippets.vercel.app/"
        />
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
