import React, { useState, useEffect, useContext } from 'react'; // Adicionar useContext
import { FirstCard, FirstButton } from '../../../../components';
import axios from 'axios'; // Importar axios
import { AuthContext } from '../../../../context/AuthContext';

function RightSidebar() {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loggedInUserId } = useContext(AuthContext); // Obter o ID do usuário logado do contexto
  console.log("ID do usuário logado:", loggedInUserId); // Logar o ID do usuário logado

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
        console.log("Resposta da API (Axios):", response);

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

  const handleFollow = (userIdToFollow) => {
    // Futuramente aqui seguir o usuário.
    console.log(`Usuário ${loggedInUserId} quer seguir ${userIdToFollow}`);
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
              <FirstCard key={suggestion.id}>
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <img 
                      src={suggestion.fotoPerfil || 'https://via.placeholder.com/32'} // Placeholder se não houver fotoPerfil
                      alt={`Foto de ${suggestion.username || suggestion.nome}`} 
                      className="w-8 h-8 rounded-full bg-gray-400 flex-shrink-0 object-cover" 
                    />
                    <span className="truncate text-sm">@{suggestion.username || suggestion.nome}</span>
                  </div>
                  <FirstButton texto="Seguir" cor="#00695C" tamanho="0.75rem" padding="px-2 py-1" onClick={() => handleFollow(suggestion.id)} />
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