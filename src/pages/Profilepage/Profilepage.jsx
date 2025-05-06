import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FirstTitle,
  FirstSubTitle,
  SportButton,
  FirstButton,
  FirstCard,
} from '../../components';


function Profilepage() {
  // userPosts não é mais necessário aqui.
  const profileUserId = "bernardovxexra"; // Exemplo de ID do usuário do perfil. Viria da URL ou props.

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50"> 
      <aside className="w-full md:w-1/5 p-6 md:border-r border-gray-300 flex flex-col items-center mb-6 md:mb-0">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2 w-full max-w-xs md:max-w-none"> {/* Ajusta colunas e largura máxima para telas diferentes */}
          <SportButton label="futebol" selected />
          <SportButton label="vôlei" selected />
          <SportButton label="vôlei" selected />
          <SportButton label="vôlei" selected />
        </div>
      </aside>

      {/* Conteúdo principal */}
      {/* Passa os posts do usuário e desabilita o cabeçalho do perfil no feed */}
      <main className="w-full md:w-4/5 flex flex-col"> {/* Largura total em telas < md */}
         {/* <CentralFeed userId={profileUserId} showUserProfile={false} /> */}
      </main>
    </div>
  );
}

export { Profilepage };
