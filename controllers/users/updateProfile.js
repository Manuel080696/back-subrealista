const bcrypt = require('bcrypt');
const updateUser = require('../../db/queries/users/updateUser.js');
const getUsername = require('../../db/queries/users/getUsername.js');
const jwt = require('jsonwebtoken');

const updateProfile = async (req, res, next) => {
  const token = req.headers.authorization;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  const userId = decodedToken.id;

  const user = await getUsername(userId);

  const updatedUser = {
    ...(req.body.email && { email: req.body.email }),
    ...(req.body.username && { username: req.body.username }),
    ...(req.body.bio && { bio: req.body.bio }),
    ...(req.body.address && { address: req.body.address }),
    ...user,
  };

  if ('password' in req.body) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'La contraseña es incorrecta' });
    }
  } else {
    return res.status(400).json({ error: 'La contraseña es obligatoria' });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const rowsAffected = await updateUser(
    updatedUser.email,
    updatedUser.username,
    updatedUser.bio,
    updatedUser.address,
    (updatedUser.password = hashedPassword),
    userId
  );

  if (rowsAffected === 0) {
    return res
      .status(400)
      .json({ error: 'No hay ningún dato para actualizar' });
  }
  return res.json(updatedUser);
};

module.exports = updateProfile;
