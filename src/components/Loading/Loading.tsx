// src/components/Loading/index.tsx
import React from 'react';
import './style.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Carregando...</p>
    </div>
  );
};

export default Loading;
