
import React from 'react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LockIcon from '@mui/icons-material/Lock'
import KeyIcon from '@mui/icons-material/VpnKey'
import { useNavigate } from 'react-router-dom';

import { 
  FirstLink,
  FirstCard,
  FirstSubTitle,
  SportButton,
  FirstButton,
  FileButton,
  
} from '../../components';

function FirstSubTitleWithProfile({ texto, imagemUrl }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile'); // Redireciona para a página de perfil
  };

  return (
    <div className="flex items-center gap-2">
      {/* Imagem de Perfil com click para redirecionar */}
      <img
        src={imagemUrl}
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={handleProfileClick}
      />
      {/* Texto do subtítulo */}
      <h3 className="text-xl font-semibold">{texto}</h3>
    </div>
  );
}

function Timeline() {
  return (
    <div className="flex min-h-screen">
      {/* Menu lateral */}
     <aside className="w-1/5 p-4 bg-gray-100">
        <div className="space-y-4">
          {/* Usando FirstSubTitleWithProfile no menu lateral */}
          <FirstSubTitleWithProfile
            nome="Nome da Pessoa"
            imagemUrl="https://via.placeholder.com/150" // Exemplo de imagem
            texto="bernass"
          />
          
        </div>
      </aside>

      {/* Conteúdo central */}
      <main className="w-3/5 p-4 flex flex-col gap-4">
        <FirstCard>
          <div className="flex flex-col gap-2">
            {/* Aqui usamos o novo componente FirstSubTitleWithProfile */}
            <FirstSubTitleWithProfile
              texto="bernardovxexra"
              imagemUrl="https://via.placeholder.com/150" // Exemplo de URL da imagem
            />
            <div className="bg-gray-300 h-64 rounded-md flex items-center justify-center">
              imagem
            </div>
            <p className="text-sm text-gray-700">
              Descrição descrição descrição descrição descrição
              hfhfahfseusefuseisef
              shfseufseufh
            </p>
            <div className="flex gap-2">
              <SportButton label="Futebol" selected={true} />
              <SportButton label="Vôlei" selected={true} />
            </div>
          </div>
        </FirstCard>
      </main>

      {/* Sugestões para seguir */}
      <aside className="w-1/5 p-4 bg-gray-100">
  <h2 className="text-lg font-bold mb-4">Sugestão pra seguir</h2>
  {[...Array(6)].map((_, i) => (
    <FirstCard key={i}>
      <div className="flex justify-between items-center gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          {/* É preciso modificar o tamanho para que eles fiquem lado a laoo. */}
          <span className="truncate max-w-[10rem]"> @{`bernardovxa${i + 1}`}</span> {/* Definindo um max-width e usando truncate */}
        </div>
        <FirstButton texto="Seguir" cor="#00695C" tamanho="0.8rem" />
      </div>
    </FirstCard>
  ))}
</aside>

    </div>
  );
}

export { Timeline };






