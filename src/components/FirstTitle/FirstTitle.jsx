
import React from 'react';
import style from './FirstTitle.module.css'


const FirstTitle = ({ texto = "Default", tamanho, cor }) => {
  return (
    <h1 className={style.FirstTitle} style={{ fontSize: tamanho, color: cor }}>
      {texto}
    </h1>
  );
};







export { FirstTitle };