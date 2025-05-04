import { createContext, useState, useContext } from 'react';

// Criação do contexto de carregamento
export const LoadingContext = createContext();

// Provedor de contexto
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Funções para exibir ou esconder o spinner
  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
