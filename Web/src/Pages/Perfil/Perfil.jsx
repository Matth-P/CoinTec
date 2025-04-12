import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";
import defaultProfile from "../../assets/profile.png"; // Importe a imagem local

const Perfil = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    firstName: "",
    lastName: "",
    email: "",
    foto: defaultProfile, // Use a imagem local como fallback
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [perfilGastos, setPerfilGastos] = useState(null); // Estado para armazenar o perfil de gastos
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar a abertura do modal
  const userId = localStorage.getItem("userId");

  // Configuração do Axios com useCallback
  const api = useCallback(() => {
    const instance = axios.create({
      baseURL: "https://9639-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  // Função para buscar os dados do usuário
  const fetchUserData = useCallback(async () => {
    try {
      const response = await api().get(`/user/${userId}`);
      const userData = response.data;
      setUsuario({
        firstName: userData.first_name, // Primeiro nome
        lastName: userData.last_name,   // Sobrenome
        email: userData.email,          // E-mail
        foto: userData.foto || defaultProfile, // Use a imagem local como fallback
      });
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
      setError(`Erro: ${err.message} - Verifique sua conexão`);
    } finally {
      setLoading(false);
    }
  }, [api, userId]);

  // Carregar os dados do usuário ao montar o componente
  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  // Função para sair (logout)
  const handleLogout = () => {
    localStorage.clear(); // Limpa todos os dados do localStorage
    navigate("/login");   // Redireciona para a página de login
  };

  // Função para classificar o perfil de gastos
  const handlePerfilGastos = async () => {
    try {
      // Busca os dados da carteira do usuário
      const response = await api().get(`/wallet/${userId}`);
      const walletData = response.data;

      // Prepara os dados para enviar à IA
      const dadosUsuario = {
        ganhos: walletData.ganhos || {
          salario: 0,
          bonus: 0,
          outros: 0,
          rendimentosPassivos: 0,
          freelas: 0,
          dividendos: 0,
        },
        despesas: walletData.despesas || {
          aluguel: 0,
          contas: 0,
          alimentacao: 0,
          transporte: 0,
          educacao: 0,
          saude: 0,
          lazer: 0,
        },
        investimentos: walletData.investimento || {
          acoes: 0,
          fundos: 0,
          criptomoedas: 0,
          imoveis: 0,
          rendafixa: 0,
          negocios: 0,
        },
      };

      // Envia os dados para a API Flask
      const iaResponse = await axios.post(
        "https://ia-8k38.onrender.com/classificar", // URL da API Flask
        dadosUsuario
      );

      // Atualiza o estado com o resultado
      setPerfilGastos(iaResponse.data);
      setModalAberto(true); // Abre o modal
    } catch (err) {
      console.error("Erro ao classificar perfil de gastos:", err);
      setError("Erro ao classificar perfil de gastos. Tente novamente.");
    }
  };

  // Fechar o modal
  const fecharModal = () => {
    setModalAberto(false);
  };

  // Exibir loading enquanto os dados são carregados
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="perfil-quadro">
        {/* Cabeçalho */}
        <h1>Perfil do Usuário</h1>

        {/* Informações do Usuário */}
        <div className="perfil-info">
          <div className="perfil-foto">
            <img
              src={usuario.foto}
              alt="Foto de Perfil"
              onError={(e) => {
                e.target.src = defaultProfile; // Fallback para imagem local
              }}
            />
          </div>
          <div className="perfil-detalhes">
            <h2>{`${usuario.firstName} ${usuario.lastName}`}</h2> {/* Nome completo */}
            <p>{usuario.email}</p>
          </div>
        </div>

        {/* Configurações */}
        <div className="perfil-configuracoes">
          <h3>Configurações</h3>
          <ul>
            <li>
              <button className="config-button" onClick={handlePerfilGastos}>
                Perfil de Gastos
              </button>
            </li>
            <li>
              <button className="config-button" onClick={handleLogout}>
                Sair
              </button>
            </li>
          </ul>
        </div>

        {/* Estatísticas (opcional) */}
        <div className="perfil-estatisticas">
          <h3>Estatísticas</h3>
          <ul>
            <li>Total de Despesas: R$ 1.500,00</li>
            <li>Total de Ganhos: R$ 3.000,00</li>
            <li>Saldo Atual: R$ 1.500,00</li>
          </ul>
        </div>
      </div>

      {/* Modal de Perfil de Gastos */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Seu Perfil de Gastos:</h3>
            {perfilGastos ? (
              <>
                <p>
                  <strong>Cluster:</strong> {perfilGastos.cluster}
                </p>
                <p>
                  <strong>Descrição:</strong> {perfilGastos.descricao}
                </p>
              </>
            ) : (
              <p>Carregando...</p>
            )}
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perfil;