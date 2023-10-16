import React, { useEffect, useRef, useState } from "react";

import { AiOutlineSend, AiOutlineFileAdd } from "react-icons/ai";

import LoadingSpinner from "../LoadingSpinners/LoadingSpinner";
import { openAiChatModelWindowMemory } from "../../openAi/memoryModels";

import "../../css/ChatUI.css";
import {
  openAiDocumentModel,
  openAiProcessPdf,
} from "../../openAi/documentModel";
import ChatUserIcon from "./ChatUserIcon";
import ChatMessage from "./ChatMessage";
import ChatOptions from "./ChatOptions";
import LoadingSpinner2 from "../LoadingSpinners/LoadingSpinner2";

function ChatUI({ userName }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [documentProcessing, setDocumentProcessing] = useState(false);
  const [documentChain, setDocumentChain] = useState(null);

  /** Refs */
  const messageContainerRef = useRef();
  const sendMessageContainerRef = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    messageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Facing bug with android keyboard
  useEffect(() => {
    sendMessageContainerRef.current?.focus();
  }, [isLoading]); */

  const triggerFileUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    setDocumentProcessing(true);
    event.preventDefault();

    if (event.target.files) {
      const selectedFile = event.target.files[0];

      const newMessage = {
        type: "ai",
        text: `Uploaded file: ${selectedFile.name}. Document Processing...`,
      };
      setMessages((prevState) => [...prevState, newMessage]);

      openAiProcessPdf(selectedFile).then((chain) => {
        setDocumentProcessing(false);
        setDocumentChain(chain);
        const newMessage = {
          type: "ai",
          text: `Document Processing Complete!`,
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
    !documentChain
      ? openAiChatModelWindowMemory(newMessage.text).then((data) => {
          const response = data.response; // sometimes data.text
          const aiResponse = {
            type: "ai",
            text: response,
          };
          setMessages((prevState) => [...prevState, aiResponse]);
          setIsLoading(false);
        })
      : openAiDocumentModel(documentChain, newMessage.text).then((data) => {
          const response = data;
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
            style={
              message.type === "ai"
                ? { backgroundColor: "rgba(0,0,0,0.15)" }
                : null
            }
          >
            <div className="message-holder">
              <div className="message-content">
                {message.type === "user" && (
                  <ChatUserIcon type={message.type} />
                )}
                <ChatMessage message={message} index={index} />
              </div>
              {message.type === "ai" && <ChatOptions text={message.text} />}
            </div>
          </div>
        ))}
        {isLoading && (
          <div
            className="message-container"
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          >
            <div className="message-holder">
              <div className="message-content">
                <LoadingSpinner />
              </div>
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
              {isLoading ? (
                <LoadingSpinner2 />
              ) : (
                <AiOutlineSend className="sendButton" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
