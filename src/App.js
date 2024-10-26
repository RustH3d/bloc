import './App.css';
import React, { useState, useEffect } from 'react';
import { obtenerNotas, añadirNota, actualizarNota, eliminarNota } from './NotasService';
import Nota from './Nota';
import BarraBusqueda from './components/BarraBusqueda'; // Asegúrate de que este componente esté importado

export default function App() {
  const [notas, setNotas] = useState(obtenerNotas());
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [notaSeleccionada, setNotaSeleccionada] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [modoOscuro, setModoOscuro] = useState(false); // Estado para el modo oscuro

  useEffect(() => {
    setNotas(obtenerNotas());
  }, []);

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (titulo.trim() === '') {
      alert('El título no puede estar vacío'); // Muestra un mensaje de error si el título está vacío
      return;
    }
    const nuevasNotas = añadirNota(titulo, contenido);
    setNotas(nuevasNotas);
    setTitulo('');
    setContenido('');
    setMostrarFormulario(false);
  };

  const notasFiltradas = notas.filter((nota) =>
    nota.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const manejarClickNota = (nota, index) => {
    setNotaSeleccionada(nota);
    setEditIndex(index);
  };

  const cerrarPopup = () => {
    setNotaSeleccionada(null);
    setEditIndex(null);
  };

  const manejarGuardar = (e) => {
    e.preventDefault();
    const nuevasNotas = actualizarNota(editIndex, notaSeleccionada.titulo, notaSeleccionada.contenido);
    setNotas(nuevasNotas);
    cerrarPopup();
  };

  const manejarEliminar = () => {
    const nuevasNotas = eliminarNota(editIndex);
    setNotas(nuevasNotas);
    cerrarPopup();
  };

  return (
    <div className={`App ${modoOscuro ? 'modo-oscuro' : ''}`}>
      <button className="btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
        Agregar Nota
      </button>

      <button className="btn" onClick={() => setModoOscuro(!modoOscuro)}>
        {modoOscuro ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      <BarraBusqueda
        valorBusqueda={busqueda}
        onBuscar={setBusqueda}
      />

      <div className={`form-container ${mostrarFormulario ? 'visible' : 'hidden'}`}>
        <form onSubmit={manejarSubmit}>
          <input
            type="text"
            className="popup-input"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <input
            type="text"
            className="popup-input"
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Guardar Nota</button>
        </form>
      </div>

      <div className="notas-container">
        {notasFiltradas.map((nota, index) => (
          <Nota
            key={index}
            nota={nota}
            onClick={() => manejarClickNota(nota, index)} // Usar la función definida aquí
          />
        ))}
      </div>

      {notaSeleccionada && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-button" onClick={cerrarPopup}>×</button>
            <form onSubmit={manejarGuardar}>
              <input
                type="text"
                className="popup-input"
                value={notaSeleccionada.titulo}
                onChange={(e) => setNotaSeleccionada({ ...notaSeleccionada, titulo: e.target.value })}
                placeholder="Título"
              />
              <textarea
                className="popup-textarea"
                value={notaSeleccionada.contenido}
                onChange={(e) => setNotaSeleccionada({ ...notaSeleccionada, contenido: e.target.value })}
                placeholder="Contenido"
              />
              <div className="popup-buttons">
                <button className="btn btn-primary" type="submit">Guardar Cambios</button>
                <button type="button" className="btn btn-danger" onClick={manejarEliminar}>Eliminar Nota</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
