// Define your API base URL. You might want to move this to a .env file for different environments.
const API_BASE_URL = 'https://two025-flink-startup-backend.onrender.com/api'; // Ajuste se seu backend rodar em outra porta/caminho
import axios from 'axios'; // Importar axios
const IMGUR_CLIENT_ID = '45e386d17a537d0'; // <-- COLOQUE SEU CLIENT ID DO IMGUR AQUI!

/**
 * Uploads an image to Imgur anonymously.
 * @param {File} file The image file to upload.
 * @returns {Promise<string>} A promise that resolves with the image URL.
 */
export const uploadImageService = async (file) => {
  if (!IMGUR_CLIENT_ID || IMGUR_CLIENT_ID === 'SEU_CLIENT_ID_DO_IMGUR') {
    const errorMessage = "Imgur Client ID não configurado em apiService.js. Obtenha um em https://api.imgur.com/oauth2/addclient";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      const errorDetails = data.data?.error?.message || data.data?.error || 'Falha ao fazer upload da imagem para o Imgur.';
      console.error('Imgur API Error:', data);
      throw new Error(`Erro na API do Imgur: ${errorDetails}. Detalhes: ${JSON.stringify(data)}`);
    }

    return data.data.link; // URL da imagem no Imgur
  } catch (error) {
    const errorMessage = error.message || 'Erro ao conectar com o serviço de upload de imagem.';
    console.error('Erro no upload para o Imgur:', error);
    throw new Error(`Erro no upload para o Imgur: ${errorMessage}. Detalhes: ${JSON.stringify(error)}`);
  }
};

/**
 * Creates a new post.
 * @param {object} postData The data for the new post { description, image, sports }.
 * @param {string} token The JWT token for authorization.
 * @returns {Promise<object>} A promise that resolves with the created post data.
 */
export const createPostService = async (postDataPayload, token) => { // Renomeado para clareza que é FormData
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, postDataPayload, {
      headers: {
        // Quando enviando FormData, NÃO defina Content-Type manualmente.
        // Axios o fará automaticamente para 'multipart/form-data' com o boundary correto.
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post via API:', error);

    // Melhorando a exceção com mais detalhes
    const statusCode = error.response?.status;
    const errorData = error.response?.data;
    const errorMessage = errorData?.message || error.message || 'Erro desconhecido';

    throw new Error(`Erro ${statusCode || 'desconhecido'}: ${errorMessage}. Detalhes: ${JSON.stringify(errorData)}`);
  }
};