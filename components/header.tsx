import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-3 gap-4 flex-nowrap text-center">
      <h1 className="text-white text-7xl font-bold tracking-tight">
        Generate a code snippet!
      </h1>
      <p className="text-neutral-400 text-xl font-normal">
        Input a prompt describing a code snippet!
      </p>
    </div>
  );
};
