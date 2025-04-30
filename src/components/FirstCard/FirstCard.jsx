import React from 'react';
import style from './FirstCard.module.css'

const FirstCard = ({ children }) => {
  return (
    <div className={style.FirstCard}>
      {children}
    </div>
  );
};

export { FirstCard };