import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "langchain/schema/runnable";
import { StringOutputParser } from "langchain/schema/output_parser";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { defaultModel, openAIEmbeddings } from "./openAiModels";
import { pdfToText } from "../tools/pdfTools";
import { DOCUMENT_QA_TEMPLATE } from "../templates";

const processWithOpenAi = async (text) => {
  /** break text to chunks */
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  const serializedDocs = (docs) =>
    docs.map((doc) => doc.pageContent).join("\n\n");

  /** create vector store */
  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    openAIEmbeddings
  );
  const vectorStoreRetriever = vectorStore.asRetriever();

  /** create chain */
  const messages = [
    SystemMessagePromptTemplate.fromTemplate(DOCUMENT_QA_TEMPLATE),
    HumanMessagePromptTemplate.fromTemplate("{question}"),
  ];
  const prompt = ChatPromptTemplate.fromMessages(messages);

  const chain = RunnableSequence.from([
    {
      context: vectorStoreRetriever.pipe(serializedDocs),
      question: new RunnablePassthrough(),
    },
    prompt,
    defaultModel,
    new StringOutputParser(),
  ]);

  return chain;
};

const openAiDocumentModel = async (pdfFile, question) => {
  const text = await pdfToText(pdfFile);
  const chain = await processWithOpenAi(text);
  const answer = await chain.invoke(question);
  return answer;
};

export { openAiDocumentModel };
