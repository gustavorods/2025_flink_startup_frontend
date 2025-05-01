import React from 'react';
import style from './FirstSubTitle.module.css'

const FirstSubTitle = ({ texto="Default", tamanho = '1rem', cor = '#004D40', icon: Icon }) => {
  return (
    <h2
      className={style.FirstSubTitle}
      style={{
        fontSize: tamanho,
        color: cor,
        fontFamily: "'Montserrat Alternates', sans-serif",
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      {Icon && <Icon />}
      {texto}
    </h2>
  );
};

export { FirstSubTitle };