import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Calculator } from "langchain/tools/calculator";
import { chatModel } from "./model";

const tools = [
  new Calculator(),
];
const chat = chatModel;

const executor = await initializeAgentExecutorWithOptions(tools, chat, {
  agentType: "openai-functions",
  verbose: false,
});

export const MathModel = async (input) => {
  const result = await executor.run(input);
  return result;
};
