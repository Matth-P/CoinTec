import React, { useState } from "react";
import axios from "axios";
import ChatBubble from "./Chatbubble";
import { FaMicrophone, FaStop } from "react-icons/fa"; // Usando react-icons para ícones

const Chatbot = () => {
    const [chat, setChat] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const API_KEY = "AIzaSyDhV4YJWcEL9aka8Fi86b8FzHyBGx6FuCY";

    const handleUserInput = async () => {
        let updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];

        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
                {
                    contents: updatedChat,
                }
            );

            const modelResponse =
                response.data?.candidates[0]?.content?.parts[0].text || "";

            if (modelResponse) {
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];

                setChat(updatedChatWithModel);
                setUserInput("");
            }
        } catch (error) {
            console.error("Erro ao chamar a IA:", error);
            setError("Um erro ocorreu. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleSpeech = (text) => {
        if (isSpeaking) {
            stopSpeech();
            setIsSpeaking(false);
        } else {
            speak(text);
            setIsSpeaking(true);
        }
    };

    const stopSpeech = () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };

    const speak = (text) => {
        if (window.speechSynthesis) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Coinbot</h1>
            <div className="chat-container">
                {chat.map((item, index) => (
                    <ChatBubble
                        key={index}
                        role={item.role}
                        text={item.parts[0].text}
                        onSpeech={() => handleSpeech(item.parts[0].text)}
                    />
                ))}
            </div>
            <div className="input-container">
                <input
                    className="input"
                    placeholder="Faça sua pergunta..."
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button className="button" onClick={handleUserInput}>
                    Enviar
                </button>
            </div>
            {loading && <div className="loading">Carregando...</div>}
            {error && <div className="error">{error}</div>}
            <button
                className="microphone-button"
                onClick={() => handleSpeech(userInput)}
            >
                {isSpeaking ? <FaStop /> : <FaMicrophone />}
            </button>
        </div>
    );
};

export default Chatbot;