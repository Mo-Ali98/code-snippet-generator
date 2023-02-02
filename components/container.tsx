import { useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container min-w-full min-h-screen bg-white dark:bg-zinc-900">
      <button
        aria-label={`Toggle ${theme} Mode`}
        type="button"
        className="absolute top-2 right-3 p-2 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <SunIcon width={28} height={28} className="text-white" />
        ) : (
          <MoonIcon width={28} height={28} className="text-zinc-900" />
        )}
      </button>
      <div className="flex flex-col items-center p-5 gap-10 flex-nowrap justify-center w-full max-w-5xl mx-auto">
        {children}
      </div>
    </div>
  );
};
