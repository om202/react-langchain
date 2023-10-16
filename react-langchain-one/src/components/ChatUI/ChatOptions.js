import React from "react";
import { copyText } from "../../tools/basicTools";
import { AiOutlineCopy } from "react-icons/ai";
import "../../css/ChatOptions.css";

export default function ChatOptions(text) {
  return (
    <div className="message-options">
      <button
        className="copy-button button-transparent"
        onClick={() => copyText(text)}
      >
        <AiOutlineCopy strokeWidth={10} />
      </button>
    </div>
  );
}
