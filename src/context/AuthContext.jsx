import { createContext } from 'react';

// Criação do contexto de autenticação
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  login: async () => ({ success: false, error: 'Login function not initialized' }), // Adicione uma função padrão
  logout: () => {},
  register: async () => ({ success: false, error: 'Register function not initialized' }), // Adicione esta linha
  isAuthenticated: false,
});
