import React, { useState } from 'react';
import api from '../../services/api';

function LoginApi() {
    const [email, setEmail] = useState(''); // Estado para o email
    const [password, setPassword] = useState(''); // Estado para a senha
    const [error, setError] = useState(null); // Estado para armazenar erros

    const handleLogin = async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário

        try {
            // Faz a requisição POST para o endpoint de login
            const response = await api.post('/auth/login', {
                email: email,
                password: password,
            });
            
            // Se a requisição for bem-sucedida, armazene o token ou redirecione
            console.log('Login bem-sucedido:', response.data);
            const token = response.data.token; // Supondo que a API retorne um token
            localStorage.setItem('token', token); // Armazena o token no localStorage
            setError(null); // Limpa qualquer erro anterior

            // Redireciona o usuário para outra página (opcional)
            // navigate('/dashboard'); // Use useNavigate do react-router-dom
        } catch (error) {
            // Trata erros de requisição
            console.error('Erro ao fazer login:', error);
            setError('Email ou senha incorretos'); // Exibe uma mensagem de erro
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Senha:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe erros */}
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default LoginApi;