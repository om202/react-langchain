import { PromptTemplate } from "langchain/prompts";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BufferMemory, BufferWindowMemory, ConversationSummaryMemory } from "langchain/memory";

import { gptModel35, defaultModel as model } from "./openAiModels";
import { GENERAL_CONVERSATION_TEMPLATE } from "../templates";

// window memory
const windowMemory = new BufferWindowMemory({ k: 5 });
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
  llm: gptModel35,
});
const prompt = PromptTemplate.fromTemplate(GENERAL_CONVERSATION_TEMPLATE);
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

export {
  openAiChatModelWindowMemory,
  openAiChatModelBufferMemory,
  openAiChatModelConversationSummaryMemory,
};
