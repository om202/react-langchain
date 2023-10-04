import { OpenAI } from "langchain/llms/openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const defaultModel = new OpenAI({
  openAIApiKey: apiKey,
});

const gptModel35 = new OpenAI({
  openAIApiKey: apiKey,
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

export {
  defaultModel,
  gptModel35,
};