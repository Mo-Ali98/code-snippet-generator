import classNames from "classnames";
import { useState } from "react";
import { Container } from "../components/container";
import { Header } from "../components/header";
import { InputArea } from "../components/input-area";

const Home: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [apiOutput, setApiOutput] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

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
        <h3 className="text-white text-2xl font-bold tracking-tight">Output</h3>

        <p className="text-neutral-500 text-xl font-normal text-center">
          {apiOutput}
        </p>

        <button
          className={classNames(
            "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          )}
          onClick={() => {
            setApiOutput("");
            setUserInput("");
          }}
        >
          Try Again!
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
