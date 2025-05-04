import React, { useEffect, useState } from 'react';
import style from './UserListTest.module.css'; // Importando o CSS do componente
import axios from 'axios';
// Removido: import { useLoading } from '../../context/LoadingContext';
import { Spinner } from '../../components/Spinner'; // 2. Importar o componente Spinner

const UserListTest = () => {
  const [users, setUsers] = useState([]);
  const [isListLoading, setIsListLoading] = useState(true); // 1. Reintroduzir estado local
  // Removido: const { isLoading, showLoading, hideLoading } = useLoading();

  // Função para buscar os dados do backend
  const fetchUsers = async () => {
    setIsListLoading(true); // 3. Controlar estado local
    // Removido: showLoading();
    try {
      const response = await axios.get('http://localhost:3000/api/listar-users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      // Opcional: manter o atraso para visualização
      // await new Promise(resolve => setTimeout(resolve, 2000));
      setIsListLoading(false); // 3. Controlar estado local
      // Removido: hideLoading();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={style.UserListTest}>
      <h1>Lista de Usuários (Teste com Spinner Global)</h1>
      {/* 4. Usar estado local para renderizar o Spinner localmente */}
      {isListLoading ? (
        <Spinner /> // Renderiza o spinner local
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
