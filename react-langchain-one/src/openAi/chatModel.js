import { ChatOpenAI } from "langchain/chat_models/openai";
import { OpenAI } from "langchain/llms/openai";
import {
  BufferMemory,
  BufferWindowMemory,
  ConversationSummaryMemory,
} from "langchain/memory";
import { ConversationChain, LLMChain } from "langchain/chains";
import { PromptTemplate } from "langchain/prompts";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const model = new OpenAI({
  openAIApiKey: apiKey,
});

const chat = new ChatOpenAI({
  openAIApiKey: apiKey,
  temperature: 0.9,
  cache: true,
  maxTokens: 1000,
  maxRetries: 2,
  maxConcurrency: 2,
});

// window memory
const windowMemory = new BufferWindowMemory({ k: 2 });
const windowMemoryChain = new ConversationChain({
  llm: model,
  memory: windowMemory,
});

// buffer memory
const bufferMemory = new BufferMemory();
const bufferChain = new ConversationChain({ llm: model, memory: bufferMemory });

// conversation summary memory
const memory = new ConversationSummaryMemory({
  memoryKey: "chat_history",
  llm: new OpenAI({ openAIApiKey: apiKey, modelName: "gpt-3.5-turbo", temperature: 0 }),
});
const prompt =
  PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. 
    The AI is talkative and provides lots of specific details from its context. 
    If the AI does not know the answer to a question, it truthfully says it does not know.
    Current conversation:
    {chat_history}
    Human: {input}
    AI:`);
const memoryChain = new LLMChain({ llm: model, prompt, memory: memory });

async function openAiChatModelWindowMemory(message) {
  return await windowMemoryChain.call({ input: message });
}

async function openAiChatModelBufferMemory(message) {
  return await bufferChain.call({ input: message });
}

async function openAiChatModelConversationSummaryMemory(message) {
  return await memoryChain.call({ input: message });
}

async function openAiChatModel(message) {
  return await chat.predict(message);
}

export {
  openAiChatModel,
  openAiChatModelWindowMemory,
  openAiChatModelBufferMemory,
  openAiChatModelConversationSummaryMemory,
};
