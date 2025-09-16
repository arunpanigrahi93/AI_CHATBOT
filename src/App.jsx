// App.jsx
import React, { useState } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const GEMINI_API_BASE =
  "https://generativelanguage.googleapis.com/v1beta/models";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateBotResponse = async (history) => {
    // Get only the last user message
    const lastUserMessage = history[history.length - 1];

    const formatted = [
      {
        role: "user",
        parts: [{ text: lastUserMessage.text }],
      },
    ];

    setLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: formatted }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || "Something went wrong!");
      }

      const botMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Sorry, I couldn’t generate a response.";

      setChatHistory((prev) => [...prev, { sender: "bot", text: botMessage }]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <ChatbotIcon />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-popup">
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

          <div className="chat-body">
            <div className="message bot-message">
              <div className="bot-avatar">
                <ChatbotIcon />
              </div>
              <div className="message-text">
                👋 Hey there! <br /> How can I help you today?
              </div>
            </div>

            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {loading && (
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
            )}
          </div>

          <div className="chat-footer">
            <ChatForm
              setChatHistory={setChatHistory}
              generateBotResponse={generateBotResponse}
              chatHistory={chatHistory}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
