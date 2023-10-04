import { ChatOpenAI } from "langchain/chat_models/openai";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const chat = new ChatOpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9,
  cache: true,
  maxTokens: 1000,
  maxRetries: 2,
  maxConcurrency: 2,
});

async function openAiChatModel(message) {
  return await chat.predict(message);
}

export {
  openAiChatModel,
};
