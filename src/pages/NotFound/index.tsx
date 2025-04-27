import React from 'react';
import NotFoundImage from '../../assets/undraw_page-not-found_6wni.svg';
import './style.css';

export const NotFound = () => {
  return (
    <div className="img-not-found">
      <img src={NotFoundImage} alt="Página não encontrada" />
    </div>
  );
};
