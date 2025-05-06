import React from 'react';
import { useNavigate } from 'react-router-dom';

function FirstSubTitleWithProfile({ texto, imagemUrl, username }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (username) {
      navigate(`/Profilepage/${username}`);
    } else {
      navigate('/Profilepage'); // fallback
    }
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src={imagemUrl || "https://via.placeholder.com/150"}
        alt={`Perfil de ${texto}`}
        className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer object-cover"
        onClick={handleProfileClick}
      />
      <button
        onClick={handleProfileClick}
        className="text-base md:text-lg font-semibold hover:underline"
      >
        {texto}
      </button>
    </div>
  );
}

export { FirstSubTitleWithProfile };
