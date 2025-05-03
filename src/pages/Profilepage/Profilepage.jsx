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

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Lado esquerdo */}
      <aside className="w-1/4 p-6 border-r border-gray-300 flex flex-col items-center">
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
      <main className="w-3/4 p-6 flex flex-col">
        
        <FirstCard>
          <div className="flex flex-col">
            {/* Imagem central */}
            <div className="h-64 bg-gray-200 flex justify-center items-center text-lg font-semibold rounded-t-lg">
              imagem
            </div>

            
            <div className="bg-black text-white text-sm p-3">
              descrição descrição descrição descrição descrição
              descrição descrição descrição descrição descrição
            </div>

            {/* Tags */}
            <div className="flex gap-2 p-3">
              <FirstButton texto="futebol" cor="#00695C" />
              <FirstButton texto="vôlei" cor="#00695C" />
            </div>
          </div>
        </FirstCard>

        {/* Card extra embaixo */}
        <FirstCard>
          {/* Conteúdo opcional */}
          Área inferior para mais conteúdo
        </FirstCard>
      </main>
    </div>
  );
}

export { Profilepage };
