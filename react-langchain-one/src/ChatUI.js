import React, { useState } from "react";
import "./css/ChatUI.css";
import { AiOutlineSend } from "react-icons/ai";
import { OpenAI } from "langchain/llms/openai";

async function chatModel(message) {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const llm = new OpenAI({
    openAIApiKey: apiKey,
    temperature: 0.9,
    maxTokens: 150,
    maxRetries: 2,
    maxConcurrency: 2,
  });
  return await llm.predict(message);
}

function ChatUI({ userName }) {
  const [messages, setMessages] = useState([]);
  
  const handleSendMessage = (event) => {
    event.preventDefault();
    const input = event.target.elements.message;
    const newMessage = input.value;
    chatModel(newMessage).then((response) => {
      console.log(response);
      setMessages([...messages, response]);
    });
    // setMessages([...messages, newMessage]);
    input.value = "";
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div className="message-container">
            <div className="message-sender">{userName.charAt(0)}</div>
            <div key={index} className="message">
              {message}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="send-message-form">
        <input
          type="text"
          name="message"
          placeholder="Type your message here"
        />
        <button type="submit">
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
}

export default ChatUI;
