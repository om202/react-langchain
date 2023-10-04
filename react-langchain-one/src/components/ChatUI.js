import React, { useEffect, useRef, useState } from "react";

import { marked } from "marked";
import PropTypes from "prop-types";
import format from "string-format";
import { toast } from "react-hot-toast";

import { GiComputerFan } from "react-icons/gi";
import { AiOutlineCopy, AiOutlineSend } from "react-icons/ai";

import LoadingSpinner from "./LoadingSpinner";
import { openAiChatModelWindowMemory } from "../openAi/memoryModels";

import "../css/ChatUI.css";

ChatUI.propTypes = {
  userName: PropTypes.string.isRequired,
};

function ChatUI({ userName }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messageContainerRef = useRef();
  const sendMessageContainerRef = useRef();

  useEffect(() => {
    messageContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    !isLoading && sendMessageContainerRef.current?.focus();
  }, [isLoading]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
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
        text: format(response),
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
            {message.type === "user" ? (
              <div className="message-sender">
                <span>{userName[0]}</span>
              </div>
            ) : (
              <div className="message-sender message-sender-ai">
                <span>AI</span>
              </div>
            )}
            <div
              key={index}
              className={
                message.type === "user" ? "message" : "message message-ai"
              }
              dangerouslySetInnerHTML={{ __html: marked(message.text) }}
            />
            {message.type === "ai" && (
              <div className="message-options">
                <button
                  className="copy-button button-transparent"
                  onClick={() => copyText(message.text)}
                >
                  <AiOutlineCopy strokeWidth={10} />
                </button>
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="message-container">
            <div className="message-sender message-sender-ai">
              <GiComputerFan />
            </div>
            <div className="message" style={{ backgroundColor: "transparent" }}>
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
      <div className="chat-ui-footer">
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
  );
}

export default ChatUI;
