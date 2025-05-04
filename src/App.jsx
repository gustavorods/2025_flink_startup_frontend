import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthProvider } from './context'; // Importando o AuthProvider
import { LoadingProvider } from './context/LoadingContext'; // Importando o LoadingProvider

const App = () => {
  return (
    <LoadingProvider>
      <AuthProvider>
        <BrowserRouter>
          <Router />   {/* Router estará com todas as rotas */}
        </BrowserRouter>
      </AuthProvider>
    </LoadingProvider>
  );
};

export { App };
