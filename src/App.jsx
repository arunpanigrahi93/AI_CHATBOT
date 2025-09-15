// App.jsx
import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <div className="chatbot-container">
        {/* Chatbot Toggle Button */}
        {!isOpen && (
          <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
            <ChatbotIcon />
          </button>
        )}

        {/* Chatbot Window */}
        {isOpen && (
          <div className="chatbot-popup">
            {/* Header */}
            <div className="chat-header">
              <div className="header-info">
                <ChatbotIcon />
                <h2 className="logo-text">Chatbot</h2>
              </div>
              <button
                id="toggle-chatbot"
                className="material-symbols-rounded"
                onClick={() => setIsOpen(false)}
              >
                keyboard_arrow_down
              </button>
            </div>

            {/* Body */}
            <div className="chat-body">
              <div className="message bot-message">
                <div className="bot-avatar">
                  <ChatbotIcon />
                </div>
                <div className="message-text">
                  👋 Hey there! <br /> How can I help you today?
                </div>
              </div>

              <div className="message user-message">
                <div className="message-text">
                  Lorem ipsum dolor sit amet consectetur.
                </div>
              </div>

              <div className="message bot-message">
                <div className="bot-avatar">
                  <ChatbotIcon />
                </div>
                <div className="message-text">
                  <div className="thinking-indicator">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="chat-footer">
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
                  <button type="button" className="material-symbols-outlined">
                    sentiment_satisfied
                  </button>
                  <button type="button" className="material-symbols-outlined">
                    attach_file
                  </button>

                  {/* Show send button only if message is typed */}
                  {message.trim() && (
                    <button type="submit" className="material-symbols-outlined">
                      arrow_upward
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
