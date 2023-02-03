import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-3 gap-4 flex-nowrap text-center">
      <h1 className="text-zinc-900 text-7xl xs:text-5xl font-bold tracking-tight dark:text-white">
        Generate code snippets!
      </h1>
      <p className="text-zinc-800 dark:text-zinc-300 text-xl font-normal">
        Input a text describing a code snippet you want!
      </p>
    </div>
  );
};
