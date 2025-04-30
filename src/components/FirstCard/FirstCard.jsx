import React from 'react';
import './FirstCard.css';

const FirstCard = ({ children }) => {
  return (
    <div className="FirstCard">
      {children}
    </div>
  );
};

export { FirstCard };