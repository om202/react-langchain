import { PromptTemplate } from "langchain/prompts";
import { ConversationChain, LLMChain } from "langchain/chains";
import { BufferMemory, BufferWindowMemory, ConversationSummaryMemory } from "langchain/memory";

import { gptModel35, defaultModel as model } from "./model";

const promptText = `The following is a friendly conversation between a human and an AI. 
The AI is talkative and provides lots of specific details from its context. 
If the AI does not know the answer to a question, it truthfully says it does not know.
Current conversation:
{chat_history}
Human: {input}
AI:`;

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
const prompt = PromptTemplate.fromTemplate(promptText);
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
