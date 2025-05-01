import React from 'react';
import style from './FirstButton.module.css'

const FirstButton = ({ texto="Default" , tamanho, cor, tipo = 'button', ...props }) => {
  return (
    <button
      className={style.FirstButton}
      type={tipo}  // Aqui o tipo é configurado via props
      style={{
        fontSize: tamanho,
        backgroundColor: cor,
        color: 'white',
        borderRadius: '30px',  // Bordas arredondadas
      }}
      {...props}
    >
      {texto}
    </button>
  );
};

export { FirstButton };