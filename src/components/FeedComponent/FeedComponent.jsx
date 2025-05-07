import React, { useRef, useCallback } from "react";
import { useFeed } from "../../hooks/useFeed"; // Ajuste o caminho se necessário
import { FirstCard, FirstSubTitleWithProfile, SportButton } from "../../components"; // Importe seus componentes

function FeedComponent({ userId, showUserProfile = true }) {
  const { posts, loadMore, loading, hasMore } = useFeed(userId);
  const observer = useRef();

  const lastPostRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (!userId && posts.length === 0 && !loading) {
    return <p className="text-center text-gray-500 p-4">ID do usuário não fornecido.</p>;
  }

  if (posts.length === 0 && loading) {
    return <p className="text-center text-gray-500 p-4">Carregando posts...</p>;
  }

  if (posts.length === 0 && !loading && !hasMore) {
    return <p className="text-center text-gray-500 p-4">Nenhuma publicação encontrada para este usuário.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post, idx) => (
        <FirstCard key={post.id} ref={idx === posts.length - 1 ? lastPostRef : null}>
          <div className="flex flex-col gap-2 p-3"> {/* Adicionado padding ao conteúdo do card */}
            {showUserProfile && <FirstSubTitleWithProfile texto={post.nome} imagemUrl={post.fotoPerfil} />}
            <div className="bg-gray-300 h-64 rounded-md flex items-center justify-center text-gray-500">
              {post.image ? <img src={post.image} alt="Post" className="w-full h-full object-cover rounded-md" /> : "Imagem não disponível"}
            </div>
            <p className="text-sm text-gray-700">{post.description}</p>
            <div className="flex gap-2 flex-wrap">
              {post.sports && post.sports.map(sport => <SportButton key={sport} label={sport} selected={true} />)}
            </div>
          </div>
        </FirstCard>
      ))}
      {loading && <p className="text-center py-4">Carregando mais...</p>}
      {!loading && !hasMore && posts.length > 0 && <p className="text-center text-gray-400 py-4">Fim do feed</p>}
    </div>
  );
}

export { FeedComponent }; // Exportando como nomeado para consistência