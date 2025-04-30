import React from 'react';
import style from './FirstLink.module.css'

const FirstLink = ({ texto="Default", destino = '#', cor = '#00695C', tamanho = '1rem' }) => {
  return (
    <a href={destino} className={style.FirstLink} style={{ color: cor, fontSize: tamanho }}>
      {texto}
    </a>
  );
};

export { FirstLink };