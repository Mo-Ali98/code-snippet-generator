import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);
const basePromptPrefix =
  "I want you to provide me code based on the following description: ";

const generateAction = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.body.userInput) {
    return new Response("No description in the request", { status: 400 });
  }

  const chatCompletion = await openAI.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a Software Engineer",
      },
      {
        role: "user",
        content: `${basePromptPrefix}${req.body.userInput}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = chatCompletion.data.choices[0].message?.content;

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
