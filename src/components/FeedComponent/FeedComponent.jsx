import React from 'react';
import { FirstCard, FirstSubTitleWithProfile, SportButton } from "../../components";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import usePosts from '../../hooks/usePosts'; // Importar o hook usePosts
import style from './FeedComponent.module.css'

const formatFirestoreTimestamp = (timestamp) => {
  if (!timestamp || typeof timestamp._seconds !== 'number') {
    return 'Data inválida';
  }
  const date = new Date(timestamp._seconds * 1000); // Multiplica por 1000 para converter segundos em milissegundos
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric', // hour: '2-digit', minute: '2-digit' // Descomente para incluir hora
  });
};

/**
 * Componente para exibir um feed de posts.
 * @param {string} userId - O ID do usuário. Para feedType 'user', é o ID do perfil. Para 'timeline', é o ID do usuário logado.
 * @param {'user' | 'timeline'} feedType - O tipo de feed a ser buscado.
 * @param {boolean} showUserProfileHeader - Se deve exibir o cabeçalho do perfil (usado para feedType 'timeline').
 */
function FeedComponent({ userId, feedType = 'user', showUserProfileHeader = true }) {
  const { posts, isLoading: loading, error, fetchPosts } = usePosts(userId, feedType); // Renomeado isLoading para loading para consistência
  const navigate = useNavigate(); // Hook para navegação
  // console.log("Posts recebidos:", posts); // Para depuração

  const handleNavigateToProfile = (profileUserId) => {
    if (profileUserId) {
      navigate(`/Profilepage/${profileUserId}`);
    }
  };

  if (!userId && feedType === 'user' && !loading) { // Verifica se é feed de usuário e não tem ID
    return <p className="text-center text-gray-500 p-4">ID do usuário do perfil não fornecido.</p>;
  }

  if (!userId && feedType === 'timeline' && !loading) { // Verifica se é feed da timeline e não tem ID (usuário não logado)
    return <p className="text-center text-gray-500 p-4">Faça login para ver o feed.</p>;
  }

  if (loading) {
    return <p className="text-center text-gray-500 p-4">Carregando posts...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-4">Erro ao carregar feed: {error}</p>;
  }

  if (posts.length === 0 && !loading) { // Se não está carregando e não tem posts
    return <p className="text-center text-gray-500 p-4">Nenhuma publicação encontrada.</p>;
  }

  return (
    

    <div className="flex flex-col gap-4">
      {posts.map((post, idx) => (
        <FirstCard key={post.id}>
          <div className="flex flex-col gap-2 p-3"> {/* Adicionado padding ao conteúdo do card */}
            {/* Lógica para exibir o cabeçalho do perfil do autor do post */}
            {/* Envolve FirstSubTitleWithProfile em um div clicável */}
            {showUserProfileHeader && (
              <div
                className="cursor-pointer"
                onClick={() => handleNavigateToProfile(post.userId)} // post.userId é o ID do autor do post
              >
                <FirstSubTitleWithProfile
                  texto={`${post.nome}`}
                  imagemUrl={post.fotoPerfil || 'https://avatar.iran.liara.run/public/boy?username=' + (post.authorInfo.username || post.authorInfo.nome)}
                />
              </div>
            )}
            <div className="bg-gray-300 h-64 rounded-md flex items-center justify-center text-gray-500">
              {post.image ? <img src={post.image} alt="Post" className="w-full h-full object-cover rounded-md" /> : "Imagem não disponível"}
            </div>
            <p className="text-sm text-gray-700">{post.texto || post.description}</p> {/* 'texto' de user posts, 'description' de feed */}
            <div className="flex gap-2 flex-wrap">
              {(post.sports || post.esportes) && (post.sports || post.esportes).map(sport => <SportButton key={sport} label={sport} selected={true} className={style.sportButtonMaior}  />)}
            </div>            <p className="text-xs text-gray-500 mt-2">{formatFirestoreTimestamp(post.created_at || post.createdAt)}</p>
          </div>
        </FirstCard>
      ))}
    </div>
  );
}

export { FeedComponent }; // Exportando como nomeado para consistência