import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./input-area.module.scss";

interface InputAreaProps {
  currentInput: string;
  setInput: (input: string) => void;
  onGenerate: () => void;
  loading: boolean;
  children: ReactNode;
}

export const InputArea: React.FC<
  InputAreaProps & React.HTMLProps<HTMLTextAreaElement>
> = ({ setInput, currentInput, loading, onGenerate, children, ...props }) => {
  return (
    <div className={styles["prompt-container"]}>
      <textarea
        className={classNames(
          styles["prompt-textarea"],
          "text-md xs:min-w-[350px] min-h-[250px] sm:min-w-[450px] md:min-w-[600px] max-w-lg lg:min-w-[700px] xxl:min-w-[900px] rounded-xl text-zinc-900 bg-zinc-100 dark:text-white dark:bg-zinc-800 dark:focus:border-white dark:focus:border-solid dark:focus:border-[1px]"
        )}
        placeholder={
          "Example: Generate a JSX code snippet of a button that is lightly rounded and has a grey background colour"
        }
        value={currentInput}
        onChange={(e) => setInput(e.target.value)}
        {...props}
      />

      <div className={classNames(styles["prompt-buttons"])}>
        <button
          className={classNames(
            "bg-white text-zinc-900 border-solid border-2 border-zinc-800 font-bold py-2 px-4 rounded-md hover:text-white hover:bg-zinc-900 dark:bg-zinc-900 dark:text-white dark:border-zinc-300 dark:hover:text-zinc-900 dark:hover:bg-white dark:hover:border-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed"
          )}
          onClick={onGenerate}
          disabled={loading || Boolean(!currentInput)}
        >
          {loading ? (
            <span
              className={classNames(
                styles["loader"],
                "border-t-zinc-900 border-r-zinc-900 dark:border-t-white"
              )}
            ></span>
          ) : (
            <p className="font-normal">Generate</p>
          )}
        </button>
      </div>
      {children}
    </div>
  );
};
