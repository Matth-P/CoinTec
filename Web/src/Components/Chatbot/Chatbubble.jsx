import React from "react";
import { FaVolumeUp } from "react-icons/fa"; 
import './Chatbubble.css'; 

const ChatBubble = ({ role, text, onSpeech }) => {
    return (
        <div
            className={`chat-item ${role === "user" ? "user-chat-item" : "model-chat-item"}`}
        >
            <p className="chat-text">{text}</p>
            {role === "model" && (
                <button onClick={onSpeech} className="speaker-icon">
                    <FaVolumeUp size={24} color="#fff" />
                </button>
            )}
        </div>
    );
};

export default ChatBubble;