
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

// Import the new components
// Ajustar os caminhos de importação se necessário
import { LeftSidebar } from './components/LeftSidebar/LeftSidebar';
import { CentralFeed } from './components/CentralFeed/CentralFeed';
import { RightSidebar } from './components/RightSidebar/RightSidebar';

function Timeline() {
  const navigate = useNavigate(); // Hook para navegação

  // Placeholder para a imagem do usuário - idealmente viria do estado/contexto/API
  const userImageUrl = "https://via.placeholder.com/150";

  const handleProfileClick = () => {
    navigate('/Profilepage'); // Navega para a página de perfil
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white"> {/* Muda para coluna em telas pequenas */}
      {/* Cabeçalho para telas pequenas (visível abaixo de md) */}
      <header className="md:hidden sticky top-0 z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200">
        <img src={userImageUrl} alt="Perfil" className="w-8 h-8 rounded-full cursor-pointer" onClick={handleProfileClick} />
        <h1 className="text-xl font-bold text-teal-700">flink</h1> {/* Nome do app centralizado (ajustar se necessário) */}
        <div className="w-8"></div> {/* Espaço vazio para ajudar na centralização do título */}
      </header>

      {/* Menu lateral */}
      <LeftSidebar />

      {/* Conteúdo central */}
      <CentralFeed />

      {/* Sugestões para seguir */}
      <RightSidebar />
    </div>
  );
}

export { Timeline };
