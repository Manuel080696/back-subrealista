require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

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

// Middleware para subida de archivos
app.use(fileUpload());

// Testeo para Yese

// Middleware para cargar imagenes
app.use('/uploads/profile_pics', express.static('./uploads/profile_pics'));
app.use('/uploads/rent_images', express.static('./uploads/rent_images'));

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
  postRentImages,
  updateRenting,
  deleteRenting,
  getSingleRental,
} = require('./controllers/rentings/index.js');

// Controllers reservas
const {
  bookRental,
  myRentals,
  myRentalId,
  myRentings,
  myRentingsId,
  manageRentings,
  cancelRental,
} = require('./controllers/rentals/index.js');

// Controllers reseñas
const {
  getTenantRatings,
  getOwnerRatings,
  getPendingRatings,
  rateOwner,
  rateTenant,
} = require('./controllers/ratings/index.js');

// Rutas usuarios
app.post('/register', createNewUser); //registro
app.post('/validate/:registrationCode', validateUser); //activacion
app.post('/login', loginUser); //login
app.get('/users/:username', getUserProfile); //perfil
app.put('/users/:username', authUser, updateProfile); //actualizar
app.get('/users/:username/rentings', getRentings); //ver pisos

// Rutas alquileres
app.get('/', getAllRentings); // Ver todos
app.get('/rentings/:id', getSingleRental); // Ver un alojamiento
app.get('/search', filteredSearch); // Ver por filtros
app.post('/new-renting', authUser, newRenting); // Postear nuevo
app.post('/rentings/:id', authUser, postRentImages); // Postear imagenes del alojamiento
app.put('/rentings/:id', authUser, updateRenting); // Editar alojamiento
app.delete('/rentings/:id', authUser, deleteRenting); // Borrar alojamiento

// Rutas reservas
app.post('/rentings/:id', authUser, bookRental); // Enviar peticion de reserva
app.get('/myrentals', authUser, myRentals); // Ver estado de peticiones propias
app.get('/myrentals/:id', authUser, myRentalId); // Ver estado de peticion individual propia
app.get('/myrentings', authUser, myRentings); // Ver estado de peticiones recibidas
app.get('/myrentings/:id', authUser, myRentingsId); // Ves estado individual de peticiones recibidas
app.patch('/myrentings/:id', authUser, manageRentings); // Aceptar/rechazar la reserva como dueño
app.patch('/myrentals/:id/cancel', authUser, cancelRental); // Cancelar la peticion de reserva como interesado

// Rutas reseñas
app.get('/users/:username/ratings/rentings', getTenantRatings); // Ver valoraciones como inquilino de un perfil
app.get('/users/:username/ratings/rentals', getOwnerRatings); // Ver valoraciones como dueño de un perfil
app.get('/users/:username/ratings/pending', authUser, getPendingRatings); // Ver valoraciones pendientes de enviar
app.post('/myrentals/:id/rate', authUser, rateOwner); // Postear valoraciones como inquilino hacia casero
app.post('/myrentings/:id/rate', authUser, rateTenant); // Postear valoraciones como casero hacia inquilino

// Middleware para mostrar logs
app.use(morgan('dev'));

app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () =>
  console.log(`El servidor se está ejecutando en: http://localhost:${port}`)
);
