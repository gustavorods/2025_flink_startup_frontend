import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../../context/AuthContext';
import { FirstSubTitleWithProfile } from '../../../../components/FirstSubTitleWithProfile/FirstSubTitleWithProfile';

function LeftSidebar() {
  const { loggedInUserId } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!loggedInUserId) {
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${loggedInUserId}/profile`);
        setProfileData(response.data);
      } catch (err) {
        console.error("Erro ao buscar perfil do usuário:", err);
        setError(err.response?.data?.error || err.message || "Erro ao carregar perfil.");
        setProfileData(null); // Limpa dados em caso de erro
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [loggedInUserId]);

  const imageUrl = profileData?.fotoPerfil || "https://avatar.iran.liara.run/public/boy";
  const userNameText = profileData?.nome || (loggedInUserId ? "Carregando..." : "Usuário");

  return (
    <aside className="w-1/5 p-4 bg-gray-100 hidden md:block">
      <div className="space-y-4 sticky top-4 min-w-[290px]">
        {isLoading && !profileData && <p>Carregando perfil...</p>}
        {error && <p className="text-red-500 text-sm">Erro: {error}</p>}
        {(!isLoading || profileData) && ( // Mostra o perfil se não estiver carregando OU se já tiver dados
          <FirstSubTitleWithProfile
            imagemUrl={imageUrl}
            texto={userNameText}
          />
        )}
      </div>
    </aside>
  );
}

export { LeftSidebar };