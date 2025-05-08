import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import { AuthContext } from '../../../../context/AuthContext';
import { FirstSubTitleWithProfile } from '../../../../components/FirstSubTitleWithProfile/FirstSubTitleWithProfile';
import { uploadImageService, createPostService } from '../../../../services/apiService'; // Importar os serviços da API

function LeftSidebar() {
  const { loggedInUserId } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editableProfileData, setEditableProfileData] = useState({
    nome: '',
    sobrenome: '',
    esportes: new Set(),
    redes_sociais: { instagram: '', tiktok: '', x: '' },
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  // State for the new "Create Post" toggle
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [postDescription, setPostDescription] = useState('');
  const [postImageFile, setPostImageFile] = useState(null);
  const [postImagePreview, setPostImagePreview] = useState('');
  const [selectedPostSports, setSelectedPostSports] = useState(new Set());
  const [postSubmitStatus, setPostSubmitStatus] = useState(''); 
  const [isSubmittingPost, setIsSubmittingPost] = useState(false); // Para feedback de carregamento

  // --- Handlers for Create Post section ---
  const handleCreatePostToggle = () => {
    setIsCreatePostOpen(!isCreatePostOpen);
    setPostSubmitStatus(''); // Clear any previous status
    if (!isCreatePostOpen) { // Reset form when opening
      setPostDescription('');
      setPostImageFile(null);
      setPostImagePreview('');
      setSelectedPostSports(new Set());
      // Clear file input visually if it exists
      const fileInput = document.getElementById('sidebarPostImageUpload');
      if (fileInput) fileInput.value = null;
    }
  };

  const handlePostDescriptionChange = (e) => {
    setPostDescription(e.target.value);
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPostImageFile(null);
      setPostImagePreview('');
    }
  };

  const handleRemovePostImage = () => {
    setPostImageFile(null);
    setPostImagePreview('');
    const fileInput = document.getElementById('sidebarPostImageUpload');
    if (fileInput) fileInput.value = null;
  };

  const handlePostSportToggle = (sport) => {
    setSelectedPostSports(prev => {
      const newSports = new Set(prev);
      if (newSports.has(sport)) newSports.delete(sport);
      else newSports.add(sport);
      return newSports;
    });
  };


  const handleCreatePostSubmit = async () => {
    if (!postDescription.trim()) {
      setPostSubmitStatus("Erro: A descrição é obrigatória.");
      return;
    }
    if (selectedPostSports.size === 0) {
      setPostSubmitStatus("Erro: Selecione pelo menos uma tag de esporte associada ao post.");
      return;
    }
    if (!loggedInUserId) {
      setPostSubmitStatus("Erro: Usuário não logado. Faça login para postar.");
      return;
    }

    const token = sessionStorage.getItem('token'); // Ou obter de onde você armazena o token

    if (!token) {
        setPostSubmitStatus("Erro: Token de autenticação não encontrado. Faça login novamente.");
        return;
    }

    setIsSubmittingPost(true);
    setPostSubmitStatus("Criando postagem...");

    try {
      let imageUrl = null;
      if (postImageFile) {
      setPostSubmitStatus("Fazendo upload da imagem...");
      try {
        console.log("Fazendo upload da imagem:", postImageFile);
        imageUrl = await uploadImageService(postImageFile);
        conaole.log();
        console.log("Link da i  magem do Imgur obtido:", imageUrl);
      } catch (uploadError) {
        console.error("Erro ao fazer upload da imagem:", uploadError);
        setPostSubmitStatus("Erro ao fazer upload da imagem. Tente novamente.");
        setIsSubmittingPost(false);
        return;
      }
      }

      const postDataForApi = {
      description: postDescription,
      image: imageUrl,
      sports: Array.from(selectedPostSports),
      };

      setPostSubmitStatus("Enviando dados da postagem...");
      try {
      await createPostService(postDataForApi, token);
      setPostSubmitStatus("Postagem criada com sucesso!");
      handleCreatePostToggle(); // Reutiliza a lógica de reset
      } catch (postError) {
      console.error("Erro ao enviar dados da postagem:", postError);
      setPostSubmitStatus(`Erro ao enviar dados da postagem: ${postError} 'Tente novamente.'}`);
      }
    } catch (error) {
      console.error("Erro inesperado ao criar postagem:", error);
      setPostSubmitStatus(`Erro inesperado: ${error.message || 'Tente novamente.'}`);
    } finally {
      setIsSubmittingPost(false);
    }
  };


  const navigate = useNavigate(); // Hook para navegação

  const listaDeEsportesPadrao = [
    "Futebol", "Vôlei", "Natação", "Ciclismo", "Corrida", "Skate", "Basquete", "Tênis", "Handebol"
  ];


  const stripLeadingAt = (str) => {
    return str && typeof str === 'string' && str.startsWith('@') ? str.substring(1) : str;
  };

  useEffect(() => {
    if (!loggedInUserId) {
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://two025-flink-startup-backend.onrender.com/api/users/${loggedInUserId}/profile`);
        const data = response.data;
        setProfileData(data);
        // Inicializa editableProfileData com os dados do perfil
        setEditableProfileData({
          nome: data.nome || '',
          sobrenome: data.sobrenome || '',
          esportes: new Set(Array.isArray(data.esportes) ? data.esportes : []),
          redes_sociais: {
            instagram: stripLeadingAt(data.redes_sociais?.instagram || ''),
            tiktok: stripLeadingAt(data.redes_sociais?.tiktok || ''),
            x: stripLeadingAt(data.redes_sociais?.x || ''),
          },
        });
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

  const handleSettingsToggle = () => {
    setIsSettingsOpen(!isSettingsOpen);
    setUpdateError(null); // Limpa erros anteriores ao abrir/fechar
    setUpdateSuccess(null); // Limpa mensagens de sucesso anteriores
    // Re-inicializa os dados editáveis se o perfil foi carregado e o menu está sendo aberto
    if (!isSettingsOpen && profileData) {
      setEditableProfileData({
        nome: profileData.nome || '',
        sobrenome: profileData.sobrenome || '',
        esportes: new Set(Array.isArray(profileData.esportes) ? profileData.esportes : []),
        redes_sociais: {
          instagram: stripLeadingAt(profileData.redes_sociais?.instagram || ''),
          tiktok: stripLeadingAt(profileData.redes_sociais?.tiktok || ''),
          x: stripLeadingAt(profileData.redes_sociais?.x || ''),
        },
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("redes_sociais.")) {
      const socialKey = name.split(".")[1];
      setEditableProfileData(prev => ({
        ...prev,
        redes_sociais: { ...prev.redes_sociais, [socialKey]: value }
      }));
    } else {
      setEditableProfileData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEsporteToggle = (esporte) => {
    setEditableProfileData(prev => {
      const novosEsportes = new Set(prev.esportes);
      if (novosEsportes.has(esporte)) {
        novosEsportes.delete(esporte);
      } else {
        novosEsportes.add(esporte);
      }
      return { ...prev, esportes: novosEsportes };
    });
  };


  const handleUpdateProfile = async () => {
    if (!loggedInUserId) return;
    setIsUpdating(true);
    setUpdateError(null);
    setUpdateSuccess(null);

    // Adiciona '@' de volta às redes sociais para o payload da API
    const redesSociaisParaApi = {};
    for (const key in editableProfileData.redes_sociais) {
      const value = editableProfileData.redes_sociais[key];
      // Adiciona @ se o valor não for vazio, caso contrário, envia string vazia ou o valor como está.
      redesSociaisParaApi[key] = value ? `@${value}` : '';
    }

    const payload = {
      nome: editableProfileData.nome,
      sobrenome: editableProfileData.sobrenome,
      esportes: Array.from(editableProfileData.esportes), // Converte Set para array
      redes_sociais: redesSociaisParaApi,
    };

    try {
      const response = await axios.put(`https://two025-flink-startup-backend.onrender.com/api/users/${loggedInUserId}/alterar`, payload);
      setUpdateSuccess(response.data.mensagem || "Dados atualizados com sucesso!");
    } catch (err) {
      setUpdateError(err.response?.data?.erro || err.message || "Erro ao atualizar perfil.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleProfileClick = () => {
    if (loggedInUserId) {
      navigate(`/Profilepage/${loggedInUserId}`);
    } else {
      console.warn("Não é possível navegar para o perfil: ID do usuário logado não encontrado.");
    }
  };
  const imageUrl = profileData?.fotoPerfil || "https://avatar.iran.liara.run/public/boy";
  const userNameText = profileData?.nome || (loggedInUserId ? "Carregando..." : "Usuário");

  return (
    <aside className="md:w-80 p-4 bg-gray-100 hidden md:block">
      <div className="space-y-4 sticky top-4 max-h-[calc(100vh-theme(spacing.12))] overflow-y-auto pr-1">
        {isLoading && !profileData && <p>Carregando perfil...</p>}
        {error && <p className="text-red-500 text-sm">Erro: {error}</p>}
        {(!isLoading || profileData) && ( // Mostra o perfil se não estiver carregando OU se já tiver dados

          <div onClick={handleProfileClick} className="cursor-pointer">
            <FirstSubTitleWithProfile
              imagemUrl={imageUrl}
              texto={userNameText}
            />
          </div>
        )}

        {/* Botão de Configurações */}
        {loggedInUserId && (
          <div className="space-y-2 mt-4">
            {/* Botão Criar Postagem */}
            <button
              onClick={handleCreatePostToggle}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[var(--green-highlight)] rounded-md hover:bg-[var(--green-primary)] focus:outline-none"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
              Criar Postagem
            </button>
            {/* Botão de Configurações */}
            <button
              onClick={handleSettingsToggle}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l-4 4-4-4M6 16l-4-4 4-4"></path></svg> {/* Changed icon for variety */}
              Configurações
            </button>
          </div>
        )}

        {/* Painel de Criar Postagem Expansível */}
        {isCreatePostOpen && loggedInUserId && profileData && (
          <div className="mt-4 p-4 bg-white rounded-md shadow">
            <h3 className="text-md font-semibold mb-3">Nova Postagem</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="postDescription" className="block text-xs font-medium text-gray-700">Descrição <span className="text-red-500">*</span></label>
                <textarea id="postDescription" rows="3" className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="O que está acontecendo?" value={postDescription} onChange={handlePostDescriptionChange} />
              </div>
              <div>
                <label htmlFor="sidebarPostImageUpload" className="block text-xs font-medium text-gray-700">Imagem (Opcional)</label>
                <input type="file" id="sidebarPostImageUpload" accept="image/*" onChange={handlePostImageChange} className="mt-1 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                {postImagePreview && (
                  <div className="mt-2 relative inline-block">
                    <img src={postImagePreview} alt="Pré-visualização" className="max-h-32 w-auto rounded shadow" />
                    <button type="button" onClick={handleRemovePostImage} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 text-xs leading-none hover:bg-red-600 flex items-center justify-center w-4 h-4" aria-label="Remover imagem">
                      ✕
                    </button>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700">Tags de Esporte <span className="text-red-500">*</span></label>
                {profileData.esportes && profileData.esportes.length > 0 ? (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {profileData.esportes.map(esporte => (
                      <button
                        key={esporte}
                        type="button"
                        onClick={() => handlePostSportToggle(esporte)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors duration-150
                          ${selectedPostSports.has(esporte)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                          }`}
                      >
                        {esporte.charAt(0).toUpperCase() + esporte.slice(1)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">Você não segue nenhum esporte. Adicione esportes nas configurações para poder usá-los em posts.</p>
                )}
              </div>
            </div>
            {postSubmitStatus && <p className={`mt-2 text-xs ${postSubmitStatus.startsWith("Erro:") ? 'text-red-600' : 'text-green-600'}`}>{postSubmitStatus}</p>}
            <button
              onClick={handleCreatePostSubmit}
              disabled={isSubmittingPost || (!postDescription.trim() || selectedPostSports.size === 0) || (!profileData || !profileData.esportes || profileData.esportes.length === 0 && selectedPostSports.size === 0) }
              className="w-full mt-4 px-4 py-2 bg-[var(--green-accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--green-highlight)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmittingPost ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        )}


        {/* Painel de Configurações Expansível */}
        {isSettingsOpen && loggedInUserId && (
          <div className="mt-4 p-4 bg-white rounded-md shadow">
            <h3 className="text-md font-semibold mb-3">Editar Perfil</h3>
            <div className="space-y-3">
              <div>
                <label htmlFor="nome" className="block text-xs font-medium text-gray-700">Nome</label>
                <input type="text" name="nome" id="nome" value={editableProfileData.nome} onChange={handleInputChange} className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="sobrenome" className="block text-xs font-medium text-gray-700">Sobrenome</label>
                <input type="text" name="sobrenome" id="sobrenome" value={editableProfileData.sobrenome} onChange={handleInputChange} className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500" />
              </div>
              <div>
                <label htmlFor="esportes" className="block text-xs font-medium text-gray-700">Esportes</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {listaDeEsportesPadrao.map(esporte => (
                    <button
                      key={esporte}
                      type="button" // Previne submit do formulário
                      onClick={() => handleEsporteToggle(esporte)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors duration-150
                        ${editableProfileData.esportes.has(esporte)
                          ? 'bg-[var(--green-primary)] text-white border-[var(--green-primary)]'
                          : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                    >
                      {esporte}
                    </button>
                  ))}
                </div>
              </div>
              <h4 className="text-sm font-medium text-gray-700 pt-2">Redes Sociais</h4>
              <div>
                <label htmlFor="redes_sociais.instagram" className="block text-xs font-medium text-gray-700">Instagram</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span>
                  <input type="text" name="redes_sociais.instagram" id="redes_sociais.instagram" value={editableProfileData.redes_sociais.instagram} onChange={handleInputChange} className="block w-full px-2 py-1 border border-gray-300 rounded-r-md text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="usuario" />
                </div>
              </div>
              <div>
                <label htmlFor="redes_sociais.tiktok" className="block text-xs font-medium text-gray-700">TikTok</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span>
                  <input type="text" name="redes_sociais.tiktok" id="redes_sociais.tiktok" value={editableProfileData.redes_sociais.tiktok} onChange={handleInputChange} className="block w-full px-2 py-1 border border-gray-300 rounded-r-md text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="usuario" />
                </div>
              </div>
              <div>
                <label htmlFor="redes_sociais.x" className="block text-xs font-medium text-gray-700">X (Twitter)</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">@</span>
                  <input type="text" name="redes_sociais.x" id="redes_sociais.x" value={editableProfileData.redes_sociais.x} onChange={handleInputChange} className="block w-full px-2 py-1 border border-gray-300 rounded-r-md text-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="usuario" />
                </div>
              </div>
            </div>
            {updateError && <p className="mt-2 text-xs text-red-600">{updateError}</p>}
            {updateSuccess && <p className="mt-2 text-xs text-green-600">{updateSuccess}</p>}
            <button
              onClick={handleUpdateProfile}
              disabled={isUpdating}
              className="w-full mt-4 px-4 py-2 bg-[var(--green-highlight)] text-white text-sm font-medium rounded-md hover:bg-[var(--green-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--green-highlight)] disabled:opacity-50"
            >
              {isUpdating ? 'Alterando...' : 'Alterar'}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}

export { LeftSidebar };