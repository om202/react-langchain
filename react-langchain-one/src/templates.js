const DOCUMENT_QA_TEMPLATE = `Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;

const GENERAL_CONVERSATION_TEMPLATE = `The following is a friendly conversation between a human and an AI. 
The AI is talkative and provides lots of specific details from its context. 
If the AI does not know the answer to a question, it truthfully says it does not know.
Current conversation:
{chat_history}
Human: {input}
AI:`;

export { DOCUMENT_QA_TEMPLATE, GENERAL_CONVERSATION_TEMPLATE };
