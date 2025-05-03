import React from 'react';
import style from './FirstSubTitleWithProfile.module.css'; // Importando o arquivo CSS

const FirstSubTitleWithProfile = ({ texto, imagemUrl }) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Redireciona para a página de perfil
  };

  return (
    <div className={style['first-subtitle-with-profile']}>
      {/* Imagem de Perfil com click para redirecionar */}
      <img
        src={imagemUrl}
        alt="Perfil"
        className={style['profile-image']}
        onClick={handleProfileClick}
      />
      {/* Texto do subtítulo */}
      <h3 className={style['profile-name']}>{texto}</h3>
    </div>
  );
};

export { FirstSubTitleWithProfile };
