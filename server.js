require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { port } = require('./config.js');

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Middleware autentificación de usuarios
const { authUser } = require('./middlewares/auth.js');

// Middleware para JSON
app.use(express.json());

// Controllers usuarios
const {
  createNewUser,
  validateUser,
  loginUser,
  getUserProfile,
  updateProfile,
  getRentings,
} = require('./controllers/users/index.js');

// Controllers alquileres
const {
  getAllRentings,
  filteredSearch,
  newRenting,
  updateRenting,
  deleteRenting,
  getSingleRental,
  bookRental,
} = require('./controllers/rentings/index.js');

// Rutas usuarios
app.post('/register', createNewUser); //registro
app.post('/validate', validateUser); //activacion
app.post('/login', loginUser); //login
app.get('/users/:username', getUserProfile); //perfil
app.put('/users/:username', authUser, updateProfile); //actualizar
app.get('/users/:username/rentings', getRentings); //ver pisos

// Rutas alquileres
app.get('/', getAllRentings); // Ver todos
app.get('/rentings/:id', getSingleRental); // Ver un alojamiento
app.get('/search', filteredSearch); // Ver por filtros
app.post('/new-renting', authUser, newRenting); // Postear nuevo
app.put('/rentings/:id', authUser, updateRenting); // Editar alojamiento
app.delete('/rentings/:id', authUser, deleteRenting); // Borrar alojamiento

// Rutas reservas
app.post('/rentings/:id', authUser, bookRental); // Enviar peticion de reserva
// Ver estado de peticiones
// Ver estado de peticion individual
// Aceptar/rechazar la reserva
// Cancelar la peticion de reserva

// Middleware para mostrar logs
app.use(morgan('dev'));

app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () =>
  console.log(`El servidor se está ejecutando en: http://localhost:${port}`)
);
