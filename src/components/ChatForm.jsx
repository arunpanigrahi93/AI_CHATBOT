import React, { useRef, useState } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = message.trim();
    if (!userMessage) return;

    // Add user message
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);
    setMessage("");

    // Add placeholder "Thinking..." message
    // setChatHistory((history) => [
    //   ...history,
    //   { role: "model", text: "Thinking..." },
    // ]);

    generateBotResponse([...chatHistory, { role: "user", text: userMessage }]);
  };

  return (
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
        {message.trim() && (
          <button type="submit" className="material-symbols-outlined">
            arrow_upward
          </button>
        )}
      </div>
    </form>
  );
};

export default ChatForm;
