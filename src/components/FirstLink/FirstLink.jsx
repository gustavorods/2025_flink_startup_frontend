import React from 'react';
import style from './FirstLink.module.css'

const FirstLink = ({ texto="Default", cor = '#00695C', tamanho = '1rem', onClick}) => {
  return (
    <a className={style.FirstLink} style={{ color: cor, fontSize: tamanho }} onClick={onClick}>
      {texto}
    </a>
  );
};

export { FirstLink };