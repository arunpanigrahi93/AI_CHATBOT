// App.jsx
import React, { useState, useRef, useEffect } from "react";
import ChatbotIcon from "./components/ChatbotIcon";
import ChatForm from "./components/ChatForm";
import ChatMessage from "./components/ChatMessage";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  const generateBotResponse = async (history) => {
    const lastUserMessage = history[history.length - 1];

    const formatted = [
      {
        role: "user",
        parts: [{ text: lastUserMessage.text }],
      },
    ];

    setLoading(true);
    setChatHistory((prev) => [...prev, { role: "model", text: "Thinking..." }]);

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
      if (!response.ok)
        throw new Error(data.error?.message || "Something went wrong!");

      const botMessage =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "⚠️ Sorry, I couldn’t generate a response.";

      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: botMessage },
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text: "⚠️ Oops! Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className="chatbot-container">
      {/* Floating toggle button */}
      <button
        className="chatbot-toggle"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="material-symbols-rounded">
          {isOpen ? "close" : "mode_comment"}
        </span>
      </button>

      {/* Chat popup */}
      {isOpen && (
        <div className="chatbot-popup">
          <div className="chat-header">
            <div className="header-info">
              <ChatbotIcon />
              <h2 className="logo-text">Chatbot</h2>
            </div>
          </div>

          <div ref={chatBodyRef} className="chat-body">
            {/* Default Welcome */}
            <div className="message bot-message">
              <div className="bot-avatar">
                <ChatbotIcon />
              </div>
              <div className="message-text">
                👋 Hey there! <br /> How can I help you today?
              </div>
            </div>

            {/* Chat History */}
            {chatHistory.map((chat, index) => (
              <ChatMessage key={index} chat={chat} />
            ))}

            {/* Thinking dots */}
            {loading &&
              chatHistory.some((msg) => msg.text === "Thinking...") && (
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
