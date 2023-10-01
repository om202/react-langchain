import React, { useState, useEffect, useRef } from "react";
import "./css/ChatUI.css";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineSend } from "react-icons/ai";
import { openAiChatModel } from "./openAi/chatModel";
import format from "string-format";
import LoadingSpinner from "./components/LoadingSpinner";
import { marked } from "marked";

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

  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.message;
    const newMessage = {
      type: "user",
      text: input.value,
    };
    setMessages((prevState) => [...prevState, newMessage]);
    setIsLoading(true);
    openAiChatModel(newMessage.text).then((response) => {
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
              <div className="message-sender">{userName.charAt(0)}</div>
            ) : (
              <div className="message-sender message-sender-ai">
                <GiComputerFan />
              </div>
            )}
            <div
              key={index}
              className="message"
              dangerouslySetInnerHTML={{ __html: marked(message.text) }}
            />
          </div>
        ))}
        {isLoading && (
          <div className="message-container">
            <div className="message-sender message-sender-ai"><GiComputerFan/></div>
            <div className="message" style={{ backgroundColor: "transparent" }}>
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
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
  );
}

export default ChatUI;
