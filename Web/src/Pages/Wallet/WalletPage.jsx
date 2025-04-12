import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WalletPage.css';

const WalletPage = () => {
  const navigate = useNavigate();
  const [walletData, setWalletData] = useState({
    despesas: { aluguel: 0, contas: 0, alimentacao: 0, transporte: 0, educacao: 0, saude: 0, lazer: 0 },
    ganhos: { salario: 0, bonus: 0, outros: 0, rendimentosPassivos: 0, freelas: 0, dividendos: 0 },
    investimento: { acoes: 0, imoveis: 0, criptomoedas: 0, rendafixa: 0, negocios: 0, fundos: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState(null); // Controla a seção ativa
  const userId = localStorage.getItem('userId');

  // Configuração do Axios com useCallback
  const api = useCallback(() => {
    const instance = axios.create({
      baseURL: 'https://9639-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    instance.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          localStorage.clear();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  // Função para carregar a carteira do usuário
  const loadWallet = useCallback(async () => {
    try {
      const response = await api().get(`/wallet/${userId}`);
      if (response.data) {
        setWalletData({
          despesas: response.data.despesas || { aluguel: 0, contas: 0, alimentacao: 0, transporte: 0, educacao: 0, saude: 0, lazer: 0 },
          ganhos: response.data.ganhos || { salario: 0, bonus: 0, outros: 0, rendimentosPassivos: 0, freelas: 0, dividendos: 0 },
          investimento: response.data.investimento || { acoes: 0, imoveis: 0, criptomoedas: 0, rendafixa: 0, negocios: 0, fundos: 0 }
        });
      }
    } catch (err) {
      console.error("Erro ao carregar a carteira:", err);
      setError(`Erro: ${err.message} - Verifique sua conexão`);
    } finally {
      setLoading(false);
    }
  }, [api, userId]);

  // Carregar a carteira ao montar o componente
  useEffect(() => {
    if (userId) {
      loadWallet();
    }
  }, [userId, loadWallet]);

  // Função para lidar com mudanças nos inputs
  const handleChange = (e, category) => {
    const { name, value } = e.target;
    setWalletData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: parseFloat(value) || 0
      }
    }));
  };

  // Função para salvar as alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        userId: Number(userId),
        despesas: walletData.despesas,
        ganhos: walletData.ganhos,
        investimento: walletData.investimento
      };
      await api().put('/wallet', payload);
      alert('Alterações salvas com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setError('Erro ao salvar: ' + (err.response?.data?.message || err.message));
    }
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
    <div className="wallet-page">
      {/* Lado Esquerdo - Botões */}
      <div className="sidebar">
        <button onClick={() => setActiveSection('despesas')}>Ver Despesas</button>
        <button onClick={() => setActiveSection('ganhos')}>Ver Ganhos</button>
        <button onClick={() => setActiveSection('investimento')}>Ver Investimentos</button>
      </div>

      {/* Centro à Direita - Quadro Dinâmico */}
      <div className="main-content">
        {activeSection && (
          <div className="section-container">
            <h2 className="section-title">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            <div className="input-grid">
              {Object.entries(walletData[activeSection] || {}).map(([key, value]) => (
                <div key={key} className="input-group">
                  <label className="input-label">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="number"
                    name={key}
                    value={value}
                    onChange={(e) => handleChange(e, activeSection)}
                    className="glow-input"
                  />
                </div>
              ))}
            </div>
            <button type="button" onClick={handleSubmit} className="glow-button">
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletPage;