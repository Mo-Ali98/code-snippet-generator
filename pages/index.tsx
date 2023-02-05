import classNames from "classnames";
import { useState } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { InputArea } from "../components/input-area/input-area";
import { atomOneDark, atomOneLight, CopyBlock } from "react-code-blocks";
import Select from "react-select";
import { languageOptions, LanguageOption } from "../assets/select-data";
import { useTheme } from "next-themes";
import { useApp } from "../contexts/app-context";
import { Result } from "../interfaces/results";

const Home: React.FC = () => {
  const { theme } = useTheme();
  const { setStoredResults, storedResults } = useApp();
  const [userInput, setUserInput] = useState<string>("");
  const [apiOutput, setApiOutput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [language, setLanguage] = useState<LanguageOption>(languageOptions[0]);

  const callGenerateEndpoint = async () => {
    setLoading(true);

    if (apiOutput) {
      setApiOutput("");
    }

    try {
      console.log("Calling OpenAI...");
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userInput }),
      });

      const data = await response.json();
      const { output } = data;
      const text: string = output.text;

      setApiOutput(text);

      const newResult: Result = {
        prompt: userInput.trim(),
        response: text.trim(),
      };

      const updateResults = [...storedResults, newResult];
      setStoredResults(updateResults);

      localStorage.setItem(
        "generate-code-results",
        JSON.stringify(updateResults)
      );

      setLoading(false);
    } catch (error) {
      console.error(error);
      setApiOutput("An error has occurred");
    }
  };

  const renderOutput = () => {
    if (!apiOutput) return null;

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-row justify-between min-w-full items-center">
          <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white xs:text-md">
            Output
          </h3>

          <div className="flex flex-row gap-2 items-center">
            <Select
              className="w-[150px] text-zinc-900"
              classNamePrefix="select"
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary25: "#8b5cf6",
                  primary: "#a855f7",
                },
              })}
              isSearchable={true}
              value={language}
              name="language"
              options={languageOptions}
              onChange={(e) => setLanguage(e as LanguageOption)}
            />
          </div>
        </div>

        <div className="xs:min-w-[350px] min-h-[250px] max-w-xs sm:max-w-md md:min-w-[600px] lg:min-w-[800px]">
          <CopyBlock
            text={apiOutput.trim()}
            language={language.value}
            showLineNumbers={true}
            theme={theme === "dark" ? atomOneDark : atomOneLight}
            wrapLines={true}
            codeBlock
          />
        </div>

        <button
          className={classNames(
            "bg-white text-zinc-900 border-solid border-2 border-zinc-800 font-bold py-2 px-4 rounded-md hover:text-white hover:bg-zinc-900 dark:bg-zinc-900 dark:text-white dark:border-zinc-300 dark:hover:text-zinc-900 dark:hover:bg-white dark:hover:border-zinc-900"
          )}
          onClick={() => {
            setApiOutput("");
            setUserInput("");
          }}
        >
          Generate something new!
        </button>
      </div>
    );
  };

  if (apiOutput) {
    return (
      <Container>
        <Header />
        {renderOutput()}
      </Container>
    );
  }

  const renderPrevResults = () => {
    if (!storedResults) {
      return null;
    }

    const renderResults = storedResults.map((r) => {
      return (
        <div className="flex flex-col gap-3">
          <p className="text-zinc-900 font-bold tracking-tight dark:text-white">
            {r.prompt}
          </p>
          <div className="xs:min-w-[350px] max-w-xs sm:max-w-md md:min-w-[600px] lg:min-w-[800px]">
            <CopyBlock
              text={r.response}
              language={language.value}
              showLineNumbers={true}
              theme={theme === "dark" ? atomOneDark : atomOneLight}
              wrapLines={true}
              codeBlock
            />
          </div>
        </div>
      );
    });

    return (
      <div className="flex flex-col items-center gap-5">
        <p className="text-zinc-900 text-4xl xs:text-2xl font-bold tracking-tight dark:text-white underline">
          Previous Results
        </p>
        {renderResults}
      </div>
    );
  };

  return (
    <Container>
      <Header />
      <InputArea
        currentInput={userInput}
        setInput={setUserInput}
        loading={isLoading}
        onGenerate={callGenerateEndpoint}
        disabled={isLoading}
      >
        {renderOutput()}
      </InputArea>
      {renderPrevResults()}
    </Container>
  );
};

export default Home;
