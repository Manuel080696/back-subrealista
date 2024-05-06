const bcrypt = require('bcrypt');
const newUser = require('../../db/queries/users/newUser');
const crypto = require('crypto');
const { sendMail } = require('../../helpers');
const { generateError } = require('../../helpers/generateError.js');
const getUsername = require('../../db/queries/users/getUsername');

const createNewUser = async (req, res, next) => {
  try {
    const { username, email, password, repeatPassword, address, bio } =
      req.body;

    if (password !== repeatPassword) {
      throw generateError('Las contraseñas no coinciden.', 400);
    }

    if (!username || !email || !password || !address || !bio) {
      throw generateError('Faltan campos por rellenar.', 400);
    }

    if (username) {
      const userDB = await getUsername(username);
      if (username === userDB?.username) {
        throw generateError('Este nombre de usuario ya existe.', 400);
      }
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    const registrationCode = crypto.randomUUID();

    await newUser({
      ...req.body,
      password: encryptedPassword,
      registrationCode: registrationCode,
    });

    await sendMail({
      to: email,
      subject: 'Verifica tu correo electrónico',
      HTMLPart: `Para verificar tu cuenta, copia el siguiente código: ${registrationCode}`,
    });

    res.status(201).send({
      status: 'ok',
      data: { email, username, createdAt: new Date() },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createNewUser;
