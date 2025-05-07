import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// const API_URL = "http://localhost:3000/timeline/feed/"; // ajuste se estiver em produção ou se sua API tiver outro endpoint

export function useFeed(userId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(0);
  const LIMIT = 10; // Quantidade de posts por "página"

  const fetchFeed = useCallback(async () => {
    // Adicionada verificação para userId para não buscar se não houver ID
    if (!userId || loading || !hasMore) return;

    setLoading(true);

    try {
      // A URL agora inclui o userId. O backend precisa suportar isso.
      const res = await axios.get(`http://localhost:3000/timeline/feed/${userId}`); // Ex: http://localhost:3000/api/feed/123
      const data = res.data; // Assumindo que res.data é um array de posts
      // console.log("Posts recebidos:", data); // Para depuração
      

      // Apenas simula paginação aqui. Ideal seria backend com ?page=X ou cursor
      const nextSlice = data.slice(page * LIMIT, (page + 1) * LIMIT);

      setPosts(prev => [...prev, ...nextSlice]);
      setHasMore(nextSlice.length === LIMIT); // Se o slice for menor que o limite, não há mais posts
      setPage(p => p + 1);
    } catch (err) {
      console.error("Erro ao carregar feed:", err);
      // Poderia adicionar um estado de erro aqui
    }

    setLoading(false);
  }, [userId, page, loading, hasMore]); // Removido LIMIT da dependência, pois é constante

  useEffect(() => {
    setPosts([]); // Limpa os posts quando o userId muda
    setPage(0);   // Reseta a página
    setHasMore(true); // Reseta hasMore
    // fetchFeed(); // A busca inicial será disparada pelo próximo useEffect
  }, [userId]);

  useEffect(() => {
    if (userId && posts.length === 0 && hasMore) { // Garante que só busca se tiver userId e não tiver posts iniciais
        fetchFeed();
    }
  }, [userId, posts.length, hasMore, fetchFeed]); // Adicionado posts.length e hasMore para controle

  return { posts, loadMore: fetchFeed, loading, hasMore };
}