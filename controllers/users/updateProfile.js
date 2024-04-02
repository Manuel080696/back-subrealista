const bcrypt = require('bcrypt');
const updateUser = require('../../db/queries/users/updateUser.js');
const getUserPassword = require('../../db/queries/users/getUserPassword.js');
const jwt = require('jsonwebtoken');

const updateProfile = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const username = decodedToken.username;

  const updatedUser = {
    ...(req.body.email && { email: req.body.email }),
    ...(req.body.username && { username: req.body.username }),
    ...(req.body.bio && { bio: req.body.bio }),
    ...(req.body.address && { address: req.body.address }),
  };

  if ('password' in req.body) {
    const userPassword = await getUserPassword(username);

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      userPassword[0].password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'La contraseña es incorrecta' });
    }
  } else {
    return res.status(400).json({ error: 'La contraseña es obligatoria' });
  }

  const rowsAffected = await updateUser(
    updatedUser.email,
    updatedUser.username,
    updatedUser.bio,
    updatedUser.address,
    username
  );

  if (rowsAffected === 0) {
    return res.status(400).json({
      error: 'No hay ningún dato para actualizar o ha ocurrido un error',
    });
  }
  return res.json(updatedUser);
};

module.exports = updateProfile;
