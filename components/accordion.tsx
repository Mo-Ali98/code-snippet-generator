import React from "react";
import classNames from "classnames";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}
const AccordionContainer: React.FC<AccordionProps> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames("flex w-full flex-col", className)}>
      {children}
    </div>
  );
};

interface AccordionTabProps {
  title: string;
  titleIcon?: React.ReactElement;
  titleClassName?: string;
  contentClassName?: string;
  open?: boolean;
  titleBadge?: React.ReactElement;
  disabled?: boolean;
  children: React.ReactNode;
}
const AccordionTab: React.FC<AccordionTabProps> = ({
  title,
  titleIcon,
  titleClassName,
  contentClassName,
  open,
  titleBadge,
  disabled,
  children,
}) => {
  const [isOpen, setIsOpen] = React.useState(open);

  const chevronIcon = isOpen ? (
    <ChevronUpIcon className="h-4 w-4 shrink-0" strokeWidth="3" />
  ) : (
    <ChevronDownIcon className="h-4 w-4 shrink-0" strokeWidth="3" />
  );

  const onClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button
        className={classNames(
          "flex w-full cursor-pointer select-none items-center justify-between gap-4 rounded-t-md py-4 px-5 text-left focus-visible:border focus-visible:border-accent-1-500 border dark:text-white border-slate-400/40",
          {
            ["text-neutral-200"]: disabled,
            ["rounded-b-md"]: !isOpen,
          },
          titleClassName
        )}
        onClick={onClick}
      >
        <div className="flex flex-row items-center gap-2">
          {titleIcon}
          <p className="flex-grow font-semibold text-neutral-900 dark:text-white">
            {title}
          </p>
          {titleBadge}
        </div>
        {chevronIcon}
      </button>
      {isOpen && (
        <div
          className={classNames(
            "px-5 py-4 border-b border-x rounded-b-md border-slate-400/40",
            contentClassName
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export const Accordion = Object.assign(AccordionContainer, {
  AccordionTab,
});
