import React, { useEffect, useRef, useState } from "react";

import { AiOutlineSend, AiOutlineFileAdd } from "react-icons/ai";

import LoadingSpinner from "../LoadingSpinner";
import { openAiChatModelWindowMemory } from "../../openAi/memoryModels";

import "../../css/ChatUI.css";
import { openAiDocumentModel } from "../../openAi/documentModel";
import ChatUserIcon from "./ChatUserIcon";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";

function ChatUI({ userName }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef();
  const sendMessageContainerRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    messageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    !isLoading && sendMessageContainerRef.current?.focus();
  }, [isLoading]);

  const triggerFileUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      const question = "What is the title of this document?";
      const answer = openAiDocumentModel(selectedFile, question);
      answer.then((ans) => {
        const newMessage = {
          type: "user",
          text: `Uploaded file: ${selectedFile.name} \n Dummy: Question ${question} : Answer ${ans}`,
        };
        setMessages((prevState) => [...prevState, newMessage]);
      });
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.message;
    if (!input.value) return;
    const newMessage = {
      type: "user",
      text: input.value,
    };
    setMessages((prevState) => [...prevState, newMessage]);
    setIsLoading(true);
    openAiChatModelWindowMemory(newMessage.text).then((data) => {
      const response = data.response; // sometimes data.text
      const aiResponse = {
        type: "ai",
        text: response,
      };
      setMessages((prevState) => [...prevState, aiResponse]);
      setIsLoading(false);
    });
    input.value = "";
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className="message-container"
            ref={messageContainerRef}
          >
            <ChatUserIcon type={message.type} />
            <ChatMessage message={message} index={index} />
            {message.type === "ai" && <ChatOptions text={message.text} />}
          </div>
        ))}
        {isLoading && (
          <div className="message-container">
            <ChatUserIcon type="ai" />
            <div className="message" style={{ backgroundColor: "transparent" }}>
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
      <div className="chat-ui-footer">
        <div className="forms-container">
          <form className="upload-form">
            <button
              className="button-upload"
              onClick={(e) => triggerFileUpload(e)}
            >
              <AiOutlineFileAdd />
            </button>
            <input
              onChange={(e) => handleFileUpload(e)}
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              ref={fileInputRef}
            />
          </form>
          <form onSubmit={handleSendMessage} className="send-message-form">
            <input
              ref={sendMessageContainerRef}
              disabled={isLoading}
              placeholder={isLoading ? "Thinking..." : "Ask anything!"}
              autoComplete="off"
              type="text"
              name="message"
            />
            <button type="submit">
              <AiOutlineSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
