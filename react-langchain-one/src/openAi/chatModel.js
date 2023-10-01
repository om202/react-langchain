import { ChatOpenAI } from "langchain/chat_models/openai";

async function openAiChatModel(message) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const chat = new ChatOpenAI({
    openAIApiKey: apiKey,
    temperature: 0.9,
    maxTokens: 150,
    maxRetries: 2,
    maxConcurrency: 2,
  });
  return await chat.predict(message);
}

export { openAiChatModel };