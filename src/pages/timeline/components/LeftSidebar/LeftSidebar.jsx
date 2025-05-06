import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FirstSubTitleWithProfile } from '../../../../components/FirstSubTitleWithProfile/FirstSubTitleWithProfile';

// Agora LeftSidebar recebe userImageUrl e userName como props
function LeftSidebar({ userImageUrl, userName }) {
  return (
    <aside className="w-1/5 p-4 bg-gray-100 hidden md:block">
      <div className="space-y-4 sticky top-4 min-w-[290px]">
        <FirstSubTitleWithProfile
          imagemUrl={userImageUrl || "https://via.placeholder.com/150"} // Usa a prop ou um placeholder
          texto={userName || "Usuário"} // Usa a prop ou um placeholder
        />
      </div>
    </aside>
  );
}

export { LeftSidebar };