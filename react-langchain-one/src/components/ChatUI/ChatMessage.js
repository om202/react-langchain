import { marked } from "marked";
import '../../css/ChatMessage.css';

export default function ChatMessage({ message, index }) {
  return (
    <div
      key={index}
      className={message.type === "user" ? "message" : "message message-ai"}
      dangerouslySetInnerHTML={{ __html: marked(message.text) }}
    />
  );
}
