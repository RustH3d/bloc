import './App.css';
import React, { useState, useEffect } from 'react';

export default function App() {
  function obtenerNotas() {
    const notasAlmacenadas = localStorage.getItem('notas');
    if (notasAlmacenadas) {
      return JSON.parse(notasAlmacenadas);
    } else {
      return [];
    }
  }

  const [notas, agregaNota] = useState(obtenerNotas);
  const [titulo, setTitulo] = useState(''); // Estado para el título de la nota
  const [texto, setTexto] = useState('');   // Estado para el texto de la nota

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas)); // Guardar notas en el localStorage cada vez que cambian
  }, [notas]);

  const añadirNota = (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    if (titulo && texto) {
      const nuevaNota = { titulo, texto }; // Crear un objeto de nota
      agregaNota([...notas, nuevaNota]); // Agregar la nueva nota al estado
      setTitulo(''); // Limpiar el campo del título
      setTexto('');  // Limpiar el campo del texto
    } else {
      alert('Por favor, ingresa un título y un texto para la nota.'); // Asegurarse de que ambos campos se llenen
    }
  };

  return (
    <div className="B">
      <h1>Bloc de Notas</h1>
      <form onSubmit={añadirNota}>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)} // Actualizar el estado del título al escribir
          placeholder="Título de la nota"
        />
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)} // Actualizar el estado del texto al escribir
          placeholder="Texto de la nota"
        />
        <button type="submit">Agregar Nota</button>
      </form>

      <h2>Notas</h2>
      <ul>
        {notas.map((nota, index) => (
          <li key={index}>
            <strong>{nota.titulo}</strong>: {nota.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}

