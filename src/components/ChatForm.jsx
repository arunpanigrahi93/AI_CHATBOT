import React, { useState } from "react";

const ChatForm = () => {
  const [message, setMessage] = useState("");

  return (
    <div>
      <form
        action="#"
        className="chat-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (message.trim()) {
            console.log("Send:", message);
            setMessage("");
          }
        }}
      >
        <textarea
          placeholder="Message..."
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>

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
