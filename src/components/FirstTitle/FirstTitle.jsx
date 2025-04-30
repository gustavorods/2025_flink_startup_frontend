
import React from 'react';
import './FirstTitle.css';


const Titulo = ({ texto, tamanho, cor }) => {
  return (
    <h1 className="titulo" style={{ fontSize: tamanho, color: cor }}>
      {texto}
    </h1>
  );
};







export { Titulo };