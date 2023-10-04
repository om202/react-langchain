import React, { useState, useEffect, useRef } from "react";
import "./css/ChatUI.css";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineSend, AiOutlineCopy } from "react-icons/ai";
import { FcBiotech, FcEngineering } from "react-icons/fc";
import format from "string-format";
import { openAiChatModelWindowMemory } from "./openAi/chatModel";
import LoadingSpinner from "./components/LoadingSpinner";
import { marked } from "marked";
import { toast } from "react-hot-toast";

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
                <FcBiotech />
              </div>
            ) : (
              <div className="message-sender message-sender-ai">
                <FcEngineering />
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
