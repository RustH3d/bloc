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
  } 
 
  const manejarSubmit = (e) => { 
    e.preventDefault() 
    añadirNota(titulo, contenido) 
    setTitulo('') 
    setContenido('') 
    setMostrarFormulario(false) 
  } 
 
 
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 
  const [titulo, setTitulo] = useState(''); 
  const [contenido, setContenido] = useState('') 
   
  return ( 
    <div className="B"> 
      <button onClick={()=> setMostrarFormulario(true)}> 
     + 
     </button> 
     <div className={`form-container ${mostrarFormulario ? 'visible' : 'hidden'}`}> 
     <form onSubmit={manejarSubmit}> 
     <input 
     type="text" 
     placeholder="titulo" 
     value={titulo} 
     onChange={(e) => setTitulo(e.target.value)} 
     /> 
      <input 
     type="text" 
     placeholder="contenido" 
     value={contenido} 
     onChange={(e) => setContenido(e.target.value)} 
     /> 
     <button type="submit">  
     Guardar 
     </button>    
     </form> 
    </div> 
 
    <ul> 
    {obtenerNotas().map((nota, index) => ( 
      <li key={index}> 
        <strong> 
          {nota.titulo}: 
        </strong> {nota.contenido} 
        </li> 
    ))} 
    </ul> 
    </div> 
  ); 
 
}