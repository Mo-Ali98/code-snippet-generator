import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex flex-col items-center p-5 gap-10 flex-nowrap">
        {children}
      </div>
    </div>
  );
};
