import { CopyBlock, atomOneDark, atomOneLight } from "react-code-blocks";
import { LanguageOption, languageOptions } from "./select-data";

export const formatText = (
  text: string,
  language: LanguageOption,
  resolvedTheme?: string
) => {
  const regex = /```([^`]+)```/g;
  const codeMatches = text.match(regex);
  const splitText = text.split(regex);

  if (!codeMatches) {
    return (
      <>
        <CopyBlock
          text={text}
          language={language.value}
          showLineNumbers={true}
          theme={resolvedTheme === "dark" ? atomOneDark : atomOneLight}
          wrapLines={true}
          codeBlock
        />
      </>
    );
  }

  const formattedText = splitText.map((text, index) => {
    if (codeMatches && codeMatches.includes("```" + text + "```")) {
      return (
        <>
          <CopyBlock
            text={text}
            language={language.value}
            showLineNumbers={true}
            theme={resolvedTheme === "dark" ? atomOneDark : atomOneLight}
            wrapLines={true}
            codeBlock
          />
        </>
      );
    } else {
      return (
        <>
          <br />
          <p key={index}>{text.trim()}</p>
          <br />
        </>
      );
    }
  });

  return formattedText;
};
