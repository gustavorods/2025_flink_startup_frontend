import React from 'react';
import { useNavigate } from 'react-router-dom';

function FirstSubTitleWithProfile({ texto, imagemUrl }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/Profilepage'); // Navega para a página de perfil
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src={imagemUrl || 'https://via.placeholder.com/150'} // Provide a default image
        alt={`Perfil de ${texto}`} // Added alt text
        className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer object-cover" // Adjusted size and added object-cover
        onClick={handleProfileClick}
      />
      <h3 className="text-base md:text-lg font-semibold cursor-pointer hover:underline" onClick={handleProfileClick}>{texto}</h3> {/* Adjusted size and added hover effect */}
    </div>
  );
}

export { FirstSubTitleWithProfile };