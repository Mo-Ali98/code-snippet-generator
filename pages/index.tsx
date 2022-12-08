import classNames from "classnames";
import { useState } from "react";

const Home: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [apiOutput, setApiOutput] = useState<string>("");
  const [isLoading, setLoading] = useState<Boolean>(false);

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
      </div>
    );
  };

  return (
    <div className="container mx-auto min-h-screen">
      <div className="flex flex-col items-center p-5 gap-10 flex-nowrap">
        <div className="flex flex-col items-center p-3 gap-4 flex-nowrap text-center">
          <h1 className="text-white text-7xl font-bold tracking-tight">
            Generate a story!
          </h1>
          <p className="text-neutral-400 text-xl font-normal">
            Input prompts such as character, settings and plot, and we will
            generate a story for you!
          </p>
        </div>

        <div className="prompt-container">
          <textarea
            className={classNames(
              "prompt-textarea",
              "text-md xs:min-w-[350px] min-h-[250px] md:min-w-[600px] lg:min-w-[700px] xxl:min-w-[900px] text-neutral-400 focus:border-neutral-400"
            )}
            placeholder={
              "Example:\nMohamed: A kid with powers\nSetting: a poor, broken kingdom that's been destroyed by Furqan.\nFurqan: the villain of the story, he's a mysterious figure with crazy powers.\nPlot: Farza wants to beat Furqan and take the kingdom back.\nStory:"
            }
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div className={classNames("prompt-buttons")}>
            <button
              className={classNames(
                "bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded",
                {
                  ["opacity-50"]: isLoading,
                }
              )}
              onClick={callGenerateEndpoint}
            >
              {isLoading ? (
                <span className="loader"></span>
              ) : (
                <p className="text-white font-normal">Generate</p>
              )}
            </button>
          </div>

          {renderOuput()}
        </div>
      </div>
    </div>
  );
};

export default Home;
