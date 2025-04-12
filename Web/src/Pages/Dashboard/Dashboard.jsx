import React, { useState } from "react";
import logoCoin from "../../assets/logoCoin.png"; // Importe a imagem
import Chatbot from "../../components/Chatbot/Chatbot"; // Importe o componente do chatbot
import "../Dashboard/dashboard.css"; // Importe o CSS

function Dashboard() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Estado para controlar a abertura do chatbot

  // Função para abrir/fechar o chatbot
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Contêiner da logo e texto */}
      <div className="logo-container">
        {/* Texto "Cointech" */}
        <h1 className="cointech-text">Cointech</h1>
        {/* Imagem */}
        <img src={logoCoin} alt="Logo Coin" className="logo-image" />
      </div>

      {/* Botão para abrir o chatbot */}
      <button className="chatbot-button" onClick={toggleChatbot}>
        {isChatbotOpen ? "Fechar Chatbot" : "Abrir Chatbot"}
      </button>

      {/* Janela modal do chatbot */}
      {isChatbotOpen && (
        <div className="chatbot-modal">
          <div className="chatbot-modal-content">
            <Chatbot />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;