import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FirstTitle,
  FirstSubTitle,
  SportButton,
  FirstButton,
  FirstCard,
} from '../../components';

// Importa o CentralFeed reutilizável
import { CentralFeed } from '../../components/CentralFeed/CentralFeed';

function Profilepage() {
  // Exemplo de dados dos posts do perfil (va vir da APIs)
  const userPosts = [
    { id: 10, user: 'Nome', img: 'https://via.placeholder.com/150', description: 'Meu primeiro post no perfil!', sports: ['Futebol'] },
    { id: 11, user: 'Nome', img: 'https://via.placeholder.com/150', description: 'Outro post aqui...', sports: ['Vôlei'] },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Lado esquerdo */}
      <aside className="w-1/5 p-6 border-r border-gray-300 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gray-300 mb-4" />

        {/* Nome */}
        <FirstTitle>Nome</FirstTitle>

        {/* Bio */}
        <FirstSubTitle className="text-center text-sm mt-2 mb-6">
        bio bio bio bio bio<br />
         bio bio bio bio bio
        </FirstSubTitle>
        {/* Título Esportes */}
        <h2 className="font-semibold text-lg mb-2">esportes</h2>

        {/* Botões de esportes */}
        <div className="grid grid-cols-2 gap-2">
          <SportButton label="futebol" selected />
          <SportButton label="vôlei" selected />
          <SportButton label="vôlei" selected />
          <SportButton label="vôlei" selected />
        </div>
      </aside>

      {/* Conteúdo principal */}
      {/* Passa os posts do usuário e desabilita o cabeçalho do perfil no feed */}
      <main className="w-4/5 flex flex-col"> 
         <CentralFeed posts={userPosts} showUserProfile={false} />
      </main>
    </div>
  );
}

export { Profilepage };
