import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);
const basePromptPrefix =
  "I want you to act as a software developer. I want you to provide some code based on the following description: ";

const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.userInput) {
    return new Response("No description in the request", { status: 400 });
  }

  const baseCompletion = await openAI.createCompletion({
    model: "text-davinci-003",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
