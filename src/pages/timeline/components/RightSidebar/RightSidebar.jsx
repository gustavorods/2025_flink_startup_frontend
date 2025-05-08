import React, { useState, useEffect, useContext } from 'react'; // Adicionar useContext
import { FirstCard, FirstButton } from '../../../../components';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios'; // Importar axios
import { AuthContext } from '../../../../context/AuthContext';

function RightSidebar() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedInUserId } = useContext(AuthContext); // Obter o ID do usuário logado do contexto
  const [followedUsers, setFollowedUsers] = useState(new Set()); // Guarda IDs dos usuários que foram seguidos com sucesso
  const [followingLoading, setFollowingLoading] = useState({}); // Controla o estado de loading por botão: { [userId]: true/false }
  // console.log("ID do usuário logado:", loggedInUserId); // Logar o ID do usuário logado
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    if (!loggedInUserId) {
      setError("Usuário não autenticado.");
      setIsLoading(false);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${loggedInUserId}/comparar-esportes`);
        // console.log("Resposta da API (Axios):", response);

        const data = response.data;

        // API retorna um objeto com a chave 
        setSuggestions(data.semelhantes || []);
      } catch (err) {
        console.error("Erro ao buscar sugestões:", err);

        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError("Ocorreu um erro desconhecido ao buscar sugestões.");
        }
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [loggedInUserId]); // Refaz a busca se o loggedInUserId mudar

  const handleFollow = async (userIdToFollow) => {
    if (!loggedInUserId) {
      console.error("Usuário não logado, não pode seguir.");
      return;
    }

    setFollowingLoading(prev => ({ ...prev, [userIdToFollow]: true }));

    try {
      const response = await axios.post('http://localhost:3000/api/seguir', {
        quemSegue: loggedInUserId,
        quemVaiSerSeguido: userIdToFollow,
      });

      if (response.status === 200) {
        console.log(response.data.message); // "Seguindo com sucesso."
        setFollowedUsers(prev => new Set(prev).add(userIdToFollow));
      } else {
        // Tratar outros status de sucesso se houver
        console.warn("Resposta inesperada ao seguir:", response);
      }
    } catch (err) {
      console.error("Erro ao tentar seguir usuário:", err.response?.data?.error || err.message);
    } finally {
      setFollowingLoading(prev => ({ ...prev, [userIdToFollow]: false }));
    }
  };

  const handleNavigateToProfile = (profileUserId) => {
    if (profileUserId) {
      navigate(`/Profilepage/${profileUserId}`);
    }
  };

  return (
    <aside className="w-full md:w-1/5 p-4 bg-gray-100 hidden lg:block"> {/* Ajustado para w-full em telas menores se visível */}
      <div className="sticky top-4">
        <h2 className="text-lg font-bold mb-4">Sugestão pra seguir</h2>
        {isLoading && <p>Carregando sugestões...</p>}
        {error && <p className="text-red-500">Erro: {error}</p>}
        {!isLoading && !error && suggestions.length === 0 && (
          <p>Não há sugestões para seguir no momento.</p>
        )}
        {!isLoading && !error && suggestions.length > 0 && (
          <div className="flex flex-col gap-3">
            {suggestions.map((suggestion) => (
              <FirstCard key={suggestion.id}> {/* Usar suggestion.id que é o ID do usuário a ser seguido */}
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  {/* Envolve a imagem e o nome em um div clicável */}
                  <div
                    className="flex items-center gap-2 min-w-0 cursor-pointer"
                    onClick={() => handleNavigateToProfile(suggestion.id)}
                  >
                    {/* {console.log("sugestão", suggestion)} */}
                    <img
                      src={suggestion.profileImage || 'https://avatar.iran.liara.run/public/boy?username=' + (suggestion.username || suggestion.nome)}
                      alt={`Foto de ${suggestion.username || suggestion.nome}`}
                      className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 object-cover"
                    />
                    <span className="truncate text-sm font-medium hover:underline">@{suggestion.username || suggestion.nome}</span>
                  </div>
                  {followedUsers.has(suggestion.id) ? (
                    <FirstButton texto="Seguindo" cor="#4CAF50" /* Verde para indicar sucesso */ tamanho="0.75rem" padding="px-3 py-1" disabled />
                  ) : (
                    <FirstButton
                      texto={followingLoading[suggestion.id] ? "Seguindo..." : "Seguir"}
                      cor="#00695C"
                      tamanho="0.75rem"
                      padding="px-3 py-1" 
                      onClick={() => handleFollow(suggestion.id)}
                      disabled={followingLoading[suggestion.id]}
                    />
                  )}
                </div>
              </FirstCard>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export { RightSidebar };