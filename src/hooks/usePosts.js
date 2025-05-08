import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Hook customizado para buscar posts.
 * @param {string} userId - O ID do usuário. Para feedType 'user', é o ID do perfil. Para 'timeline', é o ID do usuário logado.
 * @param {'user' | 'timeline'} feedType - O tipo de feed a ser buscado.
 * @returns {{ posts: Array, isLoading: boolean, error: string | null, fetchPosts: function }}
 */
function usePosts(userId, feedType) {
    // console.log("usePosts chamado com userId:", userId, "e feedType:", feedType); // Para depuração
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        if (!userId) {
            setError(feedType === 'timeline' ? "Usuário não autenticado para carregar o feed." : "ID do usuário não fornecido para carregar posts.");
            setIsLoading(false);
            setPosts([]);
            return;
        }

        setIsLoading(true);
        setError(null);

        let url = '';
        if (feedType === 'user') {
            url = `http://localhost:3000/api/users/${userId}/posts`;
        } else if (feedType === 'timeline') {
            url = `http://localhost:3000/timeline/feed/${userId}`;
        } else {
            setError("Tipo de feed inválido.");
            setIsLoading(false);
            setPosts([]);
            return;
        }

        try {
            // console.log("URL da requisição:", url); // Para depuração
            const response = await axios.get(url);
            // console.log(`Posts:`, response.data); // Para depuração

            setPosts(response.data || []); // Garante que seja um array
        } catch (err) {
            console.error(`Erro ao buscar posts (${feedType}):`, err);
            setError(err.response?.data?.error || err.message || `Erro ao carregar ${feedType === 'user' ? 'posts do usuário' : 'feed'}.`);
            setPosts([]);
        } finally {
            setIsLoading(false);
        }
    }, [userId, feedType]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]); // fetchPosts já inclui userId e feedType como dependências

    return { posts, isLoading, error, fetchPosts };
}

export default usePosts;