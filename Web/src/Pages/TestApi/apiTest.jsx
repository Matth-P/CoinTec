import { useEffect, useState } from "react";
import api from "../../services/api";


function Test() {
    const [users, setUsers] = useState([]); // Estado para armazenar a lista de usuários
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros
    
    useEffect(() => {
        // Faz uma requisição GET para listar os usuários
        api.get('/users') // Endpoint da API Java para listar usuários
            .then(response => {
                setUsers(response.data); // Armazena a lista de usuários
                setLoading(false); // Define o carregamento como falso
            })
            .catch(error => {
                setError(error); // Armazena o erro, se houver
                setLoading(false); // Define o carregamento como falso
            });
    }, []);

    if (loading) return <p>Carregando usuários...</p>;
    if (error) return <p>Erro ao carregar usuários: {error.message}</p>;

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Test;
