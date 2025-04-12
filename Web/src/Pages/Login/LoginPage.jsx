import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [isRegistering, setIsRegistering] = useState(false); // Alternar entre Login e Cadastro
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); // Apenas para cadastro
  const [successMessage, setSuccessMessage] = useState(""); // Novo estado para o popup
  const [error, setError] = useState(""); 
  const [rememberMe, setRememberMe] = useState(false); 
  const navigate = useNavigate();

  // Alternar entre Login e Cadastro
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError(""); // Limpar erros ao alternar
  };

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [date_of_birthday, setdate_of_birthday] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");

  // Função para lidar com o login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post('https://9639-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app/auth/login', {
        email: email,
        password: password,
      });

      // Se a requisição for bem-sucedida, armazene o token e o userId
      console.log('Login bem-sucedido:', response.data);
      const token = response.data.token; // Token retornado pela API
      const userId = response.data.id; // userId retornado pela API

      if (!userId) {
        throw new Error("userId não foi retornado pelo servidor.");
      }

      localStorage.setItem('token', token); // Armazena o token no localStorage
      localStorage.setItem('userId', userId); // Armazena o userId no localStorage

      console.log("userId salvo:", userId); // Depuração

      setError(null); // Limpa qualquer erro anterior
      navigate('/dashboard'); // Redireciona para o dashboard
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Email ou senha incorretos'); // Exibe uma mensagem de erro
    }
  };

  // Função para lidar com o cadastro
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post('https://9639-2804-954-39e-e500-c4e4-fe22-a64f-8b8c.ngrok-free.app/auth/register', {
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
        cpf: cpf,
        role: "user",
        date_of_birthday: date_of_birthday
      });

      // Se a requisição for bem-sucedida, exibe uma mensagem de sucesso e redireciona
      console.log('Cadastro bem-sucedido:', response.data);
      setSuccessMessage("Cadastro realizado com sucesso! Redirecionando...");

      setTimeout(() => {
        setSuccessMessage("");
        navigate("/dashboard");
      }, 3000);

    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      switch (err.response?.data?.message) {
        case "Email já cadastrado":
          setError("Este email já está cadastrado.");
          break;
        case "Senha muito fraca":
          setError("Senha muito fraca. Use pelo menos 6 caracteres.");
          break;
        default:
          setError("Erro ao cadastrar. Tente novamente.");
          break;
      }
    }
  };

  return (
    <div className="background-Login">
      <h1 className="titulo">CoinTech</h1>

      <div className="container-container">
        <div className="container">
          <form onSubmit={isRegistering ? handleRegister : handleLogin}>
            <h1>{isRegistering ? "Cadastro" : "Login"}</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Campos de Login */}
            {!isRegistering && (
              <>
                <div className="campoLogin">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="campoSenha">
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {/* Opção "Lembrar de mim" no Login */}
                <div className="recall-forget">
                  <label>
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Lembrar de mim
                  </label>
                  <a href="#">Esqueceu a senha?</a>
                </div>
              </>
            )}

            {/* Campos de Cadastro */}
            {isRegistering && (
              <>
                <div className="campoLogin">
                  <input
                    type="text"
                    placeholder=" Nome"
                    value={first_name}
                    onChange={(e) => setfirst_name(e.target.value)}
                    required
                  />
                </div>

                <div className="campoLogin">
                  <input
                    type="text"
                    placeholder="Sobrenome"
                    value={last_name}
                    onChange={(e) => setlast_name(e.target.value)}
                    required
                  />
                </div>

                <div className="campoLogin">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="campoLogin">
                  <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={date_of_birthday}
                    onChange={(e) => setdate_of_birthday(e.target.value)}
                    required
                  />
                </div>

                <div className="campoLogin">
                  <input
                    type="tel"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="campoLogin">
                  <input
                    type="text"
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    required
                  />
                </div>

                <div className="campoSenha">
                  <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="campoSenha">
                  <input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* Botão de ação (Login ou Cadastro) */}
            <button className="botao" type="submit">
              {isRegistering ? "Cadastrar" : "Entrar"}
            </button>

            {/* Alternar entre Login e Cadastro */}
            <div className="linkcadastro">
              <p>
                {isRegistering ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
                <a href="#" onClick={(e) => { e.preventDefault(); toggleForm(); }}>
                  {isRegistering ? "Fazer Login" : "Registre-se"}
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* Popup de sucesso */}
        {successMessage && (
          <div className="popup">
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;