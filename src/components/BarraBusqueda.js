// BarraBusqueda.js
import React from 'react';
import './BarraBusqueda.css'; // Archivo CSS para estilos específicos de la barra de búsqueda

export default function BarraBusqueda({ valorBusqueda, onBuscar }) {
  return (
    <input
      type="text"
      placeholder="Buscar notas por título..."
      value={valorBusqueda}
      onChange={(e) => onBuscar(e.target.value)}
      className="barra-busqueda"
    />
  );
}
