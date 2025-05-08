import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Para pegar o ID da URL e para navegação
import axios from 'axios'; // Para fazer a requisição HTTP
import {
  FirstTitle,
  FirstSubTitle,
  SportButton,
  FirstButton,
  FirstCard,
  FeedComponent
} from '../../components';


function Profilepage() {
  const { id } = useParams();
  const userId = id; // Pega o 'userId' da URL (ex: /profile/bernardovxexra)
  const navigate = useNavigate(); // Hook para navegação
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGoHome = () => {
    navigate('/timeline'); // Navega para a página inicial (rota raiz)
  };

  useEffect(() => {
    if (!userId) {
      setError("ID do usuário não encontrado na URL.");
      setIsLoading(false);
      return;
    }

    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://two025-flink-startup-backend.onrender.com/api/users/${userId}/profile`);
        console.log("Dados do perfil:", response.data); // Para depuração
        setProfileData(response.data);
      } catch (err) {
        console.error("Erro ao buscar dados do perfil:", err);
        setError(err.response?.data?.error || err.message || "Erro ao carregar perfil.");
        setProfileData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]); // Re-executa se o userId da URL mudar

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando perfil...</div>;
  }

  if (error) {
    return <div className="flex flex-col justify-center items-center min-h-screen text-red-500">
      <p>Erro ao carregar o perfil:</p>
      <p>{error}</p>
    </div>;
  }

  if (!profileData) {
    return <div className="flex justify-center items-center min-h-screen">Perfil não encontrado.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <aside className="w-full md:w-1/5 p-6 md:border-r border-gray-300 flex flex-col items-center mb-6 md:mb-0">
        {/* Botão Home */}
        <button
          onClick={handleGoHome}
          className="self-start mb-4 text-sm text-[var(--green-primary)] hover:text-[var(--green-highlight)] font-medium flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
          Home
        </button>
        {/* Avatar */}
        <img
          src={profileData.fotoPerfil || 'https://avatar.iran.liara.run/public/boy?username=' + (profileData.username || profileData.nome)}
          alt={`Foto de ${profileData.nome || profileData.username}`}
          className="w-32 h-32 rounded-full bg-gray-300 mb-4 object-cover"
        />

        {/* Nome */}
        <FirstTitle texto={"@" + profileData.username}></FirstTitle>
        <FirstTitle texto={profileData.nome}></FirstTitle>

        {/* Título Esportes */}
        <h2 className="font-semibold text-lg mb-2">Esportes</h2>

        {/* Botões de esportes */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-2 w-full max-w-xs md:max-w-none">
          {profileData.esportes && profileData.esportes.length > 0 ? (
            profileData.esportes.map(esporte => <SportButton key={esporte} label={esporte} selected />)
          ) : (
            <p className="col-span-full text-sm text-gray-500">Nenhum esporte informado.</p>
          )}
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="w-full md:w-4/5 flex flex-col"> {/* Largura total em telas < md */}
        <FeedComponent userId={userId} feedType="user" showUserProfileHeader={false} /> {/* Usa o userId da URL e especifica o tipo de feed */}
      </main>
    </div>
  );
}

export { Profilepage };
