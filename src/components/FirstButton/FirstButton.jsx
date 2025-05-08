import React from 'react';
import style from './FirstButton.module.css'

const FirstButton = ({ texto = "Default", tamanho, cor, tipo = 'button', ...props }) => {
  return (
    <button
      type={tipo}
      className={style.FirstButton}
      style={{
        ...(tamanho && { fontSize: tamanho }),
        ...(cor && { backgroundColor: cor }),
      }}
      {...props}
    >
      {texto}
    </button>
  );
};


export { FirstButton };