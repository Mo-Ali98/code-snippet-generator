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
