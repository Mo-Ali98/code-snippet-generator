import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./input-area.module.css";

interface InputAreaProps {
  currentInput: string;
  setInput: (input: string) => void;
  onGenerate: () => void;
  loading: boolean;
  children: ReactNode;
}

export const InputArea: React.FC<InputAreaProps> = ({
  setInput,
  currentInput,
  loading,
  onGenerate,
  children,
}) => {
  return (
    <div className={styles["prompt-container"]}>
      <textarea
        className={classNames(
          styles["prompt-textarea"],
          "text-md xs:min-w-[350px] min-h-[250px] md:min-w-[600px] lg:min-w-[700px] xxl:min-w-[900px] text-neutral-400 focus:border-neutral-400"
        )}
        placeholder={
          "Example:\nMohamed: A kid with powers\nSetting: a poor, broken kingdom that's been destroyed by Furqan.\nFurqan: the villain of the story, he's a mysterious figure with crazy powers.\nPlot: Farza wants to beat Furqan and take the kingdom back.\nStory:"
        }
        value={currentInput}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className={classNames(styles["prompt-buttons"])}>
        <button
          className={classNames(
            "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded",
            {
              ["opacity-50"]: loading,
            }
          )}
          onClick={onGenerate}
        >
          {loading ? (
            <span className={styles["loader"]}></span>
          ) : (
            <p className="text-white font-normal">Generate</p>
          )}
        </button>
      </div>

      {children}
    </div>
  );
};
