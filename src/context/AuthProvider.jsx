import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useLoading } from './LoadingContext';  // Importando o hook de carregamento

export const AuthProvider = ({ children }) => {
  const { showLoading, hideLoading } = useLoading(); // Controle do spinner global
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Inicia o carregamento ao verificar o token
    showLoading();

    const token = sessionStorage.getItem('token');
    if (!token) {
      hideLoading();  // Finaliza o carregamento caso não exista token
      return;
    }

    try {
      const decoded = jwtDecode(token);

      // Verifica se o token expirou
      if (decoded.exp * 1000 < Date.now()) {
        console.warn('Token expirado');
        logout();
        hideLoading();
        return;
      }

      // Se o token for válido, verifica com o backend
      axios
        .get('http://localhost:3000/auth/verify-token', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const userData = { id: res.data.userId };
          setUser(userData);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.warn('Token inválido no backend:', err);
          logout();
        })
        .finally(() => hideLoading()); // Finaliza o carregamento após a verificação
    } catch (err) {
      console.error('Token malformado:', err);
      logout();
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  // Função de registro
  const register = async (novoUsuario) => {
    showLoading(); // Mostra o spinner global

    try {
      const response = await axios.post('http://localhost:3000/api/criar-novo-user', novoUsuario);

      // Verifica se a resposta contém o token
      if (!response || !response.data || !response.data.token) {
        return { success: false, error: 'Token não retornado ou resposta inválida do servidor' };
      }

      const token = response.data.token;

      // Armazena o token no sessionStorage
      sessionStorage.setItem('token', token);

      // Decodifica o token JWT
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);

      return { success: true, token };

    } catch (err) {
      let message = 'Erro desconhecido';

      if (err.response) {
        // Quando a resposta do servidor é recebida mas com erro (4xx ou 5xx)
        if (err.response.status === 400) {
          message = 'Dados inválidos fornecidos. Verifique os campos e tente novamente.';
        } else if (err.response.status === 401) {
          message = 'Credenciais inválidas. Por favor, tente novamente.';
        } else if (err.response.status === 500) {
          message = 'Erro no servidor. Tente novamente mais tarde.';
        } else {
          message = err.response.data.error || 'Erro desconhecido no servidor';
        }
      } else if (err.request) {
        // Caso a requisição não tenha sido feita (erro de rede)
        message = 'Erro de rede. Não foi possível conectar ao servidor. Verifique sua conexão.';
      } else {
        // Erro na configuração da requisição
        message = 'Erro ao configurar a requisição registro. Tente novamente.';
      }

      return { success: false, error: message };
    } finally {
      hideLoading(); // Oculta o spinner
    }
  };

  // Função de login
  const login = async (email, password) => {
    showLoading(); // Inicia o carregamento enquanto autentica

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });
      // console.log('Resposta do login:', response.data); // Log da resposta do login

      const token = response.data.token;
      // console.log('Token recebido:', token); // Log do token recebido

      sessionStorage.setItem('token', token);
      // console.log('Token armazenado no sessionStorage:', sessionStorage.getItem('token')); // Log do token armazenado

      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      return { success: true, token }; // Retorna sucesso após o atraso
    } catch (err) {
      let message = 'Erro desconhecido';
      if (err.response) message = err.response.data.error || message;
      else if (err.request) message = 'Erro de rede. Tente novamente.';
      else message = err.message || 'Erro ao configurar a requisição login.';;

      return { success: false, error: message };
    } finally {
      hideLoading(); // Finaliza o carregamento após o login
    }
  };

  // Função de logout
  const logout = () => {
    sessionStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  // Função para verificar se o e-mail já existe
  const verificarEmailExiste = async (email) => {
    showLoading(); // Mostra o spinner durante a verificação
    try {
      // Use a URL completa se necessário, ou configure um baseURL no axios
      const response = await axios.post('http://localhost:3000/auth/verify-email', { email });
      // Assumindo que o backend retorna { existe: true } ou { existe: false }
      return { exists: response.data.existe === true };
    } catch (err) {
      console.error('Erro ao verificar email no AuthProvider:', err.response?.data || err.message);
      // Retorna um erro genérico ou a mensagem do backend, se disponível
      return {
        exists: false, // Assume que não existe em caso de erro, mas informa o erro
        error: err.response?.data?.error || 'Erro ao tentar verificar o e-mail. Tente novamente.'
      };
    } finally {
      hideLoading(); // Esconde o spinner
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
        verificarEmailExiste,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
