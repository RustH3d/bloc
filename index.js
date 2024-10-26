const express = require('express');const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();const PORT = process.env.PORT || 3000;

// Middleware

app.use(bodyParser.json());
// Clave secreta para firmar los tokens

const SECRET_KEY = 'tu_clave_secreta';
// Simulación de base de datos de usuarios

const usuarios = [  { id: 1, username: 'usuario1', password: 'password1' },
  { id: 2, username: 'usuario2', password: 'password2' }];
// Función para generar el token
const generarToken = (usuario) => {  return jwt.sign({ id: usuario.id, username: usuario.username }, SECRET_KEY, { expiresIn: '1h' });
};

// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const token = req.headers['authorization'];  if (!token) {
    return res.status(403).send({ error: 'No token provided.' });  }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {      return res.status(500).send({ error: 'Failed to authenticate token.' });
    }    req.userId = decoded.id;
    next();  });
};

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  const { username, password } = req.body;  const usuario = usuarios.find(user => user.username === username && user.password === password);
    if (!usuario) {
    return res.status(401).send({ error: 'Invalid credentials' });  }
    const token = generarToken(usuario);
  res.status(200).send({ token });
});

// Ruta protegida
app.get('/notas', verificarToken, (req, res) => {
  const notas = obtenerNotas(); // Asume que tienes una función obtenerNotas  
  res.status(200).send(notas);
});
app.listen(PORT, () => {  console.log(`Servidor corriendo en el puerto ${PORT}`);
});