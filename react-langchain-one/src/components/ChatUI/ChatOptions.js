import React from "react";
import { copyText } from "../../tools/basicTools";
import { MdContentCopy } from "react-icons/md";
import "../../css/ChatOptions.css";

export default function ChatOptions({text}) {
  return (
    <div className="message-options">
      <button
        className="copy-button button-transparent"
        onClick={() => copyText(text)}
      >
        <MdContentCopy />
      </button>
    </div>
  );
}
