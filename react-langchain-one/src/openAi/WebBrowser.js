import { SerpAPI } from "langchain/tools";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { chatModel } from "./model";

const sherpAPIKey = process.env.REACT_APP_SCALE_SERP_API_KEY;

const tools = [
  new SerpAPI(sherpAPIKey, {
    location: "Denver, Colorado, United States",
    hl: "en",
    gl: "us",
  }),
];
const chat = chatModel;

const executor = await initializeAgentExecutorWithOptions(tools, chat, {
  agentType: "openai-functions",
  verbose: true,
});

export const WebBrowserModel = async (input) => {
  const result = await executor.run(input);
  return result;
};
