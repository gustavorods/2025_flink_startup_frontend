import React, { useRef } from 'react';
import './FileButton.css';  // Adapte o nome do CSS se necessário

const FileButton = ({ texto, tamanho, cor }) => {
  const inputFileRef = useRef(null); // Ref para o input do tipo file

  const handleClick = () => {
    // Simula o clique no input de tipo file
    inputFileRef.current.click();
  };

  return (
    <div>
      {/* Botão estilizado */}
      <button
        className="FileButton"
        type="button"
        style={{
          fontSize: tamanho,
          backgroundColor: cor,
          color: 'white',
          borderRadius: '30px',  // Bordas arredondadas
        }}
        onClick={handleClick} // Abre o gerenciador de arquivos
      >
        {texto}
      </button>

      {/* Input file escondido */}
      <input
        ref={inputFileRef}
        type="file"
        style={{ display: 'none' }}  // Esconde o input de file
        accept="image/*"  // Aceita apenas imagens, você pode modificar conforme necessário
      />
    </div>
  );
};

export default FileButton;
