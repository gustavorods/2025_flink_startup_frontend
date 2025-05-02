import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserListTest = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // novo estado para controle de carregamento

  // Função para buscar os dados do backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/listar-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setIsLoading(false); // seja sucesso ou erro, para o carregamento
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Lista de Usuários</h1>
      {isLoading ? (
        <p>Carregando...</p> // mostrado enquanto isLoading for true
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.email}>{user.email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { UserListTest };
