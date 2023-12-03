import React, { useState } from "react";
import "./ChefBot.css"; 
import ChatInterface from "../ChatInterface/ChatInterface";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`chatbot ${isOpen ? 'open' : 'close'}`}>
      <button
        className="chatbot-button"
        onClick={() => setIsOpen(prev => !prev)}
      >
        Chat
      </button>
      
      {isOpen && (
        <div className="chat-interface">
          {/* Your chat interface goes here */}
          <ChatInterface/>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
