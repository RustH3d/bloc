import './App.css'; 
import React, { useState, useEffect } from 'react'; 
import { obtenerNotas, añadirNota, actualizarNota, eliminarNota } from './NotasService'; 
 
export default function App() { 
  const [notas, setNotas] = useState(obtenerNotas); 
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [titulo, setTitulo] = useState(''); 
  const [contenido, setContenido] = useState(''); 
  const [notaSeleccionada, setNotaSeleccionada] = useState(null); 
  const [editIndex, setEditIndex] = useState(null); 
 
  useEffect(() => { 
    setNotas(obtenerNotas()); 
  }, []); 
 
  const manejarSubmit = (e) => { 
    e.preventDefault(); 
    if (titulo.trim() === '') { 
      alert('El título no puede estar vacío'); // Muestra un mensaje de error si el título está vacío
      return; // Sal del manejador para evitar guardar la nota vacía
    }
    const nuevasNotas = añadirNota(titulo, contenido); 
    setNotas(nuevasNotas); 
    setTitulo(''); 
    setContenido(''); 
    setMostrarFormulario(false); 
  }; 
 
  const manejarClickNota = (nota, index) => { 
    setNotaSeleccionada(nota); 
    setEditIndex(index); 
  }; 
 
  const cerrarPopup = () => { 
    setNotaSeleccionada(null); 
    setEditIndex(null); 
  }; 
 
  const manejarCambioTitulo = (e) => { 
    
      
    setNotaSeleccionada({ ...notaSeleccionada, titulo: e.target.value }); 
  }; 
 
  const manejarCambioContenido = (e) => { 
    setNotaSeleccionada({ ...notaSeleccionada, contenido: e.target.value }); 
  }; 
 
  const manejarGuardar = (e) => { 
    e.preventDefault(); 
    if (notaSeleccionada.titulo.trim() === '') { 
      alert('El título no puede estar vacío'); // Muestra un mensaje de error si el título está vacío
      return; // Sal del manejador para evitar guardar la nota vacía
    }
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
    <div className="B">
  <button className="btn" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
    +
  </button>

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
    {notas.map((nota, index) => (
      <div key={index} className="nota-caja" onClick={() => manejarClickNota(nota, index)}>
        <strong>{nota.titulo}</strong>
        <p>{nota.contenido}</p>
      </div>
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
            onChange={manejarCambioTitulo}
            placeholder="Título"
          />
          <textarea
            className="popup-textarea"
            value={notaSeleccionada.contenido}
            onChange={manejarCambioContenido}
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


  )
}