import { chatModel } from "./model";

async function openAiChatModel(message) {
  return await chatModel.predict(message);
}

export {
  openAiChatModel,
};
