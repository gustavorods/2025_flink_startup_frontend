// Define your API base URL. You might want to move this to a .env file for different environments.
const API_BASE_URL = 'http://localhost:3001/api'; // Ajuste se seu backend rodar em outra porta/caminho
const IMGUR_CLIENT_ID = '45e386d17a537d0'; // <-- COLOQUE SEU CLIENT ID DO IMGUR AQUI!

/**
 * Uploads an image to Imgur anonymously.
 * @param {File} file The image file to upload.
 * @returns {Promise<string>} A promise that resolves with the image URL.
 */
export const uploadImageService = async (file) => {
  if (!IMGUR_CLIENT_ID || IMGUR_CLIENT_ID === 'SEU_CLIENT_ID_DO_IMGUR') {
    console.error("Imgur Client ID não configurado em apiService.js. Obtenha um em https://api.imgur.com/oauth2/addclient");
    throw new Error("Configuração de upload de imagem pendente. Contate o administrador ou configure o Client ID.");
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
      console.error('Imgur API Error:', data);
      throw new Error(data.data?.error?.message || data.data?.error || 'Falha ao fazer upload da imagem para o Imgur.');
    }
    return data.data.link; // URL da imagem no Imgur
  } catch (error) {
    console.error('Erro no upload para o Imgur:', error);
    throw new Error(error.message || 'Erro ao conectar com o serviço de upload de imagem.');
  }
};

/**
 * Creates a new post.
 * @param {object} postData The data for the new post { description, image, sports }.
 * @param {string} token The JWT token for authorization.
 * @returns {Promise<object>} A promise that resolves with the created post data.
 */
export const createPostService = async (postData, token) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || `Erro ${response.status}: Falha ao criar post`);
  }
  return responseData;
};