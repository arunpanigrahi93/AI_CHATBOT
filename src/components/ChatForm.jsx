import React, { useRef, useState } from "react";

const ChatForm = () => {
  const [message, setMessage] = useState("");
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";
    console.log(userMessage);
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
        ></input>

        <div className="chat-controls">
          {/* <button type="button" className="material-symbols-outlined">
            sentiment_satisfied
          </button>
          <button type="button" className="material-symbols-outlined">
            attach_file
          </button> */}

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
