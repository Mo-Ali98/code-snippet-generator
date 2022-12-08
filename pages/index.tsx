import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState<String>("");
  const [isGenerating, setIsGenerating] = useState<Boolean>(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

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
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  const onUserChangedText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
    setUserInput(e.target.value);
  };

  const renderOuput = () => {
    if (!apiOutput) return null;

    return (
      <div className="output">
        <div className="output-header-container">
          <div className="output-header">
            <h3>Output</h3>
          </div>
        </div>
        <div className="output-content">
          <p>{apiOutput}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate a story!</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Input prompts such as character, settings and plot, and we will
              generate a story for you!
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder={
              "Example:\nMohamed: A kid with powers\nSetting: a poor, broken kingdom that's been destroyed by Furqan.\nFurqan: the villain of the story, he's a mysterious figure with crazy powers.\nPlot: Farza wants to beat Furqan and take the kingdom back.\nStory:"
            }
            value={userInput}
            onChange={(e) => onUserChangedText(e)}
          />

          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
              }
              onClick={callGenerateEndpoint}
            >
              <div className="generate">
                {isGenerating ? (
                  <span className="loader"></span>
                ) : (
                  <p>Generate</p>
                )}
              </div>
            </a>
          </div>

          {renderOuput()}
        </div>
      </div>
    </div>
  );
};

export default Home;
