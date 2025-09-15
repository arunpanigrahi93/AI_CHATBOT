import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  return (
    <div
      className={`message ${chat.role === "model" ? "bot" : "user"}-message`}
    >
      {chat.role === "model" && (
        <div className="bot-avatar">
          <ChatbotIcon />
        </div>
      )}
      <p className="message-text">{chat.text}</p>
    </div>
  );
};

export default ChatMessage;
