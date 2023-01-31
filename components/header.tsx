import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-3 gap-4 flex-nowrap text-center">
      <h1 className="text-zinc-900 text-7xl font-bold tracking-tight dark:text-white">
        Generate a code snippet!
      </h1>
      <p className="text-zinc-500 text-xl font-normal">
        Input a prompt describing a code snippet!
      </p>
    </div>
  );
};
