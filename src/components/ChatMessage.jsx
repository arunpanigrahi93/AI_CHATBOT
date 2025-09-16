import React from "react";
import ChatbotIcon from "./ChatbotIcon";

const ChatMessage = ({ chat }) => {
  if (chat.role === "model") {
    // Bot message
    return (
      <div className="message bot-message">
        <div className="bot-avatar">
          <ChatbotIcon />
        </div>
        <div className="message-text">{chat.text}</div>
      </div>
    );
  }

  // User message
  return (
    <div className="message user-message">
      <div className="message-text">{chat.text}</div>
    </div>
  );
};

export default ChatMessage;
