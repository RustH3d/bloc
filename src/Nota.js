import React from 'react';
import './Notas.css'; 

// Nota.js


export default function Nota({ nota, onClick }) {
  return (
    <div className="nota-caja" onClick={onClick}>
      <strong>{nota.titulo}</strong>
      <p>{nota.contenido}</p>
    </div>
  );
}