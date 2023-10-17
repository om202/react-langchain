import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const defaultModel = new OpenAI({
  modelName: "gpt-4",
  openAIApiKey: apiKey,
});

const gptModel35 = new OpenAI({
  openAIApiKey: apiKey,
  modelName: "gpt-3.5-turbo",
  temperature: 0,
});

const chatModel = new ChatOpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9,
  cache: true,
  maxTokens: 1000,
  maxRetries: 2,
  maxConcurrency: 2,
});

const openAIEmbeddings = new OpenAIEmbeddings({ openAIApiKey: apiKey });

export { defaultModel, gptModel35, chatModel, openAIEmbeddings };
