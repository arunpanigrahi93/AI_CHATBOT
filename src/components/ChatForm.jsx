import React, { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = message.trim();
    if (!userMessage) return;

    // 1. Add user message immediately
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    setMessage(""); // clear input box

    // 2. Add bot "Thinking..." after delay
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);
      generateBotResponse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 500);
  };

  return (
    <div>
      <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Message..."
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="chat-controls">
          {/* Show send button only if message is typed */}
          {message.trim() && (
            <button type="submit" className="material-symbols-outlined">
              arrow_upward
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
