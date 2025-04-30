import React from 'react';
import './FirstButton.css';

const FirstButton = ({ texto, tamanho, cor, tipo = 'button' }) => {
  return (
    <button
      className="FirstButton"
      type={tipo}  // Aqui o tipo é configurado via props
      style={{
        fontSize: tamanho,
        backgroundColor: cor,
        color: 'white',
        borderRadius: '30px',  // Bordas arredondadas
      }}
    >
      {texto}
    </button>
  );
};

export { FirstButton };