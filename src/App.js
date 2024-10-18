import './App.css'; 
import React, { useState, useEffect } from 'react' 
 
export default function App() { 
 
  function obtenerNotas(){ 
    const notasAlmacenadas = localStorage.getItem('notas') 
    if (notasAlmacenadas) { 
      return JSON.parse(notasAlmacenadas) 
    } else { 
      return [] 
    } 
  } 
 
  function añadirNota(titulo, contenido){ 
    const notaNueva = { titulo, contenido }; 
    const notasActuales = obtenerNotas() 
    const nuevasNotas = [ ... notasActuales, notaNueva] 
    localStorage.setItem('notas', JSON.stringify(nuevasNotas)) 
    return nuevasNotas 
  } 
 
function  actualizarNota(index, titulo, contenido) { 
    const notasActuales = obtenerNotas() 
    notasActuales[index] = { titulo, contenido } 
    localStorage.setItem('notas', JSON.stringify(notasActuales)) 
    return notasActuales; 
} 

function eliminarNota(index){
  const notasActuales= obtenerNotas()
  const nuevasNotas= notasActuales.filter((_, i) => i !== index)
  localStorage.setItem('notas', JSON.stringify(nuevasNotas))
  return nuevasNotas
}
 
  const manejarSubmit = (e) => { 
    e.preventDefault() 
    añadirNota(titulo, contenido) 
    setTitulo('') 
    setContenido('') 
    setMostrarFormulario(false) 
  } 
 
  const manejarClickNota = (nota, index) => { 
    setNotaSeleccionada (nota) 
    setEditIndex(index) 
  } 
 
  const cerrarPopup = () => { 
    setNotaSeleccionada(null) 
    setEditIndex(null) 
  } 
 
  const manejarCambioTitulo = (e) => { 
    setNotaSeleccionada({ ...notaSeleccionada, titulo: e.target.value}) 
  } 
  const manejarCambioContenido = (e) => { 
    setNotaSeleccionada({ ...notaSeleccionada, contenido: e.target.value}) 
  } 
 
  const manejarGuardar = (e) => { 
    e.preventDefault() 
    const nuevasNotas = actualizarNota(editIndex, notaSeleccionada.titulo, notaSeleccionada.contenido ) 
    setNotas(nuevasNotas); // Actualiza el estado de notas
    cerrarPopup();
  } 

  const manejarEliminar=(index)=>{
    const nuevasNotas = eliminarNota(index);
    setNotas(nuevasNotas);
    cerrarPopup();
  }
 
  useEffect(() => { 
    setNotas(obtenerNotas()) 
  }, []) 
 
  const [notas, setNotas] = useState(obtenerNotas) 
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [titulo, setTitulo] = useState(''); 
  const [contenido, setContenido] = useState('') 
  const [notaSeleccionada, setNotaSeleccionada] = useState(null) 
  const [editIndex, setEditIndex] = useState(null) 
 
        return ( 
          <div className="B"> 
            <button onClick={() => setMostrarFormulario(!mostrarFormulario)}> 
              Añadir Nota 
            </button> 
             
            <div className={`form-container ${mostrarFormulario ? 'visible' : 'hidden'}`}> 
              <form onSubmit={manejarSubmit}> 
                <input 
                  type="text" 
                  placeholder="Título" 
                  value={titulo} 
                  onChange={(e) => setTitulo(e.target.value)} 
                /> 
                <input 
                  type="text" 
                  placeholder="Contenido" 
                  value={contenido} 
                  onChange={(e) => setContenido(e.target.value)} 
                /> 
                <button type="submit">Guardar Nota</button> 
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
                  <button onClick={cerrarPopup}>Cerrar</button> 
                  <form onSubmit={manejarGuardar}> 
                    <input 
                      type="text" 
                      value={notaSeleccionada.titulo} 
                      onChange={manejarCambioTitulo} 
                    /> 
                    <textarea 
                      value={notaSeleccionada.contenido} 
                      onChange={manejarCambioContenido} 
                    /> 
                    <button type="submit">Guardar Cambios</button> 
                  </form> 
                  <button onClick={() => manejarEliminar(editIndex)}>Eliminar Nota</button>
                </div> 
              </div> 
            )} 
          </div> 
        ); 
      }