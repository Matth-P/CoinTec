import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebaseconfig"; // Certifique-se de ajustar o caminho correto
import "./registro.css"; // Certifique-se de que o arquivo CSS está no local correto

function Registro() {
  const [email, setEmail] = useState(""); // Estado para o email
  const [confirmEmail, setConfirmEmail] = useState(""); // Estado para confirmar o email
  const [senha, setSenha] = useState(""); // Estado para a senha
  const [confirmSenha, setConfirmSenha] = useState(""); // Estado para confirmar a senha
  const [error, setError] = useState(""); // Estado para mensagens de erro
  const navigate = useNavigate();

  // Função para lidar com o registro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Validações
    if (email !== confirmEmail) {
      setError("Os emails não coincidem.");
      return;
    }
    if (senha !== confirmSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    if (senha.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      // Registra o usuário no Firebase
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Cadastro realizado com sucesso!");
      navigate("/login"); // Redireciona para a tela de login
    } catch (err) {
      console.error("Erro ao registrar:", err);

      // Tratamento de erros do Firebase Authentication
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("Este email já está cadastrado. Tente fazer login.");
          break;
        case "auth/invalid-email":
          setError("Formato de email inválido. Verifique e tente novamente.");
          break;
        case "auth/weak-password":
          setError("A senha é muito fraca. Escolha uma senha mais forte.");
          break;
        default:
          setError("Erro ao cadastrar. Por favor, tente novamente mais tarde.");
          break;
      }
    }
  };

  return (
    <div className="background-register">

    <div className="container_register">
      <form onSubmit={handleRegister}>
        <h1 className="titulo">Cadastro</h1>

        {/* Exibe mensagens de erro */}
        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <div className="campoLogin_register">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            required
          />
        </div>

        <div className="campoSureLogin_register">
          <input
            type="email"
            placeholder="Confirmar Email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)} // Atualiza o estado do confirmEmail
            required
          />
        </div>

        <div className="campoSenha_register">
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
            required
          />
        </div>

        <div className="campoSureSenha_register">
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmSenha}
            onChange={(e) => setConfirmSenha(e.target.value)} // Atualiza o estado do confirmSenha
            required
          />
        </div>

        <div>
          <label className="aceiteTermos_register">
            <input type="checkbox" required /> Aceite os termos
          </label>
        </div>

        <button type="submit" className="botao_register">
          Cadastre-se
        </button>
      </form>
    </div>
    </div>
  );
}

export default Registro;
