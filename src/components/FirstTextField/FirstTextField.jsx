import React from 'react';
import style from './FirstTextField.module.css'

const FirstTextField = ({ placeholder = 'Digite aqui...', tipo = 'text', tamanho = '1rem'  }) => {
  return (
    <input
      type={tipo}
      className={style.FirstTextField}
      placeholder={placeholder}
      style={{ fontSize: tamanho }}
    />
  );
};

export { FirstTextField };