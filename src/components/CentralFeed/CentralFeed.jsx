import React from 'react';

// Importa o novo FeedComponent
import { FeedComponent } from '../FeedComponent/FeedComponent'; // Ajuste o caminho se necessário

// CentralFeed agora recebe userId e showUserProfile
function CentralFeed({ userId, showUserProfile = true }) {


    return (
    // A tag <main> ou <div> aqui depende da sua estrutura semântica geral.
    // Se FeedComponent já tiver um container principal, talvez não precise de um aqui.
    // Por enquanto, manterei o div com padding.
    <div className="w-full p-4"> {/* Removido flex flex-col gap-4, pois FeedComponent já tem */}
      <FeedComponent userId={userId} showUserProfile={showUserProfile} />
    </div>
    );
}

export { CentralFeed };