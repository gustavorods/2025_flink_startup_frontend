
import React from 'react';
import './FirstTitle.css';


const FirstTitle = ({ texto = "Default", tamanho, cor }) => {
  return (
    <h1 className="FirstTitle" style={{ fontSize: tamanho, color: cor }}>
      {texto}
    </h1>
  );
};







export { FirstTitle };