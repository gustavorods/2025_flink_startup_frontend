import React from 'react';
import './FirstTextField.css';

const FirstTextField = ({ placeholder = 'Digite aqui...', tipo = 'text', tamanho = '1rem'  }) => {
  return (
    <input
      type={tipo}
      className="FirstTextField"
      placeholder={placeholder}
      style={{ fontSize: tamanho }}
    />
  );
};

export default FirstTextField;
