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
} = require('./controllers/users/index.js');

// Rutas usuarios
app.post('/register', createNewUser);
app.post('/validate', validateUser);
app.post('/login', loginUser);
app.get('/users/:username', getUserProfile);

// Middleware para mostrar logs
app.use(morgan('dev'));

app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Not found' });
});

app.listen(port, () =>
  console.log(`El servidor se está ejecutando en: http://localhost:${port}`)
);
