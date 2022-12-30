import classNames from "classnames";
import { useState } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { InputArea } from "../components/input-area/input-area";
import { CopyBlock, dracula } from "react-code-blocks";
import Select from "react-select";
import { languageOptions, LanguageOption } from "../assets/select-data";

const Home: React.FC = () => {
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

      console.log("OpenAI replied...", text);

      setApiOutput(text);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setApiOutput("An error has occured");
    }
  };

  const renderOuput = () => {
    if (!apiOutput) return null;

    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex flex-row justify-between min-w-full">
          <h3 className="text-white text-2xl font-bold tracking-tight">
            Output
          </h3>

          <Select
            className="w-[150px]"
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

        <div className="xs:min-w-[350px] min-h-[250px] md:min-w-[600px] lg:min-w-[700px]">
          <CopyBlock
            text={apiOutput}
            language={language.value}
            showLineNumbers={true}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>

        <button
          className={classNames(
            "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded my-3"
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

        {renderOuput()}
      </Container>
    );
  }

  return (
    <Container>
      <Header />
      <InputArea
        currentInput={userInput}
        setInput={setUserInput}
        loading={isLoading}
        onGenerate={callGenerateEndpoint}
      >
        {renderOuput()}
      </InputArea>
    </Container>
  );
};

export default Home;
