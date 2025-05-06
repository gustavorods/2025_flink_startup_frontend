
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { LeftSidebar } from './components'; 
import { CentralFeed } from '../../components'; 
import { RightSidebar } from './components'; 

function Timeline() {
  const navigate = useNavigate(); 

  // Placeholder para a imagem do usuário - va vir do estado/contexto/API
  const userImageUrl = "https://via.placeholder.com/150";

  const handleProfileClick = () => {
    navigate('/Profilepage'); // Navega para a página de perfil
  };

  // Exemplo de dados do feed da timeline (vai vir da API)
  const timelinePosts = [
    { id: 1, user: 'bernardovxexra', img: 'https://via.placeholder.com/150', description: 'Post da timeline 1...', sports: ['Futebol', 'Vôlei'] },
    { id: 2, user: 'outro_usuario', img: 'https://via.placeholder.com/151', description: 'Post da timeline 2...', sports: ['Basquete'] },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white"> {/* Muda para coluna em telas pequenas */}
      {/* Cabeçalho para telas pequenas (visível abaixo de md) */}
      <header className="md:hidden sticky top-0 z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200">
        <img src={userImageUrl} alt="Perfil" className="w-8 h-8 rounded-full cursor-pointer" onClick={handleProfileClick} />
        <h1 className="text-xl font-bold text-teal-700">flink</h1> {/* Nome do app centralizado */}
        <div className="w-8"></div> {/* Espaço vazio para ajudar na centralização do título */}
      </header>

      {/* Menu lateral */}
      <LeftSidebar />

      {/* Conteúdo central */}
      <div className="w-full md:w-3/5 lg:w-2/3">
        <CentralFeed posts={timelinePosts} />
      </div>

      {/* Sugestões para seguir */}
      <RightSidebar />
    </div>
  );
}

export { Timeline };
