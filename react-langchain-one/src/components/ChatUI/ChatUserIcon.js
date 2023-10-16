import React from "react";
import { GiComputerFan } from "react-icons/gi";
import { AiOutlineUser } from "react-icons/ai";
import "../../css/ChatUserIcon.css";

export default function ChatUserIcon({type}) {
  if(type === "ai") {
    return (
      <div className="message-sender message-sender-ai">
        <GiComputerFan />
      </div>
    )
  } else {
    return (
      <div className="message-sender">
        <AiOutlineUser />
      </div>
    )
  }
}