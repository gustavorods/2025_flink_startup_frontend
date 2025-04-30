import React from 'react';
import './FirstLink.css';

const FirstLink = ({ texto, destino = '#', cor = '#00695C', tamanho = '1rem' }) => {
  return (
    <a href={destino} className="FirstLink" style={{ color: cor, fontSize: tamanho }}>
      {texto}
    </a>
  );
};

export { FirstLink };