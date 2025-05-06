import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FirstSubTitleWithProfile } from '../FirstSubTitleWithProfile/FirstSubTitleWithProfile'; // Adjust path if needed

function LeftSidebar() {
  return (
    <aside className="w-1/5 p-4 bg-gray-100 hidden md:block"> {/* Added hidden md:block for responsiveness */}
      <div className="space-y-4 sticky top-4"> {/* Added sticky top-4 */}
        {/* Usando FirstSubTitleWithProfile no menu lateral */}
        <FirstSubTitleWithProfile
          imagemUrl="https://via.placeholder.com/150" // Exemplo de imagem
          texto="bernass" // User's profile name/link
        />
        {/* Add other left sidebar items here if needed */}
      </div>
    </aside>
  );
}

export { LeftSidebar };