
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Ajuste os caminhos se LeftSidebar e RightSidebar foram movidos para src/components
import { LeftSidebar } from './components';
import { RightSidebar } from './components'; 
import { FeedComponent } from '../../components'; 

function Timeline() {
  const navigate = useNavigate(); 

  // Placeholder para a imagem do usuário - va vir do estado/contexto/API
  const loggedInUserImageUrl = "https://instagram.fgru6-1.fna.fbcdn.net/v/t51.2885-19/463226441_1570032563611492_2752147784767372736_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_ht=instagram.fgru6-1.fna.fbcdn.net&_nc_cat=104&_nc_oc=Q6cZ2QFNeN8bhQG1e50AN7AZhkQSNzYPbS-wyZUwBr4k6Si9OaHwNGQbvT3MSHadoNudt0WdfrCr2uxH2e631Vu3qyih&_nc_ohc=aZ6fQ3KVQ0EQ7kNvwEfbFzS&_nc_gid=lAcfO1LyxtWNzWqofxMVhg&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AfGGCo3mISGmsjiLh7eES-NUKzWycHxwR4DYMZsUsVT-CQ&oe=681EF8EE&_nc_sid=7d3ac5"; // Imagem do usuário logado
  const loggedInUserId = "sNlpuZG0JJNtwb8bh5DZ"; // Exemplo de ID do usuário logado. Isso viria da autenticação.
  const loggedInUserName = "bernasimeline"; // Exemplo de nome de usuário logado

  const handleProfileClick = () => {
    navigate('/Profilepage'); // Navega para a página de perfil
  };

  // timelinePosts não é mais necessário aqui, pois o FeedComponent buscará os dados.

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white w-full"> {/* Garante que ocupa toda a tela */}
      {/* Cabeçalho para telas pequenas (visível abaixo de md) */}
      <header className="md:hidden sticky top-0 z-10 flex items-center justify-between p-3 bg-white border-b border-gray-200">
      <img src={loggedInUserImageUrl} alt="Perfil" className="w-8 h-8 rounded-full cursor-pointer" onClick={handleProfileClick} />
      <h1 className="text-xl font-bold text-teal-700">flink</h1> {/* Nome do app centralizado */}
      <div className="w-8"></div> {/* Espaço vazio para ajudar na centralização do título */}
      </header>

      {/* Menu lateral */}
      <LeftSidebar userImageUrl={loggedInUserImageUrl} userName={loggedInUserName} />

      {/* Conteúdo central */}
      <div className="flex-grow md:w-3/5 lg:w-2/3"> {/* flex-grow para preencher o espaço disponível */}
      {/* Passa o ID do usuário logado para o FeedComponent */}
      <FeedComponent userId={loggedInUserId} showUserProfile={true} />
      </div>

      {/* Sugestões para seguir */}
      <RightSidebar />
    </div>
    );
}

export { Timeline };
