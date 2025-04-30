import React from 'react';
import './FirstSubTitle.css';

const FirstSubTitle = ({ texto, tamanho = '1rem', cor = '#004D40', icon: Icon }) => {
  return (
    <h2
      className="FirstSubTitle"
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