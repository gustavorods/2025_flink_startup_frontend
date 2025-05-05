import { createContext } from 'react';

// Criação do contexto de autenticação
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  login: async () => ({ success: false, error: 'Login function not initialized' }),
  logout: () => {},
  register: async () => ({ success: false, error: 'Register function not initialized' }),
  verificarEmailExiste: async () => ({ exists: false, error: 'Verify email function not initialized' }), 
  isAuthenticated: false,
});
