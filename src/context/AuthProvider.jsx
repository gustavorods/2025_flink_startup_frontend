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

  // Função de login
  const login = async (email, password) => {
    showLoading(); // Inicia o carregamento enquanto autentica

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      const token = response.data.token;
      sessionStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded);
      setIsAuthenticated(true);
      return { success: true, token };
    } catch (err) {
      let message = 'Erro desconhecido';
      if (err.response) message = err.response.data.error || message;
      else if (err.request) message = 'Erro de rede. Tente novamente.'; 
      else message = 'Erro ao configurar a requisição.';

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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
