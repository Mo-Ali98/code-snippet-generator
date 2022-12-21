import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-3 gap-4 flex-nowrap text-center">
      <h1 className="text-white text-7xl font-bold tracking-tight">
        Generate a story!
      </h1>
      <p className="text-neutral-400 text-xl font-normal">
        Input prompts such as character, settings and plot, and we will generate
        a story for you!
      </p>
    </div>
  );
};
