// notasService.js
export function obtenerNotas() {
  const notasAlmacenadas = localStorage.getItem('notas');
  return notasAlmacenadas ? JSON.parse(notasAlmacenadas) : [];
}

export function añadirNota(titulo, contenido) {
  const notaNueva = { titulo, contenido };
  const notasActuales = obtenerNotas();
  const nuevasNotas = [...notasActuales, notaNueva];
  localStorage.setItem('notas', JSON.stringify(nuevasNotas));
  return nuevasNotas;
}

export function actualizarNota(index, titulo, contenido) {
  const notasActuales = obtenerNotas();
  notasActuales[index] = { titulo, contenido };
  localStorage.setItem('notas', JSON.stringify(notasActuales));
  return notasActuales;
}

export function eliminarNota(index) {
  const notasActuales = obtenerNotas();
  notasActuales.splice(index, 1);
  localStorage.setItem('notas', JSON.stringify(notasActuales));
  return notasActuales;
}