import React from "react";
import ChatbotIcon from "./components/ChatbotIcon";

const App = () => {
  return (
    <div className="container">
      {/* chatbot header */}
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Chatbot</h2>
          </div>
          <button className="material-symbols-rounded">
            keyboard_arrow_down
          </button>
        </div>
      </div>

      {/* chatbot body */}
      <div className="chat-body">
        <div className="message bot-message">
          <ChatbotIcon />
          <div className="message-text">
            Hey there <br /> How can I help you today
          </div>
        </div>
        <div className="message user-message">
          <div className="message-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            itaque.
          </div>
        </div>
      </div>

      {/* chatbot footer */}
      <div className="chat-footer">
        <form action="#" className="chat-form">
          <textarea
            placeholder="Message..."
            className="message-input"
          ></textarea>
          <div className="chat-controls">
            <button type="button" className="material-symbols-outlined">
              sentiment_satisfied
            </button>
            <button type="button" className="material-symbols-outlined">
              attach_file
            </button>
            <button type="submit" className="material-symbols-outlined">
              arrow_upward
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
